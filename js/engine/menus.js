// Pokéram — menus.js
// Start menu + party / summary / bag / dex / save screens.

(function () {
  var W = 240, H = 160;

  function panel(ctx, x, y, w, h) { G.nineSlice(ctx, G.IMG.ui_box, x, y, w, h, 4); }

  function hpBar(ctx, x, y, w, frac) {
    ctx.fillStyle = G.C.dgry; ctx.fillRect(x - 1, y - 1, w + 2, 5);
    ctx.fillStyle = '#585868'; ctx.fillRect(x, y, w, 3);
    var fw = Math.round(w * G.clamp(frac, 0, 1));
    if (frac > 0 && fw === 0) fw = 1;
    ctx.fillStyle = frac > 0.5 ? G.UI.hpGreen : frac > 0.2 ? G.UI.hpYellow : G.UI.hpRed;
    ctx.fillRect(x, y, fw, 3);
  }

  // ------------------------------------------------------------ start menu --
  G.StartMenu = function () {
    var items = ['DEX', 'PARTY', 'BAG', 'SAVE', 'EXIT'];
    return {
      opaque: false,
      sel: 0,
      update: function () {
        if (G.input.repeat('up')) { this.sel = (this.sel + items.length - 1) % items.length; G.audio.sfx('menuMove'); }
        if (G.input.repeat('down')) { this.sel = (this.sel + 1) % items.length; G.audio.sfx('menuMove'); }
        if (G.input.justPressed('B') || G.input.justPressed('start')) { G.audio.sfx('cancel'); G.popScene(); return; }
        if (G.input.justPressed('A')) {
          G.audio.sfx('confirm');
          var pick = items[this.sel];
          if (pick === 'EXIT') { G.popScene(); return; }
          if (pick === 'DEX') G.pushScene(G.DexScene());
          if (pick === 'PARTY') G.pushScene(G.PartyScene());
          if (pick === 'BAG') G.pushScene(G.BagScene());
          if (pick === 'SAVE') {
            G.ask('Save your progress?', function () {
              var ok = G.saveGame();
              G.pushScene(G.Textbox(ok ? 'Progress saved!' : 'Save failed...'));
              if (ok) G.audio.sfx('heal');
            });
          }
        }
      },
      draw: function (ctx) {
        var x = W - 70, y = 6;
        panel(ctx, x, y, 64, items.length * 15 + 12);
        for (var i = 0; i < items.length; i++) {
          G.text(ctx, items[i], x + 20, y + 8 + i * 15, G.UI.text, G.UI.textShadow);
          if (i === this.sel) ctx.drawImage(G.IMG.ui_cursor, x + 9, y + 9 + i * 15);
        }
        // money chip
        panel(ctx, 4, 6, 80, 22);
        G.text(ctx, '$' + G.player.money, 12, 13, G.UI.text, G.UI.textShadow);
      }
    };
  };

  // ------------------------------------------------------------ party screen --
  // opts: { pickMode, onPick(index) } — pickMode = choosing an item target
  G.PartyScene = function (opts) {
    opts = opts || {};
    return {
      opaque: true,
      sel: 0,
      update: function () {
        var n = G.player.party.length;
        if (!n) { G.popScene(); return; }
        if (G.input.repeat('up')) { this.sel = (this.sel + n - 1) % n; G.audio.sfx('menuMove'); }
        if (G.input.repeat('down')) { this.sel = (this.sel + 1) % n; G.audio.sfx('menuMove'); }
        if (G.input.justPressed('B')) { G.audio.sfx('cancel'); G.popScene(); if (opts.onPick) opts.onPick(-1); return; }
        if (G.input.justPressed('A')) {
          G.audio.sfx('confirm');
          var idx = this.sel;
          if (opts.pickMode) {
            G.popScene();
            if (opts.onPick) opts.onPick(idx);
            return;
          }
          var self = this;
          G.pushScene(G.Chooser({
            items: ['Summary', 'Move up', 'Back'],
            onPick: function (i) {
              if (i === 0) G.pushScene(G.SummaryScene(G.player.party[idx]));
              if (i === 1 && idx > 0) {
                var p = G.player.party;
                var tmp = p[idx - 1]; p[idx - 1] = p[idx]; p[idx] = tmp;
                self.sel = idx - 1;
              }
            }
          }));
        }
      },
      draw: function (ctx) {
        ctx.fillStyle = '#2a3040';
        ctx.fillRect(0, 0, W, H);
        G.text(ctx, opts.pickMode ? 'Use on which creature?' : 'PARTY', 10, 6, G.C.white, '#1a1c2c');
        var party = G.player.party;
        for (var i = 0; i < party.length; i++) {
          var mon = party[i];
          var y = 20 + i * 22;
          panel(ctx, 8, y, 136, 22);
          G.text(ctx, G.monName(mon), 16, y + 7, G.UI.text, G.UI.textShadow);
          G.text(ctx, 'Lv' + mon.level, 78, y + 7, G.UI.text, G.UI.textShadow);
          var stats = G.monStats(mon);
          hpBar(ctx, 104, y + 10, 32, mon.curHp / stats.hp);
          if (mon.curHp <= 0) G.text(ctx, 'FNT', 104, y + 1, G.UI.hpRed);
          else if (mon.status) G.text(ctx, mon.status.toUpperCase(), 104, y + 1, '#9040a0');
          if (i === this.sel) ctx.drawImage(G.IMG.ui_cursor, 2, y + 8);
        }
        // selected mon portrait
        var cur = party[this.sel];
        if (cur) {
          panel(ctx, 152, 20, 84, 92);
          var img = G.IMG['mon_' + cur.sp];
          if (img) ctx.drawImage(img, 194 - img.width / 2, 96 - img.height);
          var sp = G.SPECIES[cur.sp];
          for (var t = 0; t < sp.types.length; t++) {
            ctx.fillStyle = G.TYPE_COLORS[sp.types[t]];
            ctx.fillRect(158 + t * 40, 98, 36, 10);
            G.text(ctx, sp.types[t].toUpperCase().slice(0, 8), 160 + t * 40, 100, G.C.white);
          }
          var stats2 = G.monStats(cur);
          G.text(ctx, cur.curHp + '/' + stats2.hp + ' HP', 158, 26, G.UI.text, G.UI.textShadow);
        }
        G.text(ctx, 'Z: select   X: back', 10, H - 12, G.C.lgry);
      }
    };
  };

  // ----------------------------------------------------------- summary screen --
  G.SummaryScene = function (mon) {
    return {
      opaque: true,
      update: function () {
        if (G.input.justPressed('B') || G.input.justPressed('A')) { G.audio.sfx('cancel'); G.popScene(); }
      },
      draw: function (ctx) {
        ctx.fillStyle = '#2a3040';
        ctx.fillRect(0, 0, W, H);
        var sp = G.SPECIES[mon.sp];
        // left: sprite + identity
        panel(ctx, 6, 6, 96, 104);
        var img = G.IMG['mon_' + mon.sp];
        if (img) ctx.drawImage(img, 54 - img.width / 2, 72 - img.height);
        G.text(ctx, G.monName(mon), 14, 12, G.UI.text, G.UI.textShadow);
        G.text(ctx, 'Lv' + mon.level, 74, 12, G.UI.text, G.UI.textShadow);
        for (var t = 0; t < sp.types.length; t++) {
          ctx.fillStyle = G.TYPE_COLORS[sp.types[t]];
          ctx.fillRect(14 + t * 42, 78, 38, 10);
          G.text(ctx, sp.types[t].toUpperCase().slice(0, 8), 16 + t * 42, 80, G.C.white);
        }
        G.text(ctx, 'No.' + (sp.id < 10 ? '00' : sp.id < 100 ? '0' : '') + sp.id, 14, 94, G.UI.text, G.UI.textShadow);
        // right: stats
        panel(ctx, 108, 6, 126, 70);
        var stats = G.monStats(mon);
        var rows = [['HP', mon.curHp + '/' + stats.hp], ['Attack', stats.atk], ['Defense', stats.def], ['Sp. Atk', stats.spa], ['Sp. Def', stats.spd], ['Speed', stats.spe]];
        for (var i = 0; i < rows.length; i++) {
          G.text(ctx, rows[i][0], 116, 12 + i * 10, G.UI.text, G.UI.textShadow);
          G.text(ctx, String(rows[i][1]), 196, 12 + i * 10, G.UI.text, G.UI.textShadow);
        }
        // moves
        panel(ctx, 108, 80, 126, 56);
        for (var m = 0; m < mon.moves.length; m++) {
          var ms = mon.moves[m];
          var mv = G.MOVES[ms.id];
          G.text(ctx, mv.name, 116, 86 + m * 12, G.UI.text, G.UI.textShadow);
          G.text(ctx, ms.pp + '/' + ms.maxPp, 204, 86 + m * 12, G.UI.text, G.UI.textShadow);
        }
        // dex line
        var lines = G.textWrap(sp.dex, 220);
        for (var d = 0; d < Math.min(2, lines.length); d++) {
          G.text(ctx, lines[d], 10, 116 + d * 11, G.C.white, '#1a1c2c');
        }
        G.text(ctx, 'Z/X: back', 10, H - 12, G.C.lgry);
      }
    };
  };

  // -------------------------------------------------------------- bag screen --
  G.BagScene = function () {
    function usable() {
      var list = [];
      for (var id in G.player.bag) {
        if (G.player.bag[id] > 0) list.push(id);
      }
      return list;
    }
    return {
      opaque: true,
      sel: 0,
      update: function () {
        var ids = usable();
        if (!ids.length) { G.popScene(); G.pushScene(G.Textbox('The bag is empty!')); return; }
        var n = ids.length;
        this.sel = G.clamp(this.sel, 0, n - 1);
        if (G.input.repeat('up')) { this.sel = (this.sel + n - 1) % n; G.audio.sfx('menuMove'); }
        if (G.input.repeat('down')) { this.sel = (this.sel + 1) % n; G.audio.sfx('menuMove'); }
        if (G.input.justPressed('B')) { G.audio.sfx('cancel'); G.popScene(); return; }
        if (G.input.justPressed('A')) {
          G.audio.sfx('confirm');
          var id = ids[this.sel];
          var item = G.ITEMS[id];
          if (item.kind === 'orb') {
            G.pushScene(G.Textbox('Better saved for a wild battle!'));
          } else if (item.kind === 'repel') {
            G.player.bag[id]--;
            G.player.repelSteps = item.steps;
            G.audio.sfx('heal');
            G.pushScene(G.Textbox('You spritzed the Repel Mist. Weak wild creatures will keep away!'));
          } else {
            G.pushScene(G.PartyScene({
              pickMode: true,
              onPick: function (idx) {
                if (idx < 0) return;
                var mon = G.player.party[idx];
                var stats = G.monStats(mon);
                var msg = 'It had no effect...';
                if (item.kind === 'heal' && mon.curHp > 0 && mon.curHp < stats.hp) {
                  var from = mon.curHp;
                  mon.curHp = Math.min(stats.hp, mon.curHp + item.amount);
                  msg = G.monName(mon) + ' recovered ' + (mon.curHp - from) + ' HP!';
                  G.player.bag[id]--;
                  G.audio.sfx('heal');
                } else if (item.kind === 'cure' && mon.status && item.statuses.indexOf(mon.status) !== -1) {
                  mon.status = null; mon.slpTurns = 0;
                  msg = G.monName(mon) + ' is back to normal!';
                  G.player.bag[id]--;
                  G.audio.sfx('heal');
                } else if (item.kind === 'revive' && mon.curHp <= 0) {
                  mon.curHp = Math.max(1, Math.floor(stats.hp * item.frac));
                  msg = G.monName(mon) + ' came back to its senses!';
                  G.player.bag[id]--;
                  G.audio.sfx('heal');
                }
                G.pushScene(G.Textbox(msg));
              }
            }));
          }
        }
      },
      draw: function (ctx) {
        ctx.fillStyle = '#2a3040';
        ctx.fillRect(0, 0, W, H);
        G.text(ctx, 'BAG', 10, 6, G.C.white, '#1a1c2c');
        var ids = usable();
        var top = Math.max(0, Math.min(this.sel - 3, ids.length - 7));
        for (var i = top; i < Math.min(ids.length, top + 7); i++) {
          var y = 20 + (i - top) * 16;
          var item = G.ITEMS[ids[i]];
          panel(ctx, 8, y, 130, 17);
          G.text(ctx, item.name, 16, y + 5, G.UI.text, G.UI.textShadow);
          G.text(ctx, 'x' + G.player.bag[ids[i]], 112, y + 5, G.UI.text, G.UI.textShadow);
          if (i === this.sel) ctx.drawImage(G.IMG.ui_cursor, 2, y + 6);
        }
        var cur = G.ITEMS[ids[this.sel]];
        if (cur) {
          panel(ctx, 144, 20, 92, 60);
          var lines = G.textWrap(cur.desc, 76);
          for (var d = 0; d < Math.min(4, lines.length); d++) {
            G.text(ctx, lines[d], 151, 27 + d * 11, G.UI.text, G.UI.textShadow);
          }
        }
        G.text(ctx, '$' + G.player.money, 150, 90, G.C.white, '#1a1c2c');
        G.text(ctx, 'Z: use   X: back', 10, H - 12, G.C.lgry);
      }
    };
  };

  // -------------------------------------------------------------- dex screen --
  G.DexScene = function () {
    var RARITY_STARS = { common: '★', uncommon: '★★', rare: '★★★', elusive: '★★★★', legendary: '★★★★★' };
    return {
      opaque: true,
      sel: 0,
      update: function () {
        var n = G.DEX_ORDER.length;
        if (G.input.repeat('up')) { this.sel = (this.sel + n - 1) % n; G.audio.sfx('menuMove'); }
        if (G.input.repeat('down')) { this.sel = (this.sel + 1) % n; G.audio.sfx('menuMove'); }
        if (G.input.repeat('left')) { this.sel = Math.max(0, this.sel - 10); G.audio.sfx('menuMove'); }
        if (G.input.repeat('right')) { this.sel = Math.min(n - 1, this.sel + 10); G.audio.sfx('menuMove'); }
        if (G.input.justPressed('B')) { G.audio.sfx('cancel'); G.popScene(); }
      },
      draw: function (ctx) {
        ctx.fillStyle = '#222838';
        ctx.fillRect(0, 0, W, H);
        var seen = 0, caught = 0;
        for (var k in G.player.dexSeen) seen++;
        for (var c in G.player.dexCaught) caught++;
        G.text(ctx, 'CREATURE DEX', 10, 5, G.C.white, '#1a1c2c');
        G.text(ctx, 'Seen ' + seen + '  Caught ' + caught, 130, 5, G.C.white, '#1a1c2c');

        var top = G.clamp(this.sel - 4, 0, Math.max(0, G.DEX_ORDER.length - 9));
        for (var i = top; i < Math.min(G.DEX_ORDER.length, top + 9); i++) {
          var key = G.DEX_ORDER[i];
          var sp = G.SPECIES[key];
          var y = 18 + (i - top) * 14;
          var isSeen = G.player.dexSeen[key], isCaught = G.player.dexCaught[key];
          var label = 'No.' + (sp.id < 10 ? '00' : sp.id < 100 ? '0' : '') + sp.id + '  ' + (isSeen ? sp.name : '-----');
          G.text(ctx, label, 12, y, i === this.sel ? G.C.white : G.C.lgry, '#1a1c2c');
          if (isCaught) G.text(ctx, '★', 2, y, G.UI.hpGreen);
          if (i === this.sel) ctx.drawImage(G.IMG.ui_cursor, 110, y + 1);
        }
        // detail panel
        var curKey = G.DEX_ORDER[this.sel];
        var curSp = G.SPECIES[curKey];
        panel(ctx, 124, 16, 112, 120);
        if (G.player.dexCaught[curKey]) {
          var img = G.IMG['mon_' + curKey];
          if (img) ctx.drawImage(img, 180 - img.width / 2, 76 - img.height);
          G.text(ctx, curSp.name, 132, 22, G.UI.text, G.UI.textShadow);
          G.text(ctx, RARITY_STARS[curSp.rarity] || '', 132, 80, '#b08818');
          var lines = G.textWrap(curSp.dex, 96);
          for (var d = 0; d < Math.min(4, lines.length); d++) {
            G.text(ctx, lines[d], 132, 92 + d * 10, G.UI.text, G.UI.textShadow);
          }
        } else if (G.player.dexSeen[curKey]) {
          G.text(ctx, curSp.name, 132, 22, G.UI.text, G.UI.textShadow);
          G.text(ctx, '? ? ?', 168, 60, G.UI.text, G.UI.textShadow);
          G.text(ctx, 'Catch one to record', 132, 92, G.UI.text, G.UI.textShadow);
          G.text(ctx, 'its dex entry.', 132, 102, G.UI.text, G.UI.textShadow);
        } else {
          G.text(ctx, 'Unknown', 132, 22, G.UI.text, G.UI.textShadow);
        }
        G.text(ctx, 'X: back', 10, H - 12, G.C.lgry);
      }
    };
  };
})();
