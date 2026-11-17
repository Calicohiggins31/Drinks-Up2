# Drinks Up

Tell Drinks Up what's in your bar, and it tells you which drinks you can mix right now.

One codebase runs on **iPhone and Android** (built with [Expo](https://expo.dev) and React Native).

## What it does

- **My Bar**: tap the bottles, mixers, juices and fresh things you have.
- **Age gate**: date of birth on first launch; under-21s are blocked.
- **Mix**: every drink you can make now, grouped under foldable base-spirit headers (Vodka, Gin, Rum…), filtered by cocktails or mocktails. It also shows drinks that are **one ingredient away**, plus a **shopping list** of the single purchases that unlock the most new drinks, and a **Find a liquor store near me** button that opens Maps.
- **Drink page**: ingredients with ✓ / ✕ for what you have, amounts in oz or ml, method steps, and an "I have it" button for anything missing. Sensible swaps count automatically (rye for bourbon, sugar for simple syrup).
- **Drinks**: search all 200 drinks by name, ingredient or description, with "I can make" and base-spirit filters. Every drink has an "About this drink" note.
- **Pick a drink for me**: a random drink you can make right now, on the Mix screen.
- **Shopping list**: add missing ingredients from any drink or suggestion, tick them off at the store, move them into My Bar, or share the list.
- **Ratings and notes**: signed-in users rate drinks 1–5 stars (everyone sees the average); private notes on any drink.
- **Share and scale**: share any recipe by text or email, and switch "Making for" between 1, 2, 4 and 8 people.
- **Saved**: your own recipes and favourite drinks.
- **Your own recipes and ingredients**: tap **+ New** on the Saved tab to write your own drink, or type anything into My Bar search to add your own ingredient. These are saved only on your phone.

Your bar, favourites and your own recipes are saved on the device.

## Run it

```bash
npm install
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone (iOS or Android), or press `i` / `a` to open a simulator. Press `w` for a browser preview.

## Accounts (Supabase)

Free accounts are needed to create your own recipes; favourites work without one and can be backed up by signing in.

1. Create a free project at supabase.com.
2. In the project, open **SQL Editor → New query**, paste everything from `supabase/schema.sql`, and click **Run**.
3. Copy `.env.example` to `.env` and fill in the **Project URL** and **anon / publishable key** from **Project Settings → API**.
4. Restart `npx expo start`.

Until step 3 is done, the app runs normally and the account screens say accounts are coming soon.

## App store links in shared recipes

Once the app is live, fill in `src/config/storeLinks.ts` with the App Store and Google Play links. Shared recipes then end with "Get Drinks Up" and those links.

## Privacy policy

The policy lives in `src/content/privacyPolicy.ts` (shown in the app) and is exported to `docs/privacy-policy.md` with `npm run privacy:md`. Fill in the `[BRACKETED]` placeholders before publishing, and update it before shipping location or analytics features.

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
