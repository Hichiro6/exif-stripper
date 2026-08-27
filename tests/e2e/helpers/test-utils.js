/**
 * Test utilities for EXIF Stripper E2E tests
 * Provides common helpers to upload a test image and wait for the workspace.
 */

import path from 'path';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

/**
 * Upload a test image and wait for workspace to appear.
 * @param {import('@playwright/test').Page} page
 * @param {string} filename — fixture filename (default: test-image.jpg)
 * @returns {Promise<{filename: string}>}
 */
export async function uploadTestImage(page, filename = 'test-image.jpg') {
  await page.goto('/');

  // Wait for dropzone to be visible (initial state)
  await page.waitForSelector('#dropzone', { timeout: 10000 });

  const filePath = path.join(fixturesDir, filename);
  await page.setInputFiles('input[type="file"]', filePath);

  // Wait for workspace to appear
  await expectWorkspaceVisible(page);

  return {
    filename: path.basename(filename),
  };
}

/**
 * Upload multiple test images at once.
 * @param {import('@playwright/test').Page} page
 * @param {string[]} filenames — fixture filenames
 * @returns {Promise<{filenames: string[]}>}
 */
export async function uploadMultipleImages(page, filenames) {
  await page.goto('/');
  await page.waitForSelector('#dropzone', { timeout: 10000 });

  const filePaths = filenames.map((f) => path.join(fixturesDir, f));
  await page.setInputFiles('input[type="file"]', filePaths);

  await expectWorkspaceVisible(page);

  return { filenames: filenames.map((f) => path.basename(f)) };
}

/**
 * Wait for the workspace section to become visible after upload.
 * @param {import('@playwright/test').Page} page
 */
export async function expectWorkspaceVisible(page) {
  await page.waitForSelector('#workspace:not([hidden])', { timeout: 10000 });
}

/**
 * Wait for the dropzone to be visible (initial state / after reset).
 * @param {import('@playwright/test').Page} page
 */
export async function expectDropzoneVisible(page) {
  await page.waitForSelector('#dropzone', { timeout: 10000 });
}

/**
 * Click the "Strip EXIF Data" button and wait for the result.
 * @param {import('@playwright/test').Page} page
 */
export async function stripExif(page) {
  // For single image, the download button is shown directly (no strip button).
  // For multiple images, click strip first.
  const stripBtn = page.locator('#btn-strip');
  const isStripVisible = await stripBtn.isVisible().catch(() => false);

  if (isStripVisible) {
    await stripBtn.click();
    // Wait for result info to appear
    await page.waitForSelector('#result-info:not([hidden])', { timeout: 30000 });
  } else {
    // Single image: strip happens implicitly — wait for download button
    await page.waitForSelector('#btn-download:not([hidden])', { timeout: 10000 });
  }
}

/**
 * Wait for the result info section to be visible after stripping.
 * @param {import('@playwright/test').Page} page
 */
export async function waitForResult(page) {
  await page.waitForSelector('#result-info:not([hidden])', { timeout: 30000 });
}

/**
 * Get a fixture file path.
 * @param {string} filename
 * @returns {string}
 */
export function getFixturePath(filename) {
  return path.join(fixturesDir, filename);
}
