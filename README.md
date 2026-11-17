# Drinks Up

Tell Drinks Up what's in your bar, and it tells you which drinks you can mix right now.

One codebase runs on **iPhone and Android** (built with [Expo](https://expo.dev) and React Native).

## What it does

- **My Bar**: tap the bottles, mixers, juices and fresh things you have. Search, or add a whole starter kit (home bar basics, aperitivo, mocktails) in one tap.
- **Mix**: every drink you can make now, filtered by cocktails or mocktails. It also shows drinks that are **one ingredient away**, plus a **shopping list** of the single purchases that unlock the most new drinks.
- **Drink page**: ingredients with ✓ / ✕ for what you have, amounts in oz or ml, method steps, and an "I have it" button for anything missing. Sensible swaps count automatically (rye for bourbon, sugar for simple syrup).
- **Saved**: your own recipes, favourite drinks and the full list (120 drinks, 93 ingredients). Every drink has an "About this drink" note.
- **Your own recipes and ingredients**: tap **+ New** on the Saved tab to write your own drink, or type anything into My Bar search to add your own ingredient. These are saved only on your phone.

Your bar, favourites and your own recipes are saved on the device.

## Run it

```bash
npm install
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone (iOS or Android), or press `i` / `a` to open a simulator. Press `w` for a browser preview.

## Checks

```bash
npm run typecheck   # TypeScript
npm test            # matching logic and recipe data tests
```

## Ship to the App Store and Google Play

Builds happen in the cloud with EAS; no Mac or Android Studio required:

```bash
npx eas-cli@latest build --platform all
npx eas-cli@latest submit --platform ios      # needs an Apple Developer account
npx eas-cli@latest submit --platform android  # needs a Google Play Console account
```

Change `ios.bundleIdentifier` and `android.package` in `app.json` (currently `com.drinksup.app`) to an id you own before the first store build, and replace the placeholder icons in `assets/`.

## Project layout

```
src/app/            screens (Expo Router: each file is a route)
  (tabs)/index.tsx    Mix: what can I make
  (tabs)/bar.tsx      My Bar: ingredient picker
  (tabs)/saved.tsx    Saved + all drinks
  drink/[id].tsx      Drink recipe page
src/data/           ingredients.ts, recipes.ts (add drinks here)
src/lib/matching.ts what-can-I-make logic
src/state/          saved bar + favourites
```

To add a drink, append it to `RECIPES` in `src/data/recipes.ts` using ingredient ids from `src/data/ingredients.ts`; `npm test` checks every id is valid.
