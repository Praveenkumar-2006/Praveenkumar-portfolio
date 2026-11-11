import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const reportPath = path.resolve('docs/lighthouse-mobile-report.json');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'http://localhost:4173/Praveenkumar-portfolio/';

console.log('Running Lighthouse mobile audit...');
process.env.CHROME_PATH = edgePath;

try {
  execSync(
    `npx lighthouse "${targetUrl}" --chrome-flags="--headless" --output=json --output-path="${reportPath}" --form-factor=mobile --screenEmulation.mobile=true --only-categories=accessibility,best-practices,seo,performance`,
    { stdio: 'inherit' }
  );

  const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const scores = {
    performance: Math.round((data.categories.performance?.score || 0) * 100),
    accessibility: Math.round((data.categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((data.categories['best-practices']?.score || 0) * 100),
    seo: Math.round((data.categories.seo?.score || 0) * 100)
  };

  console.log('--- LIGHTHOUSE MOBILE SCORES ---');
  console.log(`Performance: ${scores.performance}`);
  console.log(`Accessibility: ${scores.accessibility}`);
  console.log(`Best Practices: ${scores.bestPractices}`);
  console.log(`SEO: ${scores.seo}`);

  fs.writeFileSync(path.resolve('docs/LIGHTHOUSE_SCORES.json'), JSON.stringify(scores, null, 2));
} catch (err) {
  console.error('Lighthouse execution error:', err.message);
  process.exit(1);
}

