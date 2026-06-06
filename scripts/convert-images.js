const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '../public/raw-images');
const destDir = path.join(__dirname, '../public/images');
const rootPublicDir = path.join(__dirname, '../public');

// Clean up existing WebP files in output directory to avoid clutter
if (fs.existsSync(destDir)) {
  const files = fs.readdirSync(destDir);
  for (const file of files) {
    if (file.endsWith('.webp')) {
      fs.unlinkSync(path.join(destDir, file));
    }
  }
  console.log('Cleaned up existing WebP files in destination folder.');
} else {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = {
  // Existing files with updated regional names (Local SEO)
  'IMG_4263.PNG': 'gebze-ozel-egitim-ve-rehabilitasyon-sinifi.webp',
  'IMG_4264w.PNG': 'ozel-egitim-merkezi-hijyenik-yemekhane.webp',
  'IMG_4265.PNG': 'cayirova-duyu-butunleme-ve-dil-terapisi.webp',
  'WhatsApp Image 2026-06-02 at 18.00.46.jpeg': 'pendik-ozel-egitim-merkezi-dis-cekim.webp',
  'WhatsApp Image 2026-06-02 at 18.01.38.jpeg': 'once-ozel-egitim-kurumu-bekleme-salonu.webp',
  'WhatsApp Image 2026-06-02 at 18.05.34.jpeg': 'istanbul-anadolu-yakasi-ergoterapi-merkezi.webp',
  'WhatsApp Image 2026-06-02 at 18.05.342.jpeg': 'pendik-grup-ozel-egitim-ve-sosyallesme-sinifi.webp',
  'WhatsApp Image 2026-06-02 at 18.05.35.jpeg': 'darica-cocuk-oyun-terapisi-odasi.webp',
  'WhatsApp Image 2026-06-02 at 18.05.36.jpeg': 'pendik-bireysel-dil-ve-konusma-terapisi-merkezi.webp',
  'onceozelegitimfoto.PNG': 'gebze-cevresinde-grup-oyun-etkinlik-alani.webp',
  
  // New AVIF files with Tuzla / Kartal regional names
  'photo-1484820540004-14229fe36ca4.avif': 'tuzla-ozel-egitim-ogrenme-destek-egitimi.webp',
  'photo-1503454537195-1dcabb73ffb9.avif': 'kartal-cocuk-duyusal-ve-sanat-terapisi.webp',
  'photo-1516627145497-ae6968895b74.avif': 'kartal-ozel-egitim-erken-cocukluk-mudahale.webp',
  'photo-1540479859555-17af45c78602.avif': 'tuzla-ozel-egitim-kamp-egitimi-ve-sosyal-beceri.webp',
  
  // Blog image
  'Gemini_Generated_Image_lcau5qlcau5qlcau.jpg': 'yetiskinlerde-kekemelik-tedavisi-ve-terapisi.webp'
};

async function processImages() {
  console.log('Starting image processing...');
  
  // 1. Process standard photos and new AVIFs to WebP
  for (const [rawName, seoName] of Object.entries(mappings)) {
    const srcPath = path.join(srcDir, rawName);
    const destPath = path.join(destDir, seoName);
    
    if (fs.existsSync(srcPath)) {
      console.log(`Converting: ${rawName} -> ${seoName}`);
      await sharp(srcPath)
        .webp({ quality: 82 }) // Good balance between quality and size
        .toFile(destPath);
      console.log(`Success: ${seoName} created.`);
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }

  // 2. Process logo.png
  const logoSrcPath = path.join(srcDir, 'logo.png');
  const logoDestPngPath = path.join(rootPublicDir, 'logo.png');
  const logoDestWebpPath = path.join(destDir, 'once-ozel-egitim-logo.webp');

  if (fs.existsSync(logoSrcPath)) {
    console.log('Processing logo.png...');
    
    // Write optimized logo.png (PNG format for transparency, resized for web header)
    console.log('Optimizing logo.png...');
    await sharp(logoSrcPath)
      .resize({ width: 600, fit: 'inside', withoutEnlargement: true })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(logoDestPngPath);
    console.log('Success: public/logo.png updated.');

    // Also write a WebP version of the logo
    console.log('Creating logo WebP version...');
    await sharp(logoSrcPath)
      .resize({ width: 600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(logoDestWebpPath);
    console.log('Success: public/images/once-ozel-egitim-logo.webp created.');
  } else {
    console.warn('logo.png not found in raw-images folder');
  }

  console.log('All image processing tasks completed!');
}

processImages().catch(err => {
  console.error('Error during image processing:', err);
});
