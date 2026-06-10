// Pokéram — maps_dungeons.js
// Verdant Forest (tree maze) + Hollowdeep Cave B1/B2 + the cave legend.

(function () {
  G.MAPS = G.MAPS || {};
  var pad = G.padRows;
  function blankDeco(w, h) { return G.padRows([], w, h); }

  G.LEG_CAVE = {
    '.': 'cavefloor', '#': 'cavewall', '*': 'rock', 'c': 'crystal', '>': 'stairs'
  };

  // ------------------------------------------------------------------------
  // VERDANT FOREST — a maze of old trees between Route 2 (south) and
  // Brinehollow (west). Rival battle 2 near the west exit. Lumifae's glade
  // hides in the north-east, revealed to champions.
  // ------------------------------------------------------------------------
  G.MAPS.verdantforest = {
    id: 'verdantforest', name: 'Verdant Forest', w: 28, h: 26,
    music: 'cave', battleBg: 'forest', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tutututututututututututututu',
      'vxvxvxvxvxvxvxvxvxvxvxvxvxvx',
      'tu....tu..........tu......tu',
      'vx....vx..........vx......vx',
      'tu....tu.tututu...tu.tu...tu',
      'vx....vx.vxvxvx...vx.vx...vx',
      'tu.gg....tu.....tutu.tu...tu',
      'vx.gg....vx.....vxvx.vx...vx',
      'tututu.tu.tu.tututu..tu.tutu',
      'vxvxvx.vx.vx.vxvxvx..vx.vxvx',
      'tu.....tu..........tu.....tu',
      'vx.gg..vx....gg....vx.gg..vx',
      '.......tutu..gg..tutu.....tu',
      '.......vxvx......vxvx.....vx',
      'tu.tutututu.tu......tu.tutu.',
      'vx.vxvxvxvx.vx......vx.vxvx.',
      'tu........tu.tu.tutu......tu',
      'vx..gg....vx.vx.vxvx..gg..vx',
      'tu.tutututu...........tutu.t',
      'vx.vxvxvxvx...........vxvx.v',
      'tu..........tutu..........tu',
      'vx...gg.....vxvx....gg....vx',
      'tutututu.tu......tu.tututu.t',
      'vxvxvxvx.vx......vx.vxvxvx.v',
      'tutututututu....tutututututu',
      'vxvxvxvxvxvx....vxvxvxvxvxvx'
    ], 28, 26),
    deco: blankDeco(28, 26),
    warps: [
      { x: 13, y: 25, to: 'route2', tx: 8, ty: 1, dir: 'down' },
      { x: 14, y: 25, to: 'route2', tx: 9, ty: 1, dir: 'down' },
      { x: 0, y: 12, to: 'brinehollow', tx: 24, ty: 9, dir: 'left' },
      { x: 0, y: 13, to: 'brinehollow', tx: 24, ty: 10, dir: 'left' }
    ],
    signs: [
      { x: 12, y: 20, text: 'VERDANT FOREST — Keep to the clearings. The old trees keep to themselves.' }
    ],
    npcs: [
      { x: 24, y: 2, sprite: 'mon_lumifae', obj: true, ifFlag: 'champion', event: 'meetLumifae' }
    ],
    trainers: [
      { id: 'vf_iggy', trainer: 'vf_iggy', x: 8, y: 6, sprite: 'boy', dir: 'down', sight: 3, after: 'Bugs forever. BUGS FOREVER!' },
      { id: 'vf_fern', trainer: 'vf_fern', x: 16, y: 12, sprite: 'mom', dir: 'left', sight: 3, after: 'Shhh. The mushrooms are listening.' },
      { id: 'vf_orin', trainer: 'vf_orin', x: 6, y: 16, sprite: 'boy', dir: 'right', sight: 4, after: 'The west path opens to the port. Sea air will do you good.' }
    ],
    items: [
      { x: 25, y: 10, item: 'tameorb', qty: 3, flag: 'itm_vf_orbs' },
      { x: 3, y: 21, item: 'superpotion', qty: 1, flag: 'itm_vf_spot' }
    ],
    encounters: {
      rate: 0.13,
      table: [
        { sp: 'silklit', min: 8, max: 11 },
        { sp: 'cocoonix', min: 9, max: 11 },
        { sp: 'mossquito', min: 9, max: 12 },
        { sp: 'shroomp', min: 9, max: 12 },
        { sp: 'fernfawn', min: 9, max: 12 },
        { sp: 'petalisk', min: 10, max: 12 },
        { sp: 'owlume', min: 10, max: 13 },
        { sp: 'bamboxer', min: 11, max: 13 }
      ]
    },
    scripts: [
      { x: [1, 6], y: 12, once: 'ev_rival2', run: 'rival2', ifFlag: 'starter' },
      { x: [1, 6], y: 13, once: 'ev_rival2', run: 'rival2', ifFlag: 'starter' }
    ]
  };

  // ------------------------------------------------------------------------
  // HOLLOWDEEP CAVE B1 — connects Coilgate (NW stairs) and Route 3 (east).
  // Stairs down to B2 in the middle.
  // ------------------------------------------------------------------------
  G.MAPS.hollowdeep1 = {
    id: 'hollowdeep1', name: 'Hollowdeep Cave', w: 26, h: 22,
    music: 'cave', battleBg: 'cave', base: 'cavefloor',
    legend: G.LEG_CAVE,
    ground: pad([
      '##########################',
      '##########################',
      '##......##################',
      '##.>>...##......##########',
      '##......##......##########',
      '##..*...........*.......##',
      '#####..####..####........#',
      '#####..####..####..*.....#',
      '##.........*.....##......#',
      '##..*....................#',
      '##.....####..#####..###..#',
      '##.....####..#####..###..#',
      '##..........>.....*......#',
      '##..*.......##...........#',
      '#####..#####.....####..###',
      '#####..#####..*..####..###',
      '##.........*..............',
      '##.........................'.slice(0, 26),
      '##..*...####....*...####.#',
      '##......####........####.#',
      '##########################',
      '##########################'
    ], 26, 22, '#'),
    deco: blankDeco(26, 22),
    warps: [
      { x: 3, y: 3, to: 'coilgate', tx: 12, ty: 17, dir: 'up' },
      { x: 4, y: 3, to: 'coilgate', tx: 13, ty: 17, dir: 'up' },
      { x: 25, y: 16, to: 'route3', tx: 1, ty: 8, dir: 'right' },
      { x: 25, y: 17, to: 'route3', tx: 1, ty: 9, dir: 'right' },
      { x: 12, y: 12, to: 'hollowdeep2', tx: 10, ty: 4, dir: 'down' }
    ],
    signs: [],
    npcs: [],
    trainers: [
      { id: 'hd_rok', trainer: 'hd_rok', x: 8, y: 9, sprite: 'prof', dir: 'right', sight: 3, after: 'The deeper level glitters. Bring a light heart.' },
      { id: 'hd_nyx', trainer: 'hd_nyx', x: 19, y: 13, sprite: 'boy', dir: 'left', sight: 4, after: 'The dark keeps secrets. So do I. Mostly about losing.' },
      { id: 'hd_moe', trainer: 'hd_moe', x: 14, y: 18, sprite: 'boy', dir: 'up', sight: 3, after: 'Seriously though. Which way is out?' }
    ],
    items: [
      { x: 22, y: 5, item: 'superpotion', qty: 1, flag: 'itm_hd1_spot' },
      { x: 3, y: 18, item: 'greatorb', qty: 2, flag: 'itm_hd1_orbs' }
    ],
    encounters: {
      rate: 0.13,
      table: [
        { sp: 'gravelit', min: 15, max: 18 },
        { sp: 'moleling', min: 15, max: 18 },
        { sp: 'echolit', min: 15, max: 18 },
        { sp: 'gloopit', min: 15, max: 18 },
        { sp: 'ashvole', min: 16, max: 19 },
        { sp: 'cindermite', min: 15, max: 18 },
        { sp: 'shalite', min: 16, max: 19 }
      ]
    },
    scripts: []
  };

  // ------------------------------------------------------------------------
  // HOLLOWDEEP CAVE B2 — crystal hollow. Rare steel/ghost wilds, and the
  // Myth Orb rests in the deepest alcove.
  // ------------------------------------------------------------------------
  G.MAPS.hollowdeep2 = {
    id: 'hollowdeep2', name: 'Hollowdeep Depths', w: 20, h: 16,
    music: 'cave', battleBg: 'cave', base: 'cavefloor',
    legend: G.LEG_CAVE,
    ground: pad([
      '####################',
      '####################',
      '#########..#########',
      '#########.>.########',
      '##..c.......c.....##',
      '##....####....*...##',
      '#..*..####........##',
      '#.....####..####..##',
      '#..........####c..##',
      '#..c..*.....####..##',
      '###......*........##',
      '###..####....*..####',
      '#....####.......####',
      '#..c.####..c....####',
      '####################',
      '####################'
    ], 20, 16, '#'),
    deco: blankDeco(20, 16),
    warps: [
      { x: 10, y: 3, to: 'hollowdeep1', tx: 12, ty: 13, dir: 'down' }
    ],
    signs: [],
    npcs: [],
    trainers: [],
    items: [
      { x: 2, y: 12, item: 'mythorb', qty: 1, flag: 'itm_hd2_mythorb' },
      { x: 16, y: 4, item: 'revivedust', qty: 1, flag: 'itm_hd2_rev' }
    ],
    encounters: {
      rate: 0.13,
      table: [
        { sp: 'gravelit', min: 16, max: 19 },
        { sp: 'gloamop', min: 16, max: 19 },
        { sp: 'cragnaw', min: 17, max: 20 },
        { sp: 'forgelet', min: 17, max: 20 },
        { sp: 'lanternox', min: 17, max: 20 },
        { sp: 'crystallith', min: 18, max: 20 },
        { sp: 'wyrmble', min: 17, max: 20 }
      ]
    },
    scripts: []
  };
})();
