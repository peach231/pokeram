// Pokéram — maps_towns.js
// Town exteriors + shared legends. pad() normalizes row widths (short rows
// fill with grass) so layout edits stay safe; the validator still checks all.

(function () {
  G.MAPS = G.MAPS || {};

  // shared exterior legend
  G.LEG_EXT = {
    '.': 'grass', ',': 'grass2', 'f': 'flower', 'g': 'tallgrass',
    'p': 'path', 'n': 'path_n', 's': 'path_s', 'e': 'path_e', 'w': 'path_w',
    't': 'tree_tl', 'u': 'tree_tr', 'v': 'tree_bl', 'x': 'tree_br',
    'F': 'fence', 'S': 'sign', 'l': 'ledge',
    '1': 'roof_tl', '2': 'roof_tm', '3': 'roof_tr',
    '4': 'roof_bl', '5': 'roof_bm', '6': 'roof_br',
    'W': 'wall', 'N': 'window', 'D': 'door',
    'A': 'lroof_tl', 'B': 'lroof_tm', 'C': 'lroof_tr',
    'a': 'lroof_bl', 'b': 'lroof_bm', 'c': 'lroof_br',
    'L': 'lwall', 'M': 'lwindow', 'O': 'ldoor',
    '7': 'hroof_tl', '8': 'hroof_tm', '9': 'hroof_tr',
    'd': 'hroof_bl', 'm': 'hroof_bm', 'h': 'hroof_br', '+': 'healsign',
    'q': 'sroof_tl', 'r': 'sroof_tm', 'z': 'sroof_tr',
    'i': 'sroof_bl', 'j': 'sroof_bm', 'k': 'sroof_br', '$': 'shopsign',
    'Y': 'gymdoor', '~': 'water',
    '[': 'shore_w', ']': 'shore_e', '^': 'shore_n', '_': 'shore_s',
    '%': 'sand', '#': 'cliff', '*': 'rock',
    '!': 'hroofx', '@': 'sroofx', '&': 'lroofx'
  };

  // shared interior legend
  G.LEG_INT = {
    '.': 'ifloor', 'I': 'iwall', 'm': 'imat', 'T': 'itable', 'B': 'ibook',
    'H': 'imach', '(': 'ibed_t', ')': 'ibed_b', 'P': 'iplant', 'o': 'istool',
    'C': 'icounter', 'E': 'ihealm', 'G': 'gfloor', 'R': 'redcarpet', 'U': 'statue'
  };

  G.padRows = function (rows, w, h, fill) {
    fill = fill || '.';
    var out = [];
    for (var y = 0; y < h; y++) {
      var r = rows[y] || '';
      while (r.length < w) r += fill;
      out.push(r.slice(0, w));
    }
    return out;
  };
  var pad = G.padRows;

  function blankDeco(w, h) { return pad([], w, h); }

  // ------------------------------------------------------------------------
  // HEARTHVALE — home town.
  // ------------------------------------------------------------------------
  G.MAPS.hearthvale = {
    id: 'hearthvale', name: 'Hearthvale', w: 22, h: 20,
    music: 'town', battleBg: 'meadow', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tututututupptututututu',
      'vxvxvxvxvxppvxvxvxvxvx',
      'tu........pp........tu',
      'vx.1223...pp...1223.vx',
      'tu.4556...pp...4556.tu',
      'vx.WNDW...pp...WNDW.vx',
      'tu........pp........tu',
      'vxnnnnnnnnppnnnnnnnnvx',
      'tussssssssppsssssssstu',
      'vx..,.....pp......,.vx',
      'tu........pp........tu',
      'vx..f.....pp....f...vx',
      'tu......ABBBBC......tu',
      'vx......abbbbc......vx',
      'tu......LMOOML......tu',
      'vx........pp........vx',
      'tu........ss........tu',
      'vx.,..f.........f...vx',
      'tututututututututututu',
      'vxvxvxvxvxvxvxvxvxvxvx'
    ], 22, 20),
    deco: blankDeco(22, 20),
    warps: [
      { x: 10, y: 1, to: 'route1', tx: 8, ty: 22, dir: 'up' },
      { x: 11, y: 1, to: 'route1', tx: 9, ty: 22, dir: 'up' },
      { x: 5, y: 5, to: 'playerhome', tx: 4, ty: 6, dir: 'up' },
      { x: 10, y: 14, to: 'lab', tx: 5, ty: 8, dir: 'up' },
      { x: 11, y: 14, to: 'lab', tx: 6, ty: 8, dir: 'up' }
    ],
    signs: [
      { x: 12, y: 2, text: 'HEARTHVALE — Where every journey takes its first step.' },
      { x: 7, y: 15, text: "PROF. MAPLE'S CREATURE LAB" },
      { x: 17, y: 5, text: "It's locked. The neighbors must be out on the routes." }
    ],
    npcs: [
      { x: 4, y: 7, sprite: 'mom', dir: 'down', event: 'momHeal' },
      { x: 16, y: 9, sprite: 'boy', dir: 'down', dialog: ['Prof. Maple keeps four creatures in her lab.', 'FOUR! And one of them gets to be yours. So unfair!'] }
    ],
    scripts: []
  };

  // ------------------------------------------------------------------------
  // COBBLEMARCH — first city. Rock gym NW, heal + shop, Route 1 south,
  // Route 2 east (gate guard until badge 1).
  // ------------------------------------------------------------------------
  G.MAPS.cobblemarch = {
    id: 'cobblemarch', name: 'Cobblemarch', w: 24, h: 20,
    music: 'town', battleBg: 'meadow', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tutututututututututututu',
      'vxvxvxvxvxvxvxvxvxvxvxvx',
      'tu....................tu',
      'vx.AB&BBC.............vx',
      'tu.abbbbc...7!89.q@rz.tu',
      'vx.LMYYML...dmmh.ijjk.vx',
      'tu..........W+DW.W$DW.tu',
      'vxnnnnnnnnnnnnnnnnnnnnvx',
      'tussssssssppsssssssssspp',
      'vx........pp..........pp',
      'tu...1223.pp.,........tu',
      'vx...4556.pp........f.vx',
      'tu...WNDW.pp..f.......tu',
      'vx........pp..........vx',
      'tu...f....pp.....,....tu',
      'vx........pp..........vx',
      'tu........pp..........tu',
      'vx........pp..........vx',
      'tututututuppvxtututututu',
      'vxvxvxvxvxppvxvxvxvxvxvx'
    ], 24, 20),
    deco: blankDeco(24, 20),
    warps: [
      { x: 10, y: 19, to: 'route1', tx: 8, ty: 1, dir: 'down' },
      { x: 11, y: 19, to: 'route1', tx: 9, ty: 1, dir: 'down' },
      { x: 23, y: 8, to: 'route2', tx: 1, ty: 8, dir: 'right' },
      { x: 23, y: 9, to: 'route2', tx: 1, ty: 9, dir: 'right' },
      { x: 5, y: 5, to: 'gym1', tx: 5, ty: 10, dir: 'up' },
      { x: 6, y: 5, to: 'gym1', tx: 5, ty: 10, dir: 'up' },
      { x: 14, y: 6, to: 'heal_cobblemarch', tx: 4, ty: 7, dir: 'up' },
      { x: 19, y: 6, to: 'shop_cobblemarch', tx: 4, ty: 7, dir: 'up' },
      { x: 7, y: 12, to: 'house_cobble', tx: 4, ty: 6, dir: 'up' }
    ],
    signs: [
      { x: 13, y: 7, text: 'COBBLEMARCH — Old stones, new beginnings.' },
      { x: 8, y: 5, text: "COBBLEMARCH GYM — Leader Bram. 'Steady as bedrock.'" }
    ],
    npcs: [
      { x: 21, y: 8, sprite: 'boy', dir: 'left', unlessFlag: 'badge1', dialog: ['The route east is closed until you earn the Bedrock Badge.', "Gym's the big stone building northwest. Good luck!"] },
      { x: 13, y: 10, sprite: 'mom', dir: 'down', dialog: ['The heal house has the pink roof — they patch up creatures free of charge.', 'The shop has the green roof. Stock up on orbs, dear.'] }
    ],
    scripts: []
  };

  // ------------------------------------------------------------------------
  // BRINEHOLLOW PORT — water gym. Forest east, Route 3 west, sea south.
  // ------------------------------------------------------------------------
  G.MAPS.brinehollow = {
    id: 'brinehollow', name: 'Brinehollow Port', w: 26, h: 20,
    music: 'town', battleBg: 'water', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tututututututututututututu',
      'vxvxvxvxvxvxvxvxvxvxvxvxvx',
      'tu......7!89.q@rz.......tu',
      'vx......dmmh.ijjk.......vx',
      'tu......W+DW.W$DW.......tu',
      'vx......................vx',
      'tunnnnnnnnnnnnnnnnnnnnnntu',
      'vxssssssssssssssssssssssvx',
      'tu..........,...........tu',
      'vx.AB&BBC...........f...pp',
      'pp.abbbbc...............pp',
      'pp.LMYYML......1223.....tu',
      'tu.............4556.....vx',
      'vx....f........WNDW.....tu',
      'tu......................vx',
      'vx%%%%%%%%%%%%%%%%%%%%%%tu',
      'tu%%%%%%%%%%%%%%%%%%%%%%vx',
      '^^^^^^^^^^^^^^^^^^^^^^^^^^',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~'
    ], 26, 20),
    deco: blankDeco(26, 20),
    warps: [
      { x: 25, y: 9, to: 'verdantforest', tx: 1, ty: 12, dir: 'right' },
      { x: 25, y: 10, to: 'verdantforest', tx: 1, ty: 13, dir: 'right' },
      { x: 0, y: 10, to: 'route3', tx: 32, ty: 8, dir: 'left' },
      { x: 0, y: 11, to: 'route3', tx: 32, ty: 9, dir: 'left' },
      { x: 5, y: 11, to: 'gym2', tx: 5, ty: 10, dir: 'up' },
      { x: 6, y: 11, to: 'gym2', tx: 5, ty: 10, dir: 'up' },
      { x: 10, y: 4, to: 'heal_brinehollow', tx: 4, ty: 7, dir: 'up' },
      { x: 15, y: 4, to: 'shop_brinehollow', tx: 4, ty: 7, dir: 'up' },
      { x: 17, y: 13, to: 'house_brine', tx: 4, ty: 6, dir: 'up' }
    ],
    signs: [
      { x: 12, y: 8, text: 'BRINEHOLLOW PORT — The sea remembers every sailor.' },
      { x: 8, y: 11, text: "BRINEHOLLOW GYM — Leader Maris. 'Flow like the tide.'" }
    ],
    npcs: [
      { x: 6, y: 8, sprite: 'prof', dir: 'down', dialog: ['Old sailor wisdom: Water creatures fear Electric and Grass moves.', 'Maris herself? Swears by raw power. Bring bandages.'] },
      { x: 20, y: 9, sprite: 'boy', dir: 'down', dialog: ['I saw a ghost ship figurehead drift past the pier last night!', 'Nobody believes me. You believe me, right?'] }
    ],
    scripts: []
  };

  // ------------------------------------------------------------------------
  // COILGATE CITY — electric gym. Cave east, Route 4 north (badge 3 gate).
  // ------------------------------------------------------------------------
  G.MAPS.coilgate = {
    id: 'coilgate', name: 'Coilgate City', w: 26, h: 20,
    music: 'town', battleBg: 'indoor', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tutututututuppvxtututututu',
      'vxvxvxvxvxvxppvxvxvxvxvxvx',
      'tu..........pp..........tu',
      'vx.AB&BBC...pp...7!89...vx',
      'tu.abbbbc...pp...dmmh...tu',
      'vx.LMYYML...pp...W+DW...vx',
      'tu..........pp..........tu',
      'vxnnnnnnnnnnppnnnnnnnnnnvx',
      'tussssssssssppsssssssssstu',
      'vx..........pp..........pp',
      'tu...q@rz...pp..1223....pp',
      'vx...ijjk...pp..4556....tu',
      'tu...W$DW...pp..WNDW....vx',
      'vx..........pp..........tu',
      'tu...,......pp......f...vx',
      'vx..........pp..........tu',
      'tu..........pp..........vx',
      'vx..........pp..........tu',
      'tutututututuppvxtutututtuu',
      'vxvxvxvxvxvxppvxvxvxvxvxvx'
    ], 26, 20),
    deco: blankDeco(26, 20),
    warps: [
      { x: 12, y: 19, to: 'hollowdeep1', tx: 3, ty: 4, dir: 'down' },
      { x: 13, y: 19, to: 'hollowdeep1', tx: 4, ty: 4, dir: 'down' },
      { x: 12, y: 0, to: 'route4', tx: 12, ty: 26, dir: 'up' },
      { x: 13, y: 0, to: 'route4', tx: 13, ty: 26, dir: 'up' },
      { x: 25, y: 9, to: 'route3', tx: 1, ty: 8, dir: 'right' },
      { x: 25, y: 10, to: 'route3', tx: 1, ty: 9, dir: 'right' },
      { x: 5, y: 5, to: 'gym3', tx: 5, ty: 10, dir: 'up' },
      { x: 6, y: 5, to: 'gym3', tx: 5, ty: 10, dir: 'up' },
      { x: 19, y: 5, to: 'heal_coilgate', tx: 4, ty: 7, dir: 'up' },
      { x: 7, y: 12, to: 'shop_coilgate', tx: 4, ty: 7, dir: 'up' },
      { x: 18, y: 12, to: 'house_coil', tx: 4, ty: 6, dir: 'up' }
    ],
    signs: [
      { x: 14, y: 7, text: 'COILGATE CITY — Powered by ambition (and several thousand Voltail).' },
      { x: 8, y: 5, text: "COILGATE GYM — Leader Tess. 'Keep up with the current.'" }
    ],
    npcs: [
      { x: 14, y: 2, sprite: 'boy', dir: 'down', unlessFlag: 'badge3', dialog: ['Route 4 is storm-locked until you hold the Dynamo Badge.', 'Tess keeps the gate key. Well. Metaphorically.'] },
      { x: 10, y: 14, sprite: 'mom', dir: 'down', dialog: ['The tunnel south leads back through Hollowdeep to the coast.', 'Ground-type creatures shrug off electricity. Just saying.'] }
    ],
    scripts: [
      { x: [11, 14], y: 16, once: 'ev_rival3', run: 'rival3' }
    ]
  };

  // ------------------------------------------------------------------------
  // AURELUNE CITY — psychic gym. Route 4 south, Summit Path east.
  // ------------------------------------------------------------------------
  G.MAPS.aurelune = {
    id: 'aurelune', name: 'Aurelune City', w: 24, h: 20,
    music: 'town', battleBg: 'indoor', base: 'grass',
    legend: G.LEG_EXT,
    ground: pad([
      'tutututututututututututu',
      'vxvxvxvxvxvxvxvxvxvxvxvx',
      'tu.....,..........f...tu',
      'vx..7!89....AB&BBC....vx',
      'tu..dmmh....abbbbc....tu',
      'vx..W+DW....LMYYML....vx',
      'tu....................tu',
      'vxnnnnnnnnnnnnnnnnnnnnvx',
      'tussssssssssssssssssspp',
      'vx........pp..........pp',
      'tu..q@rz..pp..1223....tu',
      'vx..ijjk..pp..4556....vx',
      'tu..W$DW..pp..WNDW....tu',
      'vx........pp....,.....vx',
      'tu...f....pp..........tu',
      'vx........pp.......f..vx',
      'tu........pp..........tu',
      'vx........pp..........vx',
      'tutututuvxppvxtututututu',
      'vxvxvxvxvxppvxvxvxvxvxvx'
    ], 24, 20),
    deco: blankDeco(24, 20),
    warps: [
      { x: 10, y: 19, to: 'route4', tx: 9, ty: 1, dir: 'down' },
      { x: 11, y: 19, to: 'route4', tx: 10, ty: 1, dir: 'down' },
      { x: 23, y: 8, to: 'summitpath', tx: 1, ty: 26, dir: 'right' },
      { x: 23, y: 9, to: 'summitpath', tx: 1, ty: 27, dir: 'right' },
      { x: 14, y: 5, to: 'gym4', tx: 5, ty: 10, dir: 'up' },
      { x: 15, y: 5, to: 'gym4', tx: 5, ty: 10, dir: 'up' },
      { x: 6, y: 5, to: 'heal_aurelune', tx: 4, ty: 7, dir: 'up' },
      { x: 6, y: 12, to: 'shop_aurelune', tx: 4, ty: 7, dir: 'up' },
      { x: 16, y: 12, to: 'house_aure', tx: 4, ty: 6, dir: 'up' }
    ],
    signs: [
      { x: 12, y: 7, text: 'AURELUNE CITY — The moon lingers here a little longer.' },
      { x: 17, y: 5, text: "AURELUNE GYM — Leader Vesper. 'I dreamed you would read this.'" }
    ],
    npcs: [
      { x: 21, y: 10, sprite: 'prof', dir: 'left', unlessFlag: 'badge4', dialog: ['Summit Path demands all four badges.', 'Vesper holds the last one. Sleep well before you face her.'] },
      { x: 8, y: 14, sprite: 'boy', dir: 'down', dialog: ['Shadow and Bug moves cut right through Psychic creatures.', "Vesper knows that you know. She's planned for it. Probably."] }
    ],
    scripts: []
  };

  // ------------------------------------------------------------------------
  // CROWN SUMMIT — the peak. Champion hall + post-game Astradrax.
  // ------------------------------------------------------------------------
  G.MAPS.crownsummit = {
    id: 'crownsummit', name: 'Crown Summit', w: 20, h: 18,
    music: 'cave', battleBg: 'cave', base: 'cliff',
    legend: G.LEG_EXT,
    ground: pad([
      '####################',
      '####################',
      '##.......**......###',
      '##..*............###',
      '#......AB&BBC......#',
      '#......abbbbc......#',
      '#......LMYYML......#',
      '#..................#',
      '#...*...pppp...*...#',
      '#.......pppp.......#',
      '#..7!89.pppp.q@rz..#',
      '#..dmmh.pppp.ijjk..#',
      '#..W+DW.pppp.W$DW..#',
      '#.......pppp.......#',
      '#.......pppp...*...#',
      '#..*....pppp.......#',
      '########pppp########',
      '########pppp########'
    ], 20, 18, '#'),
    deco: blankDeco(20, 18),
    warps: [
      { x: 8, y: 17, to: 'summitpath', tx: 9, ty: 1, dir: 'down' },
      { x: 9, y: 17, to: 'summitpath', tx: 10, ty: 1, dir: 'down' },
      { x: 10, y: 17, to: 'summitpath', tx: 10, ty: 1, dir: 'down' },
      { x: 11, y: 17, to: 'summitpath', tx: 11, ty: 1, dir: 'down' },
      { x: 9, y: 6, to: 'championhall', tx: 4, ty: 12, dir: 'up' },
      { x: 10, y: 6, to: 'championhall', tx: 5, ty: 12, dir: 'up' },
      { x: 5, y: 12, to: 'heal_summit', tx: 4, ty: 7, dir: 'up' },
      { x: 15, y: 12, to: 'shop_summit', tx: 4, ty: 7, dir: 'up' }
    ],
    signs: [
      { x: 12, y: 8, text: 'CROWN SUMMIT — Beyond this hall sits the Champion of Solyn.' }
    ],
    npcs: [
      { x: 9, y: 2, sprite: 'mon_astradrax', obj: true, ifFlag: 'champion', event: 'meetAstradrax' },
      { x: 9, y: 3, sprite: 'prof', dir: 'down', unlessFlag: 'champion', dialog: ['The starwyrm ASTRADRAX is said to nest at the very peak.', 'It reveals itself only to a champion.'] }
    ],
    scripts: []
  };
})();


