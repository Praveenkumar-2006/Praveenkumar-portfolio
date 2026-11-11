import { chromium } from 'playwright';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:4173/Praveenkumar-portfolio/';

async function waitForScrollEnd(page, maxWaitMs = 1500) {
  let lastY = await page.evaluate(() => window.scrollY);
  let unchangedCount = 0;
  const start = Date.now();

  while (Date.now() - start < maxWaitMs) {
    await page.waitForTimeout(100);
    const currentY = await page.evaluate(() => window.scrollY);
    if (Math.abs(currentY - lastY) < 2) {
      unchangedCount++;
      if (unchangedCount >= 3) break;
    } else {
      unchangedCount = 0;
    }
    lastY = currentY;
  }
}

async function testComponentsAndNav() {
  console.log('=== COMPREHENSIVE PLAYWRIGHT COMPONENT & NAVIGATION TEST ===');

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  const testResults = {
    navbarNavigation: [],
    marginRailNavigation: [],
    caseStudyBackNavigation: [],
    themeToggle: false,
    copyEmail: false,
    detailsExpansion: false,
    svgDiagrams: []
  };

  // --- TEST 1: NAVBAR NAVIGATION ---
  console.log('\n--- 1. Testing Header Navbar Section Navigation ---');
  const sections = ['work', 'experience', 'skills', 'about', 'contact'];

  for (const s of sections) {
    const link = page.locator(`.site-nav-bar a[href="#${s}"]`);
    await link.click();
    await waitForScrollEnd(page);

    const check = await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const atMaxScroll = Math.abs(window.scrollY - maxScroll) < 10;
      const nearHeader = Math.abs(rect.top - 81) < 25; // 65px header + 16px offset = 81px
      return {
        id,
        rectTop: Math.round(rect.top),
        rectBottom: Math.round(rect.bottom),
        scrollY: Math.round(window.scrollY),
        inViewport,
        nearHeader,
        atMaxScroll
      };
    }, s);

    const isSuccess = check !== null && check.inViewport && (check.nearHeader || check.atMaxScroll);
    console.log(`Nav link #${s}: top=${check?.rectTop}px, inViewport=${check?.inViewport}, nearHeader=${check?.nearHeader}, atMaxScroll=${check?.atMaxScroll} -> Success: ${isSuccess}`);

    testResults.navbarNavigation.push({
      section: s,
      ...check,
      success: isSuccess
    });
  }

  // --- TEST 2: MARGIN RAIL NAVIGATION ---
  console.log('\n--- 2. Testing Margin Rail Navigation ---');
  for (const s of sections) {
    const railLink = page.locator(`.margin-rail a[href="#${s}"]`);
    await railLink.click();
    await waitForScrollEnd(page);

    const check = await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const atMaxScroll = Math.abs(window.scrollY - maxScroll) < 10;
      const nearHeader = Math.abs(rect.top - 81) < 25;
      return {
        id,
        rectTop: Math.round(rect.top),
        inViewport,
        nearHeader,
        atMaxScroll
      };
    }, s);

    const isSuccess = check !== null && check.inViewport && (check.nearHeader || check.atMaxScroll);
    console.log(`Rail link #${s}: top=${check?.rectTop}px -> Success: ${isSuccess}`);
    testResults.marginRailNavigation.push({ section: s, success: isSuccess });
  }

  // --- TEST 3: THEME TOGGLE COMPONENT ---
  console.log('\n--- 3. Testing Theme Toggle Component ---');
  const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme') || 'light');
  await page.click('.theme-toggle-btn');
  await page.waitForTimeout(200);
  const postTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log(`Theme toggled from '${initialTheme}' to '${postTheme}'`);
  testResults.themeToggle = initialTheme !== postTheme;

  // Toggle back
  await page.click('.theme-toggle-btn');
  await page.waitForTimeout(200);

  // --- TEST 4: COPY EMAIL BUTTON ---
  console.log('\n--- 4. Testing Copy Email Button ---');
  await page.click('.copy-btn');
  await page.waitForTimeout(100);
  const copyBtnText = await page.locator('.copy-btn').textContent();
  console.log(`Copy button feedback text: "${copyBtnText}"`);
  testResults.copyEmail = copyBtnText?.includes('Copied') || false;

  // --- TEST 5: CROSS-ROUTE NAVIGATION FROM CASE STUDY TO HOME ---
  console.log('\n--- 5. Testing Case Study Header Navigation to Home ---');
  await page.goto(`${BASE_URL}#/work/skillbridge`, { waitUntil: 'networkidle' });
  const csTitle = await page.title();
  console.log(`Loaded case study: ${csTitle}`);

  // Click Contact from case study header
  await page.click('.site-nav-bar a[href="#contact"]');
  await waitForScrollEnd(page, 2000);
  const contactInView = await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  });
  console.log(`Cross-route navigation to Contact: inView=${contactInView}`);
  testResults.caseStudyBackNavigation.push({ success: contactInView });

  // --- TEST 6: DETAILS / SUMMARY DISCLOSURE ---
  console.log('\n--- 6. Testing Details/Summary Disclosure Block ---');
  await page.goto(`${BASE_URL}#/work/skillbridge`, { waitUntil: 'networkidle' });
  const initialOpen = await page.evaluate(() => document.querySelector('.journal-details')?.hasAttribute('open'));
  await page.click('.journal-summary');
  await page.waitForTimeout(200);
  const postOpen = await page.evaluate(() => document.querySelector('.journal-details')?.hasAttribute('open'));
  console.log(`Details open state: before=${initialOpen}, after click=${postOpen}`);
  testResults.detailsExpansion = initialOpen === false && postOpen === true;

  // --- TEST 7: INLINE SVG ARCHITECTURE DIAGRAMS ---
  console.log('\n--- 7. Testing Architecture Diagrams on all 3 Case Studies ---');
  const studySlugs = ['skillbridge', 'lyf-sync', 'cloudshield-iq'];
  for (const slug of studySlugs) {
    await page.goto(`${BASE_URL}#/work/${slug}`, { waitUntil: 'networkidle' });
    const hasSvg = await page.$('.diagram-svg') !== null;
    const svgRects = await page.evaluate(() => document.querySelectorAll('.diagram-svg rect').length);
    console.log(`Case study '${slug}': SVG diagram present with ${svgRects} architectural components`);
    testResults.svgDiagrams.push({ slug, hasSvg, componentCount: svgRects });
  }

  await browser.close();

  const allPassed =
    testResults.navbarNavigation.every(n => n.success) &&
    testResults.marginRailNavigation.every(n => n.success) &&
    testResults.caseStudyBackNavigation.every(n => n.success) &&
    testResults.themeToggle &&
    testResults.copyEmail &&
    testResults.detailsExpansion &&
    testResults.svgDiagrams.every(d => d.hasSvg && d.componentCount > 0);

  console.log('\n=== SUMMARY OF ALL TESTS ===');
  if (allPassed) {
    console.log('>>> ALL 7 PLAYWRIGHT TEST SUITES PASSED WITH 100% SUCCESS! <<<');
  } else {
    console.error('>>> FAILURES DETECTED <<<');
    process.exit(1);
  }
}

testComponentsAndNav().catch(err => {
  console.error(err);
  process.exit(1);
});
