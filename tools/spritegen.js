// Pokéram — tools/spritegen.js
// Offline pixel-art rasterizer used to BAKE creature sprite grids. Each
// creature has a hand-written shape recipe (tools/recipes_*.js); this renders
// the recipe to a palette-indexed grid with clean 1px outlines and consistent
// upper-left lighting, and the result is committed as plain data in
// js/data/sprites_mons_*.js. Art iteration loop: edit recipe -> bake ->
// gallery screenshot -> tweak.

'use strict';

function Grid(w, h) {
  this.w = w; this.h = h;
  this.c = new Array(w * h).fill(null);
}

Grid.prototype.set = function (x, y, ch) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
  this.c[y * this.w + x] = ch;
};

Grid.prototype.get = function (x, y) {
  if (x < 0 || y < 0 || x >= this.w || y >= this.h) return null;
  return this.c[y * this.w + x];
};

// filled ellipse, flat color
Grid.prototype.ellipse = function (cx, cy, rx, ry, ch) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) this.set(x, y, ch);
    }
  }
};

// filled ellipse with 3-tone shading, light from upper-left:
// crescent highlight toward the light, core shadow away from it
Grid.prototype.ball = function (cx, cy, rx, ry, base, lite, dark, opts) {
  opts = opts || {};
  const lx = opts.lx !== undefined ? opts.lx : -0.6, ly = opts.ly !== undefined ? opts.ly : -0.8;
  const liteCut = opts.liteCut !== undefined ? opts.liteCut : 0.38;
  const darkCut = opts.darkCut !== undefined ? opts.darkCut : 0.45;
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      const d2 = dx * dx + dy * dy;
      if (d2 > 1) continue;
      const dot = dx * lx + dy * ly; // >0 → toward the light corner
      let ch = base;
      if (lite && dot > liteCut && d2 > 0.12) ch = lite;
      if (dark && dot < -darkCut && d2 > 0.2) ch = dark;
      this.set(x, y, ch);
    }
  }
};

// triangle fill (ears, beaks, leaves, spikes)
Grid.prototype.tri = function (x0, y0, x1, y1, x2, y2, ch) {
  const minX = Math.floor(Math.min(x0, x1, x2)), maxX = Math.ceil(Math.max(x0, x1, x2));
  const minY = Math.floor(Math.min(y0, y1, y2)), maxY = Math.ceil(Math.max(y0, y1, y2));
  const area = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);
  if (area === 0) return;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const w0 = ((x1 - x) * (y2 - y) - (x2 - x) * (y1 - y)) / area;
      const w1 = ((x2 - x) * (y0 - y) - (x0 - x) * (y2 - y)) / area;
      const w2 = 1 - w0 - w1;
      if (w0 >= -0.001 && w1 >= -0.001 && w2 >= -0.001) this.set(x, y, ch);
    }
  }
};

// thick line (limbs, tails, stems)
Grid.prototype.line = function (x0, y0, x1, y1, ch, thick) {
  thick = thick || 1;
  const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2 + 1;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
    if (thick <= 1) this.set(x, y, ch);
    else this.ellipse(x, y, thick / 2, thick / 2, ch);
  }
};

Grid.prototype.rect = function (x0, y0, w, h, ch) {
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) this.set(x, y, ch);
};

// elliptical ring (horns, open mouths, collars). thickness in normalized units.
Grid.prototype.ring = function (cx, cy, rx, ry, ch, thickness, fromDeg, toDeg) {
  thickness = thickness || 0.4;
  const a0 = (fromDeg === undefined ? 0 : fromDeg) * Math.PI / 180;
  const a1 = (toDeg === undefined ? 360 : toDeg) * Math.PI / 180;
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      const d2 = dx * dx + dy * dy;
      if (d2 > 1 || d2 < (1 - thickness) * (1 - thickness)) continue;
      let ang = Math.atan2(dy, dx);
      if (ang < 0) ang += Math.PI * 2;
      if (a1 >= a0 ? (ang >= a0 && ang <= a1) : (ang >= a0 || ang <= a1)) this.set(x, y, ch);
    }
  }
};

// 1px outline: filled cells that touch empty (4-neighborhood) become `ch`
Grid.prototype.outline = function (ch) {
  ch = ch || 'o';
  const marks = [];
  for (let y = 0; y < this.h; y++) {
    for (let x = 0; x < this.w; x++) {
      const v = this.get(x, y);
      if (v === null || v === ch) continue;
      if (this.get(x - 1, y) === null || this.get(x + 1, y) === null ||
          this.get(x, y - 1) === null || this.get(x, y + 1) === null) {
        marks.push([x, y]);
      }
    }
  }
  for (const [x, y] of marks) this.set(x, y, ch);
};

// interior 1px seam between two different fill groups (e.g. head over shell).
// chA/chB: char or array of chars; marks the A-side cell.
Grid.prototype.seam = function (chA, chB, ch) {
  const inA = Array.isArray(chA) ? (c) => chA.includes(c) : (c) => c === chA;
  const inB = Array.isArray(chB) ? (c) => chB.includes(c) : (c) => c === chB;
  const marks = [];
  for (let y = 0; y < this.h; y++) {
    for (let x = 0; x < this.w; x++) {
      if (!inA(this.get(x, y))) continue;
      if (inB(this.get(x + 1, y)) || inB(this.get(x - 1, y)) ||
          inB(this.get(x, y + 1)) || inB(this.get(x, y - 1))) {
        marks.push([x, y]);
      }
    }
  }
  for (const [x, y] of marks) this.set(x, y, ch);
};

// standard eye: ink block with white shine, GBA-style
Grid.prototype.eye = function (x, y, w, h) {
  this.rect(x, y, w, h, 'o');
  if (w >= 3 && h >= 3) this.rect(x + 1, y + 1, Math.max(1, Math.floor(w / 3)), Math.max(1, Math.floor(h / 3)), 'K');
};

Grid.prototype.render = function () {
  const rows = [];
  for (let y = 0; y < this.h; y++) {
    let row = '';
    for (let x = 0; x < this.w; x++) {
      const v = this.c[y * this.w + x];
      row += v === null ? '.' : v;
    }
    rows.push(row);
  }
  return rows;
};

// trim fully-empty top/bottom rows? (keep fixed box for alignment — no trim)

module.exports = { Grid };
