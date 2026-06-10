// Pokéram — species_b.js
// Solyn regional dex, entries 050–100. Uses G.defSpecies from species_a.js.

(function () {
  var sp = G.defSpecies;

  sp(50, 'trotling', 'Trotling', ['fire'], 'uncommon', [45, 55, 40, 50, 40, 65], 'gallopyre', 28,
    [[1, 'tackle'], [1, 'embershot'], [8, 'growl'], [14, 'quickstrike'], [20, 'flamewheel']],
    'A foal with a mane of warm smoke. It trots laps around campsites to show off.');
  sp(51, 'gallopyre', 'Gallopyre', ['fire'], 'uncommon', [70, 90, 55, 80, 55, 100], null, 0,
    [[1, 'tackle'], [1, 'embershot'], [1, 'growl'], [14, 'quickstrike'], [20, 'flamewheel'], [28, 'scorchfang'], [34, 'tailwind'], [40, 'blazerush']],
    'Its gallop leaves a ribbon of flame that fades without scorching a single blade of grass.', { final: true });

  sp(52, 'puddlit', 'Puddlit', ['water'], 'common', [40, 40, 45, 50, 45, 40], 'pondrake', 18,
    [[1, 'tackle'], [1, 'bubbleshot'], [7, 'growl'], [13, 'mistspray']],
    'It is, functionally, a puddle with eyes. Stepping in it is considered very rude.');
  sp(53, 'pondrake', 'Pondrake', ['water'], 'common', [65, 60, 70, 80, 70, 55], null, 0,
    [[1, 'tackle'], [1, 'bubbleshot'], [1, 'growl'], [13, 'mistspray'], [18, 'surgewave'], [25, 'chillmist'], [32, 'torrentbeam']],
    'A pond-dwelling drake that surfaces under lily pads and wears them as hats.', { final: true });

  sp(54, 'clamlet', 'Clamlet', ['water'], 'uncommon', [35, 40, 65, 45, 55, 30], 'pearlock', 24,
    [[1, 'tackle'], [1, 'bubbleshot'], [8, 'stoneskin'], [15, 'mistspray']],
    'It clamps onto ankles out of affection. Removing it requires compliments.');
  sp(55, 'pearlock', 'Pearlock', ['water', 'fairy'], 'uncommon', [60, 55, 95, 80, 95, 45], null, 0,
    [[1, 'tackle'], [1, 'bubbleshot'], [1, 'stoneskin'], [15, 'mistspray'], [24, 'moonglow'], [30, 'surgewave'], [37, 'faeburst']],
    'The pearl in its shell glows with trapped moonlight. Thieves never get past the clamp.', { final: true });

  sp(56, 'tidepup', 'Tidepup', ['water'], 'uncommon', [50, 55, 45, 50, 50, 55], 'selkrest', 25,
    [[1, 'tackle'], [1, 'bubbleshot'], [8, 'growl'], [14, 'aquajet']],
    'It bodysurfs the harbor chop and barks at boats that wake too hard.');
  sp(57, 'selkrest', 'Selkrest', ['water', 'ice'], 'uncommon', [80, 75, 70, 85, 80, 70], null, 0,
    [[1, 'tackle'], [1, 'bubbleshot'], [1, 'growl'], [14, 'aquajet'], [25, 'frostbite'], [31, 'surgewave'], [38, 'icelance'], [44, 'blizzardhowl']],
    'It hauls out on icebergs it carved itself, crest flashing like sea glass.', { final: true });

  sp(58, 'zappling', 'Zappling', ['electric', 'bug'], 'uncommon', [35, 40, 35, 60, 45, 70], 'luminbolt', 22,
    [[1, 'tackle'], [1, 'sparkjolt'], [8, 'silkbind'], [14, 'quickstrike']],
    'A firefly that blinks in morse. Scholars insist it is mostly gossip.');
  sp(59, 'luminbolt', 'Luminbolt', ['electric', 'bug'], 'uncommon', [55, 55, 50, 95, 65, 100], null, 0,
    [[1, 'tackle'], [1, 'sparkjolt'], [1, 'silkbind'], [14, 'quickstrike'], [22, 'voltlash'], [28, 'buzzdrain'], [35, 'thunderbreak']],
    'Swarms of them light the night routes. Each carries a different shade of lightning.', { final: true });

  sp(60, 'staticub', 'Staticub', ['electric'], 'rare', [55, 65, 50, 60, 50, 55], 'voltursa', 28,
    [[1, 'tackle'], [1, 'sparkjolt'], [9, 'growl'], [15, 'staticnet']],
    'Its fur stands permanently on end. Hugging one resets your hair for a week.');
  sp(61, 'voltursa', 'Voltursa', ['electric'], 'rare', [90, 105, 75, 90, 70, 75], null, 0,
    [[1, 'tackle'], [1, 'sparkjolt'], [1, 'growl'], [15, 'staticnet'], [22, 'voltlash'], [28, 'bulkup'], [35, 'bodyslam'], [42, 'thunderbreak']],
    'When it rears up, the air itself hums. Storms detour around its territory.', { final: true });

  sp(62, 'gravelit', 'Gravelit', ['rock'], 'common', [45, 65, 75, 30, 40, 30], 'cragnaw', 25,
    [[1, 'tackle'], [1, 'stonefling'], [8, 'sharpen'], [14, 'mudshot']],
    'A pebble with a grudge. It tumbles downhill on purpose to pick up speed.');
  sp(63, 'cragnaw', 'Cragnaw', ['rock'], 'common', [70, 95, 110, 40, 55, 40], null, 0,
    [[1, 'tackle'], [1, 'stonefling'], [1, 'sharpen'], [14, 'mudshot'], [25, 'boulderslam'], [31, 'stoneskin'], [38, 'gravelstorm']],
    'Its jaw can crack geodes. It spits the crystals out — too crunchy, it says.', { final: true });

  sp(64, 'forgelet', 'Forgelet', ['steel', 'fire'], 'rare', [45, 60, 70, 50, 50, 35], 'smeltitan', 32,
    [[1, 'tackle'], [1, 'metaljab'], [9, 'embershot'], [16, 'ironguard']],
    'Born in abandoned forges. It feeds the furnace of its chest with coal it scavenges.');
  sp(65, 'smeltitan', 'Smeltitan', ['steel', 'fire'], 'rare', [80, 105, 115, 75, 75, 55], null, 0,
    [[1, 'tackle'], [1, 'metaljab'], [1, 'embershot'], [16, 'ironguard'], [24, 'flamewheel'], [32, 'ironbash'], [39, 'infernowave'], [46, 'steelstorm']],
    'Its body is a walking foundry. Smiths leave broken tools at its feet as offerings.', { final: true });

  sp(66, 'duneling', 'Duneling', ['ground'], 'uncommon', [45, 55, 50, 35, 40, 55], 'scorpide', 24,
    [[1, 'scratch'], [1, 'mudshot'], [8, 'sandveil'], [14, 'quickstrike']],
    'It swims through dunes with only its tail tip showing, like a tiny shark of sand.');
  sp(67, 'scorpide', 'Scorpide', ['ground', 'poison'], 'uncommon', [70, 90, 80, 50, 55, 80], null, 0,
    [[1, 'scratch'], [1, 'mudshot'], [1, 'sandveil'], [14, 'quickstrike'], [24, 'toxicsting'], [30, 'burrowstrike'], [37, 'venomfang'], [43, 'quakeslam']],
    'It naps under a hand-span of sand with its stinger up, like a warning flag.', { final: true });

  sp(68, 'fluffit', 'Fluffit', ['normal', 'fairy'], 'uncommon', [50, 40, 40, 55, 55, 50], 'cumulfluff', 26,
    [[1, 'tackle'], [1, 'growl'], [8, 'glitterdart'], [15, 'sweetcharm']],
    'A cotton-puff that bounces to travel. Strong winds are both peril and delight.');
  sp(69, 'cumulfluff', 'Cumulfluff', ['fairy', 'flying'], 'uncommon', [75, 55, 60, 90, 85, 80], null, 0,
    [[1, 'tackle'], [1, 'growl'], [1, 'glitterdart'], [15, 'sweetcharm'], [26, 'wingcut'], [32, 'moonglow'], [39, 'galeforce'], [45, 'faeburst']],
    'It drifts with the clouds and is regularly mistaken for one, to its quiet pride.', { final: true });

  sp(70, 'echolit', 'Echolit', ['flying', 'dark'], 'common', [40, 50, 35, 45, 40, 70], 'sonarath', 24,
    [[1, 'tackle'], [1, 'shadowsnap'], [8, 'growl'], [14, 'wingcut']],
    'It maps caves by squeaking and remembers every wall it has ever met.');
  sp(71, 'sonarath', 'Sonarath', ['flying', 'dark'], 'common', [60, 75, 50, 65, 55, 100], null, 0,
    [[1, 'tackle'], [1, 'shadowsnap'], [1, 'growl'], [14, 'wingcut'], [24, 'duskfang'], [30, 'screech'], [37, 'divebomb']],
    'Its shriek bounces back as a perfect map. Miners hire flights of them as surveyors.', { final: true });

  sp(72, 'shroomp', 'Shroomp', ['grass', 'poison'], 'uncommon', [45, 50, 50, 55, 55, 30], 'mycelisk', 27,
    [[1, 'tackle'], [1, 'leaflash'], [8, 'sporecloud'], [15, 'toxicsting']],
    'It naps under its own cap. The polka dots rearrange when nobody watches.');
  sp(73, 'mycelisk', 'Mycelisk', ['grass', 'poison'], 'uncommon', [80, 75, 75, 85, 85, 40], null, 0,
    [[1, 'tackle'], [1, 'leaflash'], [1, 'sporecloud'], [15, 'toxicsting'], [27, 'sapbite'], [33, 'venomfang'], [40, 'sludgeburst'], [46, 'solarlance']],
    'Rings of mushrooms mark where it slept. Stepping inside one is asking to join it.', { final: true });

  sp(74, 'twinkit', 'Twinkit', ['fairy'], 'uncommon', [40, 35, 40, 60, 60, 55], 'sylphette', 24,
    [[1, 'glitterdart'], [1, 'growl'], [8, 'sweetcharm'], [15, 'mindpulse']],
    'It polishes pebbles into "stars" and gifts them to anyone who looks sad.');
  sp(75, 'sylphette', 'Sylphette', ['fairy'], 'uncommon', [65, 50, 60, 95, 95, 85], null, 0,
    [[1, 'glitterdart'], [1, 'growl'], [1, 'sweetcharm'], [15, 'mindpulse'], [24, 'moonglow'], [31, 'calmfocus'], [38, 'faeburst']],
    'It dances on dew without bending the grass. Morning light bends around it instead.', { final: true });

  sp(76, 'hexkit', 'Hexkit', ['dark'], 'uncommon', [40, 55, 35, 50, 40, 70], 'maleficat', 28,
    [[1, 'scratch'], [1, 'shadowsnap'], [8, 'grimleer'], [15, 'quickstrike']],
    'A black kitten that crosses its own path for luck. The luck is real; direction varies.');
  sp(77, 'maleficat', 'Maleficat', ['dark'], 'uncommon', [60, 90, 55, 75, 60, 105], null, 0,
    [[1, 'scratch'], [1, 'shadowsnap'], [1, 'grimleer'], [15, 'quickstrike'], [22, 'duskfang'], [28, 'screech'], [35, 'slash'], [42, 'umbralburst']],
    'Mirrors decline to reflect it. It takes this as the compliment it is.', { final: true });

  sp(78, 'buddle', 'Buddle', ['grass'], 'uncommon', [40, 45, 50, 45, 50, 35], 'bloomot', 18,
    [[1, 'tackle'], [1, 'leaflash'], [7, 'growthsurge'], [13, 'sapbite']],
    'A tight green bud on stubby legs. It refuses to bloom early on principle.');
  sp(79, 'bloomot', 'Bloomot', ['grass'], 'uncommon', [55, 60, 70, 60, 70, 50], 'florazor', 34,
    [[1, 'tackle'], [1, 'leaflash'], [1, 'growthsurge'], [13, 'sapbite'], [18, 'razorleaf'], [25, 'silkbind'], [30, 'thornburst']],
    'Half-open petals hide its face. It peeks out only for rain and good news.', { mid: true });
  sp(80, 'florazor', 'Florazor', ['grass', 'steel'], 'uncommon', [70, 100, 100, 60, 80, 70], null, 0,
    [[1, 'tackle'], [1, 'leaflash'], [1, 'growthsurge'], [1, 'sapbite'], [18, 'razorleaf'], [25, 'silkbind'], [30, 'thornburst'], [34, 'metaljab'], [40, 'ironbash'], [46, 'solarlance']],
    'Its petals fold into blades of living steel. Florists and fencers both claim it.', { final: true });

  // ===== standalones ========================================================
  sp(81, 'petalisk', 'Petalisk', ['grass', 'poison'], 'uncommon', [70, 75, 70, 75, 70, 85],
    null, 0,
    [[1, 'leaflash'], [1, 'toxicsting'], [10, 'razorleaf'], [18, 'poisoncloud'], [26, 'sapbite'], [34, 'thornburst'], [42, 'sludgeburst']],
    'A serpent of woven petals. Its perfume warns: admire from a respectful distance.');
  sp(82, 'slumbear', 'Slumbear', ['normal'], 'rare', [130, 100, 75, 55, 85, 40],
    null, 0,
    [[1, 'tackle'], [1, 'growl'], [10, 'lullaby'], [18, 'bodyslam'], [26, 'bulkup'], [34, 'takedown'], [42, 'titanfist']],
    'It sleeps twenty hours a day and apologizes for the other four.');
  sp(83, 'snowl', 'Snowl', ['ice', 'flying'], 'uncommon', [70, 55, 60, 85, 75, 90],
    null, 0,
    [[1, 'wingcut'], [1, 'frostbite'], [10, 'chillmist'], [18, 'divebomb'], [26, 'icelance'], [34, 'lullaby'], [42, 'blizzardhowl']],
    'It glides on silent wings of frost. Snowfall hushes further when it passes.');
  sp(84, 'ashvole', 'Ashvole', ['fire', 'ground'], 'common', [65, 80, 65, 45, 50, 55],
    null, 0,
    [[1, 'scratch'], [1, 'embershot'], [10, 'mudshot'], [18, 'flamewheel'], [26, 'burrowstrike'], [34, 'blazerush']],
    'It tunnels along warm rock seams. Hot springs tend to appear where it digs.');
  sp(85, 'squidrift', 'Squidrift', ['water', 'dark'], 'rare', [70, 90, 65, 100, 75, 90],
    null, 0,
    [[1, 'bubbleshot'], [1, 'shadowsnap'], [12, 'mistspray'], [20, 'duskfang'], [28, 'surgewave'], [36, 'umbralburst'], [44, 'torrentbeam']],
    'It drifts with the night tide, trailing ink that erases reflections.');
  sp(86, 'magnewt', 'Magnewt', ['electric', 'steel'], 'uncommon', [55, 60, 90, 90, 65, 60],
    null, 0,
    [[1, 'sparkjolt'], [1, 'metaljab'], [12, 'staticnet'], [20, 'voltlash'], [28, 'ironguard'], [36, 'thunderbreak'], [44, 'steelstorm']],
    'A newt with magnetized skin. It collects nails and arranges them by size, proudly.');
  sp(87, 'owlume', 'Owlume', ['flying', 'psychic'], 'rare', [75, 60, 65, 105, 90, 100],
    null, 0,
    [[1, 'wingcut'], [1, 'mindpulse'], [12, 'hypnolull'], [20, 'psyblade'], [28, 'calmfocus'], [36, 'galeforce'], [44, 'mindcrush']],
    'Its eyes hold a soft lamplight glow. Scholars swear it reads over their shoulders.');
  sp(88, 'mossquito', 'Mossquito', ['bug', 'grass'], 'common', [45, 65, 40, 50, 40, 80],
    null, 0,
    [[1, 'nipperbite'], [1, 'leaflash'], [10, 'silkbind'], [18, 'buzzdrain'], [26, 'needlevolley'], [34, 'sapbite']],
    'It sips sap, not blood, and is deeply offended by the assumption.');
  sp(89, 'lanternox', 'Lanternox', ['ghost', 'fire'], 'rare', [65, 55, 70, 105, 85, 80],
    null, 0,
    [[1, 'shadetouch'], [1, 'embershot'], [12, 'cinderveil'], [20, 'dreadbite'], [28, 'flamewheel'], [36, 'phantomclaw'], [44, 'infernowave']],
    'An old lantern that lit itself one night and wandered off to find its keeper.');
  sp(90, 'somnolux', 'Somnolux', ['psychic'], 'rare', [90, 55, 75, 100, 100, 55],
    null, 0,
    [[1, 'mindpulse'], [1, 'lullaby'], [12, 'hypnolull'], [20, 'calmfocus'], [28, 'psyblade'], [36, 'moonglow'], [44, 'mindcrush']],
    'Its wings shed glowing dust that carries dreams. Insomniacs leave windows open for it.');
  sp(91, 'marionyx', 'Marionyx', ['ghost', 'fairy'], 'elusive', [70, 85, 75, 95, 90, 95],
    null, 0,
    [[1, 'shadetouch'], [1, 'glitterdart'], [12, 'grimleer'], [20, 'dreadbite'], [28, 'moonglow'], [36, 'phantomclaw'], [44, 'faeburst'], [50, 'spiritburst']],
    'A puppet that cut its own strings. It performs nightly for an audience of moths.');
  sp(92, 'kickaroo', 'Kickaroo', ['fighting'], 'uncommon', [75, 95, 65, 40, 55, 85],
    null, 0,
    [[1, 'swiftjab'], [1, 'growl'], [10, 'counterpalm'], [18, 'risingkick'], [26, 'bulkup'], [34, 'bodyslam'], [42, 'titanfist']],
    'It shadowboxes sunrise to sunset. Its tail keeps score and never lies.');
  sp(93, 'bamboxer', 'Bamboxer', ['grass', 'fighting'], 'rare', [85, 110, 80, 55, 75, 95],
    null, 0,
    [[1, 'swiftjab'], [1, 'leaflash'], [12, 'counterpalm'], [20, 'razorleaf'], [28, 'bulkup'], [36, 'risingkick'], [44, 'titanfist'], [50, 'solarlance']],
    'It trains by striking bamboo until both are stronger. The grove bows when it leaves.');
  sp(94, 'crystallith', 'Crystallith', ['rock', 'fairy'], 'elusive', [75, 70, 120, 90, 110, 45],
    null, 0,
    [[1, 'stonefling'], [1, 'glitterdart'], [12, 'stoneskin'], [20, 'moonglow'], [28, 'boulderslam'], [36, 'sweetcharm'], [44, 'faeburst'], [50, 'gravelstorm']],
    'A geode that woke up mid-formation. Its facets sing one pure note in moonlight.');
  sp(95, 'zephyrant', 'Zephyrant', ['flying', 'dragon'], 'elusive', [70, 95, 70, 85, 70, 120],
    null, 0,
    [[1, 'wingcut'], [1, 'drakepulse'], [12, 'tailwind'], [20, 'divebomb'], [28, 'wyrmdance'], [36, 'galeforce'], [44, 'wyrmfury']],
    'A ribbon-thin dragon that rides the jetstream. Kites are its distant, jealous cousins.');
  sp(96, 'mimicrate', 'Mimicrate', ['ghost', 'dark'], 'elusive', [80, 110, 90, 70, 90, 70],
    null, 0,
    [[1, 'shadetouch'], [1, 'shadowsnap'], [12, 'grimleer'], [20, 'dreadbite'], [28, 'duskfang'], [36, 'phantomclaw'], [44, 'umbralburst'], [50, 'spiritburst']],
    'A crate that is never where porters left it. Its grin shows in the wood grain, briefly.');
  sp(97, 'wreckraith', 'Wreckraith', ['water', 'ghost'], 'elusive', [85, 90, 85, 95, 90, 65],
    null, 0,
    [[1, 'bubbleshot'], [1, 'shadetouch'], [12, 'mistspray'], [20, 'dreadbite'], [28, 'surgewave'], [36, 'phantomclaw'], [44, 'torrentbeam'], [50, 'spiritburst']],
    'The figurehead of a sunken ship, still keeping watch for a crew long since ashore.');
  sp(98, 'hummingale', 'Hummingale', ['flying', 'fairy'], 'uncommon', [60, 55, 50, 85, 75, 100],
    null, 0,
    [[1, 'wingcut'], [1, 'glitterdart'], [10, 'tailwind'], [18, 'moonglow'], [26, 'lullaby'], [34, 'galeforce'], [42, 'faeburst']],
    'Its wingbeats hum lullabies in perfect key. Nurseries plant flowers to invite it.');

  // ===== legendaries ========================================================
  sp(99, 'astradrax', 'Astradrax', ['dragon', 'psychic'], 'legendary', [95, 120, 90, 130, 95, 70],
    null, 0,
    [[1, 'drakepulse'], [1, 'mindpulse'], [20, 'wyrmdance'], [30, 'psyblade'], [40, 'wyrmfury'], [50, 'mindcrush'], [55, 'umbralburst']],
    'The Starwyrm. Old charts say the night sky is its shed skin, still glittering.');
  sp(100, 'lumifae', 'Lumifae', ['fairy'], 'legendary', [110, 70, 95, 130, 120, 75],
    null, 0,
    [[1, 'glitterdart'], [1, 'sweetcharm'], [20, 'moonglow'], [30, 'calmfocus'], [40, 'lullaby'], [50, 'faeburst'], [55, 'solarlance']],
    'The Dawnbloom. Where it rests, night ends early and gently, like a held breath released.');
})();

