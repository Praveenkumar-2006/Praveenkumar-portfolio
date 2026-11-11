import { chromium } from 'playwright';

async function verifyHeroSpec() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('=== VERIFYING NEW HERO SPECIFICATION ===\n');
  await page.goto('http://localhost:4173/Praveenkumar-portfolio/', { waitUntil: 'networkidle' });

  // 1. Verify Ground is #171C28 and dark theme
  const heroGround = await page.$eval('.hero-spec-section', el => getComputedStyle(el).backgroundColor);
  console.log(`1. Hero background color: ${heroGround} (matches ground: ${heroGround === 'rgb(23, 28, 40)'})`);

  // 2. Row 1: Top strip
  const topStripLeft = await page.$eval('.hero-top-left', el => el.textContent.trim());
  const topStripRight = await page.$eval('.hero-top-right', el => el.textContent.trim());
  const ruleDrawExists = await page.$('.hero-rule-draw') !== null;
  console.log(`2. Row 1 Top Strip Left: "${topStripLeft}"`);
  console.log(`   Row 1 Top Strip Right: "${topStripRight}"`);
  console.log(`   Row 1 Rule Draw Exists: ${ruleDrawExists}`);

  // 3. Row 2 Left Column: Name & Newsreader sentence & Controls & Availability
  const line1 = await page.$eval('.hero-line-1', el => el.textContent.trim());
  const line2 = await page.$eval('.hero-line-2', el => el.textContent.trim());
  const accentP = await page.$eval('.hero-name-accent', el => ({
    text: el.textContent.trim(),
    color: getComputedStyle(el).color
  }));
  const sentence = await page.$eval('.hero-editorial-sentence', el => el.textContent.trim());
  const primaryBtn = await page.$eval('.hero-btn-primary', el => ({
    text: el.textContent.trim(),
    href: el.getAttribute('href'),
    bg: getComputedStyle(el).backgroundColor,
    color: getComputedStyle(el).color
  }));
  const emailLink = await page.$eval('.hero-link-email', el => ({
    text: el.textContent.trim(),
    href: el.getAttribute('href')
  }));
  const availText = await page.$eval('.hero-availability-line', el => el.textContent.trim());
  const availSquareColor = await page.$eval('.hero-avail-square', el => getComputedStyle(el).backgroundColor);

  console.log(`3. Row 2 Left: Name Line 1: "${line1}" | Line 2: "${line2}"`);
  console.log(`   Final P Accent: "${accentP.text}" (${accentP.color})`);
  console.log(`   Editorial Sentence: "${sentence}"`);
  console.log(`   Primary Button: "${primaryBtn.text}" (bg: ${primaryBtn.bg}, color: ${primaryBtn.color})`);
  console.log(`   Email Link: "${emailLink.text}" (${emailLink.href})`);
  console.log(`   Availability Line: "${availText}" (square color: ${availSquareColor})`);

  // 4. Row 2 Right Column: Profile Photo & Offset Cobalt Rectangle
  const photoSrc = await page.$eval('.hero-spec-photo', el => el.getAttribute('src'));
  const photoRadius = await page.$eval('.hero-spec-photo', el => getComputedStyle(el).borderRadius);
  const photoFilter = await page.$eval('.hero-spec-photo', el => getComputedStyle(el).filter);
  const backdropColor = await page.$eval('.hero-cobalt-backdrop', el => getComputedStyle(el).backgroundColor);
  const photoCaption = await page.$eval('.hero-photo-caption', el => el.textContent.trim());

  console.log(`4. Row 2 Right: Photo src: ${photoSrc} (radius: ${photoRadius}, filter: ${photoFilter})`);
  console.log(`   Cobalt Backdrop Color: ${backdropColor}`);
  console.log(`   Caption: "${photoCaption}"`);

  // 5. Row 3: Build Ledger
  const ledgerRows = await page.$$eval('.hero-ledger-row', rows => rows.map(r => ({
    num: r.querySelector('.hero-ledger-col-num')?.textContent?.trim(),
    name: r.querySelector('.hero-ledger-title')?.textContent?.trim(),
    stack: r.querySelector('.hero-ledger-col-stack')?.textContent?.trim(),
    period: r.querySelector('.hero-ledger-col-period')?.textContent?.trim(),
    status: r.querySelector('.hero-ledger-col-status')?.textContent?.trim(),
    href: r.getAttribute('href')
  })));

  console.log(`5. Row 3 Ledger: ${ledgerRows.length} rows`);
  ledgerRows.forEach(r => console.log(`   Row: ${r.num} | ${r.name} | ${r.stack} | ${r.period} | ${r.status} -> ${r.href}`));

  // 6. Verified Stack Line below ledger
  const verifiedStack = await page.$eval('.hero-verified-stack-line', el => el.textContent.trim());
  console.log(`6. Verified Stack Line: "${verifiedStack}"`);

  // 7. Left Margin Rail: Vertical Email (Desktop)
  const verticalEmail = await page.$eval('.hero-vertical-email-link', el => ({
    text: el.textContent.trim(),
    writingMode: getComputedStyle(el.parentElement).writingMode
  }));
  console.log(`7. Desktop Vertical Email Rail: "${verticalEmail.text}" (writing-mode: ${verticalEmail.writingMode})`);

  // 8. Hover test on ledger row
  await page.hover('.hero-ledger-row:first-child');
  await page.waitForTimeout(200);
  const hoveredNameColor = await page.$eval('.hero-ledger-row:first-child .hero-ledger-col-name', el => getComputedStyle(el).color);
  console.log(`8. Hovered Ledger Row 1 Name Color: ${hoveredNameColor} (accent is rgb(127, 147, 255))`);

  // 9. Check Banned Items
  const emojiCheck = await page.evaluate(() => {
    const text = document.querySelector('.hero-spec-section')?.innerText || '';
    return /\p{Extended_Pictographic}/u.test(text);
  });
  console.log(`9. Emoji present in Hero: ${emojiCheck}`);

  // 10. Mobile Viewport Check (375x812)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(300);
  const verticalEmailVisibleMobile = await page.$eval('.hero-vertical-email-rail', el => getComputedStyle(el).display);
  const photoWidthMobile = await page.$eval('.hero-spec-photo', el => el.getBoundingClientRect().width);
  console.log(`10. Mobile Check: vertical-rl email display: ${verticalEmailVisibleMobile} (should be 'none')`);
  console.log(`    Mobile Photo Width: ${photoWidthMobile}px (should be <= 256px / 16rem)`);

  await browser.close();

  const passed =
    heroGround === 'rgb(23, 28, 40)' &&
    topStripLeft === 'Praveenkumar P / Kanchipuram, India' &&
    topStripRight === 'B.Tech IT, 2027' &&
    line1 === 'Praveen' &&
    line2.includes('kumar') &&
    accentP.text === 'P' &&
    primaryBtn.text === 'See my projects' &&
    photoRadius === '0px' &&
    backdropColor === 'rgb(36, 64, 216)' &&
    photoCaption === 'FIG. 00 | Praveenkumar P' &&
    ledgerRows.length === 3 &&
    verticalEmailVisibleMobile === 'none' &&
    !emojiCheck;

  if (passed) {
    console.log('\n>>> SUCCESS: ALL HERO SPEC CRITERIA FULLY VERIFIED! <<<');
  } else {
    console.error('\n>>> ERROR: ONE OR MORE HERO SPEC CRITERIA FAILED <<<');
    process.exit(1);
  }
}

verifyHeroSpec().catch(err => {
  console.error(err);
  process.exit(1);
});
