// Pokéram — maps_routes.js
// Routes 1-4 + Summit Path. Encounter tables are rarity-weighted automatically.

(function () {
  G.MAPS = G.MAPS || {};
  var pad = G.padRows;
  function blankDeco(w, h) { return G.padRows([], w, h); }

  // ------------------------------------------------------------------------
  // ROUTE 1 — Hearthvale (south) to Cobblemarch (north). Rival battle 1.
  // ------------------------------------------------------------------------
  G.MAPS.route1 = {
    id: 'route1', name: 'Route 1', w: 18, h: 24,
    music: 'route', battleBg: 'meadow', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tutututupptutututu',
      'vxvxvxvxppvxvxvxvx',
      'tu......pp......tu',
      'vx.ggg..pp..ggg.vx',
      'tu.ggg..pp..ggg.tu',
      'vx.ggg..pp..ggg.vx',
      'tu......pp......tu',
      'vx..f...pp...f..vx',
      'tu......pp......tu',
      'vx.gggg.pp.gggg.vx',
      'tu.gggg.pp.gggg.tu',
      'vx......pp......vx',
      'tullllllpplllllltu',
      'vx......pp......vx',
      'tu..,...pp...,..tu',
      'vx.ggg..pp..ggg.vx',
      'tu.ggg..pp..ggg.tu',
      'vx......pp......vx',
      'tu......pp......tu',
      'vx..f...pp..f...vx',
      'tu......pp......tu',
      'vx......pp......vx',
      'tutututupptutututu',
      'vxvxvxvxppvxvxvxvx'
    ], 18, 24),
    deco: blankDeco(18, 24),
    warps: [
      { x: 8, y: 23, to: 'hearthvale', tx: 10, ty: 2, dir: 'down' },
      { x: 9, y: 23, to: 'hearthvale', tx: 11, ty: 2, dir: 'down' },
      { x: 8, y: 0, to: 'cobblemarch', tx: 10, ty: 17, dir: 'up' },
      { x: 9, y: 0, to: 'cobblemarch', tx: 11, ty: 17, dir: 'up' }
    ],
    signs: [
      { x: 10, y: 20, text: 'ROUTE 1 — South: Hearthvale. North: Cobblemarch.' }
    ],
    npcs: [],
    trainers: [
      { id: 'r1_tom', trainer: 'r1_tom', x: 5, y: 8, sprite: 'boy', dir: 'right', sight: 3, after: 'The gym in Cobblemarch is way tougher than me. Way, WAY tougher.' },
      { id: 'r1_ana', trainer: 'r1_ana', x: 12, y: 16, sprite: 'mom', dir: 'left', sight: 3, after: 'Your team has good manners. Mostly.' }
    ],
    items: [
      { x: 3, y: 7, item: 'potion', qty: 1, flag: 'itm_r1_potion' },
      { x: 14, y: 19, item: 'tameorb', qty: 2, flag: 'itm_r1_orbs' }
    ],
    encounters: {
      rate: 0.10,
      table: [
        { sp: 'cheepit', min: 2, max: 4 },
        { sp: 'nibbit', min: 2, max: 4 },
        { sp: 'scrapling', min: 3, max: 4 },
        { sp: 'fernfawn', min: 3, max: 5 }
      ]
    },
    scripts: [
      { x: [8, 9], y: 4, once: 'ev_rival1', run: 'rival1' }
    ]
  };

  // ------------------------------------------------------------------------
  // ROUTE 2 — Cobblemarch (west) to Verdant Forest (north).
  // ------------------------------------------------------------------------
  G.MAPS.route2 = {
    id: 'route2', name: 'Route 2', w: 22, h: 26,
    music: 'route', battleBg: 'meadow', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tutututupptutututututu',
      'vxvxvxvxppvxvxvxvxvxvx',
      'tu.f....pp..........tu',
      'vx.ggg..pp...ggg....vx',
      'tu.ggg..pp...ggg....tu',
      'vx.ggg..pp...ggg....vx',
      'tu......pp..........tu',
      'vx......pp....f.....vx',
      'tunnnnnnppnnnnnnnnnntu',
      'wpppppppppppppppppppps'.replace('w', 'v').replace('s', 'u'),
      'pppppppppppppppppppppp',
      'tussssssppssssssssssvx',
      'vx......pp..........tu',
      'tu.,....pp....ggg...vx',
      'vx......pp....ggg...tu',
      'tu.ggg..pp....ggg...vx',
      'vx.ggg..pp..........tu',
      'tu.ggg..pp.....,....vx',
      'vx......pp..........tu',
      'tu......pp..f.......vx',
      'vx.f....pp..........tu',
      'tu......pp..........vx',
      'vx......pp..........tu',
      'tu......pp..........vx',
      'tutututupptutututuvxtu',
      'vxvxvxvxppvxvxvxvxvxvx'
    ], 22, 26),
    deco: blankDeco(22, 26),
    warps: [
      { x: 0, y: 9, to: 'cobblemarch', tx: 22, ty: 8, dir: 'left' },
      { x: 0, y: 10, to: 'cobblemarch', tx: 22, ty: 9, dir: 'left' },
      { x: 8, y: 0, to: 'verdantforest', tx: 13, ty: 24, dir: 'up' },
      { x: 9, y: 0, to: 'verdantforest', tx: 14, ty: 24, dir: 'up' },
      { x: 8, y: 25, to: 'cobblemarch', tx: 11, ty: 2, dir: 'down' },
      { x: 9, y: 25, to: 'cobblemarch', tx: 12, ty: 2, dir: 'down' }
    ],
    signs: [
      { x: 11, y: 8, text: 'ROUTE 2 — North: Verdant Forest. West: Cobblemarch.' }
    ],
    npcs: [],
    trainers: [
      { id: 'r2_ben', trainer: 'r2_ben', x: 13, y: 6, sprite: 'boy', dir: 'left', sight: 3, after: 'The forest north is full of bugs. Strong bugs.' },
      { id: 'r2_mia', trainer: 'r2_mia', x: 6, y: 14, sprite: 'mom', dir: 'right', sight: 3, after: 'Fluffit demands a rematch. Eventually.' },
      { id: 'r2_cliff', trainer: 'r2_cliff', x: 15, y: 20, sprite: 'prof', dir: 'left', sight: 4, after: 'Solid technique. Like a good rock.' }
    ],
    items: [
      { x: 19, y: 3, item: 'potion', qty: 2, flag: 'itm_r2_potion' },
      { x: 3, y: 22, item: 'greatorb', qty: 1, flag: 'itm_r2_greatorb' }
    ],
    encounters: {
      rate: 0.11,
      table: [
        { sp: 'nibbit', min: 6, max: 9 },
        { sp: 'cheepit', min: 6, max: 9 },
        { sp: 'fluffit', min: 7, max: 9 },
        { sp: 'buddle', min: 7, max: 9 },
        { sp: 'scrapling', min: 7, max: 9 },
        { sp: 'hummingale', min: 8, max: 9 }
      ]
    },
    scripts: []
  };

  // ------------------------------------------------------------------------
  // ROUTE 3 — coastal stretch: Coilgate side (west, via Hollowdeep) to
  // Brinehollow (east). Slumbear set-piece. Sea to the south.
  // ------------------------------------------------------------------------
  G.MAPS.route3 = {
    id: 'route3', name: 'Route 3', w: 34, h: 18,
    music: 'route', battleBg: 'water', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tututututututututututututututututu',
      'vxvxvxvxvxvxvxvxvxvxvxvxvxvxvxvxvx',
      'tu....,.....ggg.......f.........tu',
      'vx..........ggg.....ggg.........vx',
      'tu..f.......ggg.....ggg....,....tu',
      'vx..................ggg.........vx',
      'tu...........*..................tu',
      'vxnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnvx',
      'pppppppppppppppppppppppppppppppppp',
      'pppppppppppppppppppppppppppppppppp',
      'tussssssssssssssssssssssssssssssvx',
      'vx...%%%%%%%%%%%%%%%%%%%%%%%%...tu',
      'tu...%%%%%%%%%%%%%%%%%%%%%%%%...vx',
      'vx...%%%..........%%%%%.........tu',
      'tu...%%%....,.....%%%%%.....f...vx',
      '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
    ], 34, 18),
    deco: blankDeco(34, 18),
    warps: [
      { x: 0, y: 8, to: 'hollowdeep1', tx: 22, ty: 16, dir: 'left' },
      { x: 0, y: 9, to: 'hollowdeep1', tx: 22, ty: 17, dir: 'left' },
      { x: 33, y: 8, to: 'brinehollow', tx: 1, ty: 10, dir: 'right' },
      { x: 33, y: 9, to: 'brinehollow', tx: 1, ty: 11, dir: 'right' }
    ],
    signs: [
      { x: 4, y: 7, text: 'ROUTE 3 — West: Hollowdeep Cave. East: Brinehollow Port.' }
    ],
    npcs: [
      { x: 16, y: 6, sprite: 'mon_slumbear', obj: true, unlessFlag: 'ev_slumbear', event: 'wakeSlumbear' }
    ],
    trainers: [
      { id: 'r3_lou', trainer: 'r3_lou', x: 8, y: 12, sprite: 'mom', dir: 'right', sight: 3, after: 'The sea is nice this time of year. Less nice for my pride.' },
      { id: 'r3_gus', trainer: 'r3_gus', x: 22, y: 5, sprite: 'prof', dir: 'down', sight: 3, after: 'Take the cave slow. The dark gets heavy.' },
      { id: 'r3_zee', trainer: 'r3_zee', x: 27, y: 12, sprite: 'boy', dir: 'left', sight: 4, after: 'Glow squad will train harder!' },
      { id: 'r3_kym', trainer: 'r3_kym', x: 13, y: 4, sprite: 'boy', dir: 'down', sight: 3, after: 'Light feet, heavy hits. Remember that.' }
    ],
    items: [
      { x: 31, y: 2, item: 'superpotion', qty: 1, flag: 'itm_r3_spot' },
      { x: 6, y: 13, item: 'cureall', qty: 1, flag: 'itm_r3_cure' }
    ],
    encounters: {
      rate: 0.11,
      table: [
        { sp: 'tidepup', min: 13, max: 16 },
        { sp: 'finling', min: 13, max: 16 },
        { sp: 'zappling', min: 13, max: 16 },
        { sp: 'duneling', min: 14, max: 16 },
        { sp: 'sparkit', min: 13, max: 15 },
        { sp: 'hummingale', min: 14, max: 16 },
        { sp: 'squidrift', min: 15, max: 17 }
      ]
    },
    scripts: []
  };

  // ------------------------------------------------------------------------
  // ROUTE 4 — Coilgate (south) to Aurelune (north). Badge 3 gate.
  // ------------------------------------------------------------------------
  G.MAPS.route4 = {
    id: 'route4', name: 'Route 4', w: 20, h: 28,
    music: 'route', battleBg: 'meadow', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tutututuvxpptutututu',
      'vxvxvxvxvxppvxvxvxvx',
      'tu....f...pp......tu',
      'vx..ggg...pp..ggg.vx',
      'tu..ggg...pp..ggg.tu',
      'vx..ggg...pp..ggg.vx',
      'tu........pp......tu',
      'vx....,...pp..f...vx',
      'tu........pp......tu',
      'vx.gggg...pp.gggg.vx',
      'tu.gggg...pp.gggg.tu',
      'vx........pp......vx',
      'tu...llllllpplllll'.replace('pp', 'pp') + 'tu',
      'vx........pp......vx',
      'tu...f....pp..,...tu',
      'vx........pp......vx',
      'tu.ggg....pp..ggg.tu',
      'vx.ggg....pp..ggg.vx',
      'tu.ggg....pp..ggg.tu',
      'vx........pp......vx',
      'tu........pp...f..tu',
      'vx...,....pp......vx',
      'tu........pp......tu',
      'vx........pp......vx',
      'tu........pp......tu',
      'vx........pp......vx',
      'tutututuvxpptutututu',
      'vxvxvxvxvxppvxvxvxvx'
    ], 20, 28),
    deco: blankDeco(20, 28),
    warps: [
      { x: 10, y: 27, to: 'coilgate', tx: 12, ty: 2, dir: 'down' },
      { x: 11, y: 27, to: 'coilgate', tx: 13, ty: 2, dir: 'down' },
      { x: 10, y: 0, to: 'aurelune', tx: 10, ty: 18, dir: 'up' },
      { x: 11, y: 0, to: 'aurelune', tx: 11, ty: 18, dir: 'up' }
    ],
    signs: [
      { x: 13, y: 7, text: 'ROUTE 4 — North: Aurelune City. South: Coilgate City.' }
    ],
    npcs: [],
    trainers: [
      { id: 'r4_tia', trainer: 'r4_tia', x: 6, y: 6, sprite: 'mom', dir: 'right', sight: 3, after: 'The sparkles will remember this.' },
      { id: 'r4_vin', trainer: 'r4_vin', x: 14, y: 12, sprite: 'boy', dir: 'left', sight: 4, after: 'Watch the tall grass. My team lives there. Rude of them.' },
      { id: 'r4_hank', trainer: 'r4_hank', x: 5, y: 19, sprite: 'prof', dir: 'right', sight: 3, after: 'Good roadwork beats good luck.' },
      { id: 'r4_lux', trainer: 'r4_lux', x: 15, y: 22, sprite: 'boy', dir: 'left', sight: 4, after: 'Aurelune will suit you. Dramatic lighting.' }
    ],
    items: [
      { x: 3, y: 14, item: 'hyperpotion', qty: 1, flag: 'itm_r4_hpot' },
      { x: 16, y: 20, item: 'greatorb', qty: 2, flag: 'itm_r4_orbs' }
    ],
    encounters: {
      rate: 0.11,
      table: [
        { sp: 'hexkit', min: 22, max: 26 },
        { sp: 'twinkit', min: 22, max: 25 },
        { sp: 'vipelash', min: 22, max: 26 },
        { sp: 'trotling', min: 23, max: 26 },
        { sp: 'psymote', min: 23, max: 26 },
        { sp: 'staticub', min: 24, max: 26 },
        { sp: 'marionyx', min: 25, max: 27 }
      ]
    },
    scripts: []
  };

  // ------------------------------------------------------------------------
  // SUMMIT PATH — Aurelune (south-west) to Crown Summit (north).
  // Four-badge checkpoint; rival battle 4; late-game wilds.
  // ------------------------------------------------------------------------
  G.MAPS.summitpath = {
    id: 'summitpath', name: 'Summit Path', w: 20, h: 30,
    music: 'cave', battleBg: 'cave', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      '#########pp#########',
      '#########pp#########',
      '##.......pp.......##',
      '##..*....pp..ggg..##',
      '#........pp..ggg..##',
      '#...ggg..pp.......##',
      '#...ggg..pp....*..##',
      '#...ggg..pp.......##',
      '#........pp..ggg..##',
      '##.......pp..ggg..##',
      '##...*...pp.......##',
      '##.......pp...,...##',
      '###......pp......###',
      '###..ggg.pp.ggg..###',
      '###..ggg.pp.ggg..###',
      '###......pp......###',
      '##....,..pp..*....##',
      '##.......pp.......##',
      '##..ggg..pp..ggg..##',
      '##..ggg..pp..ggg..##',
      '##.......pp.......##',
      '##...*...pp....,..##',
      '###......pp......###',
      '####.....pp.....####',
      '####..f..pp..f..####',
      '#####....pp....#####',
      '#####....pp....#####',
      'ppppppppppp#########',
      'ppppppppppp#########',
      '####################',
      '####################'
    ], 20, 30, '#'),
    deco: blankDeco(20, 30),
    warps: [
      { x: 0, y: 26, to: 'aurelune', tx: 21, ty: 8, dir: 'left' },
      { x: 0, y: 27, to: 'aurelune', tx: 21, ty: 9, dir: 'left' },
      { x: 10, y: 0, to: 'crownsummit', tx: 9, ty: 16, dir: 'up' },
      { x: 11, y: 0, to: 'crownsummit', tx: 10, ty: 16, dir: 'up' }
    ],
    signs: [
      { x: 12, y: 25, text: 'SUMMIT PATH — Champions only beyond this point.' }
    ],
    npcs: [
      { x: 10, y: 24, sprite: 'prof', dir: 'down', unlessFlag: 'badge4', dialog: ['Halt! The summit demands all four badges of Solyn.', 'Bedrock. Tide. Dynamo. Lucid. Return when you carry them all.'] }
    ],
    trainers: [
      { id: 'sp_rex', trainer: 'sp_rex', x: 6, y: 20, sprite: 'boy', dir: 'right', sight: 4, after: 'Two more aces above me. Breathe between fights.' },
      { id: 'sp_isa', trainer: 'sp_isa', x: 14, y: 16, sprite: 'mom', dir: 'left', sight: 4, after: 'The wind carries you well.' },
      { id: 'sp_olm', trainer: 'sp_olm', x: 5, y: 10, sprite: 'prof', dir: 'right', sight: 4, after: 'Ninety-one times the charm.' },
      { id: 'sp_ada', trainer: 'sp_ada', x: 13, y: 5, sprite: 'boy', dir: 'left', sight: 4, after: 'Go on. Make the hall remember you.' }
    ],
    items: [
      { x: 16, y: 3, item: 'hyperpotion', qty: 2, flag: 'itm_sp_hpot' },
      { x: 3, y: 16, item: 'revivedust', qty: 1, flag: 'itm_sp_rev' }
    ],
    encounters: {
      rate: 0.12,
      table: [
        { sp: 'chillip', min: 30, max: 33 },
        { sp: 'snowl', min: 30, max: 34 },
        { sp: 'glacielle', min: 31, max: 34 },
        { sp: 'gloamop', min: 30, max: 33 },
        { sp: 'petalisk', min: 31, max: 34 },
        { sp: 'wyrmble', min: 30, max: 33 },
        { sp: 'zephyrant', min: 32, max: 35 }
      ]
    },
    scripts: [
      { x: [9, 12], y: 12, once: 'ev_rival4', run: 'rival4' }
    ]
  };
})();
