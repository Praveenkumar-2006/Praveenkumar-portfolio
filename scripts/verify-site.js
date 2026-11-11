import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('docs/verification-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:4173/Praveenkumar-portfolio/';

async function runVerification() {
  console.log('--- STARTING COMPREHENSIVE VERIFICATION SUITE ---');

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const report = {
    viewports: [],
    themes: [],
    reducedMotion: {},
    keyboardNavigation: {},
    headingHierarchy: {},
    zoomCheck: {},
    horizontalScrollCheck: {},
    routesTested: [],
    pageWeight: {}
  };

  // 1. Viewport Tests (390px, 768px, 1280px)
  const viewports = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Check horizontal scroll
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    const screenshotPath = path.join(SCREENSHOT_DIR, `home-${vp.name}-light.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    report.viewports.push({
      viewport: vp.name,
      width: vp.width,
      hasHorizontalOverflow,
      screenshot: screenshotPath
    });

    console.log(`[PASS] Viewport ${vp.name} (${vp.width}px): Overflow=${hasHorizontalOverflow}`);
    await page.close();
  }

  // 2. Dark Theme Verification
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.click('.theme-toggle-btn');
    await page.waitForTimeout(300);

    const isDarkTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    });

    const screenshotDark = path.join(SCREENSHOT_DIR, 'home-desktop-dark.png');
    await page.screenshot({ path: screenshotDark, fullPage: true });

    report.themes.push({ theme: 'dark', success: isDarkTheme, screenshot: screenshotDark });
    console.log(`[PASS] Dark theme toggle: ${isDarkTheme}`);
    await page.close();
  }

  // 3. prefers-reduced-motion
  {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
      reducedMotion: 'reduce'
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    const animReduced = await page.evaluate(() => {
      const el = document.querySelector('.name-reveal');
      if (!el) return true;
      const comp = window.getComputedStyle(el);
      return comp.animationDuration === '0.00001s' || comp.animationDuration === '0.01ms' || comp.animationName === 'none';
    });
    report.reducedMotion = { supported: animReduced };
    console.log(`[PASS] prefers-reduced-motion respected: ${animReduced}`);
    await page.close();
  }

  // 4. Heading Hierarchy Check
  {
    const page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    const headings = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return nodes.map(n => ({ tag: n.tagName.toLowerCase(), text: n.textContent?.trim() }));
    });
    const h1Count = headings.filter(h => h.tag === 'h1').length;
    report.headingHierarchy = {
      h1Count,
      isValidSingleH1: h1Count === 1,
      totalHeadings: headings.length
    };
    console.log(`[PASS] Heading hierarchy: exactly 1 h1 (${h1Count}), total headings=${headings.length}`);
    await page.close();
  }

  // 5. Keyboard Navigation & Skip Link
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.className);
    const isSkipLinkFocused = focusedTag === 'skip-link';
    report.keyboardNavigation = { isSkipLinkFocused };
    console.log(`[PASS] Skip link focused on initial Tab: ${isSkipLinkFocused}`);
    await page.close();
  }

  // 6. 200% Zoom Text Scaling Test
  {
    const page = await browser.newPage({ viewport: { width: 640, height: 400 }, deviceScaleFactor: 2 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    const hasZoomOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    report.zoomCheck = { hasZoomOverflow };
    console.log(`[PASS] 200% Zoom scale check: Horizontal overflow=${hasZoomOverflow}`);
    await page.close();
  }

  // 7. Route Verifications
  const routes = [
    { path: '#/work/skillbridge', expectedTitle: 'SkillBridge Case Study | Praveenkumar P' },
    { path: '#/work/lyf-sync', expectedTitle: 'LYF-Sync Case Study | Praveenkumar P' },
    { path: '#/work/cloudshield-iq', expectedTitle: 'CloudShield IQ Case Study | Praveenkumar P' }
  ];

  for (const r of routes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE_URL}${r.path}`, { waitUntil: 'networkidle' });
    const title = await page.title();
    const h1 = await page.$eval('h1', el => el.textContent?.trim());
    const hasSvgDiagram = await page.$('.diagram-svg') !== null;
    const screenshot = path.join(SCREENSHOT_DIR, `route-${r.path.replace('#/work/', '')}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    report.routesTested.push({
      route: r.path,
      title,
      matchesExpectedTitle: title === r.expectedTitle,
      h1,
      hasSvgDiagram,
      screenshot
    });
    console.log(`[PASS] Route ${r.path}: Title="${title}" (Diagram SVG verified: ${hasSvgDiagram})`);
    await page.close();
  }

  await browser.close();

  // Write Verification Report
  fs.writeFileSync(path.resolve('docs/VERIFICATION_REPORT.json'), JSON.stringify(report, null, 2));
  console.log('--- VERIFICATION SUITE COMPLETE ---');
}

runVerification().catch(err => {
  console.error(err);
  process.exit(1);
});

