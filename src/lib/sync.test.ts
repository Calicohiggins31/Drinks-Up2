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
