import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processImages() {
  const inputPath = path.resolve('public/assets/profile.jpg');
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original image: ${metadata.width}x${metadata.height}`);

  // In the photo (500x376): Praveenkumar is sitting on the motorcycle.
  // Center-crop to 4:5 ratio around Praveenkumar:
  const cropWidth = Math.min(metadata.width, Math.round(metadata.height * 0.8));
  const cropHeight = Math.round(cropWidth * 1.25);
  const left = Math.max(0, Math.round((metadata.width - cropWidth) / 2));

  // Process 480w and 960w WebP
  await sharp(inputPath)
    .extract({ left: Math.min(left, metadata.width - cropWidth), top: 0, width: cropWidth, height: Math.min(cropHeight, metadata.height) })
    .resize(480, 600, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/assets/profile-480.webp');

  await sharp(inputPath)
    .extract({ left: Math.min(left, metadata.width - cropWidth), top: 0, width: cropWidth, height: Math.min(cropHeight, metadata.height) })
    .resize(960, 1200, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile('public/assets/profile-960.webp');

  console.log('Exported responsive profile webp images.');

  // Generate 1200x630 OpenGraph Image (flat accent #2440D8, SVG layout composition)
  const profileCropBuffer = await sharp(inputPath)
    .resize(420, 525, { fit: 'cover' })
    .png()
    .toBuffer();

  const ogSvg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#2440D8"/>
    <rect x="50" y="50" width="1100" height="530" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.3"/>
    
    <text x="90" y="140" fill="#FFFFFF" font-family="monospace" font-size="20" letter-spacing="4">FIELD JOURNAL • 2026</text>
    <text x="90" y="240" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="56">PRAVEENKUMAR P</text>
    <text x="90" y="300" fill="#FFFFFF" font-family="sans-serif" font-weight="400" font-size="28" fill-opacity="0.9">Software Developer: Full-Stack, AI &amp; Cloud</text>
    
    <text x="90" y="380" fill="#FFFFFF" font-family="serif" font-size="22" fill-opacity="0.95">Rajalakshmi Engineering College • B.Tech IT (2023–2027)</text>
    <text x="90" y="420" fill="#FFFFFF" font-family="serif" font-size="22" fill-opacity="0.95">Ex-CRM Intern at Zoho Healthcare Team • Chennai</text>
    
    <line x1="90" y1="460" x2="680" y2="460" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.4"/>
    <text x="90" y="500" fill="#FFFFFF" font-family="monospace" font-size="18">SkillBridge • LYF-Sync • CloudShield IQ</text>
  </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .composite([
      {
        input: profileCropBuffer,
        top: 52,
        left: 730
      }
    ])
    .png()
    .toFile('public/assets/og-image.png');

  console.log('Exported OpenGraph image: public/assets/og-image.png');
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});
