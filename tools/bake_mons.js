// Pokéram — tools/bake_mons.js
// Renders tools/recipes.js through spritegen and writes the baked grids into
// js/data/sprites_mons_*.js (six files, split by dex order). Run after any
// recipe change:  node tools/bake_mons.js

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { Grid } = require('./spritegen');
const recipes = require('./recipes');

const ROOT = path.join(__dirname, '..');

// load util + palettes + species (for dex order) under a shim
global.window = global;
global.window.addEventListener = function () {};
for (const f of ['js/core/util.js', 'js/data/palettes.js', 'js/data/types.js', 'js/data/moves.js', 'js/data/species_a.js', 'js/data/species_b.js']) {
  vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f });
}
const G = global.G;

const GROUPS = 'abcdef';
const PER_GROUP = Math.ceil(G.DEX_ORDER.length / GROUPS.length); // ~17

const baked = {};
let count = 0;
for (const key of G.DEX_ORDER) {
  const r = recipes[key];
  if (!r) continue;
  const variants = { front: r };
  if (r.back) variants.back = { pal: r.pal, draw: r.back, w: r.backW || 56, h: r.backH || 40 };
  for (const variant in variants) {
    const rec = variants[variant];
    const w = rec.w || 48, h = rec.h || 48;
    const g = new Grid(w, h);
    rec.draw(new Proxy(g, {})); // plain grid; proxy reserved for future hooks
    const rows = g.render();
    // resolve palette names -> hex
    const pal = {};
    for (const ch in r.pal) {
      const hex = G.C[r.pal[ch]];
      if (!hex) throw new Error(`${key}: palette key '${r.pal[ch]}' not in master palette`);
      pal[ch] = hex;
    }
    const name = variant === 'front' ? `mon_${key}` : `mon_${key}_back`;
    baked[key] = baked[key] || {};
    baked[key][name] = { w, h, pal, rows };
    count++;
  }
}

// write group files
for (let gi = 0; gi < GROUPS.length; gi++) {
  const keys = G.DEX_ORDER.slice(gi * PER_GROUP, (gi + 1) * PER_GROUP);
  let out = `// Pokéram — sprites_mons_${GROUPS[gi]}.js\n`;
  out += `// BAKED creature sprite grids (dex ${gi * PER_GROUP + 1}–${Math.min(G.DEX_ORDER.length, (gi + 1) * PER_GROUP)}).\n`;
  out += `// Generated from tools/recipes.js via tools/bake_mons.js — edit recipes, not this file.\n\n`;
  out += `(function () {\n`;
  let any = false;
  for (const key of keys) {
    if (!baked[key]) continue;
    for (const name in baked[key]) {
      const a = baked[key][name];
      any = true;
      out += `  G.ART.${name} = {\n    w: ${a.w}, h: ${a.h},\n    pal: ${JSON.stringify(a.pal)},\n    px: [\n`;
      for (const row of a.rows) out += `      '${row}',\n`;
      out = out.slice(0, -2) + `\n    ]\n  };\n`;
    }
  }
  if (!any) out += `  // (no sprites baked for this range yet)\n`;
  out += `})();\n`;
  fs.writeFileSync(path.join(ROOT, `js/data/sprites_mons_${GROUPS[gi]}.js`), out);
}

// trainer art (player back, portraits) -> sprites_trainers.js
if (recipes.__trainers) {
  let out = `// Pokéram — sprites_trainers.js\n// BAKED trainer battle art. Generated via tools/bake_mons.js — edit tools/recipes.js.\n\n(function () {\n`;
  for (const name in recipes.__trainers) {
    const rec = recipes.__trainers[name];
    const w = rec.w || 48, h = rec.h || 48;
    const g = new Grid(w, h);
    rec.draw(g);
    const rows = g.render();
    const pal = {};
    for (const ch in rec.pal) {
      const hex = G.C[rec.pal[ch]];
      if (!hex) throw new Error(`${name}: palette key '${rec.pal[ch]}' not in master palette`);
      pal[ch] = hex;
    }
    out += `  G.ART.${name} = {\n    w: ${w}, h: ${h},\n    pal: ${JSON.stringify(pal)},\n    px: [\n`;
    for (const row of rows) out += `      '${row}',\n`;
    out = out.slice(0, -2) + `\n    ]\n  };\n`;
    count++;
  }
  out += `})();\n`;
  fs.writeFileSync(path.join(ROOT, 'js/data/sprites_trainers.js'), out);
}

const have = Object.keys(baked).length;
console.log(`baked ${count} sprite grids for ${have}/${G.DEX_ORDER.length} species (+trainers)`);
const missing = G.DEX_ORDER.filter(k => !baked[k]);
if (missing.length) console.log('missing recipes: ' + missing.slice(0, 12).join(', ') + (missing.length > 12 ? ` ... +${missing.length - 12}` : ''));
