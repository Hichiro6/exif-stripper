/**
 * Tests fonctionnels - Traitement et nettoyage EXIF
 * 
 * Couvre:
 * - Clic bouton "Strip EXIF" → traitement des images
 * - Vérification de la progression (barre + pourcentage)
 * - Résultat après nettoyage
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { createTestImage } from './helpers/test-fixtures-gen.js';
import { expectWorkspaceVisible, waitForResult } from './helpers/test-utils.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.describe('🧹 Traitement EXIF', () => {
  
  test.beforeAll(async () => {
    fs.mkdirSync(fixturesDir, { recursive: true });
    if (!fs.existsSync(path.join(fixturesDir, 'test-image.png'))) {
      createTestImage({ width: 800, height: 600, filename: 'test-image.png' });
    }
  });

  test('Bouton Strip visible pour multiples images', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload 2 images
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', [imagePath, imagePath]);

    await expectWorkspaceVisible(page);

    // For multiple images, #btn-strip should be visible
    await expect(page.locator('#btn-strip')).toBeVisible();
    
    // #btn-download should be hidden initially (before processing)
    await page.waitForSelector('#btn-download[hidden]', { timeout: 5000 });
  });

  test('Traitement image unique → clic strip → bouton download apparaît', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);

    await expectWorkspaceVisible(page);

    // For single image, strip button is visible - click it to process
    await expect(page.locator('#btn-strip')).toBeVisible();
    await page.click('#btn-strip');

    // Wait for download button to appear after processing
    await page.waitForSelector('#btn-download:not([hidden])', { timeout: 30000 });
    await expect(page.locator('#btn-download')).toBeVisible();
  });

  test('Barre de progression affiche le statut', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload 3 images for batch processing
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', [imagePath, imagePath, imagePath]);

    await expectWorkspaceVisible(page);

    // Click strip to start batch processing
    await page.click('#btn-strip');

    // Progress container should become visible
    await expect(page.locator('#progress-container:not([hidden])')).toBeVisible();

    // Progress fill should appear with some width
    await expect(page.locator('#progress-fill')).toBeVisible();
    
    // Progress percentage should appear
    const percentEl = page.locator('#progress-percent');
    await expect(percentEl).toBeVisible();

    // Wait for completion - result info should appear
    await waitForResult(page);

    // Final progress should be 100%
    const finalPercent = await percentEl.textContent();
    expect(finalPercent).toContain('100%');

    // Result info should be visible
    await expect(page.locator('#result-info:not([hidden])')).toBeVisible();
  });

  test('Indicateur de résultat montre les économies', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);

    await expectWorkspaceVisible(page);

    // Process single image
    await page.click('#btn-strip');

    // Wait for download button after processing
    await page.waitForSelector('#btn-download:not([hidden])', { timeout: 30000 });

    // Result info should be visible after processing
    const resultInfo = page.locator('#result-info');
    await expect(resultInfo).toBeVisible();
    
    // Result details should show savings
    await expect(page.locator('#result-details')).toBeVisible();
  });

  test('Format sortie JPEG sélectionné → appliqué', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);

    await expectWorkspaceVisible(page);

    // Select JPEG format
    await page.selectOption('#output-format-select', 'jpeg');

    const selectedValue = await page.locator('#output-format-select').inputValue();
    expect(selectedValue).toBe('jpeg');
  });

  test('Qualité sélectionnée → valeur correcte', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);

    await expectWorkspaceVisible(page);

    // Select low quality
    await page.selectOption('#quality-select', 'low');

    const selectedValue = await page.locator('#quality-select').inputValue();
    expect(selectedValue).toBe('low');
  });
});
