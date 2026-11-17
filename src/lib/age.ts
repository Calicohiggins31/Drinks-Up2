/** Minimum age to use the app. 21 is the legal drinking age in the US. */
export const LEGAL_AGE = 21;

export type DateParts = { year: number; month: number; day: number };

/** Parses month/day/year text into a real calendar date, or returns null if it isn't one. */
export function parseBirthDate(month: string, day: string, year: string, today = new Date()): DateParts | null {
  const m = Number(month), d = Number(day), y = Number(year);
  if (![m, d, y].every(Number.isInteger)) return null;
  if (y < 1900 || m < 1 || m > 12 || d < 1) return null;
  const date = new Date(y, m - 1, d);
  // Rejects dates like Feb 30, which JavaScript would roll over into March.
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  if (date > today) return null;
  return { year: y, month: m, day: d };
}

/** Whole years between the birth date and today. */
export function ageOn(birth: DateParts, today = new Date()): number {
  let age = today.getFullYear() - birth.year;
  const beforeBirthday =
    today.getMonth() + 1 < birth.month || (today.getMonth() + 1 === birth.month && today.getDate() < birth.day);
  if (beforeBirthday) age -= 1;
  return age;
}
