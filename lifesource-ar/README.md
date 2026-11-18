# LifeSource AR (web app)

A home-screen web app that lets staff place LifeSource water systems in a garage at real size using the phone's camera, then save a photo to send to the customer.

- **Packages:** Ultimate (Filter + ScaleSolver + ApaPure12), Power (Filter + ScaleSolver), Essential (Filter + ApaPure12), Filter Only
- **AR:** iPhone uses Apple's AR Quick Look; Android uses Chrome's WebXR, falling back to Google Scene Viewer. Models are at true scale (`ar-scale="fixed"`).
- **Pipe:** each package has a PVC model (`models/<id>.glb`) and a copper model (`models/<id>-copper.glb`). Staff switch between them on the package screen.
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

The current models were generated from the 1620S spec sheet dimensions (Filter 10" × 62.5", ScaleSolver 10" × 59.75", ApaPure12 3" × 10"). They are close approximations, not CAD-accurate. Swap in manufacturer models when available: same file names, `.glb` format.
