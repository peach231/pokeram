// Pokéram — sprites_tiles.js
// 16x16 map tiles, authored as palette-indexed grids (see palettes.js for the
// style contract). Also defines G.TILES — the gameplay property table that
// maps tile names to art + behavior (solid / encounter grass / ledge / etc).

(function () {
  var C = G.C;

  function T(name, pal, rows) { G.ART[name] = { w: 16, h: 16, pal: pal, px: rows }; }

  // ---------------------------------------------------------------- grass --
  var GR = { a: C.leaf1, b: C.leaf2, c: C.leaf3 };

  T('t_grass', GR, [
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbcbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbabb',
    'bbbbbbbbbbbbbbbb',
    'bbcbbbbbbbbbbbbb',
    'bbbbbbbbbbbbcbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbabbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbcbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbcbbbbbbbbbbb',
    'babbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb'
  ]);

  T('t_grass2', GR, [
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbcbbbbbbbbbbbb',
    'bbacabbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbcbbbb',
    'bbbbbbbbbbacabbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbcbbbbbbbb'
  ]);

  // tall grass (wild encounters)
  T('t_tallgrass', { a: C.grn0, b: C.grn1, c: C.grn2, e: C.leaf2 }, [
    'eebeeebeeebeeebe',
    'ebbecbbeebbecbbe',
    'ebbbbbbcbbbbbbbe',
    'bbcbbbbbbbcbbbbb',
    'bbbbabbbbbbbabbb',
    'bcbbbbbcbbbbbbcb',
    'bbbabbbbbbabbbbb',
    'bbbbbbcbbbbbbbab',
    'babbbbbbbcbbbbbb',
    'bbbcbbabbbbbacbb',
    'bbbbbbbbcbbbbbbb',
    'babbbcbbbabbbcbb',
    'bbbbabbbbbbabbbb',
    'abbabbbababbabba',
    'aabbaabbaaabbaab',
    'aaaaaaaaaaaaaaaa'
  ]);

  // flowers (2-frame animation on grass)
  var FL = { a: C.leaf1, b: C.leaf2, c: C.leaf3, r: C.red2, y: C.yel1 };
  T('t_flower1', FL, [
    'bbbbbbbbbbbbbbbb',
    'bbbabbbbbbbbbbbb',
    'bbbbbbbbbbcbbbbb',
    'bbbrbbbbbbbbbbab',
    'bbryrbbbbbbbbbbb',
    'bbbrbbbbbbbbbbbb',
    'babbbbbbbbbbcbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbrbbbb',
    'bbcbbbbbbbryrbbb',
    'bbbbbbbbbbbrbbbb',
    'bbbbabbbbbbbbbab',
    'bbbbbbbbbbbbbbbb',
    'babbbbcbbbbbbbbb',
    'bbbbbbbbbbabbbbb',
    'bbbbbbbbbbbbbbbb'
  ]);
  T('t_flower2', FL, [
    'bbbbbbbbbbbbbbbb',
    'bbbabbbbbbbbbbbb',
    'bbbbbbbbbbcbbbbb',
    'bbrbrbbbbbbbbbab',
    'bbbybbbbbbbbbbbb',
    'bbrbrbbbbbbbbbbb',
    'babbbbbbbbbbcbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbrbrbbb',
    'bbcbbbbbbbbybbbb',
    'bbbbbbbbbbrbrbbb',
    'bbbbabbbbbbbbbab',
    'bbbbbbbbbbbbbbbb',
    'babbbbcbbbbbbbbb',
    'bbbbbbbbbbabbbbb',
    'bbbbbbbbbbbbbbbb'
  ]);

  // ----------------------------------------------------------------- path --
  var PA = { d: C.tan0, e: C.brn3, f: C.tan1 };
  T('t_path', PA, [
    'dddddddddddddddd',
    'ddddedddddddfddd',
    'ddfddddddedddddd',
    'dddddddddddddddd',
    'dedddddfdddddddd',
    'ddddddddddddeddd',
    'dddddedddddddddf',
    'fddddddddddddddd',
    'dddddddddedddddd',
    'ddedddfddddddddd',
    'dddddddddddddedd',
    'dfdddddddddddddd',
    'ddddddeddddfdddd',
    'dddddddddddddddd',
    'dedddddddedddddf',
    'dddddddddddddddd'
  ]);

  // path edges: side that meets grass gets a grass band + dark rim
  var PE = { d: C.tan0, e: C.brn3, f: C.tan1, b: C.leaf2, g: C.brn2 };
  T('t_path_n', PE, [
    'bbbbbbbbbbbbbbbb',
    'gggggggggggggggg',
    'ffddddddfddddddf',
    'dddddddddddddddd',
    'dedddddfdddddddd',
    'ddddddddddddeddd',
    'dddddedddddddddf',
    'fddddddddddddddd',
    'dddddddddedddddd',
    'ddedddfddddddddd',
    'dddddddddddddedd',
    'dfdddddddddddddd',
    'ddddddeddddfdddd',
    'dddddddddddddddd',
    'dedddddddedddddf',
    'dddddddddddddddd'
  ]);
  T('t_path_s', PE, [
    'dddddddddddddddd',
    'ddddedddddddfddd',
    'ddfddddddedddddd',
    'dddddddddddddddd',
    'dedddddfdddddddd',
    'ddddddddddddeddd',
    'dddddedddddddddf',
    'fddddddddddddddd',
    'dddddddddedddddd',
    'ddedddfddddddddd',
    'dddddddddddddedd',
    'dfdddddddddddddd',
    'ddddddeddddfdddd',
    'dddddddddddddddd',
    'gggggggggggggggg',
    'bbbbbbbbbbbbbbbb'
  ]);
  T('t_path_w', PE, [
    'bgdddddddddddddd',
    'bgddedddddddfddd',
    'bgfddddddddddddd',
    'bgdddddddddddddd',
    'bgdddddfdddddddd',
    'bgddddddddddeddd',
    'bgdddedddddddddf',
    'bgdddddddddddddd',
    'bgddddddddeddddd',
    'bgedddfddddddddd',
    'bgdddddddddddedd',
    'bgfddddddddddddd',
    'bgddddeddddfdddd',
    'bgdddddddddddddd',
    'bgddddddddeddddf',
    'bgdddddddddddddd'
  ]);
  T('t_path_e', PE, [
    'ddddddddddddddgb',
    'ddddeddddddddfgb',
    'ddfddddddeddddgb',
    'ddddddddddddddgb',
    'dedddddfddddddgb',
    'dddddddddddeddgb',
    'dddddeddddddddgb',
    'fdddddddddddddgb',
    'dddddddddeddddgb',
    'ddedddfdddddddgb',
    'dddddddddddddegb',
    'dfddddddddddddgb',
    'ddddddedddfdddgb',
    'ddddddddddddddgb',
    'dedddddddeddddgb',
    'ddddddddddddddgb'
  ]);

  // ----------------------------------------------------------------- tree --
  // One big 32x32 tree split into 4 tiles. Tops go on the overhead layer
  // (player walks behind them), bottoms are solid deco. Transparent bg.
  var TR = { o: C.ink, a: C.grn0, b: C.grn1, c: C.grn2, d: C.grn3, t: C.brn1, u: C.brn2 };

  T('t_tree_tl', TR, [
    '................',
    '................',
    '................',
    '................',
    '...........ooooo',
    '..........oddddd',
    '........oodddddc',
    '.......odddccccc',
    '......odddcccccc',
    '.....odddccccccc',
    '....oddcccccbbcc',
    '....odccccccbbcc',
    '...odccccccccccc',
    '...odccccbbccccc',
    '..occcccbbcccccc',
    '..occccccccccccc'
  ]);
  T('t_tree_tr', TR, [
    '................',
    '................',
    '................',
    '................',
    'ooooo...........',
    'ccccbo..........',
    'cccccboo........',
    'ccccccbbo.......',
    'cccccccbbo......',
    'ccccccccbbo.....',
    'ccbbccccccbo....',
    'ccbbcccccccbo...',
    'ccccccccccccbo..',
    'cbbcccccccccbo..',
    'ccccbbccccccbo..',
    'ccccccccccccco..'
  ]);
  T('t_tree_bl', TR, [
    '..occccbbccccccc',
    '..occccbbccccccb',
    '...obccccccccccb',
    '...obcccccbbcccb',
    '....obccccbbcccb',
    '.....obcccccbbbb',
    '......obbccccbbb',
    '.......obbcccbbb',
    '........oobbbbbb',
    '..........oobbbb',
    '............oooo',
    '.............ouu',
    '.............ouu',
    '.............out',
    '.............ouu',
    '............oouu'
  ]);
  T('t_tree_br', TR, [
    'bbccccccbbbbbo..',
    'bccccbbbbbabbo..',
    'ccccbbbbbbbbo...',
    'cbbccccbbbabo...',
    'cccbbcccbbbo....',
    'bbbcccbbbbo.....',
    'bbbbccbbbo......',
    'abbbbbbao.......',
    'bbbbbboo........',
    'bbbboo..........',
    'oooo............',
    'tto.............',
    'tto.............',
    'tuo.............',
    'tto.............',
    'ttoo............'
  ]);

  // ---------------------------------------------------------------- ledge --
  T('t_ledge', { a: C.leaf1, b: C.leaf2, c: C.leaf3, g: C.brn2, h: C.brn1, d: C.tan0 }, [
    'bbbbbbbbbbbbbbbb',
    'bbbabbbbbbabbbbb',
    'bbbbbbcbbbbbbbbb',
    'abbbbbbbbbbbbabb',
    'bbbbabbbbbbbbbbb',
    'bbbbbbbbbcbbbbab',
    'bbcbbbbbbbbbbbbb',
    'bbbbbbabbbbbcbbb',
    'dddddddddddddddd',
    'ddgddddgdddddgdd',
    'gggggggggggggggg',
    'hhhhhhhhhhhhhhhh',
    'bbbbbbbbbbbbbbbb',
    'babbbbbbbcbbbbbb',
    'bbbbabbbbbbbabbb',
    'bbbbbbbbbbbbbbbb'
  ]);

  // ---------------------------------------------------------------- fence --
  T('t_fence', { o: C.ink, r: C.brn3, s: C.brn2, t: C.brn1 }, [
    '................',
    '................',
    '................',
    '..ooo.......ooo.',
    '..oro.......oro.',
    '..oro.......oro.',
    'oooooooooooooooo',
    'rrrrrrrrrrrrrrrr',
    'ssssssssssssssss',
    'oooooooooooooooo',
    '..oto.......oto.',
    '..oto.......oto.',
    '..ooo.......ooo.',
    '................',
    '................',
    '................'
  ]);

  // ----------------------------------------------------------------- sign --
  T('t_sign', { o: C.ink, r: C.brn3, s: C.brn2, t: C.brn1, f: C.tan1 }, [
    '................',
    '..oooooooooooo..',
    '.orffffffffffro.',
    '.orfrrrrrrrrfro.',
    '.orffffffffffro.',
    '.orfrrrrrffffro.',
    '.orffffffffffro.',
    '.orfrrrrrrrffro.',
    '.orffffffffffro.',
    '..oooooooooooo..',
    '......otto......',
    '......otto......',
    '......otto......',
    '......osto......',
    '....oosssoo.....',
    '................'
  ]);

  // ---------------------------------------------------------------- house --
  // red-roof cottage; the lab reuses these grids with a blue/stone palette
  var RF = { o: C.ink, q: C.red3, R: C.red2, r: C.red1 };
  T('t_roof_tl', RF, [
    '..oooooooooooooo',
    '.oqqqqqqqqqqqqqq',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqrrrrrrrrrrrrrr',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqrrrrrrrrrrrrrr',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR'
  ]);
  T('t_roof_tm', RF, [
    'oooooooooooooooo',
    'qqqqqqqqqqqqqqqq',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR'
  ]);
  T('t_roof_tr', RF, [
    'ooooooooooooooo.',
    'qqqqqqqqqqqqqqro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'rrrrrrrrrrrrrrro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'rrrrrrrrrrrrrrro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro'
  ]);
  T('t_roof_bl', RF, [
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqrrrrrrrrrrrrrr',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqrrrrrrrrrrrrrr',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqRRRRRRRRRRRRRR',
    'oqrrrrrrrrrrrrrr',
    'oqRRRRRRRRRRRRRR',
    'oorrrrrrrrrrrrrr',
    'oooooooooooooooo'
  ]);
  T('t_roof_bm', RF, [
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR',
    'rrrrrrrrrrrrrrrr',
    'oooooooooooooooo'
  ]);
  T('t_roof_br', RF, [
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'rrrrrrrrrrrrrrro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'rrrrrrrrrrrrrrro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'RRRRRRRRRRRRRRro',
    'rrrrrrrrrrrrrrro',
    'RRRRRRRRRRRRRRro',
    'rrrrrrrrrrrrrroo',
    'oooooooooooooooo'
  ]);

  var WA = { o: C.ink, w: C.pale, l: C.lgry };
  T('t_wall', WA, [
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'oooooooooooooooo'
  ]);
  T('t_window', { o: C.ink, w: C.pale, l: C.lgry, g: C.blu2, G: C.blu3 }, [
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'lllloooooooollll',
    'wwwwoGGggggowwww',
    'wwwwoGgggggowwww',
    'wwwwoggggggowwww',
    'lllloggggggollll',
    'wwwwoggggggowwww',
    'wwwwoggggggowwww',
    'wwwwoooooooowwww',
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'oooooooooooooooo'
  ]);
  T('t_door', { o: C.ink, w: C.pale, l: C.lgry, D: C.brn2, d: C.brn1, k: C.yel1 }, [
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwoooooooooowww',
    'wwwoDDDDDDDDowww',
    'wwwoDddddddDowww',
    'wwwoDdDDDDdDowww',
    'wwwoDdDDDDdDowww',
    'wwwoDdDDDDdDowww',
    'wwwoDddddddDowww',
    'wwwoDDDDDDkDowww',
    'wwwoDDDDDDDDowww',
    'wwwoDDDDDDDDowww',
    'wwwoDDDDDDDDowww',
    'wwwoDDDDDDDDowww',
    'oooooooooooooooo'
  ]);

  // lab building = palette swaps (blue roof, stone walls) + its own door
  var LRF = { o: C.ink, q: C.blu3, R: C.blu2, r: C.blu1 };
  G.ART.t_lroof_tl = { base: 't_roof_tl', pal: LRF };
  G.ART.t_lroof_tm = { base: 't_roof_tm', pal: LRF };
  G.ART.t_lroof_tr = { base: 't_roof_tr', pal: LRF };
  G.ART.t_lroof_bl = { base: 't_roof_bl', pal: LRF };
  G.ART.t_lroof_bm = { base: 't_roof_bm', pal: LRF };
  G.ART.t_lroof_br = { base: 't_roof_br', pal: LRF };
  G.ART.t_lwall = { base: 't_wall', pal: { o: C.ink, w: C.stn3, l: C.stn2 } };
  G.ART.t_lwindow = { base: 't_window', pal: { o: C.ink, w: C.stn3, l: C.stn2, g: C.blu2, G: C.blu3 } };
  T('t_ldoor', { o: C.ink, w: C.stn3, l: C.stn2, g: C.blu3, G: C.ice3, s: C.stn1 }, [
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwooooooooooooww',
    'wwosggggggggsoww',
    'wwosgGGgggggsoww',
    'wwosgGggggggsoww',
    'wwosggggggggsoww',
    'wwosggggggggsoww',
    'wwosggggggggsoww',
    'wwosgggssgggsoww',
    'wwosgggssgggsoww',
    'wwosgggssgggsoww',
    'wwosgggssgggsoww',
    'wwosgggssgggsoww',
    'wwosgggssgggsoww',
    'oooooooooooooooo'
  ]);

  // ------------------------------------------------------------- interior --
  T('t_ifloor', { f: C.tan1, d: C.tan0 }, [
    'ffffffffdfffffff',
    'ffffffffdfffffff',
    'ffffffffdfffffff',
    'dddddddddddddddd',
    'fdffffffffffffff',
    'fdffffffffffffff',
    'fdffffffffffffff',
    'dddddddddddddddd',
    'ffffffffffffdfff',
    'ffffffffffffdfff',
    'ffffffffffffdfff',
    'dddddddddddddddd',
    'ffffdfffffffffff',
    'ffffdfffffffffff',
    'ffffdfffffffffff',
    'dddddddddddddddd'
  ]);
  T('t_iwall', { o: C.ink, w: C.pale, l: C.lgry, n: C.brn2, m: C.brn1 }, [
    'oooooooooooooooo',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'llllllllllllllll',
    'oooooooooooooooo',
    'nnnnnnnnnnnnnnnn',
    'nmnnnnnmnnnnnmnn',
    'nnnnnnnnnnnnnnnn',
    'mmmmmmmmmmmmmmmm',
    'oooooooooooooooo'
  ]);
  T('t_imat', { a: C.leaf1, b: C.leaf2, c: C.leaf3 }, [
    'aaaaaaaaaaaaaaaa',
    'abbbbbbbbbbbbbba',
    'abccccccccccccba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abcbbbbbbbbbbcba',
    'abccccccccccccba',
    'abbbbbbbbbbbbbba',
    'aaaaaaaaaaaaaaaa'
  ]);
  T('t_itable', { o: C.ink, r: C.brn3, s: C.brn2, t: C.brn1, f: C.tan1 }, [
    '................',
    '................',
    '.oooooooooooooo.',
    'offffffffffffffo',
    'offrrrrrrrrrrffo',
    'offffffffffffffo',
    'oooooooooooooooo',
    'osssssssssssssso',
    'osssssssssssssso',
    'oossssssssssssoo',
    '.otto......otto.',
    '.otto......otto.',
    '.otto......otto.',
    '.otto......otto.',
    '.oooo......oooo.',
    '................'
  ]);
  T('t_ibook', { o: C.ink, t: C.brn1, s: C.brn2, r: C.red2, g: C.grn2, b: C.blu2, y: C.yel1, w: C.pale }, [
    'oooooooooooooooo',
    'otttttttttttttto',
    'otrgbyrwbgryrbto',
    'otrgbyrwbgryrbto',
    'otrgbyrwbgryrbto',
    'otrgbyrwbgryrbto',
    'otooooooooooooto',
    'otbrygwbryggwbto',
    'otbrygwbryggwbto',
    'otbrygwbryggwbto',
    'otbrygwbryggwbto',
    'otooooooooooooto',
    'otywbgrwygbrrgto',
    'otywbgrwygbrrgto',
    'otttttttttttttto',
    'oooooooooooooooo'
  ]);
  T('t_imach', { o: C.ink, s: C.stn1, u: C.stn2, v: C.stn3, r: C.red2, g: C.grn3, b: C.blu3 }, [
    'oooooooooooooooo',
    'ouuuuuuuuuuuuuuo',
    'ouvvvvvvvvvvvvuo',
    'ouvbbbbbbbbbbvuo',
    'ouvbgbgbbbbbbvuo',
    'ouvbbbbbgbbbbvuo',
    'ouvbbbbbbbbbbvuo',
    'ouvvvvvvvvvvvvuo',
    'ouuuuuuuuuuuuuuo',
    'ousrsugsusrsusuo',
    'ouuuuuuuuuuuuuuo',
    'ousgsusrsusgsuso',
    'ouuuuuuuuuuuuuuo',
    'osssssssssssssso',
    'osssssssssssssso',
    'oooooooooooooooo'
  ]);
  T('t_ibed_t', { o: C.ink, t: C.brn1, s: C.brn2, w: C.white, l: C.lgry }, [
    '.oooooooooooooo.',
    'osssssssssssssso',
    'osttttttttttttso',
    'osssssssssssssso',
    'oooooooooooooooo',
    'owwwwwwwwwwwwwwo',
    'owwwwwwwwwwwwllo',
    'owwwwwwwwwwwwllo',
    'owllllllllllllwo',
    'oooooooooooooooo',
    'owwwwwwwwwwwwwwo',
    'owwwwwwwwwwwwwwo',
    'owwwwwwwwwwwwwwo',
    'owwwwwwwwwwwwwwo',
    'owwwwwwwwwwwwwwo',
    'owwwwwwwwwwwwwwo'
  ]);
  T('t_ibed_b', { o: C.ink, r: C.red2, q: C.red1, t: C.brn1, s: C.brn2 }, [
    'orrrrrrrrrrrrrro',
    'orrrrrrrrrrrrrro',
    'oqqqqqqqqqqqqqqo',
    'orrrrrrrrrrrrrro',
    'orrrrrrrrrrrrrro',
    'orrrrrrrrrrrrrro',
    'orrrrrrrrrrrrrro',
    'orrrrrrrrrrrrrro',
    'orrrrrrrrrrrrrro',
    'oqqqqqqqqqqqqqqo',
    'orrrrrrrrrrrrrro',
    'oooooooooooooooo',
    'osssssssssssssso',
    'osttttttttttttso',
    '.oosssssssssoo..',
    '................'
  ]);
  T('t_iplant', { o: C.ink, p: C.brn2, q: C.brn1, g: C.grn2, h: C.grn3, a: C.grn1 }, [
    '................',
    '.....ooooo......',
    '....ohghhgo.....',
    '...ohgghhghgo...',
    '...oghahgahgo...',
    '...ohgghaghgo...',
    '....ogahgago....',
    '.....oogoo......',
    '.....opqpo......',
    '....opqppqo.....',
    '....opppppo.....',
    '.....opppo......',
    '.....ooooo......',
    '................',
    '................',
    '................'
  ]);
  T('t_istool', { o: C.ink, r: C.brn3, t: C.brn1 }, [
    '................',
    '................',
    '................',
    '................',
    '....oooooooo....',
    '...orrrrrrrro...',
    '...orrrrrrrro...',
    '...oooooooooo...',
    '...ot......to...',
    '...ot......to...',
    '...ot......to...',
    '...oo......oo...',
    '................',
    '................',
    '................',
    '................'
  ]);

  // ---------------------------------------------------------------- water --
  var WT = { a: C.blu1, b: C.blu2, c: C.blu3 };
  T('t_water1', WT, [
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbccbbbbbbbbbbbb',
    'bbbbbbbbbbcccbbb',
    'bbbbbbbbbbbbbbbb',
    'babbbbbbbbbbbbbb',
    'bbbbbbbabbbbbbbb',
    'bbbbbbbbbbbbbbcb',
    'bbbbbbbbbbbbbbbb',
    'bbbccbbbbbabbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbccbb',
    'babbbbbbbbbbbbbb',
    'bbbbbbcbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbabbbbb'
  ]);
  T('t_water2', WT, [
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbccbbbbbbbbbbb',
    'bbbbbbbbbbbcccbb',
    'bbbbbbbbbbbbbbbb',
    'bbabbbbbbbbbbbbb',
    'bbbbbbbbabbbbbbb',
    'bbbbbbbbbbbbbbbc',
    'bbbbbbbbbbbbbbbb',
    'bbbbccbbbbbabbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbccb',
    'bbabbbbbbbbbbbbb',
    'bbbbbbbcbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbabbbb'
  ]);
  T('t_water3', WT, [
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbccbbbbbbbbbb',
    'bbbbbbbbbbbbcccb',
    'bbbbbbbbbbbbbbbb',
    'bbbabbbbbbbbbbbb',
    'bbbbbbbbbabbbbbb',
    'cbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbccbbbbbabbb',
    'bbbbbbbbbbbbbbbb',
    'cbbbbbbbbbbbbbcc',
    'bbbabbbbbbbbbbbb',
    'bbbbbbbbcbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbabbb'
  ]);
  G.ART.t_water4 = { base: 't_water2', pal: WT };

  // shores: water with a grass bank on one side
  var SH = { a: C.blu1, b: C.blu2, c: C.blu3, g: C.leaf2, e: C.leaf1 };
  T('t_shore_n', SH, [
    'gggggggggggggggg',
    'eeeeeeeeeeeeeeee',
    'cbcbbcbbbcbbabcb'.replace('a', 'b'),
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'babbbbbbbbbbbbbb',
    'bbbbbbbabbbbbbbb',
    'bbbbbbbbbbbbbbcb',
    'bbbbbbbbbbbbbbbb',
    'bbbccbbbbbabbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbccbb',
    'babbbbbbbbbbbbbb',
    'bbbbbbcbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbabbbbb'
  ]);
  T('t_shore_s', SH, [
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbccbbbbbbbbbbbb',
    'bbbbbbbbbbcccbbb',
    'bbbbbbbbbbbbbbbb',
    'babbbbbbbbbbbbbb',
    'bbbbbbbabbbbbbbb',
    'bbbbbbbbbbbbbbcb',
    'bbbbbbbbbbbbbbbb',
    'bbbccbbbbbabbbbb',
    'bbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbccbb',
    'babbbbbbbbbbbbbb',
    'bbbbbbcbbbbbbbbb',
    'eeeeeeeeeeeeeeee',
    'gggggggggggggggg'
  ]);
  T('t_shore_w', SH, [
    'gebbbbbbbbbbbbbb',
    'gebbbbbbbbbbbbbb',
    'gebbccbbbbbbbbbb',
    'gebbbbbbbbcccbbb',
    'gebbbbbbbbbbbbbb',
    'gebbbbbbbbbbbbbb',
    'gebbbbbabbbbbbbb',
    'gebbbbbbbbbbbbcb',
    'gebbbbbbbbbbbbbb',
    'gebbccbbbbabbbbb',
    'gebbbbbbbbbbbbbb',
    'gebbbbbbbbbbccbb',
    'gebbbbbbbbbbbbbb',
    'gebbbbcbbbbbbbbb',
    'gebbbbbbbbbbbbbb',
    'gebbbbbbbbabbbbb'
  ]);
  T('t_shore_e', SH, [
    'bbbbbbbbbbbbbbeg',
    'bbbbbbbbbbbbbbeg',
    'bbccbbbbbbbbbbeg',
    'bbbbbbbbbcccbbeg',
    'bbbbbbbbbbbbbbeg',
    'babbbbbbbbbbbbeg',
    'bbbbbbbabbbbbbeg',
    'bbbbbbbbbbbbbbeg',
    'bbbbbbbbbbbbbbeg',
    'bbbccbbbbbabbbeg',
    'bbbbbbbbbbbbbbeg',
    'bbbbbbbbbbccbbeg',
    'babbbbbbbbbbbbeg',
    'bbbbbbcbbbbbbbeg',
    'bbbbbbbbbbbbbbeg',
    'bbbbbbbbbbabbbeg'
  ]);

  // ----------------------------------------------------------------- sand --
  T('t_sand', { d: C.tan1, e: C.tan0, f: C.brn3 }, [
    'dddddddddddddddd',
    'ddddeddddddddddd',
    'dddddddddddeddddd'.slice(0, 16),
    'dddddddddddddddd',
    'ddfddddddddddddd',
    'dddddddddeddddddd'.slice(0, 16),
    'dddddddddddddddd',
    'dddddedddddddfdd',
    'dddddddddddddddd',
    'dedddddddddddddd',
    'ddddddddddedddddd'.slice(0, 16),
    'dddddddddddddddd',
    'dddfddddddddeddd',
    'dddddddddddddddd',
    'ddddddedddddddddd'.slice(0, 16),
    'dddddddddddddddd'
  ]);

  // ----------------------------------------------------------------- cliff --
  T('t_cliff', { s: C.stn1, t: C.stn0, u: C.stn2 }, [
    'uuuuuuuuuuuuuuuu',
    'ssssssssssssssss',
    'ssssssssssssssss',
    'sstssssssstsssss',
    'ssssssssssssssss',
    'tttsssssssssttts',
    'ssssssssssssssss',
    'ssssssstssssssss',
    'ssssssssssssssss',
    'stsssssssssstsss',
    'ssssssssssssssss',
    'ssstttsssssssstt',
    'ssssssssssssssss',
    'sssssssssstsssss',
    'tsssssssssssssss',
    'tttttttttttttttt'
  ]);
  T('t_rock', { o: C.ink, s: C.stn2, t: C.stn1, u: C.stn3 }, [
    '................',
    '................',
    '................',
    '.....oooooo.....',
    '...oouuuuusoo...',
    '..ouuuuussssso..',
    '..ouuussssssso..',
    '.ouusssssssstto.'.replace('tt', 'ts'),
    '.ousssssssstssо.'.replace('о', 'o'),
    '.ossssstsssssto.',
    '.osstssssssssto.',
    '..ossssssttsto..',
    '..otssssssstto..',
    '...oottssttoo...',
    '.....oooooo.....',
    '................'
  ]);

  // ------------------------------------------------------------------ cave --
  T('t_cavefloor', { s: C.stn1, t: C.stn0, u: C.stn2 }, [
    'ssssssssssssssss',
    'ssssusssssssssss',
    'ssssssssssstssss',
    'ssssssssssssssss',
    'sstsssssusssssss',
    'ssssssssssssssss',
    'ssssssstssssssss',
    'sussssssssssssts',
    'ssssssssssssssss',
    'ssssstssssssssss',
    'ssssssssssussses'.replace('e', 's'),
    'stssssssssssssss',
    'ssssssssstssssss',
    'ssssssssssssssss',
    'ssussssssssstsss',
    'ssssssssssssssss'
  ]);
  T('t_cavewall', { o: C.ink, s: C.stn0, t: C.stn1, u: C.stn2 }, [
    'tttttttttttttttt',
    'tutttttttutttttt',
    'tttttttttttttttt',
    'ttttttuttttttutt',
    'tttttttttttttttt',
    'oooooooooooooooo',
    'sssssssssssssss s'.slice(0, 16),
    'ssosssssossssoss',
    'ssssssssssssssss',
    'sossssossssossss',
    'ssssssssssssssss',
    'ssssossssossssos',
    'ssssssssssssssss',
    'sossssssosssssss',
    'ssssssssssssssss',
    'ssssssssssssssss'
  ]);
  T('t_crystal', { o: C.ink, c: C.ice2, i: C.ice3, p: C.pur2, s: C.stn1 }, [
    '................',
    '......o.........',
    '.....oco........',
    '.....ocio..oo...',
    '....ocico.oco...',
    '....ocico.oco...',
    '...ociicооico...'.replace('оо', 'oo'),
    '...ociico.oico..',
    '...ociico.oico..',
    '..ociiicоoiico..'.replace('о', 'o'),
    '..ociiiicоiicо..'.replace(/о/g, 'o'),
    '..oiiciicоiico..'.replace('о', 'o'),
    '..ooooooooooo...',
    '..osssssssssо...'.replace('о', 'o'),
    '...ooooooooo....',
    '................'
  ]);
  T('t_stairs', { o: C.ink, s: C.stn1, t: C.stn0, u: C.stn2 }, [
    'oooooooooooooooo',
    'ouuuuuuuuuuuuuuо'.replace('о', 'o'),
    'osssssssssssssso',
    'otttttttttttttto',
    'oooooooooooooooo',
    'ouuuuuuuuuuuuuuо'.replace('о', 'o'),
    'osssssssssssssso',
    'otttttttttttttto',
    'oooooooooooooooo',
    'ouuuuuuuuuuuuuuо'.replace('о', 'o'),
    'osssssssssssssso',
    'otttttttttttttto',
    'oooooooooooooooo',
    'ouuuuuuuuuuuuuuо'.replace('о', 'o'),
    'osssssssssssssso',
    'oooooooooooooooo'
  ]);

  // ------------------------------ rooftop markers (heal / shop / gym) -------
  T('t_hroofx', { o: C.ink, R: C.pnk1, r: C.pnk0, w: C.white }, [
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRooooooRRRRR',
    'RRRRRowwwwoRRRRR',
    'RRoooowwwwooooRR',
    'RRowwwwwwwwwwoRR',
    'RRowwwwwwwwwwoRR',
    'RRowwwwwwwwwwoRR',
    'RRowwwwwwwwwwoRR',
    'RRoooowwwwooooRR',
    'RRRRRowwwwoRRRRR',
    'RRRRRowwwwoRRRRR',
    'RRRRRooooooRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR'
  ]);
  T('t_sroofx', { o: C.ink, R: C.grn2, r: C.grn1, y: C.yel1, Y: C.yel2 }, [
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRooooooRRRRR',
    'RRRooyyyyyyooRRR',
    'RRoyyYYyyyyyyoRR',
    'RRoyYyyyyooyyoRR',
    'RRoyYyyyoyyyyoRR',
    'RRoyyyyoyyyyyoRR',
    'RRoyyyoyyyyYyoRR',
    'RRoyyoyyyyyYyoRR',
    'RRoyyyyyyYYyyoRR',
    'RRRooyyyyyyooRRR',
    'RRRRRooooooRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR'
  ]);
  T('t_lroofx', { o: C.ink, R: C.blu2, r: C.blu1, y: C.yel1, Y: C.yel2 }, [
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRRRRRRRRRR',
    'RRRRRRRooRRRRRRR',
    'RRRRRRoYYoRRRRRR',
    'RRRRRoYYYYoRRRRR',
    'RRRRoYYyyYYoRRRR',
    'RRRoYYyyyyYYoRRR',
    'RRoYYyyyyyyYYoRR',
    'RRoyYyyyyyyYyoRR',
    'RRRoyYyyyyYyoRRR',
    'RRRRoyYyyYyoRRRR',
    'RRRRRoyyyyoRRRRR',
    'RRRRRRoyyoRRRRRR',
    'RRRRRRRooRRRRRRR',
    'rrrrrrrrrrrrrrrr',
    'RRRRRRRRRRRRRRRR'
  ]);

  // ------------------------------------- heal / shop / gym facade pieces ----
  G.ART.t_hroof_tl = { base: 't_roof_tl', pal: { o: C.ink, q: C.pnk2, R: C.pnk1, r: C.pnk0 } };
  G.ART.t_hroof_tm = { base: 't_roof_tm', pal: { o: C.ink, q: C.pnk2, R: C.pnk1, r: C.pnk0 } };
  G.ART.t_hroof_tr = { base: 't_roof_tr', pal: { o: C.ink, q: C.pnk2, R: C.pnk1, r: C.pnk0 } };
  G.ART.t_hroof_bl = { base: 't_roof_bl', pal: { o: C.ink, q: C.pnk2, R: C.pnk1, r: C.pnk0 } };
  G.ART.t_hroof_bm = { base: 't_roof_bm', pal: { o: C.ink, q: C.pnk2, R: C.pnk1, r: C.pnk0 } };
  G.ART.t_hroof_br = { base: 't_roof_br', pal: { o: C.ink, q: C.pnk2, R: C.pnk1, r: C.pnk0 } };
  G.ART.t_sroof_tl = { base: 't_roof_tl', pal: { o: C.ink, q: C.grn3, R: C.grn2, r: C.grn1 } };
  G.ART.t_sroof_tm = { base: 't_roof_tm', pal: { o: C.ink, q: C.grn3, R: C.grn2, r: C.grn1 } };
  G.ART.t_sroof_tr = { base: 't_roof_tr', pal: { o: C.ink, q: C.grn3, R: C.grn2, r: C.grn1 } };
  G.ART.t_sroof_bl = { base: 't_roof_bl', pal: { o: C.ink, q: C.grn3, R: C.grn2, r: C.grn1 } };
  G.ART.t_sroof_bm = { base: 't_roof_bm', pal: { o: C.ink, q: C.grn3, R: C.grn2, r: C.grn1 } };
  G.ART.t_sroof_br = { base: 't_roof_br', pal: { o: C.ink, q: C.grn3, R: C.grn2, r: C.grn1 } };

  T('t_healsign', { o: C.ink, w: C.pale, l: C.lgry, r: C.pnk1, R: C.pnk2 }, [
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwooooooooooooww',
    'wwowwwwwwwwwwoww',
    'wwowwwRRwwwwwoww',
    'wwowwRRRRwwwwoww',
    'wwowRRrRRRwwwoww',
    'wwowRRRRRRwwwoww',
    'wwowwRRRRwwwwoww',
    'wwowwwRRwwwwwoww',
    'wwowwwwwwwwwwoww',
    'wwooooooooooooww',
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'oooooooooooooooo'
  ]);
  T('t_shopsign', { o: C.ink, w: C.pale, l: C.lgry, y: C.yel1, Y: C.yel2 }, [
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwooooooooooooww',
    'wwowwwwwwwwwwoww',
    'wwowwyyyyywwwoww',
    'wwowyYyyyyywwoww',
    'wwowyyoyoyywwoww',
    'wwowyyyyyyywwoww',
    'wwowyyoooyywwoww',
    'wwowwyyyyywwwoww',
    'wwowwwwwwwwwwoww',
    'wwooooooooooooww',
    'llllllllllllllll',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'oooooooooooooooo'
  ]);
  T('t_gymdoor', { o: C.ink, w: C.stn3, l: C.stn2, s: C.stn1, y: C.yel1 }, [
    'llllllllllllllll',
    'wwooooooooooooww',
    'wwossssssssssoww',
    'wwossyssssyssoww',
    'wwossssssssssoww',
    'wwossssyyssssoww',
    'wwosssyyyysssoww',
    'wwossssyyssssoww',
    'wwossssssssssoww',
    'wwossossossssoww',
    'wwossossossssoww',
    'wwossossossssoww',
    'wwossossossssoww',
    'wwossossossssoww',
    'wwossossossssoww',
    'oooooooooooooooo'
  ]);

  // ----------------------------------------------- more interior pieces ----
  T('t_icounter', { o: C.ink, r: C.brn3, s: C.brn2, t: C.brn1, f: C.tan1 }, [
    'oooooooooooooooo',
    'offffffffffffffо'.replace('о', 'o'),
    'offrrrrrrrrrrffo',
    'offffffffffffffо'.replace('о', 'o'),
    'oooooooooooooooo',
    'osssssssssssssso',
    'ossttssttssttsso',
    'osssssssssssssso',
    'ossttssttssttsso',
    'osssssssssssssso',
    'ossttssttssttsso',
    'osssssssssssssso',
    'osssssssssssssso',
    'otttttttttttttto',
    'oooooooooooooooo',
    '................'
  ]);
  T('t_ihealm', { o: C.ink, s: C.stn1, u: C.stn2, v: C.stn3, r: C.red2, g: C.grn3, w: C.white }, [
    'oooooooooooooooo',
    'ouuuuuuuuuuuuuuo',
    'ouvvvvvvvvvvvvuo',
    'ouvwwwwwwwwwwvuo',
    'ouvwrgrgrgrgwvuo',
    'ouvwwwwwwwwwwvuo',
    'ouvvvvvvvvvvvvuo',
    'ouuuuuuuuuuuuuuo',
    'ousosososososuuo',
    'ouuuuuuuuuuuuuuo',
    'ousususususususo',
    'ouuuuuuuuuuuuuuo',
    'osssssssssssssso',
    'osssssssssssssso',
    'oooooooooooooooo',
    '................'
  ]);
  T('t_gfloor', { s: C.stn3, t: C.stn2, u: C.pale }, [
    'ssssssssssssssss',
    'stttttttttttttts',
    'stssssssssssssts',
    'stsusssssssussts',
    'stssssssssssssts',
    'stssssssssssssts',
    'stsssssttsssssts',
    'stsssstuutssssts',
    'stsssstuutssssts',
    'stsssssttsssssts',
    'stssssssssssssts',
    'stssssssssssssts',
    'stsusssssssussts',
    'stssssssssssssts',
    'stttttttttttttts',
    'ssssssssssssssss'
  ]);
  T('t_redcarpet', { r: C.red1, q: C.red2, y: C.yel1 }, [
    'yqqqqqqqqqqqqqqy',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'qrrrrrrrrrrrrrrq',
    'yqqqqqqqqqqqqqqy'
  ]);
  T('t_statue', { o: C.ink, s: C.stn2, t: C.stn1, u: C.stn3 }, [
    '................',
    '.....oooo.......',
    '....ouuuso......',
    '....oussso......',
    '.....ossо.......'.replace('о', 'o'),
    '....ouusso......',
    '...ouusssso.....',
    '...oussssto.....',
    '...oussssto.....',
    '....osssto......',
    '....ossstо......'.replace('о', 'o'),
    '...oossssoo.....',
    '..ouussssstо....'.replace('о', 'o'),
    '..ousssssssto...',
    '..ooooooooooo...',
    '................'
  ]);

  // ==========================================================================
  // G.TILES — gameplay properties. img/anim reference G.ART names.
  // solid blocks walking; grass rolls wild encounters; ledge hops one way.
  // ==========================================================================
  G.TILES = {
    grass:     { img: 't_grass' },
    grass2:    { img: 't_grass2' },
    tallgrass: { img: 't_tallgrass', grass: true },
    flower:    { anim: ['t_flower1', 't_flower2'], animSpeed: 32 },
    path:      { img: 't_path' },
    path_n:    { img: 't_path_n' },
    path_s:    { img: 't_path_s' },
    path_e:    { img: 't_path_e' },
    path_w:    { img: 't_path_w' },
    tree_tl:   { img: 't_tree_tl', solid: true },
    tree_tr:   { img: 't_tree_tr', solid: true },
    tree_bl:   { img: 't_tree_bl', solid: true },
    tree_br:   { img: 't_tree_br', solid: true },
    ledge:     { img: 't_ledge', ledge: 'down' },
    fence:     { img: 't_fence', solid: true },
    sign:      { img: 't_sign', solid: true },

    roof_tl: { img: 't_roof_tl', solid: true }, roof_tm: { img: 't_roof_tm', solid: true },
    roof_tr: { img: 't_roof_tr', solid: true }, roof_bl: { img: 't_roof_bl', solid: true },
    roof_bm: { img: 't_roof_bm', solid: true }, roof_br: { img: 't_roof_br', solid: true },
    wall:    { img: 't_wall', solid: true },    window: { img: 't_window', solid: true },
    door:    { img: 't_door' },

    lroof_tl: { img: 't_lroof_tl', solid: true }, lroof_tm: { img: 't_lroof_tm', solid: true },
    lroof_tr: { img: 't_lroof_tr', solid: true }, lroof_bl: { img: 't_lroof_bl', solid: true },
    lroof_bm: { img: 't_lroof_bm', solid: true }, lroof_br: { img: 't_lroof_br', solid: true },
    lwall:    { img: 't_lwall', solid: true },    lwindow: { img: 't_lwindow', solid: true },
    ldoor:    { img: 't_ldoor' },

    ifloor: { img: 't_ifloor' },
    iwall:  { img: 't_iwall', solid: true },
    imat:   { img: 't_imat' },
    itable: { img: 't_itable', solid: true },
    ibook:  { img: 't_ibook', solid: true },
    imach:  { img: 't_imach', solid: true },
    ibed_t: { img: 't_ibed_t', solid: true },
    ibed_b: { img: 't_ibed_b', solid: true },
    iplant: { img: 't_iplant', solid: true },
    istool: { img: 't_istool', solid: true },

    water:   { anim: ['t_water1', 't_water2', 't_water3', 't_water4'], animSpeed: 24, solid: true },
    shore_n: { img: 't_shore_n', solid: true },
    shore_s: { img: 't_shore_s', solid: true },
    shore_w: { img: 't_shore_w', solid: true },
    shore_e: { img: 't_shore_e', solid: true },
    sand:    { img: 't_sand' },
    cliff:   { img: 't_cliff', solid: true },
    rock:    { img: 't_rock', solid: true },

    cavefloor: { img: 't_cavefloor' },
    cavewall:  { img: 't_cavewall', solid: true },
    crystal:   { img: 't_crystal', solid: true },
    stairs:    { img: 't_stairs' },

    hroof_tl: { img: 't_hroof_tl', solid: true }, hroof_tm: { img: 't_hroof_tm', solid: true },
    hroof_tr: { img: 't_hroof_tr', solid: true }, hroof_bl: { img: 't_hroof_bl', solid: true },
    hroof_bm: { img: 't_hroof_bm', solid: true }, hroof_br: { img: 't_hroof_br', solid: true },
    sroof_tl: { img: 't_sroof_tl', solid: true }, sroof_tm: { img: 't_sroof_tm', solid: true },
    sroof_tr: { img: 't_sroof_tr', solid: true }, sroof_bl: { img: 't_sroof_bl', solid: true },
    sroof_bm: { img: 't_sroof_bm', solid: true }, sroof_br: { img: 't_sroof_br', solid: true },
    healsign: { img: 't_healsign', solid: true },
    hroofx: { img: 't_hroofx', solid: true },
    sroofx: { img: 't_sroofx', solid: true },
    lroofx: { img: 't_lroofx', solid: true },
    shopsign: { img: 't_shopsign', solid: true },
    gymdoor:  { img: 't_gymdoor' },

    icounter: { img: 't_icounter', solid: true },
    ihealm:   { img: 't_ihealm', solid: true },
    gfloor:   { img: 't_gfloor' },
    redcarpet:{ img: 't_redcarpet' },
    statue:   { img: 't_statue', solid: true }
  };
})();


