const fs = require('fs');
const path = require('path');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const inputPath = path.join(__dirname, 'public', 'images', 'logo-new.jpg');
const outputPath = path.join(__dirname, 'public', 'images', 'logo-transparent.png');
const outputLightPath = path.join(__dirname, 'public', 'images', 'logo-transparent-white-text.png');

const jpegData = fs.readFileSync(inputPath);
const rawData = jpeg.decode(jpegData, { useTArray: true });

const width = rawData.width;
const height = rawData.height;
const data = rawData.data; // RGBA Uint8Array

// Find bounding box of non-white pixels
let minX = width, maxX = 0, minY = height, maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    // Check if pixel is foreground (not off-white)
    const isBg = (r > 230 && g > 230 && b > 230);
    if (!isBg) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add 10px padding
const pad = 10;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

console.log(`Original: ${width}x${height}, Bounding Box: [${minX}, ${minY}, ${maxX}, ${maxY}], Cropped: ${cropW}x${cropH}`);

const png = new PNG({ width: cropW, height: cropH });

for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcX = minX + x;
    const srcY = minY + y;
    const srcIdx = (srcY * width + srcX) * 4;
    const dstIdx = (y * cropW + x) * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    
    if (brightness > 238) {
      png.data[dstIdx] = 0;
      png.data[dstIdx + 1] = 0;
      png.data[dstIdx + 2] = 0;
      png.data[dstIdx + 3] = 0; // Fully transparent
    } else if (brightness > 215) {
      const alpha = Math.round(255 * (1 - (brightness - 215) / 23));
      png.data[dstIdx] = r;
      png.data[dstIdx + 1] = g;
      png.data[dstIdx + 2] = b;
      png.data[dstIdx + 3] = alpha;
    } else {
      png.data[dstIdx] = r;
      png.data[dstIdx + 1] = g;
      png.data[dstIdx + 2] = b;
      png.data[dstIdx + 3] = 255;
    }
  }
}

// Write standard transparent PNG
const buffer = PNG.sync.write(png);
fs.writeFileSync(outputPath, buffer);
console.log(`Saved transparent logo to ${outputPath}`);

// Also create a version for dark theme where "ALNOOR TRADERS" text is white
const pngDark = new PNG({ width: cropW, height: cropH });
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const dstIdx = (y * cropW + x) * 4;
    const r = png.data[dstIdx];
    const g = png.data[dstIdx + 1];
    const b = png.data[dstIdx + 2];
    const a = png.data[dstIdx + 3];

    if (a === 0) {
      pngDark.data[dstIdx] = 0;
      pngDark.data[dstIdx + 1] = 0;
      pngDark.data[dstIdx + 2] = 0;
      pngDark.data[dstIdx + 3] = 0;
      continue;
    }

    const isBlue = (b > r + 35 && b > 130);
    if (isBlue) {
      pngDark.data[dstIdx] = r;
      pngDark.data[dstIdx + 1] = g;
      pngDark.data[dstIdx + 2] = b;
      pngDark.data[dstIdx + 3] = a;
    } else {
      // White text for ALNOOR TRADERS on dark background
      pngDark.data[dstIdx] = 255;
      pngDark.data[dstIdx + 1] = 255;
      pngDark.data[dstIdx + 2] = 255;
      pngDark.data[dstIdx + 3] = a;
    }
  }
}

const bufferDark = PNG.sync.write(pngDark);
fs.writeFileSync(outputLightPath, bufferDark);
console.log(`Saved dark-mode optimized transparent logo to ${outputLightPath}`);
