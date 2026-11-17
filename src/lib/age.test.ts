/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ageOn, LEGAL_AGE, parseBirthDate } from './age';

const today = new Date(2026, 10, 17); // Nov 17, 2026

test('the legal age is 21', () => assert.equal(LEGAL_AGE, 21));

test('turning 21 today counts as 21', () => {
  assert.equal(ageOn({ year: 2005, month: 11, day: 17 }, today), 21);
});

test('one day before the 21st birthday is still 20', () => {
  assert.equal(ageOn({ year: 2005, month: 11, day: 18 }, today), 20);
  assert.equal(ageOn({ year: 2005, month: 12, day: 1 }, today), 20);
});

test('invalid or future dates are rejected', () => {
  assert.equal(parseBirthDate('2', '30', '1990', today), null);
  assert.equal(parseBirthDate('13', '1', '1990', today), null);
  assert.equal(parseBirthDate('1', '1', '2030', today), null);
  assert.equal(parseBirthDate('', '', '', today), null);
  assert.equal(parseBirthDate('1', '1', '85', today), null, 'two-digit years are ambiguous');
});

test('leap-day birthdays parse', () => {
  assert.deepEqual(parseBirthDate('2', '29', '2004', today), { year: 2004, month: 2, day: 29 });
  assert.equal(ageOn({ year: 2004, month: 2, day: 29 }, today), 22);
});
