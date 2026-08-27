/**
 * Global Setup for Playwright — Inject French locale
 * Forces French locale in localStorage before each test starts.
 *
 * The storage key must match src/i18n.js STORAGE_KEY:
 *   export const STORAGE_KEY = 'exif-stripper-lang';
 */
import fs from 'fs';
import path from 'path';

export default async function globalSetup(config) {
  const localeScript = `
    (function() {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('exif-stripper-lang', 'fr');
        console.log('[i18n] Locale forced to French');
      }
    })();
  `;

  const setupDir = path.join(config.projectDir || process.cwd(), 'tests/e2e/setup');
  fs.mkdirSync(setupDir, { recursive: true });
  fs.writeFileSync(path.join(setupDir, 'inject-locale.js'), localeScript);

  console.log('✅ Global setup: French locale injection script created');
}
