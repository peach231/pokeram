// Pokéram — moves.js
// ~85 moves across all 18 types. Damage tiers roughly 40-50 / 60-75 / 85-95.
// effect kinds understood by battle.js:
//   { kind:'status', status:'brn'|'psn'|'par'|'slp', chance:0-100 }   (chance omitted = 100, pure status move when power 0)
//   { kind:'stages', target:'self'|'foe', stat:'atk'|'def'|'spa'|'spd'|'spe'|'acc'|'eva', delta:±n, chance }
//   { kind:'flinch', chance }
//   { kind:'highCrit' } { kind:'recoil', frac } { kind:'drain', frac } { kind:'multiHit' }

(function () {
  var M = G.MOVES = {};
  function mv(id, name, type, power, acc, pp, prio, effect) {
    M[id] = { id: id, name: name, type: type, power: power, acc: acc, pp: pp, priority: prio || 0, effect: effect || null };
  }

  // ----- normal ----------------------------------------------------------
  mv('tackle',      'Tackle',       'normal', 40, 100, 35);
  mv('scratch',     'Scratch',      'normal', 40, 100, 35);
  mv('quickstrike', 'Quick Strike', 'normal', 40, 100, 30, 1);
  mv('slash',       'Slash',        'normal', 70, 100, 20, 0, { kind: 'highCrit' });
  mv('bodyslam',    'Body Slam',    'normal', 85, 100, 15, 0, { kind: 'status', status: 'par', chance: 30 });
  mv('takedown',    'Takedown',     'normal', 90, 85, 20, 0, { kind: 'recoil', frac: 0.25 });
  mv('growl',       'Growl',        'normal', 0, 100, 40, 0, { kind: 'stages', target: 'foe', stat: 'atk', delta: -1 });
  mv('screech',     'Screech',      'normal', 0, 85, 30, 0, { kind: 'stages', target: 'foe', stat: 'def', delta: -2 });
  mv('lullaby',     'Lullaby',      'normal', 0, 55, 15, 0, { kind: 'status', status: 'slp' });
  mv('sharpen',     'Sharpen',      'normal', 0, 100, 30, 0, { kind: 'stages', target: 'self', stat: 'atk', delta: 1 });
  mv('struggle',    'Struggle',     'normal', 35, 100, 99, 0, { kind: 'recoil', frac: 0.25 });

  // ----- fire -------------------------------------------------------------
  mv('embershot',   'Ember Shot',   'fire', 40, 100, 25, 0, { kind: 'status', status: 'brn', chance: 10 });
  mv('flamewheel',  'Flame Wheel',  'fire', 60, 100, 25, 0, { kind: 'status', status: 'brn', chance: 10 });
  mv('scorchfang',  'Scorch Fang',  'fire', 65, 95, 20, 0, { kind: 'flinch', chance: 20 });
  mv('blazerush',   'Blaze Rush',   'fire', 90, 100, 15, 0, { kind: 'status', status: 'brn', chance: 10 });
  mv('infernowave', 'Inferno Wave', 'fire', 95, 90, 10, 0, { kind: 'status', status: 'brn', chance: 20 });
  mv('cinderveil',  'Cinder Veil',  'fire', 0, 85, 15, 0, { kind: 'status', status: 'brn' });

  // ----- water ------------------------------------------------------------
  mv('bubbleshot',  'Bubble Shot',  'water', 40, 100, 30);
  mv('aquajet',     'Aqua Jet',     'water', 40, 100, 20, 1);
  mv('surgewave',   'Surge Wave',   'water', 65, 100, 20);
  mv('ripcurrent',  'Rip Current',  'water', 75, 95, 15, 0, { kind: 'stages', target: 'foe', stat: 'spe', delta: -1, chance: 30 });
  mv('torrentbeam', 'Torrent Beam', 'water', 95, 100, 10);
  mv('mistspray',   'Mist Spray',   'water', 0, 100, 20, 0, { kind: 'stages', target: 'foe', stat: 'acc', delta: -1 });

  // ----- grass ------------------------------------------------------------
  mv('leaflash',    'Leaf Lash',    'grass', 45, 100, 25);
  mv('razorleaf',   'Razor Leaf',   'grass', 55, 95, 25, 0, { kind: 'highCrit' });
  mv('sapbite',     'Sap Bite',     'grass', 50, 100, 20, 0, { kind: 'drain', frac: 0.5 });
  mv('thornburst',  'Thorn Burst',  'grass', 70, 100, 15);
  mv('solarlance',  'Solar Lance',  'grass', 90, 100, 10);
  mv('sporecloud',  'Spore Cloud',  'grass', 0, 65, 15, 0, { kind: 'status', status: 'slp' });
  mv('growthsurge', 'Growth Surge', 'grass', 0, 100, 25, 0, { kind: 'stages', target: 'self', stat: 'spa', delta: 1 });

  // ----- electric ---------------------------------------------------------
  mv('sparkjolt',   'Spark Jolt',   'electric', 40, 100, 30, 0, { kind: 'status', status: 'par', chance: 10 });
  mv('voltlash',    'Volt Lash',    'electric', 65, 100, 20, 0, { kind: 'status', status: 'par', chance: 10 });
  mv('thunderbreak','Thunder Break','electric', 95, 90, 10, 0, { kind: 'status', status: 'par', chance: 20 });
  mv('staticnet',   'Static Net',   'electric', 0, 90, 20, 0, { kind: 'status', status: 'par' });
  mv('chargeup',    'Charge Up',    'electric', 0, 100, 25, 0, { kind: 'stages', target: 'self', stat: 'spa', delta: 2 });

  // ----- ice ---------------------------------------------------------------
  mv('frostbite',   'Frostbite',    'ice', 50, 100, 25);
  mv('icelance',    'Ice Lance',    'ice', 70, 100, 15);
  mv('blizzardhowl','Blizzard Howl','ice', 95, 80, 8);
  mv('chillmist',   'Chill Mist',   'ice', 0, 100, 20, 0, { kind: 'stages', target: 'foe', stat: 'spe', delta: -2 });

  // ----- fighting ----------------------------------------------------------
  mv('swiftjab',    'Swift Jab',    'fighting', 45, 100, 25);
  mv('risingkick',  'Rising Kick',  'fighting', 70, 95, 15);
  mv('titanfist',   'Titan Fist',   'fighting', 95, 85, 10);
  mv('bulkup',      'Bulk Up',      'fighting', 0, 100, 20, 0, { kind: 'stages', target: 'self', stat: 'atk', delta: 1 });
  mv('counterpalm', 'Counter Palm', 'fighting', 60, 100, 20, 0, { kind: 'stages', target: 'foe', stat: 'def', delta: -1, chance: 30 });

  // ----- poison -------------------------------------------------------------
  mv('toxicsting',  'Toxic Sting',  'poison', 40, 100, 30, 0, { kind: 'status', status: 'psn', chance: 20 });
  mv('venomfang',   'Venom Fang',   'poison', 65, 100, 20, 0, { kind: 'status', status: 'psn', chance: 30 });
  mv('sludgeburst', 'Sludge Burst', 'poison', 90, 100, 10, 0, { kind: 'status', status: 'psn', chance: 30 });
  mv('poisoncloud', 'Poison Cloud', 'poison', 0, 90, 20, 0, { kind: 'status', status: 'psn' });

  // ----- ground --------------------------------------------------------------
  mv('mudshot',     'Mud Shot',     'ground', 45, 100, 25, 0, { kind: 'stages', target: 'foe', stat: 'spe', delta: -1, chance: 30 });
  mv('earthjab',    'Earth Jab',    'ground', 60, 100, 20);
  mv('burrowstrike','Burrow Strike','ground', 75, 100, 15);
  mv('quakeslam',   'Quake Slam',   'ground', 95, 100, 10);
  mv('sandveil',    'Sand Veil',    'ground', 0, 100, 20, 0, { kind: 'stages', target: 'foe', stat: 'acc', delta: -1 });

  // ----- flying ---------------------------------------------------------------
  mv('wingcut',     'Wing Cut',     'flying', 45, 100, 30);
  mv('divebomb',    'Dive Bomb',    'flying', 70, 95, 15);
  mv('galeforce',   'Gale Force',   'flying', 90, 90, 10);
  mv('tailwind',    'Tailwind',     'flying', 0, 100, 25, 0, { kind: 'stages', target: 'self', stat: 'spe', delta: 1 });

  // ----- psychic ---------------------------------------------------------------
  mv('mindpulse',   'Mind Pulse',   'psychic', 50, 100, 25);
  mv('psyblade',    'Psy Blade',    'psychic', 70, 100, 20);
  mv('mindcrush',   'Mind Crush',   'psychic', 95, 100, 10, 0, { kind: 'stages', target: 'foe', stat: 'spd', delta: -1, chance: 20 });
  mv('hypnolull',   'Hypno Lull',   'psychic', 0, 60, 15, 0, { kind: 'status', status: 'slp' });
  mv('calmfocus',   'Calm Focus',   'psychic', 0, 100, 25, 0, { kind: 'stages', target: 'self', stat: 'spa', delta: 1 });

  // ----- bug ----------------------------------------------------------------
  mv('nipperbite',  'Nipper Bite',  'bug', 45, 100, 30);
  mv('needlevolley','Needle Volley','bug', 20, 95, 20, 0, { kind: 'multiHit' });
  mv('buzzdrain',   'Buzz Drain',   'bug', 60, 100, 15, 0, { kind: 'drain', frac: 0.5 });
  mv('silkbind',    'Silk Bind',    'bug', 0, 95, 30, 0, { kind: 'stages', target: 'foe', stat: 'spe', delta: -1 });

  // ----- rock ----------------------------------------------------------------
  mv('stonefling',  'Stone Fling',  'rock', 50, 95, 25);
  mv('boulderslam', 'Boulder Slam', 'rock', 75, 90, 15);
  mv('gravelstorm', 'Gravel Storm', 'rock', 95, 80, 8);
  mv('stoneskin',   'Stoneskin',    'rock', 0, 100, 20, 0, { kind: 'stages', target: 'self', stat: 'def', delta: 2 });

  // ----- ghost ----------------------------------------------------------------
  mv('shadetouch',  'Shade Touch',  'ghost', 45, 100, 30);
  mv('phantomclaw', 'Phantom Claw', 'ghost', 70, 100, 15);
  mv('dreadbite',   'Dread Bite',   'ghost', 50, 100, 20, 0, { kind: 'flinch', chance: 30 });
  mv('spiritburst', 'Spirit Burst', 'ghost', 90, 100, 10);

  // ----- dragon ---------------------------------------------------------------
  mv('drakepulse',  'Drake Pulse',  'dragon', 60, 100, 20, 0, { kind: 'status', status: 'par', chance: 10 });
  mv('wyrmfury',    'Wyrm Fury',    'dragon', 85, 100, 10);
  mv('wyrmdance',   'Wyrm Dance',   'dragon', 0, 100, 20, 0, { kind: 'stages', target: 'self', stat: 'atk', delta: 1 });

  // ----- shadow ---------------------------------------------------------------
  mv('shadowsnap',  'Dark Snap',  'dark', 45, 100, 30);
  mv('duskfang',    'Dusk Fang',    'dark', 70, 100, 15, 0, { kind: 'highCrit' });
  mv('umbralburst', 'Umbral Burst', 'dark', 90, 100, 10);
  mv('grimleer',    'Grim Leer',    'dark', 0, 100, 25, 0, { kind: 'stages', target: 'foe', stat: 'def', delta: -1 });

  // ----- steel ----------------------------------------------------------------
  mv('metaljab',    'Metal Jab',    'steel', 50, 100, 25);
  mv('ironbash',    'Iron Bash',    'steel', 80, 100, 15);
  mv('steelstorm',  'Steel Storm',  'steel', 95, 85, 8);
  mv('ironguard',   'Iron Guard',   'steel', 0, 100, 20, 0, { kind: 'stages', target: 'self', stat: 'def', delta: 2 });

  // ----- fairy ----------------------------------------------------------------
  mv('glitterdart', 'Glitter Dart', 'fairy', 45, 100, 30);
  mv('moonglow',    'Moonglow',     'fairy', 70, 100, 15);
  mv('faeburst',    'Fae Burst',    'fairy', 95, 90, 10);
  mv('sweetcharm',  'Sweet Charm',  'fairy', 0, 100, 25, 0, { kind: 'stages', target: 'foe', stat: 'atk', delta: -2 });
})();


