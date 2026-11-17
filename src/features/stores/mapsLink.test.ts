/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mapsSearchUrl } from './mapsLink';

test('v1 links contain no location at all', () => {
  assert.equal(mapsSearchUrl('ios'), 'https://maps.apple.com/?q=liquor%20store');
  assert.equal(mapsSearchUrl('android'), 'https://www.google.com/maps/search/?api=1&query=liquor%20store');
});

test('a future approximate location is rounded to about 1 km', () => {
  const loc = { latitude: 41.878113, longitude: -87.629799 };
  assert.equal(mapsSearchUrl('ios', loc), 'https://maps.apple.com/?q=liquor%20store&sll=41.88,-87.63');
  assert.equal(mapsSearchUrl('android', loc), 'https://www.google.com/maps/search/liquor%20store/@41.88,-87.63,13z');
});
