// Pokéram — gfx.js
// Logical 240x160 canvas with integer CSS upscaling, the palette-indexed
// sprite-grid decoder (all game art flows through here), bitmap-font text
// rendering, and 9-slice frames.

(function () {
  var W = 240, H = 160;

  G.SCREEN_W = W;
  G.SCREEN_H = H;
  G.IMG = {};   // name -> decoded offscreen canvas
  G.ART = {};   // name -> {w,h,pal,px} source grids (data files fill this)

  function makeCanvas(w, h) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    return c;
  }

  function hexToRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];
  }

  // Decode one {w,h,pal,px} grid into a canvas. '.' (and ' ') = transparent.
  function decodeGrid(art) {
    var w = art.w, h = art.h;
    var c = makeCanvas(w, h);
    var ctx = c.getContext('2d');
    var img = ctx.createImageData(w, h);
    var data = img.data;
    var rgbCache = {};
    for (var key in art.pal) rgbCache[key] = hexToRgb(art.pal[key]);
    for (var y = 0; y < h; y++) {
      var row = art.px[y] || '';
      for (var x = 0; x < w; x++) {
        var ch = row[x];
        if (ch === undefined || ch === '.' || ch === ' ') continue;
        var rgb = rgbCache[ch];
        if (!rgb) continue;
        var i = (y * w + x) * 4;
        data[i] = rgb[0]; data[i + 1] = rgb[1]; data[i + 2] = rgb[2]; data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return c;
  }

  function flipped(canvas) {
    var c = makeCanvas(canvas.width, canvas.height);
    var ctx = c.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, 0, 0);
    return c;
  }

  G.gfx = {
    makeCanvas: makeCanvas,
    flipped: flipped,

    init: function () {
      var canvas = document.getElementById('screen');
      G.screen = canvas;
      G.ctx = canvas.getContext('2d');
      G.ctx.imageSmoothingEnabled = false;

      function resize() {
        // fill the window exactly: the game takes 100% of the limiting
        // dimension (aspect preserved, nearest-neighbor keeps pixels crisp)
        var scale = Math.max(1, Math.min(window.innerWidth / W, window.innerHeight / H));
        canvas.style.width = Math.floor(W * scale) + 'px';
        canvas.style.height = Math.floor(H * scale) + 'px';
      }
      window.addEventListener('resize', resize);
      document.addEventListener('fullscreenchange', resize);
      resize();
    },

    // Decode every G.ART entry into G.IMG. Entries may use:
    //   base: 'otherName'  — reuse another entry's px grid (palette swap)
    //   mirror: true       — also produce IMG[name + '_flip']
    decodeAll: function () {
      var name, art;
      // Two passes so palette swaps can reference entries declared later.
      for (name in G.ART) {
        art = G.ART[name];
        if (!art.base) G.IMG[name] = decodeGrid(art);
      }
      for (name in G.ART) {
        art = G.ART[name];
        if (art.base) {
          var src = G.ART[art.base];
          G.IMG[name] = decodeGrid({ w: src.w, h: src.h, px: src.px, pal: art.pal });
        }
      }
      for (name in G.ART) {
        if (G.ART[name].mirror) G.IMG[name + '_flip'] = flipped(G.IMG[name]);
      }
      G.gfx.buildBacks();
      G.gfx.buildFont();
    },

    // Back sprites for creatures without an authored one: flip the front,
    // find its actual pixel bounds, and scale it to ALWAYS fit the 56x40
    // back-sprite box (modest zoom for small creatures, gentle shrink for
    // giants) — bottom-center anchored, never cropped.
    buildBacks: function () {
      for (var key in (G.SPECIES || {})) {
        var frontName = 'mon_' + key;
        var backName = 'mon_' + key + '_back';
        if (!G.IMG[frontName] || G.IMG[backName]) continue;
        var fl = flipped(G.IMG[frontName]);
        var fctx = fl.getContext('2d');
        var data = fctx.getImageData(0, 0, fl.width, fl.height).data;
        var minX = fl.width, maxX = 0, minY = fl.height, maxY = 0;
        for (var y = 0; y < fl.height; y++) {
          for (var x = 0; x < fl.width; x++) {
            if (data[(y * fl.width + x) * 4 + 3] > 0) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }
        if (maxX < minX) { minX = 0; maxX = fl.width - 1; minY = 0; maxY = fl.height - 1; }
        var cw = maxX - minX + 1, ch = maxY - minY + 1;
        var scale = Math.min(1.5, 52 / cw, 38 / ch);
        scale = Math.max(0.5, Math.floor(scale * 4) / 4); // quarter steps, tidy pixels
        var dw = Math.round(cw * scale), dh = Math.round(ch * scale);
        var c = makeCanvas(56, 40);
        var ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(fl, minX, minY, cw, ch, Math.round(28 - dw / 2), 40 - dh, dw, dh);
        G.IMG[backName] = c;
      }
    },

    // -----------------------------------------------------------------------
    // Bitmap font. G.FONT.glyphs[char] = array of rows of '.'/'#'.
    // Pre-rendered per color on demand; '#' pixels take the requested color.
    // -----------------------------------------------------------------------
    _fontCache: {},   // color -> char -> canvas
    _glyphW: {},      // char -> advance width

    buildFont: function () {
      for (var ch in G.FONT.glyphs) {
        var rows = G.FONT.glyphs[ch];
        var w = 0;
        for (var i = 0; i < rows.length; i++) w = Math.max(w, rows[i].length);
        G.gfx._glyphW[ch] = w + 1; // +1px letter spacing
      }
      G.gfx._glyphW[' '] = 3;
    },

    _glyph: function (ch, color) {
      var cache = G.gfx._fontCache[color];
      if (!cache) cache = G.gfx._fontCache[color] = {};
      if (cache[ch]) return cache[ch];
      var rows = G.FONT.glyphs[ch];
      if (!rows) return null;
      var w = G.gfx._glyphW[ch] - 1;
      var c = makeCanvas(Math.max(1, w), G.FONT.height);
      var ctx = c.getContext('2d');
      ctx.fillStyle = color;
      for (var y = 0; y < rows.length; y++) {
        for (var x = 0; x < rows[y].length; x++) {
          if (rows[y][x] === '#') ctx.fillRect(x, y, 1, 1);
        }
      }
      cache[ch] = c;
      return c;
    }
  };

  // Draw text; returns end x. shadow: optional second color drawn at +1,+1
  // (the GBA text look is dark text with a light drop shadow).
  G.text = function (ctx, str, x, y, color, shadow) {
    str = String(str);
    var cx = x;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === ' ') { cx += G.gfx._glyphW[' ']; continue; }
      var img = G.gfx._glyph(ch, color);
      if (!img) { cx += 4; continue; }
      if (shadow) {
        var sh = G.gfx._glyph(ch, shadow);
        ctx.drawImage(sh, cx + 1, y + 1);
      }
      ctx.drawImage(img, cx, y);
      cx += G.gfx._glyphW[ch];
    }
    return cx;
  };

  G.textWidth = function (str) {
    str = String(str);
    var w = 0;
    for (var i = 0; i < str.length; i++) w += G.gfx._glyphW[str[i]] || 4;
    return w;
  };

  // Word-wrap to maxWidth px; returns array of lines.
  G.textWrap = function (str, maxWidth) {
    var words = String(str).split(' ');
    var lines = [], line = '';
    for (var i = 0; i < words.length; i++) {
      var probe = line ? line + ' ' + words[i] : words[i];
      if (G.textWidth(probe) > maxWidth && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = probe;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  // 9-slice: img divided into a 3x3 grid of `c`-sized corners; edges/center tile.
  G.nineSlice = function (ctx, img, x, y, w, h, c) {
    var iw = img.width, ih = img.height;
    var ew = iw - c * 2, eh = ih - c * 2; // source edge strip sizes
    // corners
    ctx.drawImage(img, 0, 0, c, c, x, y, c, c);
    ctx.drawImage(img, iw - c, 0, c, c, x + w - c, y, c, c);
    ctx.drawImage(img, 0, ih - c, c, c, x, y + h - c, c, c);
    ctx.drawImage(img, iw - c, ih - c, c, c, x + w - c, y + h - c, c, c);
    // edges
    ctx.drawImage(img, c, 0, ew, c, x + c, y, w - c * 2, c);
    ctx.drawImage(img, c, ih - c, ew, c, x + c, y + h - c, w - c * 2, c);
    ctx.drawImage(img, 0, c, c, eh, x, y + c, c, h - c * 2);
    ctx.drawImage(img, iw - c, c, c, eh, x + w - c, y + c, c, h - c * 2);
    // center
    ctx.drawImage(img, c, c, ew, eh, x + c, y + c, w - c * 2, h - c * 2);
  };
})();
