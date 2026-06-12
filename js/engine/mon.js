// Pokéram — mon.js
// Creature instances: creation, stat math, exp/levels, learnsets, evolution.
// Stat formulas (IVs 0-15, no EVs):
//   hp    = floor((2*base + iv) * L / 100) + L + 10
//   other = floor((2*base + iv) * L / 100) + 5
// Exp curve (all species): medium-slow, 1.2L^3 - 15L^2 + 100L - 140 —
// the canon starter curve: early levels cost very little (L5->6 is 44 exp
// vs 91 on pure L^3), then the 1.2L^3 term dominates and growth slows.

(function () {
  G.expForLevel = function (L) {
    if (L <= 1) return 0;
    return Math.max(0, Math.floor(1.2 * L * L * L - 15 * L * L + 100 * L - 140));
  };

  function rollIvs() {
    return {
      hp: G.irand(16), atk: G.irand(16), def: G.irand(16),
      spa: G.irand(16), spd: G.irand(16), spe: G.irand(16)
    };
  }

  // The (up to) 4 most recent learnset moves at a level.
  G.movesAtLevel = function (spKey, level) {
    var ls = G.SPECIES[spKey].learnset;
    var known = [];
    for (var i = 0; i < ls.length; i++) {
      if (ls[i][0] <= level && known.indexOf(ls[i][1]) === -1) known.push(ls[i][1]);
    }
    return known.slice(-4).map(function (id) {
      return { id: id, pp: G.MOVES[id].pp, maxPp: G.MOVES[id].pp };
    });
  };

  G.makeMon = function (spKey, level, opts) {
    opts = opts || {};
    var mon = {
      sp: spKey,
      nick: null,
      level: level,
      exp: G.expForLevel(level),
      ivs: opts.ivs || rollIvs(),
      status: null,
      slpTurns: 0,
      curHp: 0,
      moves: opts.moves
        ? opts.moves.map(function (id) { return { id: id, pp: G.MOVES[id].pp, maxPp: G.MOVES[id].pp }; })
        : G.movesAtLevel(spKey, level)
    };
    mon.curHp = G.monStats(mon).hp;
    return mon;
  };

  G.monStats = function (mon) {
    var sp = G.SPECIES[mon.sp];
    var L = mon.level, iv = mon.ivs;
    function stat(b, i) { return Math.floor((2 * b + i) * L / 100) + 5; }
    return {
      hp: Math.floor((2 * sp.base.hp + iv.hp) * L / 100) + L + 10,
      atk: stat(sp.base.atk, iv.atk),
      def: stat(sp.base.def, iv.def),
      spa: stat(sp.base.spa, iv.spa),
      spd: stat(sp.base.spd, iv.spd),
      spe: stat(sp.base.spe, iv.spe)
    };
  };

  G.monName = function (mon) { return mon.nick || G.SPECIES[mon.sp].name; };

  G.healMon = function (mon) {
    mon.curHp = G.monStats(mon).hp;
    mon.status = null;
    mon.slpTurns = 0;
    for (var i = 0; i < mon.moves.length; i++) mon.moves[i].pp = mon.moves[i].maxPp;
  };

  // Add exp; returns events: [{type:'level', level} | {type:'learn', moveId, level}]
  // Caller resolves 'learn' (may need a forget prompt) and evolution checks.
  G.gainExp = function (mon, amount) {
    var events = [];
    if (mon.level >= 100) return events;
    mon.exp += amount;
    var sp = G.SPECIES[mon.sp];
    while (mon.level < 100 && mon.exp >= G.expForLevel(mon.level + 1)) {
      var oldMax = G.monStats(mon).hp;
      mon.level++;
      var newMax = G.monStats(mon).hp;
      mon.curHp = Math.min(newMax, mon.curHp + (newMax - oldMax)); // keep damage offset
      events.push({ type: 'level', level: mon.level });
      for (var i = 0; i < sp.learnset.length; i++) {
        if (sp.learnset[i][0] === mon.level) {
          events.push({ type: 'learn', moveId: sp.learnset[i][1], level: mon.level });
        }
      }
    }
    return events;
  };

  G.knowsMove = function (mon, moveId) {
    for (var i = 0; i < mon.moves.length; i++) if (mon.moves[i].id === moveId) return true;
    return false;
  };

  // null = no evolution due, else the target species key
  G.evolutionDue = function (mon) {
    var sp = G.SPECIES[mon.sp];
    if (sp.evolvesTo && mon.level >= sp.evolveLevel) return sp.evolvesTo;
    return null;
  };

  G.evolveMon = function (mon) {
    var to = G.SPECIES[mon.sp].evolvesTo;
    if (!to) return;
    var hpLost = G.monStats(mon).hp - mon.curHp;
    mon.sp = to;
    mon.curHp = Math.max(1, G.monStats(mon).hp - hpLost);
    if (G.player) {
      G.player.dexSeen[to] = 1;
      G.player.dexCaught[to] = 1;
    }
  };
})();
