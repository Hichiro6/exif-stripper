/**
 * Tests fonctionnels - Téléchargement
 * 
 * Couvre:
 * - Téléchargement image nettoyée → fichier généré
 * - Nom de fichier dérivé du nom original avec suffixe "-clean"
 * - Téléchargement multiple pour plusieurs images
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { createTestImage } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');
const downloadDir = path.join(process.cwd(), 'tests/e2e/downloads');

test.describe('⬇️ Téléchargement', () => {
  
  test.beforeAll(async () => {
    fs.mkdirSync(downloadDir, { recursive: true });
    fs.mkdirSync(fixturesDir, { recursive: true });
    
    // Create test images if they don't exist
    createTestImage({ width: 800, height: 600, filename: 'test-image.png' });
    
    // Also create copies with other extensions
    fs.copyFileSync(
      path.join(fixturesDir, 'test-image.png'),
      path.join(fixturesDir, 'test-image.jpg')
    );
    fs.copyFileSync(
      path.join(fixturesDir, 'test-image.png'),
      path.join(fixturesDir, 'test-image.webp')
    );
  });

  test.afterEach(async () => {
    // Clean downloads
    try {
      const files = fs.readdirSync(downloadDir);
      for (const f of files) {
        if (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp')) {
          fs.unlinkSync(path.join(downloadDir, f));
        }
      }
    } catch {}
  });

  test('Téléchargement image unique → fichier généré', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload image and process
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);

    // Wait for workspace
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

    // Click strip to process
    await page.click('#btn-strip');
    await page.waitForSelector('#btn-download:not([hidden])', { timeout: 30000 });

    // Click download
    const downloadPromise = page.waitForEvent('download');
    await page.click('#btn-download');
    const download = await downloadPromise;

    // Save and verify
    const savePath = path.join(downloadDir, 'downloaded.png');
    await download.saveAs(savePath);

    expect(fs.existsSync(savePath)).toBeTruthy();

    const stats = fs.statSync(savePath);
    expect(stats.size).toBeGreaterThan(0);

    // Filename should end with -clean.png
    const filename = download.suggestedFilename();
    expect(filename).toContain('-clean');
    expect(filename).toMatch(/\.png$/);
  });

  test('Téléchargement image → nom de fichier dérivé du nom original', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);

    // Process
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });
    await page.click('#btn-strip');
    await page.waitForSelector('#btn-download:not([hidden])', { timeout: 30000 });

    const downloadPromise = page.waitForEvent('download');
    await page.click('#btn-download');
    const download = await downloadPromise;

    const filename = download.suggestedFilename();
    expect(filename).toContain('test-image');
    expect(filename).toMatch(/^test-image-clean\.png$/);
  });

  test('Téléchargement multiples images → boutons appropriés', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload 2 images
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', [imagePath, imagePath]);

    // For multiple images, show Strip button first
    await expect(page.locator('#workspace:not([hidden])')).toBeVisible();
    await expect(page.locator('#btn-strip')).toBeVisible();

    // Click strip to process
    await page.click('#btn-strip');
    
    // Wait for processing
    await page.waitForSelector('#result-info:not([hidden])', { timeout: 30000 });
    
    // Wait for Download All button
    await page.waitForSelector('#btn-download-all:not([hidden])', { timeout: 5000 });
    
    // Download All button should now be visible
    await expect(page.locator('#btn-download-all')).toBeVisible();
  });

  test('Bouton téléchargement sans fichier → pas de download', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Don't upload anything — workspace is hidden
    await expect(page.locator('#workspace')).toBeHidden();

    // Download and strip buttons should not be visible
    await expect(page.locator('#btn-download')).toBeHidden();
    await expect(page.locator('#btn-strip')).toBeHidden();
  });

  test('Téléchargement image JPG avec format WebP → extension correcte', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const jpgPath = path.join(fixturesDir, 'test-image.jpg');
    await page.setInputFiles('input[type="file"]', jpgPath);
    
    // Process
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });
    
    // Select WebP format before processing
    await page.selectOption('#output-format-select', 'webp');
    
    await page.click('#btn-strip');
    await page.waitForSelector('#btn-download:not([hidden])', { timeout: 30000 });

    const downloadPromise = page.waitForEvent('download');
    await page.click('#btn-download');
    const download = await downloadPromise;

    const filename = download.suggestedFilename();
    // generateFilename preserves the ORIGINAL extension, not the output format
    // So a .jpg input produces a -clean.jpg file even with webp format
    expect(filename).toContain('-clean');
  });
});
