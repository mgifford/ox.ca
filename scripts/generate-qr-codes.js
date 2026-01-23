#!/usr/bin/env node
/**
 * Generate QR codes for all presentation shortlinks.
 * Creates SVG QR codes in the presentations directory.
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Base URL
const BASE_URL = 'https://ox.ca';

// Define all shortlinks to generate QR codes for, with readable filenames
const shortlinks = {
  // Presentations
  'EAA-drupal4gov-eu26.QR.svg': { url: '/p/1', name: 'EAA Presentation' },
  'procurement-fosdem26.QR.svg': { url: '/p/2', name: 'Procurement Presentation' },
  'atag-fosdem26.QR.svg': { url: '/p/3', name: 'ATAG Presentation' },
  'a11y-sovereignty-fosdem26.QR.svg': { url: '/p/4', name: 'Accessibility & Sovereignty Presentation' },
  
  // Handouts
  'eaa-economic-operators-handout.QR.svg': { url: '/p/1-h1', name: 'EAA Handout' },
  'procurement-fosdem26-handout.QR.svg': { url: '/p/2-h1', name: 'Procurement Handout 1' },
  'procurement-fosdem26-handout2.QR.svg': { url: '/p/2-h2', name: 'Procurement Handout 2' },
  'accessible-sovereignty-handout.QR.svg': { url: '/p/4-h1', name: 'Accessibility & Sovereignty Handout 1' },
  'accessible-sovereignty-handout2.QR.svg': { url: '/p/4-h2', name: 'Accessibility & Sovereignty Handout 2' },
};

async function generateQRCodes() {
  const outputDir = path.join(__dirname, '..', 'presentations', 'qr-codes');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const qrOptions = {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 300,
  };
  
  for (const [filename, data] of Object.entries(shortlinks)) {
    const fullUrl = `${BASE_URL}${data.url}`;
    const svgPath = path.join(outputDir, filename);
    
    try {
      await QRCode.toFile(svgPath, fullUrl, qrOptions);
      console.log(`✓ Created ${filename} for ${fullUrl} (${data.name})`);
    } catch (err) {
      console.error(`✗ Error creating ${filename}:`, err);
    }
  }
  
  console.log(`\n✓ Generated ${Object.keys(shortlinks).length} QR codes in presentations/qr-codes/`);
  console.log('\nTo use in slides, add:');
  console.log('  <img src="qr-codes/procurement-fosdem26.QR.svg" alt="QR code for ox.ca/p/2" width="150" height="150">');
}

generateQRCodes().catch(console.error);
