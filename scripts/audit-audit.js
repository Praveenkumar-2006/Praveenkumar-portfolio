import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:4173/Praveenkumar-portfolio/';

async function runAudit() {
  console.log('=== STARTING AUTOMATED AUDIT (ACCESSIBILITY, PERFORMANCE, SEO, BEST PRACTICES) ===');

  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  // Mobile Emulation (iPhone 14 viewport: 390x844)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const startTime = Date.now();
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  const loadDurationMs = Date.now() - startTime;

  // 1. Accessibility Audit via Axe Core
  console.log('Evaluating Accessibility with Axe-Core...');
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  const violations = accessibilityScanResults.violations;
  const passesCount = accessibilityScanResults.passes.length;
  const violationsCount = violations.length;

  // Calculate accessibility score (0 to 100 based on pass/violation ratio)
  const accessibilityScore = violationsCount === 0 ? 100 : Math.max(70, Math.round((passesCount / (passesCount + violationsCount * 2)) * 100));

  // 2. SEO Checks
  console.log('Evaluating SEO...');
  const seoDetails = await page.evaluate(() => {
    const title = document.title;
    const descEl = document.querySelector('meta[name="description"]');
    const desc = descEl ? descEl.getAttribute('content') : '';
    const viewport = document.querySelector('meta[name="viewport"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const jsonLd = document.querySelector('script[type="application/ld+json"]');

    let isJsonLdValid = false;
    if (jsonLd) {
      try {
        const parsed = JSON.parse(jsonLd.textContent || '{}');
        isJsonLdValid = parsed['@type'] === 'Person' && Boolean(parsed.name);
      } catch (e) {
        isJsonLdValid = false;
      }
    }

    return {
      title,
      titleLength: title.length,
      description: desc,
      descriptionLength: desc.length,
      hasViewport: Boolean(viewport),
      hasOgTitle: Boolean(ogTitle),
      hasOgDesc: Boolean(ogDesc),
      hasOgImage: Boolean(ogImage),
      isJsonLdValid
    };
  });

  let seoScore = 100;
  if (seoDetails.titleLength < 10) seoScore -= 15;
  if (seoDetails.descriptionLength < 100 || seoDetails.descriptionLength > 165) seoScore -= 10;
  if (!seoDetails.hasViewport) seoScore -= 20;
  if (!seoDetails.hasOgTitle || !seoDetails.hasOgDesc || !seoDetails.hasOgImage) seoScore -= 10;
  if (!seoDetails.isJsonLdValid) seoScore -= 10;

  // 3. Best Practices Checks
  console.log('Evaluating Best Practices...');
  const bestPracticesDetails = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const missingAlt = images.filter(img => !img.hasAttribute('alt'));
    const inputs = Array.from(document.querySelectorAll('input, textarea'));
    const unlabeledInputs = inputs.filter(inp => !inp.id || !document.querySelector(`label[for="${inp.id}"]`));
    const doctype = document.doctype !== null;
    const isUtf8 = document.characterSet.toLowerCase() === 'utf-8';

    return {
      totalImages: images.length,
      missingAltCount: missingAlt.length,
      totalInputs: inputs.length,
      unlabeledInputsCount: unlabeledInputs.length,
      hasDoctype: doctype,
      isUtf8
    };
  });

  let bestPracticesScore = 100;
  if (consoleErrors.length > 0) bestPracticesScore -= 10;
  if (bestPracticesDetails.missingAltCount > 0) bestPracticesScore -= 20;
  if (bestPracticesDetails.unlabeledInputsCount > 0) bestPracticesScore -= 15;
  if (!bestPracticesDetails.hasDoctype) bestPracticesScore -= 20;
  if (!bestPracticesDetails.isUtf8) bestPracticesScore -= 10;

  // 4. Performance Metrics (Paint, DOM, CLS)
  console.log('Evaluating Performance Metrics...');
  const perfMetrics = await page.evaluate(() => {
    const timing = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcpEntry = paint.find(p => p.name === 'first-contentful-paint');
    const fcp = fcpEntry ? Math.round(fcpEntry.startTime) : 0;
    const domContentLoaded = timing ? Math.round(timing.domContentLoadedEventEnd - timing.startTime) : 0;
    const domInteractive = timing ? Math.round(timing.domInteractive - timing.startTime) : 0;
    const transferSize = timing ? timing.transferSize : 0;

    return {
      fcp,
      domContentLoaded,
      domInteractive,
      transferSize
    };
  });

  let performanceScore = 100;
  if (perfMetrics.fcp > 1800) performanceScore -= 15;
  else if (perfMetrics.fcp > 1000) performanceScore -= 5;
  if (loadDurationMs > 3000) performanceScore -= 15;
  else if (loadDurationMs > 1500) performanceScore -= 5;

  const finalAuditReport = {
    scores: {
      performance: performanceScore,
      accessibility: accessibilityScore,
      bestPractices: bestPracticesScore,
      seo: seoScore
    },
    performanceMetrics: {
      fcpMs: perfMetrics.fcp,
      domContentLoadedMs: perfMetrics.domContentLoaded,
      loadDurationMs
    },
    accessibilityDetails: {
      passes: passesCount,
      violationsCount,
      violations: violations.map(v => ({ id: v.id, impact: v.impact, description: v.description }))
    },
    bestPracticesDetails,
    seoDetails,
    consoleErrors
  };

  console.log('\n--- FINAL AUDIT SCORES ---');
  console.log(`Accessibility: ${accessibilityScore}`);
  console.log(`Best Practices: ${bestPracticesScore}`);
  console.log(`SEO:           ${seoScore}`);
  console.log(`Performance:   ${performanceScore}`);
  console.log('---------------------------\n');

  if (violations.length > 0) {
    console.log('Accessibility Violations:', JSON.stringify(violations, null, 2));
  }

  fs.writeFileSync(
    path.resolve('docs/AUDIT_REPORT.json'),
    JSON.stringify(finalAuditReport, null, 2)
  );

  await browser.close();
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});

