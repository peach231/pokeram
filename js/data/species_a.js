// Pokéram — species_a.js
// Solyn regional dex, entries 001–049. (species_b.js has 050–100.)
// sp(id, key, name, types, rarity, [hp,atk,def,spa,spd,spe], evolvesTo, evolveLevel, learnset, dex)
// catchRate/expYield derive from rarity + evolution stage unless overridden.

(function () {
  G.SPECIES = G.SPECIES || {};
  G.DEX_ORDER = G.DEX_ORDER || [];

  var CATCH = { starter: 45, common: 190, uncommon: 120, rare: 60, elusive: 25, legendary: 3 };

  G.defSpecies = function (id, key, name, types, rarity, base, evolvesTo, evolveLevel, learnset, dex, opts) {
    opts = opts || {};
    var b = { hp: base[0], atk: base[1], def: base[2], spa: base[3], spd: base[4], spe: base[5] };
    var bst = base[0] + base[1] + base[2] + base[3] + base[4] + base[5];
    var stage = opts.stage || (evolvesTo ? (opts.mid ? 2 : 1) : (opts.final ? 3 : 0));
    var yieldMul = stage === 1 ? 0.22 : stage === 2 ? 0.32 : stage === 3 ? 0.42 : 0.35;
    if (rarity === 'legendary') yieldMul = 0.45;
    G.SPECIES[key] = {
      id: id, key: key, name: name, types: types, rarity: rarity,
      base: b,
      catchRate: opts.catchRate || CATCH[rarity],
      expYield: opts.expYield || Math.round(bst * yieldMul),
      evolvesTo: evolvesTo || null, evolveLevel: evolveLevel || 0,
      learnset: learnset, dex: dex
    };
    G.DEX_ORDER.push(key);
  };
  var sp = G.defSpecies;

  // ===== starters ==========================================================
  sp(1, 'sproutle', 'Sproutle', ['grass'], 'starter', [55, 55, 60, 45, 60, 40], 'verdoise', 16,
    [[1, 'tackle'], [1, 'growl'], [6, 'leaflash'], [11, 'stoneskin'], [14, 'razorleaf']],
    'A sapling sprouts from its shell. It naps in warm soil to help the sprout grow.');
  sp(2, 'verdoise', 'Verdoise', ['grass'], 'starter', [70, 75, 85, 55, 80, 45], 'gaiadome', 36,
    [[1, 'tackle'], [1, 'growl'], [1, 'leaflash'], [11, 'stoneskin'], [14, 'razorleaf'], [19, 'sapbite'], [24, 'thornburst'], [30, 'bodyslam']],
    'Its shell hardens into living bark. Whole gardens take root along its back.', { mid: true });
  sp(3, 'gaiadome', 'Gaiadome', ['grass', 'ground'], 'starter', [95, 105, 120, 65, 95, 50], null, 0,
    [[1, 'tackle'], [1, 'growl'], [1, 'leaflash'], [1, 'stoneskin'], [14, 'razorleaf'], [19, 'sapbite'], [24, 'thornburst'], [30, 'bodyslam'], [36, 'quakeslam'], [42, 'solarlance']],
    'A walking hill. Travelers camp on its mossy dome without ever noticing it breathe.', { final: true });

  sp(4, 'aquilet', 'Aquilet', ['water'], 'starter', [45, 50, 40, 60, 50, 70], 'streagle', 16,
    [[1, 'scratch'], [1, 'growl'], [6, 'bubbleshot'], [11, 'tailwind'], [14, 'wingcut']],
    'An eaglet that fishes before it can fly, diving from rocks with fearless aim.');
  sp(5, 'streagle', 'Streagle', ['water'], 'starter', [60, 60, 50, 85, 65, 90], 'torrentalon', 36,
    [[1, 'scratch'], [1, 'growl'], [1, 'bubbleshot'], [11, 'tailwind'], [14, 'wingcut'], [19, 'surgewave'], [24, 'divebomb'], [30, 'ripcurrent']],
    'It skims rivers at full speed, wingtips slicing twin lines through the water.', { mid: true });
  sp(6, 'torrentalon', 'Torrentalon', ['water', 'flying'], 'starter', [75, 85, 70, 110, 80, 115], null, 0,
    [[1, 'scratch'], [1, 'growl'], [1, 'bubbleshot'], [1, 'tailwind'], [14, 'wingcut'], [19, 'surgewave'], [24, 'divebomb'], [30, 'ripcurrent'], [36, 'galeforce'], [42, 'torrentbeam']],
    'Storm clouds follow its wake. Sailors read its flight path to predict the tide.', { final: true });

  sp(7, 'emberynx', 'Emberpaw', ['fire'], 'starter', [45, 65, 40, 55, 40, 70], 'pyranther', 16,
    [[1, 'scratch'], [1, 'growl'], [6, 'embershot'], [11, 'quickstrike'], [14, 'flamewheel']],
    'A panther cub with smoldering paws. It stalks embers like prey.');
  sp(8, 'pyranther', 'Pyranther', ['fire'], 'starter', [55, 85, 50, 70, 50, 100], 'umbranther', 36,
    [[1, 'scratch'], [1, 'growl'], [1, 'embershot'], [11, 'quickstrike'], [14, 'flamewheel'], [19, 'shadowsnap'], [24, 'scorchfang'], [30, 'slash']],
    'It hunts at dusk, its coat dimming to coal-black between strides.', { mid: true });
  sp(9, 'umbranther', 'Umbranther', ['fire', 'dark'], 'starter', [70, 120, 65, 95, 60, 120], null, 0,
    [[1, 'scratch'], [1, 'growl'], [1, 'embershot'], [1, 'quickstrike'], [14, 'flamewheel'], [19, 'shadowsnap'], [24, 'scorchfang'], [30, 'slash'], [36, 'duskfang'], [42, 'blazerush']],
    'Only its burning eyes betray it in the dark. Prey see two sparks, then nothing.', { final: true });

  sp(10, 'pebblamb', 'Pebblamb', ['ground'], 'starter', [60, 65, 60, 35, 50, 45], 'bouldram', 16,
    [[1, 'tackle'], [1, 'growl'], [6, 'mudshot'], [11, 'sharpen'], [14, 'earthjab']],
    'Its wool collects pebbles as it grazes. The clatter announces it long before it arrives.');
  sp(11, 'bouldram', 'Bouldram', ['ground'], 'starter', [75, 85, 85, 40, 65, 60], 'ferrobex', 36,
    [[1, 'tackle'], [1, 'growl'], [1, 'mudshot'], [11, 'sharpen'], [14, 'earthjab'], [19, 'stonefling'], [24, 'burrowstrike'], [30, 'takedown']],
    'It settles arguments by headbutting boulders in half. The boulders started it.', { mid: true });
  sp(12, 'ferrobex', 'Ferrobex', ['ground', 'steel'], 'starter', [95, 115, 110, 55, 85, 70], null, 0,
    [[1, 'tackle'], [1, 'growl'], [1, 'mudshot'], [1, 'sharpen'], [14, 'earthjab'], [19, 'stonefling'], [24, 'burrowstrike'], [30, 'takedown'], [36, 'ironbash'], [42, 'quakeslam']],
    'Its horns ring like struck anvils. Miners follow the sound to rich iron veins.', { final: true });

  // ===== early routes ======================================================
  sp(13, 'cheepit', 'Cheepit', ['normal', 'flying'], 'common', [40, 45, 35, 30, 30, 55], 'swiftrel', 14,
    [[1, 'tackle'], [1, 'growl'], [5, 'wingcut'], [9, 'quickstrike'], [13, 'tailwind']],
    'It cheeps at sunrise with absolute confidence and zero sense of pitch.');
  sp(14, 'swiftrel', 'Swiftrel', ['normal', 'flying'], 'common', [55, 60, 45, 40, 40, 80], 'falconade', 30,
    [[1, 'tackle'], [1, 'growl'], [1, 'wingcut'], [9, 'quickstrike'], [13, 'tailwind'], [18, 'divebomb'], [24, 'slash']],
    'It races carriages along the routes and always pulls ahead at the finish.', { mid: true });
  sp(15, 'falconade', 'Falconade', ['normal', 'flying'], 'common', [70, 85, 60, 50, 55, 110], null, 0,
    [[1, 'tackle'], [1, 'growl'], [1, 'wingcut'], [1, 'quickstrike'], [13, 'tailwind'], [18, 'divebomb'], [24, 'slash'], [32, 'galeforce'], [38, 'takedown']],
    'Its dives crack the air like a whip. Champions consider one a badge in itself.', { final: true });

  sp(16, 'nibbit', 'Nibbit', ['normal'], 'common', [38, 52, 35, 30, 35, 50], 'gnawdger', 15,
    [[1, 'tackle'], [1, 'growl'], [6, 'quickstrike'], [10, 'scratch'], [14, 'slash']],
    'It gnaws fence posts to keep its teeth short. Farmers keep spares on hand.');
  sp(17, 'gnawdger', 'Gnawdger', ['normal'], 'common', [65, 90, 60, 40, 55, 80], null, 0,
    [[1, 'tackle'], [1, 'growl'], [1, 'quickstrike'], [10, 'scratch'], [14, 'slash'], [19, 'screech'], [25, 'bodyslam'], [31, 'takedown']],
    'Its incisors never stop growing. Neither, apparently, does its appetite.', { final: true });

  sp(18, 'silklit', 'Silklit', ['bug'], 'common', [35, 35, 35, 30, 30, 45], 'cocoonix', 9,
    [[1, 'tackle'], [1, 'silkbind'], [5, 'nipperbite']],
    'It trails a silk thread wherever it goes so it can always find its way home.');
  sp(19, 'cocoonix', 'Cocoonix', ['bug'], 'common', [45, 35, 60, 30, 45, 30], 'mothrall', 13,
    [[1, 'tackle'], [1, 'silkbind'], [1, 'nipperbite'], [10, 'stoneskin']],
    'It dreams inside its shell. Faint lights flicker beneath the silk near dawn.', { mid: true });
  sp(20, 'mothrall', 'Mothrall', ['bug', 'psychic'], 'common', [65, 45, 55, 85, 70, 80], null, 0,
    [[1, 'tackle'], [1, 'silkbind'], [1, 'nipperbite'], [13, 'mindpulse'], [17, 'buzzdrain'], [22, 'hypnolull'], [28, 'psyblade'], [34, 'calmfocus']],
    'The eyespots on its wings blink out of sync with each other. Staring is unwise.', { final: true });

  sp(21, 'fernfawn', 'Fernfawn', ['grass'], 'uncommon', [45, 50, 40, 45, 45, 55], 'thornbuck', 18,
    [[1, 'tackle'], [1, 'growl'], [6, 'leaflash'], [11, 'sapbite'], [15, 'quickstrike']],
    'Ferns unfurl from its antler nubs in spring. It is shy about the fuzzy stage.');
  sp(22, 'thornbuck', 'Thornbuck', ['grass'], 'uncommon', [60, 70, 55, 60, 60, 75], 'sylvastag', 36,
    [[1, 'tackle'], [1, 'growl'], [1, 'leaflash'], [11, 'sapbite'], [15, 'quickstrike'], [21, 'razorleaf'], [27, 'thornburst'], [32, 'sharpen']],
    'Its antlers grow real thorns. Rivals tangle once and remember forever.', { mid: true });
  sp(23, 'sylvastag', 'Sylvastag', ['grass', 'fairy'], 'uncommon', [80, 85, 70, 85, 85, 95], null, 0,
    [[1, 'tackle'], [1, 'growl'], [1, 'leaflash'], [1, 'sapbite'], [15, 'quickstrike'], [21, 'razorleaf'], [27, 'thornburst'], [32, 'moonglow'], [38, 'solarlance'], [44, 'faeburst']],
    'Moonlight pools in its antlers. Lost travelers follow it and arrive somewhere kinder.', { final: true });

  sp(24, 'scrapling', 'Scrapling', ['fighting'], 'common', [45, 60, 45, 30, 35, 50], 'brawlock', 20,
    [[1, 'swiftjab'], [1, 'growl'], [7, 'counterpalm'], [13, 'sharpen']],
    'It picks fights with signposts and loses gracefully. Practice is practice.');
  sp(25, 'brawlock', 'Brawlock', ['fighting'], 'common', [70, 95, 70, 40, 55, 70], null, 0,
    [[1, 'swiftjab'], [1, 'growl'], [1, 'counterpalm'], [13, 'sharpen'], [20, 'risingkick'], [26, 'bulkup'], [33, 'titanfist']],
    'It bows to every opponent, then hits like a landslide with manners.', { final: true });

  sp(26, 'shalite', 'Shalite', ['rock'], 'common', [40, 55, 70, 30, 45, 25], 'boulderon', 22,
    [[1, 'tackle'], [1, 'stonefling'], [8, 'stoneskin'], [14, 'mudshot']],
    'It naps wedged in cliff faces. Climbers apologize when they grab one by mistake.');
  sp(27, 'boulderon', 'Boulderon', ['rock'], 'common', [65, 90, 115, 40, 60, 35], null, 0,
    [[1, 'tackle'], [1, 'stonefling'], [1, 'stoneskin'], [14, 'mudshot'], [22, 'boulderslam'], [28, 'screech'], [35, 'gravelstorm']],
    'Moss on its back marks its age in rings. The oldest are practically hills.', { final: true });

  sp(28, 'finling', 'Finling', ['water'], 'uncommon', [40, 55, 45, 40, 40, 60], 'marlance', 21,
    [[1, 'tackle'], [1, 'bubbleshot'], [7, 'aquajet'], [13, 'mistspray']],
    'Its nose grows into a blade as it matures. For now it just pokes things curiously.');
  sp(29, 'marlance', 'Marlance', ['water', 'steel'], 'uncommon', [70, 95, 85, 55, 65, 95], null, 0,
    [[1, 'tackle'], [1, 'bubbleshot'], [1, 'aquajet'], [13, 'mistspray'], [21, 'metaljab'], [26, 'surgewave'], [32, 'ironbash'], [38, 'torrentbeam']],
    'Its bill is tempered like forged steel. It fences with breakwaters for fun.', { final: true });

  sp(30, 'sparkit', 'Sparkit', ['electric'], 'common', [35, 45, 35, 55, 40, 70], 'voltail', 24,
    [[1, 'scratch'], [1, 'sparkjolt'], [8, 'quickstrike'], [14, 'staticnet']],
    'Its fur crackles when excited, which is always. Do not pet without grounding.');
  sp(31, 'voltail', 'Voltail', ['electric'], 'common', [55, 65, 50, 85, 60, 105], null, 0,
    [[1, 'scratch'], [1, 'sparkjolt'], [1, 'quickstrike'], [14, 'staticnet'], [24, 'voltlash'], [30, 'chargeup'], [37, 'thunderbreak']],
    'Its twin tails arc with current. Towns once used them as living lighthouses.', { final: true });

  sp(32, 'moleling', 'Moleling', ['ground'], 'uncommon', [50, 60, 55, 35, 40, 40], 'terradon', 23,
    [[1, 'scratch'], [1, 'mudshot'], [8, 'sandveil'], [14, 'earthjab']],
    'It surfaces nose-first to sniff the weather, then reports back to the burrow.');
  sp(33, 'terradon', 'Terradon', ['ground'], 'uncommon', [85, 95, 90, 45, 60, 55], null, 0,
    [[1, 'scratch'], [1, 'mudshot'], [1, 'sandveil'], [14, 'earthjab'], [23, 'burrowstrike'], [29, 'bulkup'], [36, 'quakeslam']],
    'Its claws carve tunnels wide enough for wagons. Mining guilds court it shamelessly.', { final: true });

  sp(34, 'gloamop', 'Gloamop', ['ghost'], 'uncommon', [40, 45, 40, 60, 55, 65], 'wraithorn', 28,
    [[1, 'shadetouch'], [1, 'growl'], [9, 'grimleer'], [15, 'dreadbite']],
    'A wisp that hides in lantern smoke. It giggles when candles gutter.');
  sp(35, 'wraithorn', 'Wraithorn', ['ghost'], 'uncommon', [60, 70, 55, 95, 75, 90], null, 0,
    [[1, 'shadetouch'], [1, 'growl'], [1, 'grimleer'], [15, 'dreadbite'], [22, 'phantomclaw'], [28, 'hypnolull'], [34, 'spiritburst']],
    'Its hollow antlers moan in the wind. Caves borrow its voice after it leaves.', { final: true });

  sp(36, 'psymote', 'Psymote', ['psychic'], 'uncommon', [35, 30, 35, 65, 55, 60], 'mentavis', 30,
    [[1, 'mindpulse'], [1, 'growl'], [9, 'calmfocus'], [16, 'hypnolull']],
    'It hovers a finger-width off the ground at all times. Touching down is rude, apparently.');
  sp(37, 'mentavis', 'Mentavis', ['psychic'], 'uncommon', [65, 50, 55, 105, 85, 95], null, 0,
    [[1, 'mindpulse'], [1, 'growl'], [1, 'calmfocus'], [16, 'hypnolull'], [23, 'psyblade'], [30, 'mindcrush'], [38, 'lullaby']],
    'It solves locks by thinking at them. Vault makers have filed formal complaints.', { final: true });

  sp(38, 'gloopit', 'Gloopit', ['poison'], 'common', [45, 55, 45, 40, 40, 40], 'sludgeon', 26,
    [[1, 'tackle'], [1, 'toxicsting'], [8, 'mudshot'], [15, 'poisoncloud']],
    'It absorbs grime to grow. Cave janitors consider it a coworker.');
  sp(39, 'sludgeon', 'Sludgeon', ['poison', 'ground'], 'common', [80, 90, 75, 55, 60, 45], null, 0,
    [[1, 'tackle'], [1, 'toxicsting'], [1, 'mudshot'], [15, 'poisoncloud'], [22, 'venomfang'], [28, 'burrowstrike'], [36, 'sludgeburst']],
    'It naps in mudflats, indistinguishable from the mud until the mud yawns.', { final: true });

  sp(40, 'vipelash', 'Vipelash', ['poison'], 'uncommon', [40, 60, 40, 45, 40, 65], 'cobrawl', 30,
    [[1, 'toxicsting'], [1, 'growl'], [9, 'quickstrike'], [16, 'grimleer']],
    'It cracks its tail like a whip to warn off threats. The warning is generous; heed it.');
  sp(41, 'cobrawl', 'Cobrawl', ['poison', 'fighting'], 'uncommon', [65, 95, 60, 55, 55, 90], null, 0,
    [[1, 'toxicsting'], [1, 'growl'], [1, 'quickstrike'], [16, 'grimleer'], [24, 'swiftjab'], [30, 'venomfang'], [36, 'risingkick'], [42, 'titanfist']],
    'It coils into a boxer\'s stance and jabs with its hood. Referees refuse to officiate.', { final: true });

  sp(42, 'chillip', 'Chillip', ['ice'], 'rare', [40, 40, 45, 55, 50, 45], 'glacielle', 22,
    [[1, 'tackle'], [1, 'frostbite'], [9, 'chillmist'], [15, 'mistspray']],
    'A bud of living frost. It blooms only on the coldest mornings.');
  sp(43, 'glacielle', 'Glacielle', ['ice'], 'rare', [55, 55, 60, 80, 70, 65], 'borealisk', 42,
    [[1, 'tackle'], [1, 'frostbite'], [1, 'chillmist'], [15, 'mistspray'], [22, 'icelance'], [29, 'calmfocus'], [36, 'lullaby']],
    'Its petals are panes of ice that never melt, only mist at the edges.', { mid: true });
  sp(44, 'borealisk', 'Borealisk', ['ice', 'dragon'], 'rare', [85, 85, 80, 105, 85, 90], null, 0,
    [[1, 'tackle'], [1, 'frostbite'], [1, 'chillmist'], [1, 'mistspray'], [22, 'icelance'], [29, 'calmfocus'], [36, 'drakepulse'], [42, 'blizzardhowl'], [48, 'wyrmfury']],
    'Auroras trail its flight. Mountain folk call them "the serpent\'s ribbon".', { final: true });

  sp(45, 'wyrmble', 'Wyrmble', ['dragon'], 'elusive', [45, 55, 45, 45, 45, 50], 'drakoil', 28,
    [[1, 'tackle'], [1, 'growl'], [9, 'drakepulse'], [16, 'grimleer']],
    'A palm-sized dragon with valley-sized opinions. It hoards bottle caps.');
  sp(46, 'drakoil', 'Drakoil', ['dragon'], 'elusive', [65, 80, 65, 65, 65, 70], 'dracrown', 44,
    [[1, 'tackle'], [1, 'growl'], [1, 'drakepulse'], [16, 'grimleer'], [24, 'slash'], [30, 'wyrmdance'], [37, 'wyrmfury']],
    'It coils around mountain peaks to sleep, mistaken for a ring of weathered stone.', { mid: true });
  sp(47, 'dracrown', 'Dracrown', ['dragon', 'dark'], 'elusive', [90, 125, 85, 105, 80, 100], null, 0,
    [[1, 'tackle'], [1, 'growl'], [1, 'drakepulse'], [1, 'grimleer'], [24, 'slash'], [30, 'wyrmdance'], [37, 'wyrmfury'], [44, 'duskfang'], [50, 'umbralburst']],
    'The crown of horns is not decoration. Every old map marks its peak with a warning.', { final: true });

  sp(48, 'cindermite', 'Cindermite', ['fire', 'bug'], 'common', [40, 50, 40, 45, 35, 55], 'pyroach', 20,
    [[1, 'tackle'], [1, 'embershot'], [8, 'nipperbite'], [14, 'silkbind']],
    'It nests in cold campfires and politely relights them for the next traveler.');
  sp(49, 'pyroach', 'Pyroach', ['fire', 'bug'], 'common', [60, 80, 55, 65, 50, 85], null, 0,
    [[1, 'tackle'], [1, 'embershot'], [1, 'nipperbite'], [14, 'silkbind'], [20, 'flamewheel'], [27, 'needlevolley'], [34, 'blazerush']],
    'It skitters through lava tubes on heat-proof legs, antennae smoking faintly.', { final: true });
})();



