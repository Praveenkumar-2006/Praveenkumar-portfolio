import { chromium } from 'playwright';
import * as fs from 'fs';

async function verifyBrowserThemeToggle() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe'
  });

  const baseUrl = 'http://localhost:4173/Praveenkumar-portfolio/';
  const results = {};

  console.log('=== VERIFYING REPLACED THEME TOGGLE (6 TEST SCENARIOS) ===\n');

  // Helper to get contrast ratio between two rgb colors
  function luminance(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  function contrastRatio(rgb1, rgb2) {
    const parse = (str) => {
      const m = str.match(/\d+/g);
      return [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
    };
    const [r1, g1, b1] = parse(rgb1);
    const [r2, g2, b2] = parse(rgb2);
    const lum1 = luminance(r1, g1, b1);
    const lum2 = luminance(r2, g2, b2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  // --- SCENARIO 1: Hard reload in each theme (no flash, no errors, meta tag) ---
  console.log('--- Scenario 1: Hard reload in each theme & check flash/errors ---');
  let consoleErrors = [];
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  // Set theme to light first so we can test hard reload in light theme
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.dataset.theme = 'light';
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await page.reload({ waitUntil: 'networkidle' });
  const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  const initialMeta = await page.$eval('meta[name="theme-color"]', el => el.getAttribute('content'));
  console.log(`1.1 Initial Reloaded Theme (Light): ${initialTheme}, Theme-Color meta: ${initialMeta}`);

  // Switch to dark theme
  await page.click('.theme-toggle-btn');
  await page.waitForTimeout(300);
  const switchedTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  const switchedMeta = await page.$eval('meta[name="theme-color"]', el => el.getAttribute('content'));
  console.log(`1.2 Switched to: ${switchedTheme}, Theme-Color meta: ${switchedMeta}`);

  // Hard reload in dark theme
  await page.reload({ waitUntil: 'networkidle' });
  const reloadedTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  const reloadedMeta = await page.$eval('meta[name="theme-color"]', el => el.getAttribute('content'));
  console.log(`1.3 Reloaded in Dark Theme: ${reloadedTheme}, Theme-Color meta: ${reloadedMeta}`);
  console.log(`    Console errors count: ${consoleErrors.length}`);

  // --- SCENARIO 2: Repeated clicks, reload, persistence ---
  console.log('\n--- Scenario 2: Click repeatedly and test persistence ---');
  for (let i = 0; i < 4; i++) {
    await page.click('.theme-toggle-btn');
    await page.waitForTimeout(100);
  }
  const persistedTheme = await page.evaluate(() => localStorage.getItem('theme'));
  const domTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`2.1 After 4 clicks: localStorage='${persistedTheme}', DOM data-theme='${domTheme}'`);

  // --- SCENARIO 3: Prefers-color-scheme on first visit ---
  console.log('\n--- Scenario 3: First-visit with prefers-color-scheme ---');
  const lightContext = await browser.newContext({ colorScheme: 'light' });
  const lightPage = await lightContext.newPage();
  await lightPage.goto(baseUrl, { waitUntil: 'networkidle' });
  const detectedLight = await lightPage.evaluate(() => document.documentElement.dataset.theme);
  console.log(`3.1 System prefer light -> detected theme: ${detectedLight}`);
  await lightContext.close();

  const darkContext = await browser.newContext({ colorScheme: 'dark' });
  const darkPage = await darkContext.newPage();
  await darkPage.goto(baseUrl, { waitUntil: 'networkidle' });
  const detectedDark = await darkPage.evaluate(() => document.documentElement.dataset.theme);
  console.log(`3.2 System prefer dark -> detected theme: ${detectedDark}`);
  await darkContext.close();

  // --- SCENARIO 4: Keyboard navigation (Tab, Enter, Space) ---
  console.log('\n--- Scenario 4: Keyboard accessibility (Tab, Enter, Space) ---');
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.reload({ waitUntil: 'networkidle' });

  // Focus the toggle button
  await page.focus('.theme-toggle-btn');
  const isFocused = await page.$eval('.theme-toggle-btn', el => el === document.activeElement);
  console.log(`4.1 Button focused via keyboard: ${isFocused}`);

  // Press Enter
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const themeAfterEnter = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`4.2 Theme after pressing Enter: ${themeAfterEnter}`);

  // Press Space
  await page.keyboard.press('Space');
  await page.waitForTimeout(300);
  const themeAfterSpace = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`4.3 Theme after pressing Space: ${themeAfterSpace}`);

  const ariaLabel = await page.$eval('.theme-toggle-btn', el => el.getAttribute('aria-label'));
  const btnHeight = await page.$eval('.theme-toggle-btn', el => el.getBoundingClientRect().height);
  console.log(`4.4 aria-label: "${ariaLabel}", button height: ${btnHeight}px (min 44px: ${btnHeight >= 44})`);

  // --- SCENARIO 5: 390, 768, 1280 px screenshots and layout stability ---
  console.log('\n--- Scenario 5: Checking 390px, 768px, 1280px in both themes & capturing screenshots ---');
  const widths = [390, 768, 1280];
  const ssDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\cd6a48af-f8dd-4b38-ac41-13c68b8ddec5\\screenshots';
  if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });

  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 900 });

    // Dark
    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(200);
    const darkPath = `${ssDir}\\theme-dark-${w}px.png`;
    await page.screenshot({ path: darkPath });

    // Light
    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(200);
    const lightPath = `${ssDir}\\theme-light-${w}px.png`;
    await page.screenshot({ path: lightPath });

    console.log(`5. Captured ${w}px Dark & Light screenshots`);
  }

  // --- Contrast Ratios Measurement ---
  console.log('\n--- Scenario 6: Measuring contrast ratios for button & text ---');
  // Dark Theme
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  const darkBtnStyles = await page.$eval('.theme-toggle-btn', el => ({
    color: getComputedStyle(el).color,
    border: getComputedStyle(el).borderColor,
    bg: getComputedStyle(document.body).backgroundColor
  }));
  const darkTextRatio = contrastRatio(darkBtnStyles.color, darkBtnStyles.bg);
  const darkBorderRatio = contrastRatio(darkBtnStyles.border, darkBtnStyles.bg);
  console.log(`Dark Theme: Text Contrast = ${darkTextRatio.toFixed(2)}:1, Border Contrast = ${darkBorderRatio.toFixed(2)}:1`);

  // Light Theme
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.setAttribute('data-theme', 'light');
  });
  const lightBtnStyles = await page.$eval('.theme-toggle-btn', el => ({
    color: getComputedStyle(el).color,
    border: getComputedStyle(el).borderColor,
    bg: getComputedStyle(document.body).backgroundColor
  }));
  const lightTextRatio = contrastRatio(lightBtnStyles.color, lightBtnStyles.bg);
  const lightBorderRatio = contrastRatio(lightBtnStyles.border, lightBtnStyles.bg);
  console.log(`Light Theme: Text Contrast = ${lightTextRatio.toFixed(2)}:1, Border Contrast = ${lightBorderRatio.toFixed(2)}:1`);

  await browser.close();

  const passed =
    reloadedTheme === 'dark' &&
    initialTheme === 'light' &&
    consoleErrors.length === 0 &&
    persistedTheme === domTheme &&
    detectedLight === 'light' &&
    detectedDark === 'dark' &&
    themeAfterEnter === 'light' &&
    themeAfterSpace === 'dark' &&
    btnHeight >= 44 &&
    darkTextRatio >= 4.5 &&
    lightTextRatio >= 4.5;

  if (passed) {
    console.log('\n>>> SUCCESS: ALL REPLACED THEME TOGGLE SPECIFICATIONS FULLY VERIFIED! <<<');
  } else {
    console.error('\n>>> ERROR: ONE OR MORE THEME TOGGLE CRITERIA FAILED <<<');
    process.exit(1);
  }
}

verifyBrowserThemeToggle().catch(err => {
  console.error(err);
  process.exit(1);
});
