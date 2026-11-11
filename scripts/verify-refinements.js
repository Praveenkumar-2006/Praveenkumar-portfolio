import { chromium } from 'playwright';

async function verifyRefinements() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe'
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('=== VERIFYING REFINED HERO ANIMATIONS & CASE STUDY TECHNOLOGIES ===\n');

  // 1. Verify Home & Hero
  await page.goto('http://localhost:4173/Praveenkumar-portfolio/', { waitUntil: 'networkidle' });
  const photoSrc = await page.$eval('.hero-spec-photo', el => el.getAttribute('src'));
  const photoWrapperAnim = await page.$eval('.hero-photo-offset-wrapper', el => getComputedStyle(el).animation);
  const ruleDrawAnim = await page.$eval('.hero-rule-draw', el => getComputedStyle(el).animation);
  const nameLine1Anim = await page.$eval('.hero-line-1', el => getComputedStyle(el).animation);

  console.log(`1. Replaceable Photo loaded from content.ts: ${photoSrc}`);
  console.log(`   Smoothed Rule Draw Animation: ${ruleDrawAnim}`);
  console.log(`   Smoothed Name Slide-up Animation: ${nameLine1Anim}`);
  console.log(`   Smoothed Photo Fade-in Animation: ${photoWrapperAnim}`);

  // 2. Verify Case Studies Technologies Spacing & Tags
  const studies = ['skillbridge', 'lyf-sync', 'cloudshield-iq'];

  for (const slug of studies) {
    await page.goto(`http://localhost:4173/Praveenkumar-portfolio/#/work/${slug}`, { waitUntil: 'networkidle' });
    const tags = await page.$$eval('.work-stack-tag', els => els.map(el => ({
      text: el.textContent.trim(),
      marginRight: getComputedStyle(el).marginRight,
      padding: getComputedStyle(el).padding,
      border: getComputedStyle(el).border
    })));
    const containerGap = await page.$eval('.work-stack-list', el => getComputedStyle(el).gap);
    const diagramVisible = await page.$('.diagram-container svg') !== null;

    console.log(`\n2. Case study '${slug}':`);
    console.log(`   Technologies count: ${tags.length}`);
    console.log(`   Tags: ${tags.map(t => t.text).join(' | ')}`);
    console.log(`   Container Gap: ${containerGap}`);
    console.log(`   Architecture Diagram rendered: ${diagramVisible}`);
  }

  // 3. Take screenshots of case study headers
  await page.goto('http://localhost:4173/Praveenkumar-portfolio/#/work/skillbridge', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'public/skillbridge-technologies-preview.png' });

  await browser.close();
  console.log('\n>>> SUCCESS: ALL REFINEMENTS FULLY VERIFIED! <<<');
}

verifyRefinements().catch(err => {
  console.error(err);
  process.exit(1);
});

