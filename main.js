// Pokéram — main.js
// Boot + the game loop: rAF with a fixed-timestep accumulator. Logic runs at
// exactly 60 steps/sec; rendering happens once per animation frame.

(function () {
  var STEP_MS = 1000 / 60;

  G.frame = 0; // global frame counter (drives tile animation, cursors, etc.)

  function boot() {
    G.gfx.init();
    G.input.init();
    G.gfx.decodeAll();
    if (G.audio.init) G.audio.init();

    // tiny mute button, top-right (synced with the M key)
    var muteBtn = document.getElementById('mutebtn');
    function syncMuteBtn() {
      if (muteBtn) muteBtn.innerHTML = G.audio.muted ? '&#128263;' : '&#128266;';
    }
    G.syncMuteBtn = syncMuteBtn;
    if (muteBtn) {
      muteBtn.addEventListener('click', function () {
        G.audio.unlock();
        G.audio.toggleMute();
        syncMuteBtn();
        muteBtn.blur(); // give the keyboard back to the game
      });
    }

    if (location.hash === '#debug' && G.debug && G.debug.init) G.debug.init();

    var hashIs = function (tag) { return location.hash.indexOf('#' + tag) === 0; };
    var mapMatch = location.hash.match(/#map=(\w+),(\d+),(\d+)/);
    if (mapMatch) {
      G.player.party = [G.makeMon('sproutle', 20)];
      G.flags.starter = 'sproutle';
      G.world.loadMap(mapMatch[1], parseInt(mapMatch[2], 10), parseInt(mapMatch[3], 10), 'down');
      G.pushScene(G.overworldScene);
    } else if (hashIs('gallery') && G.debug && G.debug.GalleryScene) {
      G.pushScene(G.debug.GalleryScene());
    } else if (hashIs('sheet') && G.debug && G.debug.SheetScene) {
      G.pushScene(G.debug.SheetScene());
    } else if (hashIs('battle') || hashIs('wild')) {
      // battle-UI test harness
      G.player.party = [G.makeMon('sproutle', 10), G.makeMon('pebblamb', 8)];
      G.world.loadMap('route1', 8, 14, 'down');
      G.pushScene(G.overworldScene);
      var auto = location.hash.indexOf('auto') !== -1;
      if (hashIs('battle')) {
        var t = G.TRAINERS.rival1;
        G.pushScene(G.BattleScene(new G.Battle({ party: G.player.party, foes: G.trainerParty(t), trainer: t }), { bg: 'meadow', autoPlay: auto }));
      } else {
        G.pushScene(G.BattleScene(new G.Battle({ party: G.player.party, foes: [G.makeMon('emberynx', 7)], wild: true }), { bg: 'meadow', autoPlay: auto }));
      }
    } else if (G.TitleScene) {
      G.pushScene(G.TitleScene());
    } else if (G.MAPS && G.MAPS.hearthvale) {
      G.world.loadMap('route1', 8, 14, 'down');
      G.pushScene(G.overworldScene);
    } else {
      G.pushScene(testCard());
    }

    // test-harness fast-forward: #wild&ff=300 steps the game synchronously
    var ffMatch = location.hash.match(/ff=(\d+)/);
    if (ffMatch) {
      var n = Math.min(3000, parseInt(ffMatch[1], 10));
      for (var i = 0; i < n; i++) {
        G.input.step();
        G.updateScenes();
        G.frame++;
      }
    }

    var last = performance.now();
    var acc = 0;
    function frame(now) {
      var dt = Math.min(100, now - last); // clamp: survive tab switches
      last = now;
      acc += dt;
      while (acc >= STEP_MS) {
        G.input.step();
        if (G.input.justPressed('mute')) {
          G.audio.toggleMute();
          if (G.syncMuteBtn) G.syncMuteBtn();
        }
        G.updateScenes();
        G.frame++;
        acc -= STEP_MS;
      }
      G.ctx.fillStyle = '#08080c';
      G.ctx.fillRect(0, 0, G.SCREEN_W, G.SCREEN_H);
      G.drawScenes(G.ctx);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Phase-1 smoke test scene: moving square + font sample. Replaced by the
  // title screen once G.TitleScene exists.
  function testCard() {
    var x = 112, y = 72;
    return {
      opaque: true,
      update: function () {
        var d = G.input.heldDir();
        if (d) { x += G.DIRS[d].dx * 2; y += G.DIRS[d].dy * 2; }
        x = G.clamp(x, 0, G.SCREEN_W - 16);
        y = G.clamp(y, 0, G.SCREEN_H - 16);
      },
      draw: function (ctx) {
        ctx.fillStyle = G.C.leaf1;
        ctx.fillRect(0, 0, G.SCREEN_W, G.SCREEN_H);
        ctx.fillStyle = G.C.red2;
        ctx.fillRect(x, y, 16, 16);
        G.text(ctx, 'POKÉRAM shell OK — arrows move, Z/X/Enter', 8, 8, G.UI.text, G.UI.textShadow);
        G.text(ctx, 'abcdefghijklmnopqrstuvwxyz 0123456789', 8, 22, G.C.white, '#3a5a3a');
        G.text(ctx, 'Wild SPROUTLE appeared! ★★★ ▼', 8, 36, G.C.white, '#3a5a3a');
      }
    };
  }

  window.addEventListener('load', boot);
})();

