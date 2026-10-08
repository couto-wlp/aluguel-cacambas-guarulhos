const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimize() {
  console.log('Optimizing images...');

  // 1. Hero background mobile
  if (fs.existsSync('public/hero-bg-mobile.webp') || fs.existsSync('public/hero-bg.png')) {
    const src = fs.existsSync('public/hero-bg.png') ? 'public/hero-bg.png' : 'public/hero-bg-mobile.webp';
    await sharp(src)
      .resize({ width: 480, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 50, effort: 6 })
      .toFile('public/hero-bg-mobile.webp.tmp');
    fs.renameSync('public/hero-bg-mobile.webp.tmp', 'public/hero-bg-mobile.webp');
    console.log('Optimized hero-bg-mobile.webp:', fs.statSync('public/hero-bg-mobile.webp').size, 'bytes');
  }

  // 2. Hero background desktop
  if (fs.existsSync('public/hero-bg.webp') || fs.existsSync('public/hero-bg.png')) {
    const src = fs.existsSync('public/hero-bg.png') ? 'public/hero-bg.png' : 'public/hero-bg.webp';
    await sharp(src)
      .resize({ width: 1000, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 55, effort: 6 })
      .toFile('public/hero-bg.webp.tmp');
    fs.renameSync('public/hero-bg.webp.tmp', 'public/hero-bg.webp');
    console.log('Optimized hero-bg.webp:', fs.statSync('public/hero-bg.webp').size, 'bytes');
  }

  // 3. sobre_nos
  if (fs.existsSync('public/images/sobre_nos.png')) {
    await sharp('public/images/sobre_nos.png')
      .resize({ width: 600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 65, effort: 6 })
      .toFile('public/images/sobre_nos.webp');
    console.log('Created sobre_nos.webp:', fs.statSync('public/images/sobre_nos.webp').size, 'bytes');
  }

  // 4. Avatars (sergio, patricia, jose)
  const avatars = ['sergio', 'patricia', 'jose'];
  for (const name of avatars) {
    const src = fs.existsSync(`public/images/${name}.jpg`) ? `public/images/${name}.jpg` : `public/images/${name}.png`;
    if (fs.existsSync(src)) {
      await sharp(src)
        .resize({ width: 100, height: 100, fit: 'cover' })
        .webp({ quality: 70, effort: 6 })
        .toFile(`public/images/${name}.webp`);
      console.log(`Created ${name}.webp:`, fs.statSync(`public/images/${name}.webp`).size, 'bytes');
    }
  }

  // 5. Service & Blog Images in public/images
  const imgDir = 'public/images';
  const files = fs.readdirSync(imgDir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const webpPath = path.join(imgDir, `${baseName}.webp`);
      const srcPath = path.join(imgDir, file);

      await sharp(srcPath)
        .resize({ width: 600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 65, effort: 6 })
        .toFile(webpPath + '.tmp');
      fs.renameSync(webpPath + '.tmp', webpPath);
      console.log(`Optimized ${baseName}.webp:`, fs.statSync(webpPath).size, 'bytes');
    }
  }

  console.log('All images optimized successfully!');
}

optimize().catch(console.error);
