# Drinks Up launch kit

Everything needed to get Drinks Up into the App Store and Google Play: the steps in order, copy-paste store text, and answers to the stores' questionnaires.

Links used throughout:

| What | URL |
|---|---|
| Support page | https://www.ad-higgins.com/drinks-up |
| Privacy policy | https://www.ad-higgins.com/drinks-up-privacy |
| Account deletion info (Google asks for this) | https://www.ad-higgins.com/drinks-up |
| Contact email | AD@AD-Higgins.com |
| App ID (iOS and Android) | `com.adhiggins.drinksup` |

---

## 1. Checklist, in order

### Accounts (start now; approvals take days)
- [ ] **Expo**: free account at expo.dev.
- [ ] **Apple Developer Program**: $99/year at developer.apple.com/programs. Enrol as an **Individual** (shows "Andrew Higgins" as the seller). Usually approved in 1–2 days.
- [ ] **Google Play Console**: $25 once at play.google.com/console. Personal accounts must verify identity, and **must run a closed test with at least 12 testers for 14 days** before the app can go public. Line up 12 people with Android phones.

### First real build (Android test copy you can install now, no store needed)
Open the project folder, type `cmd` in the address bar, then:
1. `npx eas-cli@latest login`: sign in with your Expo account.
2. Already done: the project is linked to your Expo account (project ID `b7568a0e-c6b5-4767-94a4-6771b7501278`, saved in `app.json`).
3. `npx eas-cli@latest build --platform android --profile preview`: builds in the cloud (about 10–20 minutes). When done it shows a link and QR code; open it on your Android phone to install the real Drinks Up app, with its icon, no Expo Go needed.

### iPhone build → TestFlight → App Store
1. In **App Store Connect** (appstoreconnect.apple.com): **Apps → + → New App**. Platform iOS, name "Drinks Up", language English (U.S.), bundle ID `com.adhiggins.drinksup`, SKU `drinksup`.
2. `npx eas-cli@latest build --platform ios --profile production`: it asks you to sign in to your Apple account and creates the certificates for you (say yes to its prompts).
3. `npx eas-cli@latest submit --platform ios`: uploads the build to App Store Connect. It appears in **TestFlight** after Apple's processing (about 15–60 minutes). Install the **TestFlight** app on an iPhone to try it.
4. Fill in the App Store listing (section 2), age rating (section 3), App Privacy (section 4), and review notes (section 5), add screenshots (section 6), then **Submit for Review**. Review usually takes 1–3 days.

### Android build → closed test → Google Play
1. In **Play Console**: **Create app**. Name "Drinks Up", app (not game), free.
2. `npx eas-cli@latest build --platform android --profile production`: makes the store file (`.aab`). Download it from the link it shows.
3. **The first upload must be done by hand**: Play Console → **Testing → Closed testing → Create track → Create new release**, upload the `.aab`.
4. Add your 12+ testers' Gmail addresses, start the test, and have them install it from the opt-in link. Keep it running **14 days**.
5. Meanwhile fill in the store listing (section 2), content rating (section 3), Data safety (section 4), target audience (**18 and over**), and ads (**No**).
6. After 14 days: **apply for production access**, then promote the release to Production. Later updates can use `npx eas-cli@latest submit --platform android`.

### After approval
- [ ] Send Claude the App Store and Google Play links. They go into `src/config/storeLinks.ts` (shared recipes then end with "Get Drinks Up") and onto your Drinks Up web page.
- [ ] Ship updates with a new build + submit (version numbers increase automatically).

---

## 2. Store listing text

**App name** (30 max): `Drinks Up`
If the name is taken: `Drinks Up: Cocktail Mixer`

**Apple subtitle** (30 max): `Cocktails from what you have`

**Google short description** (80 max):
`Tell us what's in your bar and see every cocktail you can make right now.`

**Apple promotional text** (170 max, can change any time without review):
`400 cocktails and mocktails, sorted by what you can make tonight. Tap what's in your bar, and Drinks Up does the rest. Cheers!`

**Description** (both stores):

```
What can I make with what I've got? Drinks Up answers that in seconds.

Tap the bottles, mixers and fruit you have at home, and Drinks Up shows every drink you can make right now, plus the ones you're just one ingredient away from.

WHAT YOU GET
• 400 cocktails and mocktails, from the Margarita and Old Fashioned to the Paper Plane and Espresso Martini
• Classics first, so you see the drinks everyone knows
• Grouped by spirit: tap Vodka, Gin, Rum or Tequila to see what you can mix
• "Tonight's pick" and a Pick-a-drink-for-me button for when you can't decide
• Smart shopping list: see which single bottle or juice unlocks the most new drinks, add it to your list, and tick it off at the store
• Easy drinks (3 ingredients or fewer) and moods like Summer, Brunch, Party and Cosy
• Clear recipes with amounts in oz or ml, scaled for 1, 2, 4 or 8 people
• Rate drinks and see what everyone loves
• Private notes on any drink
• Share any recipe with a friend
• Create your own recipes (free account)
• Find a liquor store near you in one tap

PRIVATE BY DESIGN
Your bar, favourites and notes are saved on your phone. A free account is optional, and only needed to create your own recipes or back up across devices.

For adults of legal drinking age (21+ in the US). Please drink responsibly.
```

