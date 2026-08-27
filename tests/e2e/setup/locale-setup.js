/**
 * Per-test locale injection for Playwright
 * Forces French locale in localStorage before each test page loads.
 *
 * Key must match src/i18n.js STORAGE_KEY:
 *   export const STORAGE_KEY = 'exif-stripper-lang';
 */
import { test as base } from '@playwright/test';

const LANG_STORAGE_KEY = 'exif-stripper-lang';

// Extended test fixture: injects French locale before each test
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(([{ key, value }]) => {
      window.localStorage.setItem(key, value);
    }, [{ key: LANG_STORAGE_KEY, value: 'fr' }]);

    await use(page);
  },
});

export { expect } from '@playwright/test';
