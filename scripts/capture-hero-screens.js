import { chromium } from 'playwright';

async function captureHeroScreenshots() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe'
  });

  // Desktop
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await pageDesktop.goto('http://localhost:4173/Praveenkumar-portfolio/', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(1200); // allow all entrance motion (<1.2s) to complete
  await pageDesktop.screenshot({ path: 'public/hero-desktop-spec.png', fullPage: false });

  // Mobile
  const pageMobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await pageMobile.goto('http://localhost:4173/Praveenkumar-portfolio/', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1200);
  await pageMobile.screenshot({ path: 'public/hero-mobile-spec.png', fullPage: false });

  await browser.close();
  console.log('Screenshots captured: public/hero-desktop-spec.png, public/hero-mobile-spec.png');
}

captureHeroScreenshots().catch(console.error);

