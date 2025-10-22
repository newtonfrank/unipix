const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  try {
    const inputFile = path.join(__dirname, 'app/images/logo-white.png');
    const outputDir = path.join(__dirname, 'public');
    
    // Create different sizes for the favicon
    const sizes = [16, 32, 48];
    
    // Generate individual PNG files first
    const pngFiles = [];
    for (const size of sizes) {
      const outputFile = path.join(outputDir, `favicon-${size}x${size}.png`);
      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputFile);
      pngFiles.push(outputFile);
      console.log(`Generated ${size}x${size} favicon`);
    }
    
    // Also generate a 32x32 ICO file for better browser support
    const icoFile = path.join(outputDir, 'favicon.ico');
    await sharp(inputFile)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(icoFile);
    console.log('Generated favicon.ico');
    
    console.log('Favicon generation completed!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();