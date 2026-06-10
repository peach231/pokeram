// Pokéram — overworld.js
// Tile-map world: grid movement with pixel interpolation, collision, warps,
// NPC/sign interaction, ledge hops, tall-grass hooks, camera, layered render.

(function () {
  var TILE = 16;

  G.flags = {}; // global progression flags (persisted by save.js)

  // Hooks other systems plug into (battle wires these up in later phases).
  G.hooks = {
    grassStep: null,   // function(map) called after stepping onto tall grass
    stepDone: null,    // function(x, y) called after every completed step
    interact: null     // function(npc) -> true if it consumed the interaction
  };

  function makeActor(sprite, x, y, dir) {
    return {
      sprite: sprite, x: x, y: y, dir: dir || 'down',
      moving: false, step: 0, stride: false,
      hop: 0,        // >0 while ledge-hopping (frames remaining)
      hopTotal: 0,
      fromX: x, fromY: y,
      obj: false
    };
  }

  G.world = {
    mapId: null, map: null,
    player: makeActor('player', 0, 0, 'down'),
    npcs: [],

    loadMap: function (id, x, y, dir) {
      var map = G.MAPS[id];
      this.mapId = id;
      this.map = map;
      this.player.x = x; this.player.y = y;
      this.player.dir = dir || this.player.dir;
      this.player.moving = false; this.player.step = 0; this.player.hop = 0;
      this.npcs = [];
      var defs = (map.npcs || []).concat(map.trainers || []);
      for (var i = 0; i < defs.length; i++) {
        var d = defs[i];
        if (d.ifFlag && !G.flags[d.ifFlag]) continue;
        if (d.unlessFlag && G.flags[d.unlessFlag]) continue;
        var a = makeActor(d.sprite, d.x, d.y, d.dir || 'down');
        a.def = d;
        a.obj = !!d.obj;
        this.npcs.push(a);
      }
      if (map.music) G.audio.playMusic(map.music);
    },

    tileNameAt: function (layer, x, y) {
      var map = this.map;
      if (x < 0 || y < 0 || x >= map.w || y >= map.h) return null;
      var rows = map[layer];
      if (!rows) return null;
      var ch = rows[y][x];
      if (ch === '.' && layer !== 'ground') return null;
      var name = map.legend[ch];
      return name || null;
    },

    tileDefAt: function (x, y) {
      // deco overrides ground for gameplay properties
      var name = this.tileNameAt('deco', x, y) || this.tileNameAt('ground', x, y);
      return name ? G.TILES[name] : null;
    },

    npcAt: function (x, y) {
      for (var i = 0; i < this.npcs.length; i++) {
        var n = this.npcs[i];
        if (n.x === x && n.y === y) return n;
      }
      return null;
    },

    isBlocked: function (x, y) {
      var map = this.map;
      if (x < 0 || y < 0 || x >= map.w || y >= map.h) return true;
      var def = this.tileDefAt(x, y);
      if (!def || def.solid) return true;
      if (def.ledge) return true; // ledges only crossed by hopping
      if (this.npcAt(x, y)) return true;
      if (this.itemAt(x, y)) return true;
      if (this.player.x === x && this.player.y === y) return true;
      return false;
    },

    warpAt: function (x, y) {
      var warps = this.map.warps || [];
      for (var i = 0; i < warps.length; i++) {
        if (warps[i].x === x && warps[i].y === y) return warps[i];
      }
      return null;
    },

    signAt: function (x, y) {
      var signs = this.map.signs || [];
      for (var i = 0; i < signs.length; i++) {
        if (signs[i].x === x && signs[i].y === y) return signs[i];
      }
      return null;
    },

    itemAt: function (x, y) {
      var items = this.map.items || [];
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        if (it.x === x && it.y === y && !G.flags[it.flag]) return it;
      }
      return null;
    },

    warpTo: function (warp) {
      var self = this;
      G.audio.sfx('doorOpen');
      G.pushScene(G.FadeScene(function () {
        self.loadMap(warp.to, warp.tx, warp.ty, warp.dir || self.player.dir);
      }));
    },

    pixelPos: function (a) {
      var px = a.x * TILE, py = a.y * TILE;
      if (a.moving) {
        var t = a.step / 16;
        px = G.lerp(a.fromX * TILE, a.x * TILE, t);
        py = G.lerp(a.fromY * TILE, a.y * TILE, t);
      } else if (a.hop > 0) {
        var ht = 1 - a.hop / a.hopTotal;
        px = G.lerp(a.fromX * TILE, a.x * TILE, ht);
        py = G.lerp(a.fromY * TILE, a.y * TILE, ht) - Math.sin(ht * Math.PI) * 10;
      }
      return { x: px, y: py };
    },

    camera: function () {
      var p = this.pixelPos(this.player);
      var mw = this.map.w * TILE, mh = this.map.h * TILE;
      var cx = Math.round(p.x) + 8 - G.SCREEN_W / 2;
      var cy = Math.round(p.y) + 8 - G.SCREEN_H / 2;
      cx = mw <= G.SCREEN_W ? (mw - G.SCREEN_W) / 2 : G.clamp(cx, 0, mw - G.SCREEN_W);
      cy = mh <= G.SCREEN_H ? (mh - G.SCREEN_H) / 2 : G.clamp(cy, 0, mh - G.SCREEN_H);
      return { x: Math.round(cx), y: Math.round(cy) };
    }
  };

  // ---------------------------------------------------------------------
  // The overworld scene (a singleton — pushed once, battles/menus stack over).
  // ---------------------------------------------------------------------
  G.overworldScene = {
    opaque: true,

    update: function () {
      var w = G.world, p = w.player;

      if (p.hop > 0) {
        p.hop--;
        if (p.hop === 0) this._stepDone();
        return;
      }

      if (p.moving) {
        p.step += ((G.input.held.run || G.input.held.B) ? 2 : 1); // hold B/Shift to run
        if (p.step >= 16) {
          p.moving = false;
          p.step = 0;
          this._stepDone();
        }
        return;
      }
      if (p.bumpCool > 0) p.bumpCool--;

      // idle: interactions first
      if (G.input.justPressed('A')) { this._interact(); return; }
      if (G.input.justPressed('start') && G.StartMenu) {
        G.audio.sfx('confirm');
        G.pushScene(G.StartMenu());
        return;
      }

      var dir = G.input.heldDir();
      if (!dir) { p.turnLock = 0; return; }

      if (dir !== p.dir) {
        p.dir = dir;
        p.turnLock = 5; // face first; keep holding to step
        return;
      }
      if (p.turnLock > 0) { p.turnLock--; return; }

      var d = G.DIRS[dir];
      var nx = p.x + d.dx, ny = p.y + d.dy;
      var destDef = w.tileDefAt(nx, ny);

      // ledge hop: only in the ledge's hop direction
      if (destDef && destDef.ledge === dir) {
        p.fromX = p.x; p.fromY = p.y;
        p.x = nx + d.dx; p.y = ny + d.dy;
        p.hopTotal = p.hop = 22;
        p.stride = !p.stride;
        G.audio.sfx('ledgeHop');
        return;
      }

      if (w.isBlocked(nx, ny)) {
        if (!p.bumpCool) {
          G.audio.sfx('bump');
          p.bumpCool = 16;
        }
        return;
      }

      p.fromX = p.x; p.fromY = p.y;
      p.x = nx; p.y = ny;
      p.moving = true;
      p.step = 0;
      p.stride = !p.stride;
    },

    _stepDone: function () {
      var w = G.world, p = w.player;

      // repel ticks on every step, like the real thing
      if (G.player.repelSteps > 0) {
        G.player.repelSteps--;
        if (G.player.repelSteps === 0) {
          G.pushScene(G.Textbox('The Repel Mist wore off!'));
        }
      }

      var warp = w.warpAt(p.x, p.y);
      if (warp) { w.warpTo(warp); return; }

      // script triggers (event system arrives with the region build)
      var scripts = w.map.scripts || [];
      for (var i = 0; i < scripts.length; i++) {
        var s = scripts[i];
        var xs = Array.isArray(s.x) ? s.x : [s.x, s.x];
        if (p.x >= xs[0] && p.x <= xs[1] && p.y === s.y) {
          if (s.once && G.flags[s.once]) continue;
          if (s.ifFlag && !G.flags[s.ifFlag]) continue;
          if (G.EVENTS && G.EVENTS[s.run]) { G.runEvent(s.run); return; }
        }
      }

      if (this._trainerScan()) return;

      var def = w.tileDefAt(p.x, p.y);
      if (def && def.grass && G.hooks.grassStep) {
        if (G.hooks.grassStep(w.map)) return;
      }
      if (G.hooks.stepDone) G.hooks.stepDone(p.x, p.y);
    },

    // trainer line-of-sight scan: any undefeated trainer looking at the
    // player kicks off an engagement cutscene.
    _trainerScan: function () {
      var w = G.world, p = w.player;
      for (var i = 0; i < w.npcs.length; i++) {
        var n = w.npcs[i];
        var def = n.def;
        if (!def || !def.trainer || G.flags[def.trainer]) continue;
        var sight = def.sight || 4;
        var d = G.DIRS[n.dir];
        var dx = p.x - n.x, dy = p.y - n.y;
        if (d.dx !== 0) {
          if (dy !== 0 || dx * d.dx <= 0 || Math.abs(dx) > sight) continue;
        } else {
          if (dx !== 0 || dy * d.dy <= 0 || Math.abs(dy) > sight) continue;
        }
        // clear path between (exclusive)
        var blocked = false;
        var steps = Math.abs(dx + dy) - 1;
        for (var s = 1; s <= steps; s++) {
          var tx = n.x + d.dx * s, ty = n.y + d.dy * s;
          var tdef = w.tileDefAt(tx, ty);
          if (!tdef || tdef.solid || (w.npcAt(tx, ty) && w.npcAt(tx, ty) !== n)) { blocked = true; break; }
        }
        if (blocked) continue;
        G.runEventGen(this._engageGen(n, def));
        return true;
      }
      return false;
    },

    _engageGen: function (npcActor, def) {
      var trDef = G.TRAINERS[def.trainer];
      return function* () {
        yield { t: 'sfx', id: 'confirm' };
        yield { t: 'balloon', npc: npcActor };
        yield { t: 'npcApproach', npc: npcActor };
        yield { t: 'text', s: trDef.name + ': ' + trDef.intro };
        var result = { v: null };
        yield {
          t: 'custom',
          run: function (done) {
            G.startTrainerBattle(def.trainer, {
              onEnd: function (r) { result.v = r; done(); }
            });
          }
        };
        if (result.v === 'win' && def.after) {
          yield { t: 'text', s: trDef.name + ': ' + def.after };
        }
      };
    },

    _interact: function () {
      var w = G.world, p = w.player;
      var d = G.DIRS[p.dir];
      var fx = p.x + d.dx, fy = p.y + d.dy;

      var npc = w.npcAt(fx, fy);
      if (npc) {
        if (!npc.obj) npc.dir = G.OPPOSITE_DIR[p.dir]; // face the player
        if (G.hooks.interact && G.hooks.interact(npc)) return;
        if (npc.def.trainer) {
          if (!G.flags[npc.def.trainer]) {
            G.runEventGen(this._engageGen(npc, npc.def));
          } else {
            G.audio.sfx('confirm');
            G.pushScene(G.Textbox(npc.def.beaten || G.TRAINERS[npc.def.trainer].defeat || '...'));
          }
          return;
        }
        if (npc.def.event && G.EVENTS && G.EVENTS[npc.def.event]) { G.runEvent(npc.def.event); return; }
        if (npc.def.dialog) {
          G.audio.sfx('confirm');
          G.pushScene(G.Textbox(npc.def.dialog));
        }
        return;
      }

      var item = w.itemAt(fx, fy);
      if (item) {
        G.flags[item.flag] = 1;
        G.player.bag[item.item] = (G.player.bag[item.item] || 0) + (item.qty || 1);
        G.audio.sfx('catchClick');
        var itemName = G.ITEMS[item.item].name + ((item.qty || 1) > 1 ? ' x' + item.qty : '');
        G.pushScene(G.Textbox('You found a ' + itemName + '!'));
        return;
      }

      var sign = w.signAt(fx, fy);
      if (sign) {
        G.audio.sfx('confirm');
        G.pushScene(G.Textbox(sign.text));
        return;
      }
    },

    draw: function (ctx) {
      var w = G.world, map = w.map;
      if (!map) return;
      var cam = w.camera();

      var x0 = Math.max(0, Math.floor(cam.x / TILE));
      var y0 = Math.max(0, Math.floor(cam.y / TILE));
      var x1 = Math.min(map.w - 1, Math.ceil((cam.x + G.SCREEN_W) / TILE));
      var y1 = Math.min(map.h - 1, Math.ceil((cam.y + G.SCREEN_H) / TILE));

      this._drawLayer(ctx, 'ground', x0, y0, x1, y1, cam);
      this._drawLayer(ctx, 'deco', x0, y0, x1, y1, cam);

      // ground items (capture orbs lying around)
      var items = w.map.items || [];
      for (var ii = 0; ii < items.length; ii++) {
        if (G.flags[items[ii].flag]) continue;
        ctx.drawImage(G.IMG.orb_stand, items[ii].x * TILE - cam.x, items[ii].y * TILE - cam.y);
      }

      // entities, y-sorted
      var ents = [w.player].concat(w.npcs);
      var self = this;
      ents.sort(function (a, b) { return w.pixelPos(a).y - w.pixelPos(b).y; });
      for (var i = 0; i < ents.length; i++) self._drawActor(ctx, ents[i], cam);

      this._drawLayer(ctx, 'over', x0, y0, x1, y1, cam);
    },

    _drawLayer: function (ctx, layer, x0, y0, x1, y1, cam) {
      var map = G.world.map;
      var rows = map[layer];
      if (!rows) return;
      var baseImg = (layer === 'ground' && map.base) ? G.IMG[G.TILES[map.base].img] : null;
      for (var y = y0; y <= y1; y++) {
        for (var x = x0; x <= x1; x++) {
          var ch = rows[y][x];
          if (ch === '.' && layer !== 'ground') continue;
          var name = map.legend[ch];
          if (!name) continue;
          var def = G.TILES[name];
          if (!def) continue;
          // base tile under everything so art with transparency sits on
          // grass/floor instead of the void
          if (baseImg && name !== map.base) ctx.drawImage(baseImg, x * TILE - cam.x, y * TILE - cam.y);
          var img = def.anim
            ? G.IMG[def.anim[(G.frame / def.animSpeed | 0) % def.anim.length]]
            : G.IMG[def.img];
          ctx.drawImage(img, x * TILE - cam.x, y * TILE - cam.y);
        }
      }
    },

    _drawActor: function (ctx, a, cam) {
      var w = G.world;
      var pos = w.pixelPos(a);
      var sx = Math.round(pos.x) - cam.x, sy = Math.round(pos.y) - cam.y;

      if (a.hop > 0) { // landing shadow
        ctx.fillStyle = 'rgba(26,28,44,0.35)';
        ctx.fillRect(a.x * TILE - cam.x + 3, a.y * TILE - cam.y + 12, 10, 3);
      }

      var img;
      if (a.obj) {
        img = G.IMG[a.sprite];
        if (img) ctx.drawImage(img, sx, sy);
        return;
      }

      img = this._actorImage(a);
      if (img) ctx.drawImage(img, sx, sy - 8); // 8px head overhang

      // grass rustle over feet
      var def = w.tileDefAt(a.x, a.y);
      if (def && def.grass && !a.moving && a.hop === 0) {
        ctx.drawImage(G.IMG.fx_rustle, a.x * TILE - cam.x, a.y * TILE - cam.y);
      }
    },

    _actorImage: function (a) {
      var base = 'ch_' + a.sprite + '_';
      var striding = (a.moving && a.step < 8) || (a.hop > 0 && a.hop > a.hopTotal / 2);
      var name;
      if (a.dir === 'down') name = striding ? (a.stride ? 'd1' : 'd1_flipped') : 'd0';
      else if (a.dir === 'up') name = striding ? (a.stride ? 'u1' : 'u1_flipped') : 'u0';
      else if (a.dir === 'left') name = striding ? 's1' : 's0';
      else name = striding ? 's1_flipped' : 's0_flipped';

      // resolve, falling back to standing frame for sprites without strides
      var resolved = this._resolve(base, name);
      return resolved;
    },

    _resolve: function (base, name) {
      var flip = /_flipped$/.test(name);
      var plain = name.replace('_flipped', '');
      var key = base + plain + (flip ? '_flip' : '');
      if (G.IMG[key]) return G.IMG[key];
      key = base + plain;
      if (G.IMG[key]) return G.IMG[key];
      // stride frame missing -> standing frame of same direction
      var standKey = base + plain[0] + '0';
      if (flip && G.IMG[standKey + '_flip']) return G.IMG[standKey + '_flip'];
      return G.IMG[standKey];
    }
  };

  // -------------------------------------------------------------------------
  // Wild encounters + battle outcomes (glue between overworld and battle).
  // -------------------------------------------------------------------------
  var RARITY_W = { common: 100, uncommon: 40, rare: 12, elusive: 2, legendary: 0, starter: 0 };

  G.hooks.grassStep = function (map) {
    var enc = map.encounters;
    if (!enc || !G.player.party.length) return false;

    if (!G.chance(enc.rate || 0.1)) return false;

    var weighted = enc.table.map(function (e) {
      return { e: e, w: e.w || RARITY_W[G.SPECIES[e.sp].rarity] || 50 };
    });
    var pick = G.pickWeighted(weighted).e;
    var level = G.irandIn(pick.min, pick.max);

    // repel: suppress wilds at or below the lead's level
    var lead = null;
    for (var i = 0; i < G.player.party.length; i++) {
      if (G.player.party[i].curHp > 0) { lead = G.player.party[i]; break; }
    }
    if (G.player.repelSteps > 0 && lead && level <= lead.level) return false;

    var wild = G.makeMon(pick.sp, level);
    G.player.dexSeen[pick.sp] = 1;
    G.startBattle(
      { party: G.player.party, foes: [wild], wild: true },
      { bg: map.battleBg || 'meadow', onEnd: G.afterBattle }
    );
    return true;
  };

  // shared post-battle handling (wild + trainer)
  G.afterBattle = function (result, battle) {
    if (G.world.map && G.world.map.music) G.audio.playMusic(G.world.map.music);

    if (result === 'caught' && battle.caughtMon) {
      G.player.dexCaught[battle.caughtMon.sp] = 1;
      if (G.player.party.length < 6) G.player.party.push(battle.caughtMon);
    }

    if (result === 'win' && battle.pendingEvolutions.length && G.EvolutionScene) {
      G.pushScene(G.EvolutionScene(battle.pendingEvolutions));
      return;
    }

    if (result === 'lose') {
      var lost = Math.floor(G.player.money / 2);
      G.player.money -= lost;
      for (var i = 0; i < G.player.party.length; i++) G.healMon(G.player.party[i]);
      var r = G.player.respawn;
      G.pushScene(G.Textbox(
        ['You whited out!' + (lost ? ' You dropped $' + lost + ' in the panic...' : ''),
         'You scurried back to safety.'],
        { onDone: function () {
          G.pushScene(G.FadeScene(function () {
            G.world.loadMap(r.mapId, r.x, r.y, 'down');
          }));
        } }
      ));
    }
  };

  // Minimal event runner: generators yield {t:...} descriptors. The region
  // build (Phase 6) extends the descriptor set; this base handles text,
  // movement-free beats and battles wired in later.
  G.EVENTS = G.EVENTS || {};
  G.runEvent = function (id) {
    G.runEventGen(G.EVENTS[id]);
  };
  G.runEventGen = function (genFn) {
    G.pushScene(G.EventScene(genFn()));
  };

  G.EventScene = function (gen) {
    var waiting = false;
    var balloon = null;   // {npc, t}
    var approach = null;  // {npc}
    return {
      opaque: false,
      update: function () {
        if (balloon) {
          balloon.t--;
          if (balloon.t <= 0) { balloon = null; waiting = false; }
          return;
        }
        if (approach) {
          var n = approach.npc, p = G.world.player;
          if (n.moving) {
            n.step++;
            if (n.step >= 16) { n.moving = false; n.step = 0; }
            return;
          }
          var dx = p.x - n.x, dy = p.y - n.y;
          if (Math.abs(dx) + Math.abs(dy) <= 1) {
            // face each other
            n.dir = dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up';
            p.dir = G.OPPOSITE_DIR[n.dir];
            approach = null;
            waiting = false;
            return;
          }
          var d = Math.abs(dx) > 0 && dy === 0
            ? (dx > 0 ? 'right' : 'left')
            : (dy > 0 ? 'down' : 'up');
          n.dir = d;
          n.fromX = n.x; n.fromY = n.y;
          n.x += G.DIRS[d].dx; n.y += G.DIRS[d].dy;
          n.moving = true; n.step = 0; n.stride = !n.stride;
          return;
        }
        if (waiting) return;
        var r = gen.next();
        if (r.done) { G.popScene(); return; }
        var step = r.value;
        if (!step) return;
        if (step.t === 'text') {
          waiting = true;
          G.pushScene(G.Textbox(step.s, { onDone: function () { waiting = false; } }));
        } else if (step.t === 'fn') {
          step.fn();
        } else if (step.t === 'balloon') {
          waiting = true;
          balloon = { npc: step.npc, t: 36 };
        } else if (step.t === 'npcApproach') {
          waiting = true;
          approach = { npc: step.npc };
        } else if (step.t === 'sfx') {
          G.audio.sfx(step.id);
        } else if (step.t === 'wait') {
          waiting = true;
          var nframes = step.frames;
          var timer = {
            opaque: false,
            update: function () { if (--nframes <= 0) { G.popScene(); waiting = false; } },
            draw: function () {}
          };
          G.pushScene(timer);
        } else if (step.t === 'custom') {
          waiting = true;
          step.run(function () { waiting = false; });
        }
      },
      draw: function (ctx) {
        if (balloon) {
          var cam = G.world.camera();
          var pos = G.world.pixelPos(balloon.npc);
          ctx.drawImage(G.IMG.ui_balloon, Math.round(pos.x) - cam.x, Math.round(pos.y) - cam.y - 24);
        }
      }
    };
  };
})();
