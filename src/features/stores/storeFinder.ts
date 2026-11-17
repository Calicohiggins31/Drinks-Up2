import { Linking, Platform } from 'react-native';
import { mapsSearchUrl, type ApproxLocation } from './mapsLink';

/**
 * How "Find a store" works.
 * - 'maps-link' (v1): open the phone's maps app. No location permission needed.
 * - 'in-app-list' (planned): ask for approximate location only when the button is tapped,
 *   then show our own nearby-store list with a labelled "Featured" spot.
 */
export type StoreFinderMode = 'maps-link' | 'in-app-list';
export const STORE_FINDER_MODE: StoreFinderMode = 'maps-link';

/** A store in the planned in-app list. `featured` stores pay for the labelled top spot. */
export type Store = {
  id: string;
  name: string;
  address: string;
  distanceKm?: number;
  featured?: boolean;
  location: ApproxLocation;
};

/**
 * Planned: asks for approximate (not precise) location, foreground only, at the moment
 * the user taps the button. Returns undefined if they decline. Not used in v1.
 */
export type ApproxLocationProvider = () => Promise<ApproxLocation | undefined>;

export async function findStoresNearby(): Promise<void> {
  // v1: hand off to the maps app; Drinks Up never sees the user's location.
  await Linking.openURL(mapsSearchUrl(Platform.OS));
}
