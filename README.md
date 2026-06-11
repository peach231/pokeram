# POKÉRAM

A complete GBA-style monster-catching RPG in vanilla JavaScript + Canvas.
No build step, no frameworks, no external assets — every sprite, map, song,
and sound effect is generated from code.

**To play: double-click `index.html`.** (Any modern browser.)

## Controls

| Key | Action |
|---|---|
| Arrow keys / WASD | Move / navigate menus |
| Z (or Space) | A button — confirm, talk, interact |
| X (or Esc) | B button — cancel, run from menus |
| Enter | Start — open the menu (Dex / Party / Bag / Save) |
| Ctrl or Shift (hold) | Run |
| M | Mute |
| F | Fullscreen |

## The game

You start in **Hearthvale** with a choice of four starters — Sproutle the
grass turtle, Aquilet the river eaglet, Emberpaw the ember panther, or Pebblamb
the boulder lamb. Your rival Kai picks the one that counters yours.

The **Solyn region**: 4 gyms (Rock, Water, Electric, Psychic), connecting
routes, the Verdant Forest, the two-level Hollowdeep Cave, the Summit Path,
and the Champion's hall at Crown Summit. **100 original creatures** across
five rarity tiers (watch the dex stars), with evolutions, an 18-type chart,
and two post-game legendaries: Astradrax the Starwyrm waits at the peak, and
Lumifae the Dawnbloom in a forest glade — champions only.

A hint: a never-fail **Myth Orb** is hidden in the deepest part of Hollowdeep.

## Dev notes

- `node tools/check.js` — validates all art grids, maps, species data, and
  runs the headless battle-engine test vectors.
- `node tools/bake_mons.js` — re-bakes creature sprites from the shape
  recipes in `tools/recipes.js` into `js/data/sprites_mons_*.js`.
- Debug URL hashes: `#gallery&p=N` (sprite gallery), `#wild&ff=400` /
  `#battle&auto` (battle harness), `#map=<id>,<x>,<y>` (spawn anywhere).
- See `BUILD_NOTES.md` for architecture details.



