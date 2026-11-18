// Renders the Drinks Up icon set from assets/brand/glyph.svg using the pre-installed Chromium.
// Run: node scripts/make-icons.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..');
const glyph = fs.readFileSync(path.join(root, 'assets/brand/glyph.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const BG = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FF8A3D"/><stop offset="1" stop-color="#E8590C"/></linearGradient></defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>`;

// scale: how big the glass is drawn (1 = full canvas). Android needs it inside the central safe zone.
const svg = ({ background, scale = 1, mono = false }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  ${background ? BG : ''}
  <g transform="translate(512 ${512 + 30 * scale}) scale(${scale}) translate(-512 -540)">
    ${mono ? glyph.replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#FFFFFF"').replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="#FFFFFF"') : glyph}
  </g>
</svg>`;

const outputs = [
  // iOS + default app icon: full square, no transparency (Apple rounds the corners itself).
  { file: 'icon.png', size: 1024, background: true, scale: 1.12 },
  // Android adaptive icon: background layer + glass inside the central safe zone.
  { file: 'android-icon-background.png', size: 512, background: true, glyphless: true },
  { file: 'android-icon-foreground.png', size: 512, scale: 0.62 },
  { file: 'android-icon-monochrome.png', size: 432, scale: 0.62, mono: true },
  // Splash screen: white glass shown on the orange splash background.
  { file: 'splash-icon.png', size: 1024, scale: 0.9 },
  { file: 'favicon.png', size: 48, background: true, scale: 1.12 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const o of outputs) {
    const body = o.glyphless
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${BG}</svg>`
      : svg(o);
    await page.setViewportSize({ width: o.size, height: o.size });
    await page.setContent(
      `<html><body style="margin:0;background:transparent">${body.replace('width="1024" height="1024"', `width="${o.size}" height="${o.size}"`)}</body></html>`,
    );
    await page.screenshot({ path: path.join(root, 'assets', o.file), omitBackground: !o.background, clip: { x: 0, y: 0, width: o.size, height: o.size } });
    console.log('wrote assets/' + o.file);
  }
  await browser.close();
})();
