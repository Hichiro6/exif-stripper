import { describe, it, expect } from 'vitest';
import { LANGUAGES, TRANSLATIONS, STORAGE_KEY } from '../../src/i18n.js';

describe('i18n module', () => {
  describe('LANGUAGES', () => {
    it('should have 7 languages', () => {
      expect(Object.keys(LANGUAGES)).toHaveLength(7);
    });

    it('should include en, fr, de, es, pt, nl, it', () => {
      const codes = Object.keys(LANGUAGES).map(k => LANGUAGES[k].code);
      expect(codes).toEqual(expect.arrayContaining(['en', 'fr', 'de', 'es', 'pt', 'nl', 'it']));
    });
  });

  describe('TRANSLATIONS', () => {
    it('should have translations for all 7 languages', () => {
      expect(Object.keys(TRANSLATIONS)).toHaveLength(7);
    });

    it('should have matching keys across all languages', () => {
      const enKeys = Object.keys(TRANSLATIONS.en).sort();
      for (const lang of Object.keys(TRANSLATIONS)) {
        const langKeys = Object.keys(TRANSLATIONS[lang]).sort();
        expect(langKeys).toEqual(enKeys);
      }
    });

    it('should have all required keys in English', () => {
      const requiredKeys = [
        'app.title',
        'app.tagline',
        'privacy.badge',
        'dropzone.title',
        'btn.strip',
        'btn.download'
      ];
      for (const key of requiredKeys) {
        expect(TRANSLATIONS.en).toHaveProperty(key);
      }
    });
  });

  describe('STORAGE_KEY', () => {
    it('should be a non-empty string', () => {
      expect(STORAGE_KEY).toBeTruthy();
      expect(typeof STORAGE_KEY).toBe('string');
    });
  });
});