**Apple keywords** (100 max, commas, no spaces):
`cocktail,recipes,mixology,bartender,home bar,mocktail,margarita,mojito,liquor,party,drink,mixer`

**Category**: Food & Drink (Apple secondary: Lifestyle). Google: Food & Drink.

**Copyright** (Apple): `2026 Andrew Higgins`

---

## 3. Age rating answers

**Apple (App Store Connect → App Information → Age Rating)**
- Alcohol, Tobacco, or Drug Use or References: **Frequent**
- Everything else (violence, sexual content, profanity, gambling, horror, medical, etc.): **None**
- Unrestricted web access: **No**
- User-generated content / messaging: **No** (other people only ever see star averages, never anything written by users)
- If asked about age assurance: **Yes, the app has an age gate** (date of birth on first launch; under-21s are blocked)

Apple calculates the rating from these answers; frequent alcohol references give the highest age band.

**Google (Play Console → Policy → App content → Content rating)**
- Category: **All other app types** (or Reference/Educational if offered)
- References to alcohol: **Yes**; depicts sale of alcohol: **No**
- Violence, sexuality, language, gambling, controlled substances (other than alcohol), user interaction/sharing location: **No**
- Shares user's location: **No**
- Lets users buy digital goods: **No**

**Google target audience**: **18 and over** only. Not designed for children.

---

## 4. Privacy questionnaires

### Apple: App Privacy ("nutrition label")
Does the app collect data? **Yes**. Is any data used for tracking? **No**.

| Data type | Collected | Linked to the user? | Purpose |
|---|---|---|---|
| Contact Info → Name | Yes (account only) | Yes | App Functionality |
| Contact Info → Email Address | Yes (account only) | Yes | App Functionality |
| Location → Coarse Location (city and state typed at sign-up) | Yes (account only) | Yes | App Functionality, Analytics |
| User Content → Other User Content (own recipes, notes, shopping list, bar, ratings) | Yes (account only) | Yes | App Functionality |
| Identifiers → User ID | Yes (account only) | Yes | App Functionality |
| Usage Data → Product Interaction (anonymous counts of drinks viewed/favourited, ingredients added) | Yes | **No** | Analytics |

Not collected: precise location, contacts, photos, health, financial info, browsing history, device ID, advertising data.

### Google: Data safety
- Collects or shares any data? **Yes, collects**; **does not share** with third parties.
- Encrypted in transit: **Yes**.
- Users can request deletion: **Yes**: in the app (Saved → ⚙️ → Account → Delete account) or at https://www.ad-higgins.com/drinks-up.
- Data collected (all **optional**, only with an account, except the anonymous app interactions):
  - Personal info: **Name**, **Email address**, **Other info** (city and state you enter): App functionality, account management, analytics
  - App activity: **App interactions** (anonymous counts): Analytics. **Other user-generated content** (own recipes, notes, shopping list, ratings): App functionality
  - App info and performance: none
  - Location: none (the store finder opens Maps without sharing location)

---

## 5. Notes for Apple's reviewer (App Review Information)

```
Drinks Up suggests cocktails from the ingredients a person has at home.

Age gate: on first launch, enter any date of birth at least 21 years ago.
Quick setup: tick a few items (e.g. Vodka, Lime juice, Simple syrup), then "Show me what I can make".

Accounts are optional. A free account is only needed to create your own recipes (Saved → + New) or rate drinks.
Demo account: [email] / [password]

Other users only see aggregate star ratings, never user-written content.
"Find a liquor store" opens Apple Maps with a search; the app requests no location permission.
Account deletion: Saved → ⚙️ → Account → Delete account.
```

**Before submitting:** create the demo account (an email address you can confirm, e.g. a second Gmail) and fill it in above in App Store Connect, not here.

Contact info for the reviewer: Andrew Higgins, AD@AD-Higgins.com, plus a phone number.

---

## 6. Screenshots

- **Apple**: iPhone 6.9" display, 1320 × 2868 (or 1290 × 2796). 3–10 images.
- **Google**: phone screenshots, 2–8 images, portrait.
- Best taken from the **real app** (the Android test build, and TestFlight on an iPhone), not Expo Go, which shows a Tools button.
- Suggested set: (1) Mix banner with Tonight's pick, (2) Ready to mix grouped by spirit, (3) a drink page with rating and recipe, (4) Drinks tab with filters, (5) shopping list, (6) quick setup.
- Claude can turn plain screenshots into framed store images with captions ("See what you can make tonight") once you have them.
