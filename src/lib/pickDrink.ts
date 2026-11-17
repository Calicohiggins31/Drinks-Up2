import { isClassic } from '../data/classics';
import { pickRandom } from './pick';

/** Mostly suggests drinks people know: 3 times in 4, picks from the classics in the list (if any). */
export function pickDrinkId(ids: string[], previous?: string, random: () => number = Math.random): string | undefined {
  const classics = ids.filter(isClassic);
  const pool = classics.length > 0 && random() < 0.75 ? classics : ids;
  return pickRandom(pool, previous, random);
}
