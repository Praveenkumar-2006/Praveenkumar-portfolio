import { chromium } from 'playwright';

async function testTopAndResume() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173/Praveenkumar-portfolio/', { waitUntil: 'networkidle' });

  console.log('=== TESTING RESUME BUTTONS & GO TO TOP BUTTON ===\n');

  // 1. Verify Resume button in Hero
  const heroResume = await page.$eval('.hero-btn-resume', el => ({
    text: el.textContent.trim(),
    href: el.getAttribute('href'),
    download: el.getAttribute('download')
  }));
  console.log(`1. Hero Resume button: "${heroResume.text}" (href: ${heroResume.href}, download: ${heroResume.download})`);

  // 2. Verify Resume link in Header Navbar
  const navResume = await page.$eval('.nav-resume-link', el => ({
    text: el.textContent.trim(),
    href: el.getAttribute('href'),
    download: el.getAttribute('download')
  }));
  console.log(`2. Nav Resume link: "${navResume.text}" (href: ${navResume.href}, download: ${navResume.download})`);

  // 3. Verify Resume link in Footer
  const footerResume = await page.$eval('.footer-links a[download]', el => ({
    text: el.textContent.trim(),
    href: el.getAttribute('href')
  }));
  console.log(`3. Footer Resume link: "${footerResume.text}" (href: ${footerResume.href})`);

  // 4. Verify Resume file is accessible (200 OK)
  const response = await page.request.get('http://localhost:4173/Praveenkumar-portfolio/docs/Praveenkumar_Resume.pdf');
  console.log(`4. Resume PDF HTTP status: ${response.status()} ${response.statusText()} (size: ${response.headers()['content-length']} bytes)`);

  // 5. Test Back to Top Button appearance on scroll
  let topBtnBefore = await page.$('.back-to-top-btn');
  console.log(`5. Go to Top button before scrolling: ${topBtnBefore !== null ? 'visible' : 'hidden (expected)'}`);

  // Scroll down to 1000px
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(400);

  let topBtnAfter = await page.$('.back-to-top-btn');
  console.log(`6. Go to Top button after scrolling 1000px: ${topBtnAfter !== null ? 'visible (expected)' : 'hidden'}`);

  // Click Go to Top button
  await page.click('.back-to-top-btn');
  await page.waitForTimeout(800);

  const scrollYAfterClick = await page.evaluate(() => window.scrollY);
  console.log(`7. Scroll position after clicking Go to Top: ${scrollYAfterClick}px (expected 0px)`);

  await browser.close();

  const success =
    heroResume.download === 'Praveenkumar_Resume.pdf' &&
    navResume.download === 'Praveenkumar_Resume.pdf' &&
    response.status() === 200 &&
    topBtnBefore === null &&
    topBtnAfter !== null &&
    scrollYAfterClick < 10;

  if (success) {
    console.log('\n>>> SUCCESS: ALL RESUME DOWNLOAD & GO TO TOP FEATURES FULLY VERIFIED! <<<');
  } else {
    console.error('\n>>> ERROR: VERIFICATION CRITERIA NOT MET <<<');
    process.exit(1);
  }
}

testTopAndResume().catch(err => {
  console.error(err);
  process.exit(1);
});

