# LifeSource AR (web app)

A home-screen web app that lets staff place LifeSource water systems in a garage at real size using the phone's camera, then save a photo to send to the customer.

- **Packages:** Ultimate (Filter + ScaleSolver + ApaPure12), Power (Filter + ScaleSolver), Essential (Filter + ApaPure12), Filter Only
- **AR:** iPhone uses Apple's AR Quick Look; Android uses Chrome's WebXR, falling back to Google Scene Viewer. Models are at true scale (`ar-scale="fixed"`).
- **Sizes:** each package also has a version with floating size cards (`models/<id>-sizes.glb`), switched with "Show sizes on the tanks" (on by default). The cards are part of the model, so they appear in AR and in photos.
- **Offline:** `sw.js` saves every file on the phone on first visit. After that the app opens with no signal.
- **No build step.** It's plain static files.

## Put it online (free)

Netlify Drop is the easiest:
1. Go to https://app.netlify.com/drop and sign in with a free account.
2. Drag the `lifesource-ar` folder onto the page.
3. You get a link like `https://something.netlify.app`. Rename it under Site settings if you like.

It must be served over **https** for the camera, AR and offline mode to work.

## Install on staff phones

- **iPhone:** open the link in **Safari**, tap Share, then **Add to Home Screen**.
- **Android:** open the link in **Chrome** and tap **Install** (or ⋮ → Add to Home screen).

Open it once with signal so the tanks download. It then works offline.

## Updating

- Replace a model in `models/` (a `.glb` file in meters, with the floor at y = 0).
- **Bump `VERSION` in `sw.js`** so phones download the new files.
- Upload again.

## The tank models

The current models were generated from the 1620S spec sheet dimensions (Filter 10" × 62.5", ScaleSolver 10" × 59.75", ApaPure12 3" × 10"). Tanks only, no plumbing; the ApaPure12 is shown at its usual mounting height on the water main. They are close approximations, not CAD-accurate. Swap in manufacturer models when available: same file names, `.glb` format.
