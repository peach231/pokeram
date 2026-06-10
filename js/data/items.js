// Pokéram — items.js
// Items as pure descriptors; one useItem() in battle/menus interprets `kind`.
//   heal    — restore `amount` HP
//   cure    — clear listed statuses
//   revive  — revive fainted to frac of max HP
//   orb     — capture device, `mod` multiplies catch rate
//   repel   — suppress weak wild encounters for `steps` steps
//   key     — story item, not usable

(function () {
  var I = G.ITEMS = {};
  function item(id, name, price, kind, props, desc) {
    I[id] = Object.assign({ id: id, name: name, price: price, kind: kind, desc: desc }, props);
  }

  item('potion',     'Potion',      200,  'heal',   { amount: 20 },  'Restores 20 HP.');
  item('superpotion','Super Potion',600,  'heal',   { amount: 60 },  'Restores 60 HP.');
  item('hyperpotion','Hyper Potion',1500, 'heal',   { amount: 150 }, 'Restores 150 HP.');
  item('cureall',    'Cure-All',    400,  'cure',   { statuses: ['brn', 'psn', 'par', 'slp'] }, 'Heals any status condition.');
  item('revivedust', 'Revive Dust', 900,  'revive', { frac: 0.5 },   'Revives a fainted creature to half HP.');
  item('tameorb',    'Tame Orb',    150,  'orb',    { mod: 1.0 },    'A standard capture orb.');
  item('greatorb',   'Great Orb',   500,  'orb',    { mod: 1.5 },    'A high-grade capture orb.');
  item('mythorb',    'Myth Orb',    0,    'orb',    { mod: 255 },    'A legendary orb said never to fail.');
  item('repelmist',  'Repel Mist',  300,  'repel',  { steps: 100 },  'Repels weak wild creatures for 100 steps.');
  item('snackbar',   'Snack Bar',   100,  'heal',   { amount: 10 },  'A chewy snack. Restores 10 HP.');
})();
