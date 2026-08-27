# EXIF Stripper E2E Tests

Tests de bout en bout utilisant Playwright pour valider le flux complet de l'application.

## Structure

```
tests/e2e/
├── 01-upload-preview.spec.js    # Upload et preview d'images
├── 02-processing.spec.js        # Traitement EXIF et progression
├── 03-download.spec.js          # Téléchargement des images nettoyées
├── 04-reset-controls.spec.js    # Reset et contrôles UI
├── globalSetup.js               # Setup global (injection locale FR)
├── helpers/
│   ├── test-utils.js           # Utilitaires communs
│   └── test-fixtures-gen.js    # Génération d'images de test
├── fixtures/                   # Images de test générées
├── downloads/                  # Téléchargements des tests
├── artifacts/                  # Traces Playwright
└── results/
    └── report/                 # Rapport HTML
```

## Configuration

- **Locale**: Français (forcé via localStorage, clé `exif-stripper-lang`)
- **Serveur**: http://localhost:5173 (Vite dev server)
- **Navigateur**: Chromium seulement
- **Mode**: Headless par défaut

## Commandes

```bash
# Lancer tous les tests
npm run test:e2e

# Mode UI interactif
npm run test:ui

# Tests avec navigateur visible
npm run test:headed

# Voir le rapport HTML
npm run test:report
```

## Prérequis

Les fixtures (images de test) sont générées automatiquement avant les premiers tests.

## Helpers disponibles

### test-utils.js

- `uploadTestImage(page, filename)` - Upload une image unique
- `uploadMultipleImages(page, filenames)` - Upload plusieurs images
- `expectWorkspaceVisible(page)` - Attend que le workspace soit visible
- `expectDropzoneVisible(page)` - Attend que le dropzone soit visible
- `stripExif(page)` - Clique sur "Strip" et attend le résultat
- `waitForResult(page)` - Attend que le résultat soit affiché
- `getFixturePath(filename)` - Chemin complet d'une fixture

### test-fixtures-gen.js

- `createTestImage(options)` - Crée une PNG de test
- `generateAllFixtures()` - Génère toutes les fixtures

## Locales

Le français est forcé via `globalSetup.js` et `setup/locale-setup.js`. La clé de stockage doit correspondre à celle de `src/i18n.js`:

```javascript
export const STORAGE_KEY = 'exif-stripper-lang';
```
