const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage() {
  const inputPath = path.join(__dirname, 'public', 'og-image.png');
  const outputPath = path.join(__dirname, 'public', 'og-image-optimized.png');

  try {
    if (!fs.existsSync(inputPath)) {
      console.log('og-image.png not found');
      return;
    }

    // Read file, resize if needed (OG images are 1200x630 typically), compress
    await sharp(inputPath)
      .resize(1200, 630, { fit: 'cover', withoutEnlargement: true })
      .png({ quality: 60, compressionLevel: 9 })
      .toFile(outputPath);

    const oldSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    
    console.log(`Original size: ${oldSize / 1024} KB`);
    console.log(`New size: ${newSize / 1024} KB`);
    
    // Replace old with new
    fs.renameSync(outputPath, inputPath);
    console.log('Successfully optimized og-image.png');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeImage();
