/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { RECIPES } from '../data/recipes';
import { searchRecipes } from './search';

const names = (q: string) => searchRecipes(RECIPES, q).map((r) => r.name);

test('an empty search lists every drink', () => {
  const all = names('');
  assert.equal(all.length, RECIPES.length);

});

test('accents and capitals do not matter', () => {
  assert.equal(names('pina')[0], 'Piña Colada');
  assert.ok(names('ELYSEES').includes('Champs-Élysées'));
});

test('name matches rank above ingredient matches', () => {
  const r = names('margarita');
  assert.ok(r.slice(0, 4).every((n) => n.toLowerCase().includes('margarita')), r.slice(0, 4).join());
});

test('ingredients are searchable, including swaps', () => {
  assert.ok(names('pineapple').includes('Painkiller'));
  assert.ok(names('rye').includes('Old Fashioned'), 'rye is an alternative in an Old Fashioned');
});

test('every word must match', () => {
  const r = names('gin lime');
  assert.ok(r.includes('Gimlet'));
  assert.ok(!r.includes('Negroni'));
  assert.deepEqual(names('zzzz'), []);
});

test('classics come first when browsing and on ties', async () => {
  const { CLASSICS } = await import('../data/classics');
  const browse = names('');
  assert.deepEqual(browse.slice(0, 4), ['Margarita', 'Old Fashioned', 'Mojito', 'Piña Colada']);
  assert.equal(new Set(CLASSICS).size, CLASSICS.length, 'no duplicates');
  for (const id of CLASSICS) assert.ok(RECIPES.some((r) => r.id === id), `${id} is a real recipe`);
  const rum = names('rum');
  assert.ok(rum.indexOf('Mojito') < rum.indexOf('Air Mail'), 'well-known rum drinks rank above obscure ones');
});
