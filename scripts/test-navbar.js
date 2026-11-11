import { chromium } from 'playwright';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:4173/Praveenkumar-portfolio/';

async function testNavbarNavigation() {
  console.log('Testing Navbar and Section Navigation with Playwright...');

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  const initialUrl = page.url();
  console.log('Initial URL:', initialUrl);

  const sections = ['work', 'experience', 'skills', 'about', 'contact'];

  for (const s of sections) {
    const initialY = await page.evaluate(() => window.scrollY);
    console.log(`\nTesting click on nav link for #${s} (Current scrollY: ${initialY})...`);

    // Click the nav link
    const link = page.locator(`.site-nav-bar a[href="#${s}"]`);
    await link.click();
    await page.waitForTimeout(500);

    const postClickUrl = page.url();
    const postClickY = await page.evaluate(() => window.scrollY);
    const targetElementY = await page.evaluate((id) => {
      const el = document.getElementById(id);
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
    }, s);

    console.log(`URL after clicking #${s}: ${postClickUrl}`);
    console.log(`Target element #${s} absolute Y: ${targetElementY}`);
    console.log(`Actual scrollY after click: ${postClickY}`);

    const didScrollToTarget = Math.abs(postClickY - (targetElementY || 0)) < 150;
    console.log(`Did successfully scroll near #${s}: ${didScrollToTarget}`);
  }

  await browser.close();
}

testNavbarNavigation().catch(console.error);

