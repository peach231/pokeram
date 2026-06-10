// Pokéram — sprites_chars.js
// Overworld character sprites: 16x24, drawn with an 8px overhang above their
// tile (heads overlap the tile above). Naming: ch_<who>_<d|u|s><frame>.
// Side frames face LEFT; the decoder's mirror flag provides right-facing.
// Frame scheme: 0 = standing, 1 = stride (its mirror = the opposite stride).

(function () {
  var C = G.C;

  function S(name, pal, rows, mirror) {
    G.ART[name] = { w: 16, h: 24, pal: pal, px: rows, mirror: !!mirror };
  }

  // ------------------------------------------------------------- player ----
  // Messy brown hair, blue jacket with white zip, slate pants, red sneakers.
  var PC = {
    o: C.ink, h: C.brn1, i: C.brn2, s: C.skn2, t: C.skn1,
    j: C.blu2, k: C.blu1, w: C.white, p: C.stn1, e: C.red2
  };

  S('ch_player_d0', PC, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohshhhhhhsho..',
    '..ohssssssssho..',
    '..osssssssssso..',
    '..ossossssosso..',
    '..osssssssssso..',
    '...osssssssso...',
    '....oossssoo....',
    '...ojjjssjjjo...',
    '..ojjjjjjjjjjo..',
    '..ojjjjwwjjjjo..',
    '..okjjjwwjjjko..',
    '..osjjjwwjjjso..',
    '..ookjjjjjjkoo..',
    '....oppppppo....',
    '....oppooppo....',
    '....oeeooeeo....',
    '....ooo..ooo....'
  ]);

  S('ch_player_d1', PC, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohshhhhhhsho..',
    '..ohssssssssho..',
    '..osssssssssso..',
    '..ossossssosso..',
    '..osssssssssso..',
    '...osssssssso...',
    '....oossssoo....',
    '...ojjjssjjjo...',
    '..ojjjjjjjjjjo..',
    '..ojjjjwwjjjjo..',
    '..okjjjwwjjjko..',
    '..osjjjwwjjjso..',
    '..ookjjjjjjkoo..',
    '....oppppppo....',
    '....oeeooppo....',
    '....ooo.oeeo....',
    '........ooo.....'
  ], true);

  S('ch_player_u0', PC, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '...ohhhhhhhho...',
    '....oossssoo....',
    '...ojjjjjjjjo...',
    '..ojjjjjjjjjjo..',
    '..ojjjjjjjjjjo..',
    '..okjjjjjjjjko..',
    '..osjjjjjjjjso..',
    '..ookjjjjjjkoo..',
    '....oppppppo....',
    '....oppooppo....',
    '....oeeooeeo....',
    '....ooo..ooo....'
  ]);

  S('ch_player_u1', PC, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '...ohhhhhhhho...',
    '....oossssoo....',
    '...ojjjjjjjjo...',
    '..ojjjjjjjjjjo..',
    '..ojjjjjjjjjjo..',
    '..okjjjjjjjjko..',
    '..osjjjjjjjjso..',
    '..ookjjjjjjkoo..',
    '....oppppppo....',
    '....oeeooppo....',
    '....ooo.oeeo....',
    '........ooo.....'
  ], true);

  S('ch_player_s0', PC, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohhihhhhhhho..',
    '..ohhhhhhhhhho..',
    '..oshhhhhhhhho..',
    '..ossshhhhhhho..',
    '..osssshhhhhho..',
    '..ososssshhhho..',
    '..ossssshhhhho..',
    '...osssshhhho...',
    '....oossssoo....',
    '...ojjjjjjjjo...',
    '..ojjjjjjjjjjo..',
    '..ojjjjjjjjkko..',
    '..ojjjjjjjjkko..',
    '..osjjjjjjjkko..',
    '..ookjjjjjjkoo..',
    '.....opppppo....',
    '.....opppppo....',
    '.....oeeeeeo....',
    '.....oooooo.....'
  ], true);

  S('ch_player_s1', PC, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohhihhhhhhho..',
    '..ohhhhhhhhhho..',
    '..oshhhhhhhhho..',
    '..ossshhhhhhho..',
    '..osssshhhhhho..',
    '..ososssshhhho..',
    '..ossssshhhhho..',
    '...osssshhhho...',
    '....oossssoo....',
    '...ojjjjjjjjo...',
    '..ojjjjjjjjjjo..',
    '..ojjjjjjjjkko..',
    '..ojjjjjjjjkko..',
    '..osjjjjjjjkko..',
    '..ookjjjjjjkoo..',
    '....oppppppo....',
    '....oppooppo....',
    '...oeeo..oeeo...',
    '...ooo....ooo...'
  ], true);

  // ------------------------------------------------------ professor maple --
  // Swept gray hair, round glasses, white lab coat over dark slacks.
  var PR = {
    o: C.ink, h: C.gry, i: C.lgry, s: C.skn2, t: C.skn1,
    w: C.white, l: C.lgry, p: C.stn0, e: C.brn1
  };
  S('ch_prof_d0', PR, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohihhhhhhiho..',
    '..ohhhhhhhhhho..',
    '..ohshhhhhhsho..',
    '..ohssssssssho..',
    '..osssssssssso..',
    '..osoosssoosso..',
    '..osssssssssso..',
    '...osssssssso...',
    '....oossssoo....',
    '...owwwsswwwo...',
    '..owwwwwwwwwwo..',
    '..owwwwllwwwwo..',
    '..owwwwllwwwwo..',
    '..oswwwllwwwso..',
    '..oowwwwwwwwoo..',
    '..owwwwwwwwwwo..',
    '...oppoooppo....',
    '....oeeooeeo....',
    '....ooo..ooo....'
  ]);
  S('ch_prof_u0', PR, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohihhhhhhiho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '...ohhhhhhhho...',
    '....oossssoo....',
    '...owwwwwwwwo...',
    '..owwwwwwwwwwo..',
    '..owwwwwwwwwwo..',
    '..owwwwwwwwwwo..',
    '..oswwwwwwwwso..',
    '..oowwwwwwwwoo..',
    '..owwwwwwwwwwo..',
    '...oppoooppo....',
    '....oeeooeeo....',
    '....ooo..ooo....'
  ]);
  S('ch_prof_s0', PR, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohihhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..oshhhhhhhhho..',
    '..ossshhhhhhho..',
    '..osssshhhhhho..',
    '..osoossshhhho..',
    '..ossssshhhhho..',
    '...osssshhhho...',
    '....oossssoo....',
    '...owwwwwwwwo...',
    '..owwwwwwwwllo..',
    '..owwwwwwwwllo..',
    '..owwwwwwwwllo..',
    '..oswwwwwwwllo..',
    '..oowwwwwwwwoo..',
    '..owwwwwwwwwwo..',
    '....oppopppo....',
    '.....oeeeeeo....',
    '.....oooooo.....'
  ], true);

  // ----------------------------------------------------------------- mom ----
  // Brown hair with a bun, cream blouse, long red skirt.
  var MO = {
    o: C.ink, h: C.brn1, i: C.brn2, s: C.skn2, t: C.skn1,
    w: C.tan1, r: C.red1, R: C.red2, e: C.brn1
  };
  S('ch_mom_d0', MO, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohihhhhhhiho..',
    '..ohhhhhhhhhho..',
    '..ohshhhhhhsho..',
    '..ohssssssssho..',
    '..osssssssssso..',
    '..ossossssosso..',
    '..osssssssssso..',
    '...osssssssso...',
    '....oossssoo....',
    '...owwwsswwwo...',
    '..owwwwwwwwwwo..',
    '..owwwwwwwwwwo..',
    '..oswwwwwwwwso..',
    '..oRRRRRRRRRRo..',
    '..oRRRRRRRRRRo..',
    '..oRRRrrrrRRRo..',
    '..oRRRRRRRRRRo..',
    '...oeeooooeeo...',
    '....oo....oo....'
  ]);
  S('ch_mom_u0', MO, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohihhhhhhiho..',
    '..ohhhoooohhho..',
    '..ohhoihhiohho..',
    '..ohhhoooohhho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '...ohhhhhhhho...',
    '....oossssoo....',
    '...owwwwwwwwo...',
    '..owwwwwwwwwwo..',
    '..owwwwwwwwwwo..',
    '..oswwwwwwwwso..',
    '..oRRRRRRRRRRo..',
    '..oRRRRRRRRRRo..',
    '..oRRRRRRRRRRo..',
    '..oRRRRRRRRRRo..',
    '...oeeooooeeo...',
    '....oo....oo....'
  ]);
  S('ch_mom_s0', MO, [
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohihhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..oshhhhhhhhho..',
    '..ossshhhhhhho..',
    '..osssshhhhhho..',
    '..ososssshhhho..',
    '..ossssshhhhho..',
    '...osssshhhho...',
    '....oossssoo....',
    '...owwwwwwwwo...',
    '..owwwwwwwwwwo..',
    '..owwwwwwwwwwo..',
    '..oswwwwwwwwso..',
    '..oRRRRRRRRRRo..',
    '..oRRRRRRRRRRo..',
    '..oRRRRRRRRRro..',
    '..oRRRRRRRRRRo..',
    '....oeeeeeo.....',
    '.....oooo.......'
  ], true);

  // ----------------------------------------------------------------- boy ----
  // Dark spiky hair, yellow tee, green shorts.
  var BO = {
    o: C.ink, h: C.dgry, i: C.gry, s: C.skn2, t: C.skn1,
    y: C.yel1, Y: C.yel2, g: C.grn1, e: C.blu1
  };
  S('ch_boy_d0', BO, [
    '................',
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohihhhhhhiho..',
    '..ohhhhhhhhhho..',
    '..ohshhhhhhsho..',
    '..ohssssssssho..',
    '..osssssssssso..',
    '..ossossssosso..',
    '..osssssssssso..',
    '...osssssssso...',
    '....oossssoo....',
    '...oyyyssyyyo...',
    '..oyyyyyyyyyyo..',
    '..oyyYYYYYYyyo..',
    '..oyyyyyyyyyyo..',
    '..osyyyyyyyyso..',
    '..ooyyyyyyyyoo..',
    '....oggggggo....',
    '....oggooggo....',
    '....oeeooeeo....',
    '....ooo..ooo....'
  ]);
  S('ch_boy_u0', BO, [
    '................',
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohihhhhhhiho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhihhhhihho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..ohhhhhhhhhho..',
    '...ohhhhhhhho...',
    '....oossssoo....',
    '...oyyyyyyyyo...',
    '..oyyyyyyyyyyo..',
    '..oyyyyyyyyyyo..',
    '..oyyyyyyyyyyo..',
    '..osyyyyyyyyso..',
    '..ooyyyyyyyyoo..',
    '....oggggggo....',
    '....oggooggo....',
    '....oeeooeeo....',
    '....ooo..ooo....'
  ]);
  S('ch_boy_s0', BO, [
    '................',
    '................',
    '......oooo......',
    '....oohhhhoo....',
    '...ohhhhhhhho...',
    '..ohihhhhhhhho..',
    '..ohhhhhhhhhho..',
    '..oshhhhhhhhho..',
    '..ossshhhhhhho..',
    '..osssshhhhhho..',
    '..ososssshhhho..',
    '..ossssshhhhho..',
    '...osssshhhho...',
    '....oossssoo....',
    '...oyyyyyyyyo...',
    '..oyyyyyyyyyyo..',
    '..oyyyyyyyyYYo..',
    '..oyyyyyyyyyyo..',
    '..osyyyyyyyyso..',
    '..ooyyyyyyyyoo..',
    '.....ogggggo....',
    '.....ogggggo....',
    '.....oeeeeeo....',
    '.....oooooo.....'
  ], true);

  // -------------------------------------------------------- starter orb -----
  // A capture orb resting on a stand (interactable in the lab).
  G.ART.orb_stand = {
    w: 16, h: 16,
    pal: { o: G.C.ink, r: G.C.red2, q: G.C.red1, w: G.C.white, l: G.C.lgry, s: G.C.stn2, v: G.C.stn3 },
    px: [
      '................',
      '.....oooooo.....',
      '....orrrrrro....',
      '...orwwrrrrro...',
      '...orwrrrrrro...',
      '...orrrrrrrro...',
      '...oooooooooo...',
      '...owwwwwwwwo...',
      '...olwwwwwwlo...',
      '....owwwwwwo....',
      '.....oooooo.....',
      '....ovvvvvvo....',
      '...ovssssssvo...',
      '...osssssssso...',
      '...oooooooooo...',
      '................'
    ]
  };
})();
