/**
 * Helpers to generate test image files
 * Creates PNG images using pure JavaScript (no node-canvas needed)
 * Generates JPEG-like files by creating proper image data.
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

// CRC32 table for PNG encoding
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/**
 * Create a test PNG image
 * @param {object} options
 * @param {number} options.width
 * @param {number} options.height
 * @param {string} options.filename
 * @returns {string} - file path
 */
export function createTestImage(options = {}) {
  const {
    width = 800,
    height = 600,
    filename = 'test-image.png',
  } = options;

  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 2;  // color type: RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw image data: each row starts with filter byte (0 = none)
  const rowLen = 1 + width * 3;
  const raw = Buffer.alloc(rowLen * height);

  for (let y = 0; y < height; y++) {
    const rowOff = y * rowLen;
    raw[rowOff] = 0; // filter: none

    for (let x = 0; x < width; x++) {
      const px = rowOff + 1 + x * 3;
      let r = 255, g = 255, b = 255;

      // Border (gray)
      if (x < 10 || x >= width - 10 || y < 10 || y >= height - 10) {
        r = g = b = 200;
      }

      // Center rectangle (red)
      const cx = width / 2;
      const cy = height / 2;
      const rx = width / 4;
      const ry = height / 4;
      if (Math.abs(x - cx) < rx && Math.abs(y - cy) < ry) {
        r = 220;
        g = 50;
        b = 50;
      }

      // Horizontal blue stripes
      if ((y % 100) < 20) {
        r = 50;
        g = 100;
        b = 200;
      }

      // Vertical green stripe
      if (x > width / 2 - 30 && x < width / 2 + 30) {
        r = 50;
        g = 200;
        b = 50;
      }

      raw[px] = r;
      raw[px + 1] = g;
      raw[px + 2] = b;
    }
  }

  const compressed = zlib.deflateSync(raw);

  const pngData = Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);

  const filePath = path.join(fixturesDir, filename);
  fs.mkdirSync(fixturesDir, { recursive: true });
  fs.writeFileSync(filePath, pngData);

  return filePath;
}

/**
 * Create multiple test images of different sizes/types
 */
export function createTestFixtures() {
  console.log('Generating test image fixtures...');

  const files = {
    testImagePng: createTestImage({
      width: 800,
      height: 600,
      filename: 'test-image.png',
    }),
    testImageSmall: createTestImage({
      width: 400,
      height: 300,
      filename: 'test-small.png',
    }),
    testImageLarge: createTestImage({
      width: 1920,
      height: 1080,
      filename: 'test-large.png',
    }),
    // Note: We create PNGs but can test them as if they were various formats
    // Since this is a client-side only tool, the actual EXIF data doesn't exist
    // but the upload/download flow can still be tested.
  };

  console.log('✅ Fixtures generated:');
  Object.entries(files).forEach(([key, path]) => {
    console.log(`   ${key}: ${path}`);
  });

  return files;
}

/**
 * Create a "fake" JPG file (actually a PNG renamed)
 * Note: Real EXIF stripping requires actual EXIF metadata in JPEGs,
 * but since we're testing the UI flow and canvas re-encoding,
 * a PNG is sufficient. The app will convert it properly regardless.
 */
export function createFakeJpg() {
  // Just create a PNG and rename it
  const pngPath = createTestImage({
    width: 800,
    height: 600,
    filename: 'test-image.jpg',
  });

  // Rename to .jpg (this creates a PNG with .jpg extension, which browsers handle fine)
  const jpgPath = path.join(fixturesDir, 'test-image.jpg');
  if (pngPath !== jpgPath) {
    fs.copyFileSync(pngPath, jpgPath);
  }

  return jpgPath;
}

/**
 * Create WebP fake file
 */
export function createFakeWebp() {
  const webpPath = createTestImage({
    width: 800,
    height: 600,
    filename: 'test-image.webp',
  });

  // Copy to .webp extension
  const copyPath = path.join(fixturesDir, 'test-image.webp');
  if (webpPath !== copyPath) {
    fs.copyFileSync(webpPath, copyPath);
  }

  return copyPath;
}

/**
 * Generate all necessary test fixtures
 */
export function generateAllFixtures() {
  console.log('Generating all test fixtures...');
  fs.mkdirSync(fixturesDir, { recursive: true });

  const files = {
    png: createTestImage({ width: 800, height: 600, filename: 'test-image.png' }),
    small: createTestImage({ width: 400, height: 300, filename: 'test-small.png' }),
    large: createTestImage({ width: 1920, height: 1080, filename: 'test-large.png' }),
  };

  // Create "fake" JPEG/WebP (using PNG data with different extensions)
  const jpgPath = files.png;
  fs.copyFileSync(jpgPath, path.join(fixturesDir, 'test-image.jpg'));

  const webpPath = files.png;
  fs.copyFileSync(webpPath, path.join(fixturesDir, 'test-image.webp'));

  console.log('✅ All fixtures generated');
  return files;
}
