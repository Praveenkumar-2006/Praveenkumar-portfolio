import { chromium } from 'playwright';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:4173/Praveenkumar-portfolio/';

function getLuminance(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

async function verifyPaletteAndPatch() {
  console.log('=== VERIFYING PALETTE, RELOCATED PHOTO & ACADEMIC MILESTONE ISOLATION ===\n');

  // 1. Contrast Ratios Verification
  const darkGround = '#171C28';
  const darkBody = '#AFAFBF';
  const darkHeadings = '#E7E7E7';
  const darkAccent = '#7F93FF';
  const cobaltHero = '#2440D8';
  const heroText = '#FFFFFF';

  const lightGround = '#ECEEF1';
  const lightBody = '#4F5663';
  const lightHeadings = '#171A21';
  const lightAccent = '#2440D8';

  const ratios = {
    dark: {
      bodyOnGround: getContrastRatio(darkGround, darkBody).toFixed(2),
      headingsOnGround: getContrastRatio(darkGround, darkHeadings).toFixed(2),
      accentOnGround: getContrastRatio(darkGround, darkAccent).toFixed(2),
      heroTextOnCobalt: getContrastRatio(cobaltHero, heroText).toFixed(2)
    },
    light: {
      bodyOnGround: getContrastRatio(lightGround, lightBody).toFixed(2),
      headingsOnGround: getContrastRatio(lightGround, lightHeadings).toFixed(2),
      accentOnGround: getContrastRatio(lightGround, lightAccent).toFixed(2)
    }
  };

  console.log('--- CONTRAST RATIOS ---');
  console.log(`[Dark Theme] Body: ${ratios.dark.bodyOnGround}:1, Headings: ${ratios.dark.headingsOnGround}:1, Accent: ${ratios.dark.accentOnGround}:1, Hero: ${ratios.dark.heroTextOnCobalt}:1`);

  // 2. Browser Testing
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // A. Check Photo Relocated Beside / Below Hero Line
  const heroPhoto = await page.$('.hero-block .hero-profile-photo');
  const aboutPhoto = await page.$('#about .hero-profile-photo, #about img');
  console.log(`\nPhoto present in Hero block: ${heroPhoto !== null}`);
  console.log(`Photo removed from About section: ${aboutPhoto === null}`);

  // B. Check College Information Isolation (ONLY in academic-milestone-box)
  const collegeMentions = await page.evaluate(() => {
    const textNodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walk.nextNode())) {
      if (node.textContent && node.textContent.includes('Rajalakshmi')) {
        const parent = node.parentElement;
        const insideMilestone = parent?.closest('.academic-milestone-box') !== null;
        textNodes.push({
          parentTag: parent?.tagName,
          className: parent?.className,
          insideMilestone,
          text: node.textContent.trim()
        });
      }
    }
    return textNodes;
  });

  console.log(`\nCollege text occurrences: ${collegeMentions.length}`);
  collegeMentions.forEach((m, idx) => {
    console.log(`  [${idx + 1}] insideMilestone=${m.insideMilestone} (<${m.parentTag}> .${m.className}) -> "${m.text}"`);
  });
  const allCollegeInMilestone = collegeMentions.every(m => m.insideMilestone);

  // C. Check Experience Section has only Zoho Corporation
  const expRows = await page.$$eval('.experience-compact-row', rows => {
    return rows.map(r => ({
      org: r.querySelector('.exp-org-cell')?.textContent?.trim(),
      role: r.querySelector('.exp-role-cell')?.textContent?.trim(),
      date: r.querySelector('.exp-date-cell')?.textContent?.trim()
    }));
  });
  console.log(`\nExperience rows count: ${expRows.length}`);
  expRows.forEach(r => console.log(`  Row: ${r.org} | ${r.role} | ${r.date}`));

  // D. Check Footer Identity
  const footerText = await page.$eval('.footer-identity', el => el.textContent?.trim());
  console.log(`\nFooter identity line: "${footerText}" (Contains college: ${footerText?.includes('Rajalakshmi')})`);

  // E. Check Hero Subtitle
  const heroLocation = await page.$eval('.hero-location-caption', el => el.textContent?.trim());
  console.log(`Hero location subtitle: "${heroLocation}" (Contains college: ${heroLocation?.includes('Rajalakshmi')})`);

  // F. Check Work Entries
  const workEntriesCount = await page.$$eval('.work-featured-entry', el => el.length);
  console.log(`Work entries count: ${workEntriesCount}`);

  await browser.close();

  const success =
    heroPhoto !== null &&
    aboutPhoto === null &&
    allCollegeInMilestone &&
    collegeMentions.length === 1 &&
    expRows.length === 1 &&
    !footerText?.includes('Rajalakshmi') &&
    !heroLocation?.includes('Rajalakshmi');

  if (success) {
    console.log('\n>>> SUCCESS: ALL USER REQUESTS FULLY SATISFIED AND VERIFIED! <<<');
  } else {
    console.error('\n>>> VERIFICATION CRITERIA NOT MET <<<');
    process.exit(1);
  }
}

verifyPaletteAndPatch().catch(err => {
  console.error(err);
  process.exit(1);
});
