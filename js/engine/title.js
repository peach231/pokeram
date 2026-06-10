// Pokéram — title.js
// Title screen: chunky pixel logo, the Starwyrm overhead, New Game / Continue.

(function () {
  var W = 240, H = 160;

  function makeLogo() {
    // render at 1x, blit at 3x for a chunky pixel logo
    var txt = 'POKÉRAM';
    var w = G.textWidth(txt);
    var c = G.gfx.makeCanvas(w + 2, 12);
    var ctx = c.getContext('2d');
    G.text(ctx, txt, 1, 1, '#f8e878');
    G.text(ctx, txt, 0, 0, '#f4f4f4');
    return c;
  }

  G.TitleScene = function () {
    var logo = null;
    var phase = 'press'; // press | menu
    var sel = 0;
    return {
      opaque: true,
      enter: function () {
        logo = makeLogo();
        G.audio.playMusic('title');
      },
      update: function () {
        if (phase === 'press') {
          if (G.input.justPressed('start') || G.input.justPressed('A')) {
            G.audio.sfx('confirm');
            phase = 'menu';
            sel = G.hasSave() ? 0 : 1;
          }
          return;
        }
        var items = this._items();
        if (G.input.repeat('up')) { sel = (sel + items.length - 1) % items.length; G.audio.sfx('menuMove'); }
        if (G.input.repeat('down')) { sel = (sel + 1) % items.length; G.audio.sfx('menuMove'); }
        if (G.input.justPressed('B')) { phase = 'press'; G.audio.sfx('cancel'); return; }
        if (G.input.justPressed('A') || G.input.justPressed('start')) {
          G.audio.sfx('confirm');
          var pick = items[sel];
          if (pick === 'CONTINUE') {
            if (G.loadGame()) {
              G.replaceScene(G.overworldScene);
            } else {
              G.pushScene(G.Textbox('The save data could not be read...'));
            }
          } else if (pick === 'NEW GAME') {
            G.newGame();
            G.world.loadMap('playerhome', 4, 4, 'down');
            G.replaceScene(G.overworldScene);
            G.pushScene(G.Textbox([
              'A bright Solyn morning. Prof. Maple is expecting you at her lab in Hearthvale!',
              '(Arrows to move, Z to talk and confirm, X to cancel, Enter for the menu. M mutes.)'
            ]));
          }
        }
      },
      _items: function () {
        return G.hasSave() ? ['CONTINUE', 'NEW GAME'] : ['NEW GAME'];
      },
      draw: function (ctx) {
        // night-sky gradient bands
        ctx.fillStyle = '#1a1c2c'; ctx.fillRect(0, 0, W, 60);
        ctx.fillStyle = '#2a1a40'; ctx.fillRect(0, 60, W, 40);
        ctx.fillStyle = '#4a2a6a'; ctx.fillRect(0, 100, W, 24);
        ctx.fillStyle = '#1f6e44'; ctx.fillRect(0, 124, W, H - 124);
        // stars
        for (var i = 0; i < 24; i++) {
          var sx = (i * 53 + 17) % W, sy = (i * 37 + 11) % 95;
          ctx.fillStyle = (i + (G.frame >> 5)) % 5 === 0 ? '#f8e878' : '#8a8aa4';
          ctx.fillRect(sx, sy, 1, 1);
        }
        // the Starwyrm coils across the sky
        var drax = G.IMG.mon_astradrax;
        if (drax) ctx.drawImage(drax, 158, 14);
        // starters on the ridge (native resolution, crisp)
        var starters = ['mon_sproutle', 'mon_aquilet', 'mon_emberynx', 'mon_pebblamb'];
        for (var s = 0; s < starters.length; s++) {
          var img = G.IMG[starters[s]];
          if (img) ctx.drawImage(img, 14 + s * 56, 126 - img.height);
        }
        // logo at 3x
        if (logo) {
          ctx.imageSmoothingEnabled = false;
          var lw = logo.width * 3, lh = logo.height * 3;
          ctx.drawImage(logo, (W - lw) / 2, 30, lw, lh);
        }
        G.text(ctx, 'A Solyn region adventure', 70, 68, '#c2c2d6', '#1a1c2c');

        if (phase === 'press') {
          if ((G.frame >> 5) % 2 === 0) {
            G.text(ctx, 'PRESS ENTER', 88, 138, G.C.white, '#1a1c2c');
          }
        } else {
          var items = this._items();
          G.nineSlice(ctx, G.IMG.ui_box, 76, 128, 88, items.length * 15 + 10, 4);
          for (var m = 0; m < items.length; m++) {
            G.text(ctx, items[m], 96, 134 + m * 15, G.UI.text, G.UI.textShadow);
            if (m === sel) ctx.drawImage(G.IMG.ui_cursor, 85, 135 + m * 15);
          }
        }
      }
    };
  };
})();
