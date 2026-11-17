/** Rough position. Future versions pass this in after asking for approximate location. */
export type ApproxLocation = { latitude: number; longitude: number };

export const STORE_SEARCH_TERM = 'liquor store';

/**
 * Builds a web link that opens the phone's maps app on a nearby-store search.
 * Without a location, the maps app uses its own location, so Drinks Up never sees where the user is.
 */
export function mapsSearchUrl(platform: string, location?: ApproxLocation, term = STORE_SEARCH_TERM): string {
  const q = encodeURIComponent(term);
  // Round to ~1 km so even a future version only ever shares an approximate position.
  const lat = location && location.latitude.toFixed(2);
  const lng = location && location.longitude.toFixed(2);
  if (platform === 'ios') {
    return `https://maps.apple.com/?q=${q}${location ? `&sll=${lat},${lng}` : ''}`;
  }
  return location
    ? `https://www.google.com/maps/search/${q}/@${lat},${lng},13z`
    : `https://www.google.com/maps/search/?api=1&query=${q}`;
}
