// Pokéram — battle_ui.js
// The battle scene: pumps battle.js generators, animating each descriptor.
// Also owns the painted battle backgrounds and the in-battle menus.

(function () {
  var W = 240, H = 160;

  // sprite anchor points (bottom-center of each combatant)
  var FOE = { x: 168, y: 70 };
  var PLY = { x: 60, y: 112 };

  // ------------------------------------------------------------ backgrounds
  // Painted in code: sky band + dither + ground + platform ellipses.
  function dither(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    for (var yy = y; yy < y + h; yy++) {
      for (var xx = x + ((yy & 1) ? 1 : 0); xx < x + w; xx += 2) {
        ctx.fillRect(xx, yy, 1, 1);
      }
    }
  }

  function platform(ctx, cx, cy, rx, ry, base, dark, lite) {
    ctx.fillStyle = dark;
    ellipse(ctx, cx, cy + 2, rx, ry);
    ctx.fillStyle = base;
    ellipse(ctx, cx, cy, rx, ry);
    ctx.fillStyle = lite;
    ellipse(ctx, cx - rx * 0.15, cy - 2, rx * 0.7, ry * 0.55);
  }

  function ellipse(ctx, cx, cy, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  G.BATTLE_BG = {
    meadow: function (ctx) {
      ctx.fillStyle = G.C.sky1; ctx.fillRect(0, 0, W, 56);
      ctx.fillStyle = G.C.sky0; ctx.fillRect(0, 56, W, 18);
      dither(ctx, 0, 50, W, 6, G.C.sky0);
      ctx.fillStyle = G.C.leaf3; ctx.fillRect(0, 74, W, H - 74);
      dither(ctx, 0, 74, W, 5, G.C.sky0);
      dither(ctx, 0, 96, W, 8, G.C.leaf2);
      platform(ctx, FOE.x, FOE.y + 4, 44, 11, G.C.grn1, G.C.grn0, G.C.grn2);
      platform(ctx, PLY.x, PLY.y + 2, 52, 13, G.C.grn1, G.C.grn0, G.C.grn2);
    },
    forest: function (ctx) {
      ctx.fillStyle = G.C.grn1; ctx.fillRect(0, 0, W, 64);
      dither(ctx, 0, 56, W, 8, G.C.grn0);
      ctx.fillStyle = G.C.grn2; ctx.fillRect(0, 64, W, H - 64);
      dither(ctx, 0, 64, W, 6, G.C.grn0);
      dither(ctx, 0, 100, W, 8, G.C.grn1);
      platform(ctx, FOE.x, FOE.y + 4, 44, 11, G.C.grn1, G.C.grn0, G.C.grn2);
      platform(ctx, PLY.x, PLY.y + 2, 52, 13, G.C.grn1, G.C.grn0, G.C.grn2);
    },
    cave: function (ctx) {
      ctx.fillStyle = G.C.stn0; ctx.fillRect(0, 0, W, 70);
      ctx.fillStyle = G.C.stn1; ctx.fillRect(0, 70, W, H - 70);
      dither(ctx, 0, 64, W, 8, G.C.stn0);
      dither(ctx, 0, 100, W, 10, G.C.stn0);
      platform(ctx, FOE.x, FOE.y + 4, 44, 11, G.C.stn2, G.C.stn1, G.C.stn3);
      platform(ctx, PLY.x, PLY.y + 2, 52, 13, G.C.stn2, G.C.stn1, G.C.stn3);
    },
    water: function (ctx) {
      ctx.fillStyle = G.C.sky1; ctx.fillRect(0, 0, W, 52);
      dither(ctx, 0, 46, W, 6, G.C.sky0);
      ctx.fillStyle = G.C.blu2; ctx.fillRect(0, 52, W, H - 52);
      dither(ctx, 0, 52, W, 6, G.C.sky0);
      dither(ctx, 0, 88, W, 8, G.C.blu1);
      platform(ctx, FOE.x, FOE.y + 4, 44, 11, G.C.tan0, G.C.brn3, G.C.tan1);
      platform(ctx, PLY.x, PLY.y + 2, 52, 13, G.C.tan0, G.C.brn3, G.C.tan1);
    },
    indoor: function (ctx) {
      ctx.fillStyle = G.C.pale; ctx.fillRect(0, 0, W, 64);
      dither(ctx, 0, 58, W, 6, G.C.lgry);
      ctx.fillStyle = G.C.tan1; ctx.fillRect(0, 64, W, H - 64);
      dither(ctx, 0, 96, W, 8, G.C.tan0);
      platform(ctx, FOE.x, FOE.y + 4, 44, 11, G.C.stn3, G.C.stn2, G.C.pale);
      platform(ctx, PLY.x, PLY.y + 2, 52, 13, G.C.stn3, G.C.stn2, G.C.pale);
    }
  };

  // ---------------------------------------------------------------- helpers
  function hpColor(frac) {
    return frac > 0.5 ? G.UI.hpGreen : frac > 0.2 ? G.UI.hpYellow : G.UI.hpRed;
  }

  function drawHpBar(ctx, x, y, w, frac) {
    ctx.fillStyle = G.C.dgry;
    ctx.fillRect(x - 1, y - 1, w + 2, 5);
    ctx.fillStyle = '#585868';
    ctx.fillRect(x, y, w, 3);
    var fw = Math.round(w * G.clamp(frac, 0, 1));
    if (frac > 0 && fw === 0) fw = 1;
    ctx.fillStyle = hpColor(frac);
    ctx.fillRect(x, y, fw, 3);
  }

  var STATUS_TAGS = { brn: ['BRN', '#d06028'], psn: ['PSN', '#9040a0'], par: ['PAR', '#b08818'], slp: ['SLP', '#6e6e84'] };

  function drawStatusTag(ctx, x, y, status) {
    if (!status) return;
    var tag = STATUS_TAGS[status];
    ctx.fillStyle = tag[1];
    ctx.fillRect(x, y, 22, 9);
    G.text(ctx, tag[0], x + 3, y + 1, G.C.white);
  }

  // ------------------------------------------------------------ battle scene
  // opts: { onEnd(result, battle), bg }
  G.BattleScene = function (battle, opts) {
    opts = opts || {};
    var bg = G.BATTLE_BG[opts.bg || 'meadow'] || G.BATTLE_BG.meadow;

    var sprites = {
      p: { visible: false, mon: null, offX: 0, offY: 0, flicker: 0, scale: 1, dropY: 0 },
      f: { visible: false, mon: null, offX: 0, offY: 0, flicker: 0, scale: 1, dropY: 0 }
    };
    var hpShown = { p: 1, f: 1 };       // displayed HP fraction (animates)
    var hpTarget = { p: 1, f: 1 };
    var expShown = 0, expTarget = 0;
    var orb = { visible: false, x: 0, y: 0, t: 0, mode: null }; // throw/shake/rest

    var gen = null;          // active generator being pumped
    var task = null;         // current animation task
    var genResume;           // value to feed into gen.next()
    var phase = 'pump';      // pump | menu | moves | done
    var menuSel = 0, moveSel = 0;
    var message = '', msgShown = 0, msgWait = 0;
    var endTimer = -1;
    var trainerShown = !!battle.trainer; // portrait on the foe platform pre-sendOut

    function setHpFractions() {
      var p = battle.active('p'), f = battle.active('f');
      hpShown.p = hpTarget.p = p ? p.curHp / G.monStats(p).hp : 0;
      hpShown.f = hpTarget.f = f ? f.curHp / G.monStats(f).hp : 0;
      var mon = battle.active('p');
      expShown = expTarget = expFrac(mon);
    }

    function expFrac(mon) {
      if (!mon) return 0;
      var lo = G.expForLevel(mon.level), hi = G.expForLevel(mon.level + 1);
      return G.clamp((mon.exp - lo) / (hi - lo), 0, 1);
    }

    function startGen(g) { gen = g; phase = 'pump'; }

    // ---- descriptor -> task -------------------------------------------------
    function beginStep(step) {
      switch (step.t) {
        case 'text':
          message = step.s;
          msgShown = 0;
          msgWait = 0;
          task = { kind: 'text' };
          break;
        case 'sfx':
          G.audio.sfx(step.id);
          task = null;
          break;
        case 'anim':
          if (step.kind === 'attack') {
            task = { kind: 'lunge', side: step.side, t: 0, frames: 14 };
          } else if (step.kind === 'hit') {
            sprites[step.side].flicker = 14;
            task = { kind: 'wait', t: 0, frames: 14 };
          } else if (step.kind === 'faint') {
            task = { kind: 'faint', side: step.side, t: 0, frames: 22 };
          } else if (step.kind === 'orbThrow') {
            orb.visible = true; orb.mode = 'throw'; orb.t = 0;
            task = { kind: 'orbThrow', t: 0, frames: 26 };
          } else {
            task = null;
          }
          break;
        case 'hp':
          hpTarget[step.side] = step.to / G.monStats(battle.active(step.side)).hp;
          task = { kind: 'hpDrain', side: step.side };
          break;
        case 'expbar':
          expTarget = expFrac(step.mon);
          task = { kind: 'exp', mon: step.mon };
          break;
        case 'sendOut':
          if (step.side === 'f') trainerShown = false; // portrait steps aside
          sprites[step.side].mon = step.mon;
          sprites[step.side].visible = true;
          sprites[step.side].scale = 0;
          sprites[step.side].dropY = 0;
          hpShown[step.side] = hpTarget[step.side] = step.mon.curHp / G.monStats(step.mon).hp;
          if (step.side === 'p') { expShown = expTarget = expFrac(step.mon); }
          task = { kind: 'grow', side: step.side, t: 0, frames: 14 };
          break;
        case 'recall':
          sprites[step.side].visible = false;
          task = null;
          break;
        case 'status':
          task = null;
          break;
        case 'shake':
          orb.mode = 'shake'; orb.t = 0;
          task = { kind: 'wait', t: 0, frames: 26 };
          break;
        case 'catch':
          if (step.success) {
            orb.mode = 'rest';
            G.audio.playJingle('jingle_catch');
            task = { kind: 'wait', t: 0, frames: 18 };
          } else {
            orb.visible = false;
            sprites.f.visible = true;
            sprites.f.scale = 1;
            task = { kind: 'wait', t: 0, frames: 10 };
          }
          break;
        case 'choose':
          task = { kind: 'choose' };
          openChooser(step);
          break;
        case 'end':
          task = null;
          break;
        default:
          task = null;
      }
    }

    function openChooser(step) {
      if (step.kind === 'switch') {
        var items = [], map = [];
        for (var i = 0; i < battle.party.length; i++) {
          var m = battle.party[i];
          if (m.curHp > 0 && i !== battle.activeP) {
            items.push(G.monName(m) + '  Lv' + m.level);
            map.push(i);
          }
        }
        G.pushScene(G.Chooser({
          items: items, x: 60, y: 30,
          cancelIndex: 0,
          onPick: function (i) { genResume = map[i]; task = null; }
        }));
      } else if (step.kind === 'forget') {
        var opts2 = step.mon.moves.map(function (ms) { return G.MOVES[ms.id].name; });
        opts2.push('Give up');
        G.pushScene(G.Chooser({
          items: opts2, x: 60, y: 20,
          onPick: function (i) { genResume = (i === 4 ? -1 : i); task = null; }
        }));
      } else if (step.kind === 'shift') {
        if (opts.autoPlay) { genResume = -1; task = null; return; }
        var who = (battle.trainer ? battle.trainer.name : 'The foe');
        G.pushScene(G.Textbox(who + ' is about to send out ' + G.monName(step.incoming) + '.', {
          onDone: function () {
            G.pushScene(G.Chooser({
              items: ['Switch', 'Stay in'],
              onPick: function (i) {
                if (i === 1) { genResume = -1; task = null; return; }
                var items3 = [], map3 = [];
                for (var pi = 0; pi < battle.party.length; pi++) {
                  var m3 = battle.party[pi];
                  if (m3.curHp > 0 && pi !== battle.activeP) {
                    items3.push(G.monName(m3) + ' Lv' + m3.level);
                    map3.push(pi);
                  }
                }
                G.pushScene(G.Chooser({
                  items: items3, x: 60, y: 30,
                  cancelIndex: -1,
                  onCancel: function () { genResume = -1; task = null; },
                  onPick: function (j) { genResume = map3[j]; task = null; }
                }));
              }
            }));
          }
        }));
      }
    }

    // ---- task updates -------------------------------------------------------
    function updateTask() {
      if (!task) return true;
      switch (task.kind) {
        case 'text': {
          var full = message.length;
          if (msgShown < full) {
            msgShown = Math.min(full, msgShown + 2);
            if (G.input.justPressed('A')) msgShown = full;
            return false;
          }
          msgWait++;
          if (msgWait > 34 || G.input.justPressed('A') || G.input.justPressed('B')) return true;
          return false;
        }
        case 'wait':
          task.t++;
          return task.t >= task.frames;
        case 'lunge': {
          task.t++;
          var s = sprites[task.side];
          var amp = task.t < 7 ? task.t : 14 - task.t;
          s.offX = (task.side === 'p' ? 1 : -1) * amp * 1.5;
          if (task.t >= task.frames) { s.offX = 0; return true; }
          return false;
        }
        case 'faint': {
          task.t++;
          var sf = sprites[task.side];
          sf.dropY = task.t * 2.5;
          if (task.t >= task.frames) {
            sf.visible = false;
            sf.dropY = 0;
            return true;
          }
          return false;
        }
        case 'grow': {
          task.t++;
          sprites[task.side].scale = Math.min(1, task.t / task.frames);
          return task.t >= task.frames;
        }
        case 'orbThrow':
          task.t++;
          orb.t = task.t;
          if (task.t === 18) { sprites.f.visible = false; }
          return task.t >= task.frames;
        case 'hpDrain': {
          var side = task.side;
          var d = hpTarget[side] - hpShown[side];
          if (Math.abs(d) < 0.012) { hpShown[side] = hpTarget[side]; return true; }
          hpShown[side] += (d > 0 ? 1 : -1) * 0.012;
          return false;
        }
        case 'exp': {
          var de = expTarget - expShown;
          if (expTarget < expShown) { expShown = 0; return false; } // level wrap
          if (Math.abs(de) < 0.03) { expShown = expTarget; return true; }
          expShown += 0.03;
          return false;
        }
        case 'choose':
          return false; // resolved by chooser callback (task set to null)
      }
      return true;
    }

    // ---- menus ---------------------------------------------------------------
    var MENU = ['FIGHT', 'BAG', 'PARTY', 'RUN'];

    function menuInput() {
      if (G.input.repeat('left') || G.input.repeat('right')) { menuSel ^= 1; G.audio.sfx('menuMove'); }
      if (G.input.repeat('up') || G.input.repeat('down')) { menuSel ^= 2; G.audio.sfx('menuMove'); }
      if (G.input.justPressed('A')) {
        G.audio.sfx('confirm');
        if (menuSel === 0) { phase = 'moves'; }
        else if (menuSel === 1) openBag();
        else if (menuSel === 2) openParty();
        else { startGen(battle.turn({ type: 'run' })); }
      }
    }

    function movesInput() {
      var mon = battle.active('p');
      var n = mon.moves.length;
      var prev = moveSel;
      if (G.input.repeat('left') || G.input.repeat('right')) moveSel ^= 1;
      if (G.input.repeat('up') || G.input.repeat('down')) moveSel ^= 2;
      if (moveSel >= n) moveSel = prev;
      if (moveSel !== prev) G.audio.sfx('menuMove');
      if (G.input.justPressed('B')) { G.audio.sfx('cancel'); phase = 'menu'; return; }
      if (G.input.justPressed('A')) {
        var slot = mon.moves[moveSel];
        var anyPp = mon.moves.some(function (ms) { return ms.pp > 0; });
        if (!anyPp) {
          G.audio.sfx('confirm');
          startGen(battle.turn({ type: 'move', slot: -1 }));
          return;
        }
        if (slot.pp <= 0) { G.audio.sfx('cancel'); return; }
        G.audio.sfx('confirm');
        startGen(battle.turn({ type: 'move', slot: moveSel }));
      }
    }

    function openBag() {
      var ids = [], items = [];
      for (var id in G.player.bag) {
        if (G.player.bag[id] <= 0) continue;
        var it = G.ITEMS[id];
        if (['heal', 'cure', 'revive', 'orb'].indexOf(it.kind) === -1) continue;
        ids.push(id);
        items.push(it.name + ' x' + G.player.bag[id]);
      }
      if (!ids.length) { G.pushScene(G.Textbox('The bag is empty!')); return; }
      G.pushScene(G.Chooser({
        items: items, x: 8, y: 112 - items.length * 14 - 12,
        cancelIndex: -1,
        onCancel: function () {},
        onPick: function (i) {
          var id = ids[i];
          var it = G.ITEMS[id];
          if (it.kind === 'orb') {
            if (!battle.wild) { G.pushScene(G.Textbox("You can't catch another trainer's creature!")); return; }
            if (battle.party.length >= 6) { G.pushScene(G.Textbox('Your party is full!')); return; }
            G.player.bag[id]--;
            startGen(battle.turn({ type: 'orb', id: id }));
          } else if (it.kind === 'revive') {
            var target = -1;
            for (var p = 0; p < battle.party.length; p++) if (battle.party[p].curHp <= 0) { target = p; break; }
            if (target === -1) { G.pushScene(G.Textbox('No one needs that right now.')); return; }
            G.player.bag[id]--;
            startGen(battle.turn({ type: 'item', id: id, target: target }));
          } else {
            G.player.bag[id]--;
            startGen(battle.turn({ type: 'item', id: id, target: battle.activeP }));
          }
        }
      }));
    }

    function openParty() {
      var items = [], map = [];
      for (var i = 0; i < battle.party.length; i++) {
        var m = battle.party[i];
        items.push(G.monName(m) + ' Lv' + m.level + ' ' + m.curHp + '/' + G.monStats(m).hp);
        map.push(i);
      }
      G.pushScene(G.Chooser({
        items: items, x: 30, y: 112 - items.length * 14 - 12,
        cancelIndex: -1,
        onCancel: function () {},
        onPick: function (i) {
          var idx = map[i];
          if (idx === battle.activeP) { G.pushScene(G.Textbox('It is already out!')); return; }
          if (battle.party[idx].curHp <= 0) { G.pushScene(G.Textbox('It has no energy left to battle!')); return; }
          startGen(battle.turn({ type: 'switch', index: idx }));
        }
      }));
    }

    // ---- drawing --------------------------------------------------------------
    function drawSprite(ctx, side) {
      var s = sprites[side];
      if (!s.visible || !s.mon) return;
      if (s.flicker > 0) {
        s.flicker--;
        if ((s.flicker >> 1) % 2 === 0) return;
      }
      var img = side === 'f' ? G.IMG['mon_' + s.mon.sp] : G.IMG['mon_' + s.mon.sp + '_back'];
      if (!img) return;
      var anchor = side === 'f' ? FOE : PLY;
      var w = img.width * s.scale, h = img.height * s.scale;
      var y = anchor.y - h + s.dropY;
      var x = anchor.x - w / 2 + s.offX;
      if (s.dropY > 0) { // faint: clip below platform line
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, anchor.y);
        ctx.clip();
        ctx.drawImage(img, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
        ctx.restore();
      } else {
        ctx.drawImage(img, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
      }
    }

    function drawOrb(ctx) {
      if (!orb.visible) return;
      var x = FOE.x, y = FOE.y - 8;
      if (orb.mode === 'throw') {
        var t = Math.min(1, orb.t / 18);
        x = G.lerp(PLY.x, FOE.x, t);
        y = FOE.y - 8 - Math.sin(t * Math.PI) * 46;
      } else if (orb.mode === 'shake') {
        x += Math.round(Math.sin(orb.t * 0.5) * 3);
        orb.t++;
      }
      // tiny orb: red top, white bottom
      ctx.fillStyle = G.C.ink; ctx.fillRect(x - 4, y - 4, 9, 9);
      ctx.fillStyle = G.C.red2; ctx.fillRect(x - 3, y - 3, 7, 3);
      ctx.fillStyle = G.C.white; ctx.fillRect(x - 3, y + 1, 7, 3);
      ctx.fillStyle = G.C.ink; ctx.fillRect(x - 3, y, 7, 1);
    }

    function drawPanels(ctx) {
      var f = battle.active('f'), p = battle.active('p');
      // foe panel
      if (sprites.f.visible || hpShown.f > 0) {
        G.nineSlice(ctx, G.IMG.ui_box, 4, 6, 104, 30, 4);
        G.text(ctx, G.monName(f), 12, 11, G.UI.text, G.UI.textShadow);
        G.text(ctx, 'Lv' + f.level, 78, 11, G.UI.text, G.UI.textShadow);
        drawHpBar(ctx, 26, 24, 64, hpShown.f);
        G.text(ctx, 'HP', 12, 20, '#d06028');
        drawStatusTag(ctx, 12, 27, f.status);
      }
      // player panel
      G.nineSlice(ctx, G.IMG.ui_box, 128, 78, 108, 36, 4);
      G.text(ctx, G.monName(p), 136, 83, G.UI.text, G.UI.textShadow);
      G.text(ctx, 'Lv' + p.level, 204, 83, G.UI.text, G.UI.textShadow);
      drawHpBar(ctx, 152, 96, 64, hpShown.p);
      G.text(ctx, 'HP', 138, 92, '#d06028');
      var stats = G.monStats(p);
      var shownHp = Math.round(hpShown.p * stats.hp);
      G.text(ctx, shownHp + '/' + stats.hp, 164, 100, G.UI.text, G.UI.textShadow);
      drawStatusTag(ctx, 136, 100, p.status);
      // exp bar
      ctx.fillStyle = G.C.dgry; ctx.fillRect(135, 109, 94, 3);
      ctx.fillStyle = G.UI.expBlue; ctx.fillRect(135, 109, Math.round(94 * expShown), 2);
    }

    function drawTextbox(ctx) {
      G.nineSlice(ctx, G.IMG.ui_box_dark, 0, 116, W, 44, 4);
      if (phase === 'pump' || phase === 'done') {
        var lines = G.textWrap(message.slice(0, msgShown), 216);
        for (var i = 0; i < Math.min(2, lines.length); i++) {
          G.text(ctx, lines[i], 12, 124 + i * 14, G.C.white, '#3a3a4a');
        }
      } else if (phase === 'menu') {
        G.text(ctx, 'What will', 10, 124, G.C.white, '#3a3a4a');
        G.text(ctx, G.monName(battle.active('p')) + ' do?', 10, 138, G.C.white, '#3a3a4a');
        G.nineSlice(ctx, G.IMG.ui_box, 116, 116, 124, 44, 4);
        for (var m = 0; m < 4; m++) {
          var mx = 132 + (m % 2) * 56, my = 124 + (m >> 1) * 16;
          G.text(ctx, MENU[m], mx, my, G.UI.text, G.UI.textShadow);
          if (menuSel === m) ctx.drawImage(G.IMG.ui_cursor, mx - 9, my + 1);
        }
      } else if (phase === 'moves') {
        var mon = battle.active('p');
        G.nineSlice(ctx, G.IMG.ui_box, 0, 116, 156, 44, 4);
        for (var s = 0; s < 4; s++) {
          var sx = 16 + (s % 2) * 72, sy = 124 + (s >> 1) * 16;
          var ms = mon.moves[s];
          G.text(ctx, ms ? G.MOVES[ms.id].name : '-', sx, sy, G.UI.text, G.UI.textShadow);
          if (moveSel === s) ctx.drawImage(G.IMG.ui_cursor, sx - 9, sy + 1);
        }
        G.nineSlice(ctx, G.IMG.ui_box, 156, 116, 84, 44, 4);
        var cur = mon.moves[moveSel];
        if (cur) {
          var mv = G.MOVES[cur.id];
          G.text(ctx, 'PP ' + cur.pp + '/' + cur.maxPp, 166, 124, G.UI.text, G.UI.textShadow);
          ctx.fillStyle = G.TYPE_COLORS[mv.type];
          ctx.fillRect(166, 138, 40, 11);
          G.text(ctx, mv.type.toUpperCase().slice(0, 8), 169, 140, G.C.white);
        }
      }
    }

    return {
      opaque: true,

      enter: function () {
        setHpFractions();
        sprites.p.visible = false;
        sprites.f.visible = false;
        G.audio.playMusic(opts.music || 'battle');
        startGen(battle.intro());
      },

      update: function () {
        if (phase === 'menu' && opts.autoPlay) {
          // debug: drive the player with the foe AI (visual soak test)
          var mon = battle.active('p');
          var best = -1, bestD = -1;
          for (var i = 0; i < mon.moves.length; i++) {
            if (mon.moves[i].pp <= 0) continue;
            var mv = G.MOVES[mon.moves[i].id];
            if (mv.power <= 0) continue;
            var d = battle.calcDamage('p', mv, { avg: true }).dmg * mv.acc / 100;
            if (d > bestD) { bestD = d; best = i; }
          }
          startGen(battle.turn({ type: 'move', slot: best }));
          return;
        }
        if (phase === 'menu') { menuInput(); return; }
        if (phase === 'moves') { movesInput(); return; }
        if (phase === 'done') {
          endTimer--;
          if (endTimer <= 0) {
            G.popScene();
            if (opts.onEnd) opts.onEnd(battle.result, battle);
          }
          return;
        }
        // pump phase
        var guard = 0;
        while (guard++ < 50) {
          if (task) {
            if (!updateTask()) return;
            task = null;
          }
          if (!gen) break;
          var r = gen.next(genResume);
          genResume = undefined;
          if (r.done) {
            gen = null;
            if (battle.over) {
              phase = 'done';
              endTimer = 20;
            } else {
              phase = 'menu';
              menuSel = 0;
            }
            return;
          }
          beginStep(r.value);
          if (task) return; // animate this step across frames
        }
      },

      draw: function (ctx) {
        bg(ctx);
        // opposing trainer stands on the platform until their first send-out
        if (trainerShown && battle.trainer) {
          var tImg = G.IMG[battle.trainer.sprite];
          if (tImg) ctx.drawImage(tImg, FOE.x - tImg.width / 2, FOE.y - tImg.height + 4);
        }
        // foe drawn first (behind its panel), then player
        drawSprite(ctx, 'f');
        drawSprite(ctx, 'p');
        drawOrb(ctx);
        drawPanels(ctx);
        drawTextbox(ctx);
      }
    };
  };

  // Convenience: push a battle with the swirl transition.
  // optsExtra: { bg, music, onEnd }
  G.startBattle = function (battleOpts, optsExtra) {
    optsExtra = optsExtra || {};
    var battle = new G.Battle(battleOpts);
    G.audio.playMusic(optsExtra.music || 'battle');
    G.pushScene(G.BattleSwirlScene(function () {
      G.pushScene(G.BattleScene(battle, optsExtra));
    }));
    return battle;
  };

  // Trainer battle wrapper: resolves the party, pays out, sets dex/flags.
  G.startTrainerBattle = function (trainerId, opts) {
    opts = opts || {};
    var def = G.TRAINERS[trainerId];
    var foes = G.trainerParty(def);
    for (var i = 0; i < foes.length; i++) G.player.dexSeen[foes[i].sp] = 1;
    return G.startBattle(
      { party: G.player.party, foes: foes, trainer: def },
      {
        bg: opts.bg || (G.world.map && G.world.map.battleBg) || 'meadow',
        music: def.music || 'battle',
        onEnd: function (result, battle) {
          if (result === 'win') {
            G.player.money += def.money || 0;
            G.flags[trainerId] = 1;
            if (def.reward) {
              G.player.badges[def.reward.badge] = true;
              G.flags[def.reward.flag] = 1;
              G.audio.playJingle('jingle_badge');
              G.pushScene(G.Textbox(def.reward.text));
            }
          }
          G.afterBattle(result, battle);
          if (opts.onEnd) opts.onEnd(result, battle);
        }
      }
    );
  };

  // ------------------------------------------------------------ evolution --
  // Post-battle evolution ceremony. B cancels the current evolution.
  G.EvolutionScene = function (pendings) {
    var idx = 0;
    var phase = 'announce'; // announce | flash | done-text
    var t = 0;
    var FLASH_FRAMES = 200;
    var cancelled = false;

    function cur() { return pendings[idx]; }

    function announce() {
      phase = 'announce';
      G.pushScene(G.Textbox('What? ' + G.monName(cur().mon) + ' is evolving!', {
        onDone: function () { phase = 'flash'; t = 0; cancelled = false; }
      }));
    }

    return {
      opaque: true,
      enter: function () {
        G.audio.playMusic('evolve');
        announce();
      },
      update: function () {
        if (phase !== 'flash') return;
        t++;
        if (G.input.justPressed('B')) cancelled = true;
        if (cancelled || t >= FLASH_FRAMES) {
          phase = 'done-text';
          var mon = cur().mon;
          var msg;
          if (cancelled) {
            msg = 'Huh? ' + G.monName(mon) + ' stopped evolving!';
          } else {
            var oldName = G.monName(mon);
            G.evolveMon(mon);
            G.audio.sfx('levelUp');
            msg = 'Congratulations! Your ' + oldName + ' evolved into ' + G.SPECIES[mon.sp].name + '!';
          }
          G.pushScene(G.Textbox(msg, {
            onDone: function () {
              idx++;
              if (idx < pendings.length) announce();
              else {
                G.popScene();
                if (G.world.map && G.world.map.music) G.audio.playMusic(G.world.map.music);
              }
            }
          }));
        }
      },
      draw: function (ctx) {
        ctx.fillStyle = '#181a24';
        ctx.fillRect(0, 0, 240, 160);
        ctx.fillStyle = '#262a3a';
        for (var i = 0; i < 8; i++) {
          var a = (G.frame / 40 + i / 8) * Math.PI * 2;
          ctx.fillRect(120 + Math.cos(a) * 70 - 2, 76 + Math.sin(a) * 44 - 2, 4, 4);
        }
        var p = cur();
        if (!p) return;
        // accelerating flash between current and evolved form
        var showNew = false;
        if (phase === 'flash') {
          var period = Math.max(4, 24 - Math.floor(t / 18) * 4);
          showNew = (Math.floor(t / period) % 2) === 1;
        } else if (phase === 'done-text' && !cancelled) {
          showNew = true;
        }
        var key = showNew ? p.to : p.mon.sp;
        // after evolveMon, mon.sp already is the target
        if (phase === 'done-text' && !cancelled) key = p.mon.sp;
        var img = G.IMG['mon_' + key];
        if (img) {
          ctx.drawImage(img, 120 - img.width / 2, 90 - img.height);
        }
      }
    };
  };
})();

