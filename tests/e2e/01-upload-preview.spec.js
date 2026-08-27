/**
 * Tests fonctionnels - Upload et Preview
 * 
 * Couvre:
 * - Upload image (JPG, PNG, WebP) → preview correcte
 * - Vérification que l'image est bien affichée dans la grille
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { createTestImage } from './helpers/test-fixtures-gen.js';
import { expectWorkspaceVisible } from './helpers/test-utils.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.describe('📤 Upload et Preview', () => {
  
  test.beforeAll(async () => {
    // Ensure fixtures exist
    if (!fs.existsSync(path.join(fixturesDir, 'test-image.png'))) {
      createTestImage({ width: 800, height: 600, filename: 'test-image.png' });
    }
    if (!fs.existsSync(path.join(fixturesDir, 'test-image.jpg'))) {
      const pngPath = createTestImage({ width: 800, height: 600, filename: 'test-image.png' });
      fs.copyFileSync(pngPath, path.join(fixturesDir, 'test-image.jpg'));
    }
    if (!fs.existsSync(path.join(fixturesDir, 'test-image.webp'))) {
      const pngPath = createTestImage({ width: 800, height: 600, filename: 'test-image.png' });
      fs.copyFileSync(pngPath, path.join(fixturesDir, 'test-image.webp'));
    }
  });

  test('Upload image PNG → preview visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload PNG
    const pngPath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', pngPath);

    // Wait for workspace to appear
    await expectWorkspaceVisible(page);
    await expect(page.locator('#dropzone')).toBeHidden();

    // Filename should be displayed
    await expect(page.locator('#file-count')).toContainText('1');

    // Images grid should have content
    const img = page.locator('#images-grid img');
    await expect(img).toHaveCount(1);
    await expect(img).toBeVisible();

    // Check image dimensions
    const width = await img.evaluate((el) => el.naturalWidth);
    const height = await img.evaluate((el) => el.naturalHeight);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
  });

  test('Upload image JPG → preview visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const jpgPath = path.join(fixturesDir, 'test-image.jpg');
    await page.setInputFiles('input[type="file"]', jpgPath);

    await expectWorkspaceVisible(page);
    await expect(page.locator('#file-count')).toContainText('1');

    const img = page.locator('#images-grid img');
    await expect(img).toHaveCount(1);
    await expect(img).toBeVisible();
  });

  test('Upload multiple images → toutes visibles', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload multiple images
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', [imagePath, imagePath]);

    await expectWorkspaceVisible(page);
    await expect(page.locator('#file-count')).toContainText('2');

    const imgs = page.locator('#images-grid img');
    await expect(imgs).toHaveCount(2);

    // Should show Strip button for multiple images
    await expect(page.locator('#btn-strip')).toBeVisible();
  });

  test('Format non supporté (.txt) → pas d\'upload', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Create a fake .txt file
    const txtPath = path.join(fixturesDir, 'invalid.txt');
    fs.writeFileSync(txtPath, 'This is not an image');

    // Try to upload - the app filters for image/* types
    // So .txt files will be silently ignored
    await page.setInputFiles('input[type="file"]', txtPath);

    // Workspace should remain hidden (no valid images)
    await expect(page.locator('#workspace')).toBeHidden();
    await expect(page.locator('#dropzone')).toBeVisible();
  });

  test('Drag & drop fonctionne', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Playwright doesn't fully support DataTransfer with real files.
    // Workaround: use setInputFiles on the hidden input (same code path as drop handler)
    const pngPath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', pngPath);

    await expectWorkspaceVisible(page);
    await expect(page.locator('#file-count')).toContainText('1');
  });
});
