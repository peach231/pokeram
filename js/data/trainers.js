// Pokéram — trainers.js
// The full trainer roster. party entries: { sp, level } (moves from learnset).
// Rival parties use _starter/_starter2/_starter3 placeholders resolved at
// battle time to the line countering the player's starter.

(function () {
  var T = G.TRAINERS = {};
  function tr(id, def) { def.id = id; T[id] = def; }

  // ------------------------------------------------------------- rival -----
  tr('rival1', {
    name: 'Kai', cls: 'Rival', sprite: 'trainer_kai', ai: 'basic', money: 200,
    party: [{ sp: '_starter', level: 5 }],
    intro: "Heading out already? Not before you get past ME.",
    defeat: "Huh. Mine's still cooler.", music: 'battle'
  });
  tr('rival2', {
    name: 'Kai', cls: 'Rival', sprite: 'trainer_kai', ai: 'basic', money: 500,
    party: [{ sp: 'cheepit', level: 12 }, { sp: '_starter', level: 14 }],
    intro: 'Still slow, still soft. Show me otherwise.',
    defeat: 'Fine. FINE. Rematch later.', music: 'battle'
  });
  tr('rival3', {
    name: 'Kai', cls: 'Rival', sprite: 'trainer_kai', ai: 'smart', money: 900,
    party: [{ sp: 'swiftrel', level: 22 }, { sp: 'maleficat', level: 23 }, { sp: '_starter2', level: 25 }],
    intro: 'Two badges? I have two badges AND a strategy.',
    defeat: 'A strategy needs... refinement. Later.', music: 'battle'
  });
  tr('rival4', {
    name: 'Kai', cls: 'Rival', sprite: 'trainer_kai', ai: 'smart', money: 1800,
    party: [{ sp: 'falconade', level: 34 }, { sp: 'maleficat', level: 34 }, { sp: 'voltursa', level: 35 }, { sp: '_starter3', level: 37 }],
    intro: 'The summit is MINE. You can have second place.',
    defeat: '...Take the summit. But take it seriously.', music: 'battle'
  });

  // ------------------------------------------------------------ route 1 ----
  tr('r1_tom', { name: 'Youngster Tom', sprite: 'trainer_youngster', ai: 'basic', money: 80, party: [{ sp: 'cheepit', level: 4 }, { sp: 'scrapling', level: 5 }], intro: 'My shorts are comfy and my team is MIGHTY!', defeat: 'Mighty-ish. Mighty-adjacent.', music: 'battle' });
  tr('r1_ana', { name: 'Lass Ana', sprite: 'trainer_lass', ai: 'basic', money: 80, party: [{ sp: 'fernfawn', level: 5 }], intro: 'Fernfawn and I have been practicing all week!', defeat: 'Back to practice, I suppose.', music: 'battle' });

  // ------------------------------------------------------------ route 2 ----
  tr('r2_ben', { name: 'Youngster Ben', sprite: 'trainer_youngster', ai: 'basic', money: 120, party: [{ sp: 'nibbit', level: 8 }, { sp: 'cheepit', level: 8 }], intro: 'Route 2 is MY turf!', defeat: 'Turf under renovation.', music: 'battle' });
  tr('r2_mia', { name: 'Lass Mia', sprite: 'trainer_lass', ai: 'basic', money: 120, party: [{ sp: 'fluffit', level: 9 }], intro: "Isn't Fluffit just the fluffiest?", defeat: 'Still the fluffiest. Just not the winningest.', music: 'battle' });
  tr('r2_cliff', { name: 'Hiker Cliff', sprite: 'trainer_hiker', ai: 'basic', money: 160, party: [{ sp: 'gravelit', level: 9 }, { sp: 'shalite', level: 10 }], intro: 'HAH! I found these rocks myself!', defeat: 'The rocks need more seasoning.', music: 'battle' });

  // ------------------------------------------------------- verdant forest --
  tr('vf_iggy', { name: 'Bug Fan Iggy', sprite: 'trainer_youngster', ai: 'basic', money: 150, party: [{ sp: 'silklit', level: 10 }, { sp: 'cocoonix', level: 10 }, { sp: 'mossquito', level: 11 }], intro: 'Bugs! Bugs! BUGS!', defeat: 'Bugs...', music: 'battle' });
  tr('vf_fern', { name: 'Lass Fern', sprite: 'trainer_lass', ai: 'basic', money: 150, party: [{ sp: 'shroomp', level: 12 }], intro: 'The forest shares its secrets with me.', defeat: 'It kept that one to itself.', music: 'battle' });
  tr('vf_orin', { name: 'Ace Orin', sprite: 'trainer_ace', ai: 'basic', money: 220, party: [{ sp: 'mothrall', level: 13 }], intro: 'A Mothrall raised under the old canopy. Behold.', defeat: 'Beheld and beaten. Well fought.', music: 'battle' });

  // -------------------------------------------------------------- gym 1 ----
  tr('gym1_bram', {
    name: 'Leader Bram', cls: 'leader', sprite: 'trainer_bram', ai: 'smart', money: 1200,
    party: [{ sp: 'shalite', level: 10 }, { sp: 'boulderon', level: 12 }],
    intro: 'I am Bram. My will is bedrock.',
    defeat: 'Hm! You hit harder than a rockslide.',
    reward: { badge: 0, flag: 'badge1', text: 'Bram handed over the BEDROCK BADGE!' },
    music: 'gym'
  });

  // ------------------------------------------------------------ route 3 ----
  tr('r3_lou', { name: 'Swimmer Lou', sprite: 'trainer_lass', ai: 'basic', money: 200, party: [{ sp: 'tidepup', level: 15 }, { sp: 'finling', level: 15 }], intro: 'The tide brought me a challenger!', defeat: 'And the tide takes my pride right out.', music: 'battle' });
  tr('r3_gus', { name: 'Hiker Gus', sprite: 'trainer_hiker', ai: 'basic', money: 240, party: [{ sp: 'gravelit', level: 15 }, { sp: 'cragnaw', level: 16 }], intro: 'Coastal rocks are the chewiest!', defeat: 'Chewed up and spat out, huh.', music: 'battle' });
  tr('r3_zee', { name: 'Youngster Zee', sprite: 'trainer_youngster', ai: 'basic', money: 200, party: [{ sp: 'zappling', level: 15 }, { sp: 'echolit', level: 15 }], intro: 'My team glows in the dark!', defeat: 'Glow now, win later.', music: 'battle' });
  tr('r3_kym', { name: 'Ace Kym', sprite: 'trainer_ace', ai: 'smart', money: 320, party: [{ sp: 'kickaroo', level: 17 }], intro: 'Footwork. It always comes down to footwork.', defeat: 'You... have better footwork.', music: 'battle' });

  // -------------------------------------------------------------- gym 2 ----
  tr('gym2_maris', {
    name: 'Leader Maris', cls: 'leader', sprite: 'trainer_maris', ai: 'smart', money: 2000,
    party: [{ sp: 'finling', level: 16 }, { sp: 'marlance', level: 19 }],
    intro: 'Maris of Brinehollow. The sea bows to no one — and neither do I.',
    defeat: 'The current favors you today, sailor.',
    reward: { badge: 1, flag: 'badge2', text: 'Maris handed over the TIDE BADGE!' },
    music: 'gym'
  });

  // ----------------------------------------------------------- hollowdeep --
  tr('hd_rok', { name: 'Hiker Rok', sprite: 'trainer_hiker', ai: 'basic', money: 280, party: [{ sp: 'gravelit', level: 17 }, { sp: 'boulderon', level: 18 }], intro: 'You hear that? The cave approves of me.', defeat: 'The cave is reconsidering.', music: 'battle' });
  tr('hd_nyx', { name: 'Ace Nyx', sprite: 'trainer_ace', ai: 'basic', money: 300, party: [{ sp: 'gloamop', level: 18 }, { sp: 'sonarath', level: 18 }], intro: 'The dark has teeth down here.', defeat: 'And you pulled them. Impressive.', music: 'battle' });
  tr('hd_moe', { name: 'Youngster Moe', sprite: 'trainer_youngster', ai: 'basic', money: 240, party: [{ sp: 'moleling', level: 17 }, { sp: 'ashvole', level: 18 }], intro: 'I got lost three days ago. Fight me anyway!', defeat: 'Worth it. Which way is out?', music: 'battle' });

  // -------------------------------------------------------------- gym 3 ----
  tr('gym3_tess', {
    name: 'Leader Tess', cls: 'leader', sprite: 'trainer_tess', ai: 'smart', money: 2900,
    party: [{ sp: 'sparkit', level: 24 }, { sp: 'zappling', level: 25 }, { sp: 'voltail', level: 27 }],
    intro: "Tess. Coilgate's dynamo. Try to keep up with the current!",
    defeat: 'Zap... you grounded me good.',
    reward: { badge: 2, flag: 'badge3', text: 'Tess handed over the DYNAMO BADGE!' },
    music: 'gym'
  });

  // ------------------------------------------------------------ route 4 ----
  tr('r4_tia', { name: 'Lass Tia', sprite: 'trainer_lass', ai: 'basic', money: 360, party: [{ sp: 'twinkit', level: 23 }, { sp: 'sylphette', level: 24 }], intro: 'Sparkles ARE a strategy!', defeat: 'Sparkles, regroup!', music: 'battle' });
  tr('r4_vin', { name: 'Youngster Vin', sprite: 'trainer_youngster', ai: 'basic', money: 340, party: [{ sp: 'vipelash', level: 23 }, { sp: 'scorpide', level: 24 }], intro: 'Careful. My team bites AND stings.', defeat: 'They also lose, apparently.', music: 'battle' });
  tr('r4_hank', { name: 'Hiker Hank', sprite: 'trainer_hiker', ai: 'basic', money: 380, party: [{ sp: 'terradon', level: 25 }], intro: 'Me and Terradon dug this road!', defeat: 'Back to the shovel.', music: 'battle' });
  tr('r4_lux', { name: 'Ace Lux', sprite: 'trainer_ace', ai: 'smart', money: 480, party: [{ sp: 'maleficat', level: 25 }, { sp: 'gallopyre', level: 26 }], intro: 'Style and substance. I brought both.', defeat: 'Substance defeated. Style intact.', music: 'battle' });

  // -------------------------------------------------------------- gym 4 ----
  tr('gym4_vesper', {
    name: 'Leader Vesper', cls: 'leader', sprite: 'trainer_vesper', ai: 'smart', money: 4100,
    party: [{ sp: 'psymote', level: 31 }, { sp: 'mothrall', level: 32 }, { sp: 'mentavis', level: 34 }],
    intro: 'Vesper. I dreamed this match last night. It was close.',
    defeat: '...The dream ended differently. How wonderful.',
    reward: { badge: 3, flag: 'badge4', text: 'Vesper handed over the LUCID BADGE!' },
    music: 'gym'
  });

  // --------------------------------------------------------- summit path ---
  tr('sp_rex', { name: 'Ace Rex', sprite: 'trainer_ace', ai: 'smart', money: 560, party: [{ sp: 'falconade', level: 31 }, { sp: 'brawlock', level: 32 }], intro: 'Only the serious climb this far.', defeat: 'Seriously beaten. Carry on.', music: 'battle' });
  tr('sp_isa', { name: 'Ace Isa', sprite: 'trainer_ace', ai: 'smart', money: 560, party: [{ sp: 'pondrake', level: 32 }, { sp: 'lanternox', level: 33 }], intro: 'The summit wind carries strong challengers.', defeat: 'And stronger ones past me.', music: 'battle' });
  tr('sp_olm', { name: 'Hiker Olm', sprite: 'trainer_hiker', ai: 'smart', money: 600, party: [{ sp: 'snowl', level: 33 }, { sp: 'borealisk', level: 34 }], intro: 'I have climbed this peak ninety times!', defeat: 'Ninety-one will go better.', music: 'battle' });
  tr('sp_ada', { name: 'Ace Ada', sprite: 'trainer_ace', ai: 'smart', money: 640, party: [{ sp: 'smeltitan', level: 34 }, { sp: 'voltursa', level: 34 }], intro: 'Last gate before the champion. I take it seriously.', defeat: 'Go. Aldric awaits.', music: 'battle' });

  // ------------------------------------------------------------ champion ---
  tr('champion', {
    name: 'Champion Aldric', cls: 'champion', sprite: 'trainer_aldric', ai: 'smart', money: 10000,
    party: [
      { sp: 'falconade', level: 40 }, { sp: 'bamboxer', level: 41 },
      { sp: 'smeltitan', level: 42 }, { sp: 'wraithorn', level: 42 },
      { sp: 'borealisk', level: 43 }, { sp: 'dracrown', level: 46 }
    ],
    intro: 'Aldric. Champion of Solyn. Every trainer in this hall taught me something. Teach me one more thing.',
    defeat: 'There it is. The lesson. Solyn has a new champion!',
    music: 'champion'
  });

  // starter-counter cycle: turtle<panther, panther<eagle, eagle<ram, ram<turtle
  var COUNTER = { sproutle: 'emberynx', emberynx: 'aquilet', aquilet: 'pebblamb', pebblamb: 'sproutle' };
  var STAGE2 = { sproutle: 'verdoise', emberynx: 'pyranther', aquilet: 'streagle', pebblamb: 'bouldram' };
  var STAGE3 = { sproutle: 'gaiadome', emberynx: 'umbranther', aquilet: 'torrentalon', pebblamb: 'ferrobex' };

  G.trainerParty = function (def) {
    var starterKey = G.flags.starter || 'sproutle';
    var rivalBase = COUNTER[starterKey] || 'emberynx';
    return def.party.map(function (p) {
      var key = p.sp;
      if (key === '_starter') key = rivalBase;
      if (key === '_starter2') key = STAGE2[rivalBase];
      if (key === '_starter3') key = STAGE3[rivalBase];
      return G.makeMon(key, p.level);
    });
  };
})();
