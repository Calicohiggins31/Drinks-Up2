/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { diffById, diffSets, mergeById, mergeFavorites } from './sync';

test('favourites from the phone are kept when signing in', () => {
  assert.deepEqual([...mergeFavorites(['mojito', 'negroni'], ['negroni', 'sazerac'])].sort(), ['mojito', 'negroni', 'sazerac']);
});

test('the account copy of a recipe wins when both exist', () => {
  const merged = mergeById([{ id: 'a', v: 1 }, { id: 'b', v: 1 }], [{ id: 'a', v: 2 }]);
  assert.deepEqual(merged, [{ id: 'a', v: 2 }, { id: 'b', v: 1 }]);
});

test('set and list diffs find what to upload and delete', () => {
  assert.deepEqual(diffSets(new Set(['a', 'b']), new Set(['b', 'c'])), { added: ['c'], removed: ['a'] });
  const d = diffById([{ id: 'a', v: 1 }, { id: 'b', v: 1 }], [{ id: 'a', v: 2 }, { id: 'c', v: 1 }]);
  assert.deepEqual(d, { upsert: [{ id: 'a', v: 2 }, { id: 'c', v: 1 }], removed: ['b'] });
});

test('states and emails are checked on sign-up', async () => {
  const { normalizeState, isValidEmail } = await import('./usStates');
  assert.equal(normalizeState('il'), 'IL');
  assert.equal(normalizeState(' Illinois '), 'IL');
  assert.equal(normalizeState('Ontario'), null);
  assert.ok(isValidEmail('a.person@example.com'));
  assert.ok(!isValidEmail('not-an-email'));
});

test('usage stats never include people\'s own recipes or ingredients', async () => {
  const { usageItems } = await import('./sync');
  assert.deepEqual(usageItems(['vodka', 'custom_ing_grandmas_jam_x1', 'vodka', 'gin', 'Bad Id!']), ['vodka', 'gin']);
});

test('rating labels', async () => {
  const { ratingLabel } = await import('./ratingLabel');
  assert.equal(ratingLabel(null), 'No ratings yet. Be the first!');
  assert.equal(ratingLabel({ average: 4.25, total: 27 }), '4.3 ★ from 27 ratings');
  assert.equal(ratingLabel({ average: 5, total: 1 }), '5.0 ★ from 1 rating');
});

test('card ratings and top rated', async () => {
  const { shortRating, topRatedIds } = await import('./ratingLabel');
  assert.equal(shortRating(undefined), '');
  assert.equal(shortRating({ average: null, total: 0 }), '');
  assert.equal(shortRating({ average: 4.56, total: 12 }), '4.6 (12)');
  const all = new Map([
    ['mojito', { average: 4.2, total: 30 }],
    ['margarita', { average: 4.8, total: 52 }],
    ['negroni', { average: 4.8, total: 9 }],
    ['kamikaze', { average: 3.1, total: 40 }],
  ]);
  assert.deepEqual(topRatedIds(all), ['margarita', 'negroni', 'mojito']);
});
