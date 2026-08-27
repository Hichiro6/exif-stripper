/**
 * Tests fonctionnels - Reset et réinitialisation
 * 
 * Couvre:
 * - Bouton Reset → retour à l'état initial
 * - Ajout plus d'images après reset
 * - UI contrôles (format, qualité) réinitialisés
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { createTestImage } from './helpers/test-fixtures-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

test.describe('🔄 Reset et Réinitialisation', () => {
  
  test.beforeAll(async () => {
    fs.mkdirSync(fixturesDir, { recursive: true });
    createTestImage({ width: 800, height: 600, filename: 'test-image.png' });
  });

  test('Reset → retour à dropzone', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload an image
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);

    // Workspace should be visible
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });
    await expect(page.locator('#workspace')).toBeVisible();
    await expect(page.locator('#dropzone-section')).toBeHidden();
    await expect(page.locator('#file-count')).toContainText('1');

    // Click reset
    await page.click('#btn-reset');

    // Workspace should be hidden, dropzone visible
    await expect(page.locator('#workspace')).toBeHidden();
    await expect(page.locator('#dropzone-section')).toBeVisible();
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // File count should be cleared
    const countText = await page.locator('#file-count').textContent();
    expect(countText).toBe('');
  });

  test('Reset puis nouvel upload fonctionne', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // First upload
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });
    await expect(page.locator('#file-count')).toContainText('1');

    // Reset
    await page.click('#btn-reset');
    await expect(page.locator('#dropzone-section')).toBeVisible();

    // Second upload
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });
    await expect(page.locator('#file-count')).toContainText('1');
  });

  test('Ajouter plus d\'images fonctionne', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // First upload
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

    // Verify initial state: 1 image
    await expect(page.locator('#file-count')).toContainText('1');

    // Click "Add More Photos" - this triggers file input click
    await page.click('#btn-add-more');

    // Now set files via setInputFiles - this simulates selecting a file
    await page.setInputFiles('input[type="file"]', imagePath);

    // Wait for file count to update
    await page.waitForSelector('#file-count', { timeout: 5000 });
    
    // Wait a bit for the textContent to be updated
    await page.waitForTimeout(500);
    
    const countText = await page.locator('#file-count').textContent();
    expect(countText).toContain('2');
  });

  test('Format par défaut est "Keep Original"', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

    // Default format should be "keep"
    const defaultValue = await page.locator('#output-format-select').inputValue();
    expect(defaultValue).toBe('keep');
  });

  test('Qualité par défaut est "Medium"', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

    // Default quality should be "medium" (has selected attribute)
    const defaultValue = await page.locator('#quality-select').inputValue();
    expect(defaultValue).toBe('medium');
  });

  test('Reset réinitialise les sélections de format', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

    // Change format to JPEG
    await page.selectOption('#output-format-select', 'jpeg');
    let selectedValue = await page.locator('#output-format-select').inputValue();
    expect(selectedValue).toBe('jpeg');

    // Change quality to high
    await page.selectOption('#quality-select', 'high');
    let qualityValue = await page.locator('#quality-select').inputValue();
    expect(qualityValue).toBe('high');

    // Reset
    await page.click('#btn-reset');
    await expect(page.locator('#dropzone-section')).toBeVisible();

    // Upload again
    await page.setInputFiles('input[type="file"]', imagePath);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

    // Values should be reset
    selectedValue = await page.locator('#output-format-select').inputValue();
    expect(selectedValue).toBe('keep');

    qualityValue = await page.locator('#quality-select').inputValue();
    expect(qualityValue).toBe('medium');
  });

  test('Progress bar est masquée après reset', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#dropzone', { timeout: 10000 });

    // Upload 3 images to trigger batch processing UI
    const imagePath = path.join(fixturesDir, 'test-image.png');
    await page.setInputFiles('input[type="file"]', [imagePath, imagePath, imagePath]);
    await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });

    // Trigger processing
    await page.click('#btn-strip');
    
    // Wait for progress to appear
    await expect(page.locator('#progress-container:not([hidden])')).toBeVisible();

    // Wait for completion
    await page.waitForSelector('#result-info:not([hidden])', { timeout: 30000 });

    // Reset
    await page.click('#btn-reset');
    await expect(page.locator('#dropzone-section')).toBeVisible();

    // Progress should be hidden
    await expect(page.locator('#progress-container')).toBeHidden();
  });
});
