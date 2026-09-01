/**
 * i18n.js — EXIF Stripper
 * 7-language internationalization (EN/FR/DE/ES/PT/NL/IT)
 */

export const STORAGE_KEY = 'exif-stripper-lang';

export const LANGUAGES = {
  en: { code: 'en', name: 'English' },
  fr: { code: 'fr', name: 'Français' },
  de: { code: 'de', name: 'Deutsch' },
  es: { code: 'es', name: 'Español' },
  pt: { code: 'pt', name: 'Português' },
  nl: { code: 'nl', name: 'Nederlands' },
  it: { code: 'it', name: 'Italiano' },
};

export const TRANSLATIONS = {
  en: {
    'app.title': 'EXIF Stripper',
    'app.tagline': 'Remove EXIF metadata from photos — 100% in your browser',
    'privacy.badge': 'Client-side only',
    'privacy.tooltip': 'No data leaves your device',

    'dropzone.title': 'Drop photos here',
    'dropzone.subtitle': 'or click to browse',
    'dropzone.accept': 'JPEG, PNG, WebP supported',

    'workspace.fileName': '{name}',
    'workspace.fileInfo': '{size} • {dimensions}',
    'workspace.originalMetadata': 'Original Metadata',
    'workspace.cleanedImage': 'Cleaned Image',

    'metadata.camera': 'Camera',
    'metadata.dateTaken': 'Date Taken',
    'metadata.location': 'Location',
    'metadata.exposure': 'Exposure',
    'metadata.iso': 'ISO',
    'metadata.lens': 'Lens',
    'metadata.unknown': 'Unknown',
    'metadata.none': 'No metadata found',

    'btn.strip': 'Strip EXIF Data',
    'btn.saving': 'Cleaning...',
    'btn.download': 'Download Clean Image',
    'btn.downloadStarted': 'Download started',
    'btn.reset': 'Reset',
    'btn.addMore': 'Add More Photos',

    'output.format': 'Output Format',
    'output.quality': 'Quality',
    'output.keepFormat': 'Keep Original',
    'output.convertTo': 'Convert to JPEG',
    'output.convertToWebP': 'Convert to WebP',

    'progress.processing': 'Processing {current} / {total}',
    'progress.finalizing': 'Finalizing...',
    'progress.completed': 'All images cleaned',

    'result.label': 'Your cleaned image is ready',
    'result.pages': 'cleaned',
    'result.sizeBefore': 'Before: {size}',
    'result.sizeAfter': 'After: {size}',
    'result.savings': 'Saved: {percent}% ({bytes})',

    'error.noFile': 'Please upload a photo first',
    'error.invalidFormat': 'Unsupported file format',
    'error.failedLoad': 'Failed to load image',
    'error.failedClean': 'Failed to clean image: {msg}',

    'footer.privacy': 'Your photos never leave your browser',
    'footer.openSource': 'Open Source',
    'footer.github': 'View on GitHub',
  },

  fr: {
    'app.title': 'EXIF Stripper',
    'app.tagline': 'Supprime les métadonnées EXIF — 100% dans votre navigateur',
    'privacy.badge': 'Client-side uniquement',
    'privacy.tooltip': 'Aucune donnée ne quitte votre appareil',

    'dropzone.title': 'Déposez vos photos ici',
    'dropzone.subtitle': 'ou cliquez pour parcourir',
    'dropzone.accept': 'JPEG, PNG, WebP pris en charge',

    'workspace.fileName': '{name}',
    'workspace.fileInfo': '{size} • {dimensions}',
    'workspace.originalMetadata': 'Métadonnées originales',
    'workspace.cleanedImage': 'Image nettoyée',

    'metadata.camera': 'Appareil',
    'metadata.dateTaken': 'Date',
    'metadata.location': 'Localisation',
    'metadata.exposure': 'Exposition',
    'metadata.iso': 'ISO',
    'metadata.lens': 'Objectif',
    'metadata.unknown': 'Inconnu',
    'metadata.none': 'Aucune métadonnée trouvée',

    'btn.strip': 'Supprimer EXIF',
    'btn.saving': 'Nettoyage...',
    'btn.download': "Télécharger l'image",
    'btn.downloadStarted': 'Téléchargement démarré',
    'btn.reset': 'Réinitialiser',
    'btn.addMore': 'Ajouter plus',

    'output.format': 'Format de sortie',
    'output.quality': 'Qualité',
    'output.keepFormat': "Garder l'original",
    'output.convertTo': 'Convertir en JPEG',
    'output.convertToWebP': 'Convertir en WebP',

    'progress.processing': 'Traitement {current} / {total}',
    'progress.finalizing': 'Finalisation...',
    'progress.completed': 'Images nettoyées',

    'result.label': 'Votre image nettoyée est prête',
    'result.pages': 'nettoyé',
    'result.sizeBefore': 'Avant : {size}',
    'result.sizeAfter': 'Après : {size}',
    'result.savings': 'Gain : {percent}% ({bytes})',

    'error.noFile': "Veuillez télécharger une photo d'abord",
    'error.invalidFormat': 'Format de fichier non supporté',
    'error.failedLoad': "Impossible de charger l'image",
    'error.failedClean': 'Échec du nettoyage : {msg}',

    'footer.privacy': 'Vos photos ne quittent jamais votre navigateur',
    'footer.openSource': 'Open Source',
    'footer.github': 'Voir sur GitHub',
  },

  de: {
    'app.title': 'EXIF Stripper',
    'app.tagline': 'EXIF-Metadaten entfernen — 100% im Browser',
    'privacy.badge': 'Nur Client-Seite',
    'privacy.tooltip': 'Keine Daten verlassen Ihr Gerät',

    'dropzone.title': 'Bilder hier ablegen',
    'dropzone.subtitle': 'oder klicken zum Durchsuchen',
    'dropzone.accept': 'JPEG, PNG, WebP unterstützt',

    'workspace.fileName': '{name}',
    'workspace.fileInfo': '{size} • {dimensions}',
    'workspace.originalMetadata': 'Original-Metadaten',
    'workspace.cleanedImage': 'Bereinigtes Bild',

    'metadata.camera': 'Kamera',
    'metadata.dateTaken': 'Datum',
    'metadata.location': 'Standort',
    'metadata.exposure': 'Belichtung',
    'metadata.iso': 'ISO',
    'metadata.lens': 'Objektiv',
    'metadata.unknown': 'Unbekannt',
    'metadata.none': 'Keine Metadaten gefunden',

    'btn.strip': 'EXIF Entfernen',
    'btn.saving': 'Bereinigen...',
    'btn.download': 'Bild herunterladen',
    'btn.downloadStarted': 'Download gestartet',
    'btn.reset': 'Zurücksetzen',
    'btn.addMore': 'Mehr Bilder hinzufügen',

    'output.format': 'Ausgabeformat',
    'output.quality': 'Qualität',
    'output.keepFormat': 'Original behalten',
    'output.convertTo': 'In JPEG konvertieren',
    'output.convertToWebP': 'In WebP konvertieren',

    'progress.processing': 'Verarbeite {current} / {total}',
    'progress.finalizing': 'Abschließen...',
    'progress.completed': 'Alle Bilder bereinigt',

    'result.label': 'Ihr bereinigtes Bild ist bereit',
    'result.pages': 'bereinigt',
    'result.sizeBefore': 'Vorher: {size}',
    'result.sizeAfter': 'Nachher: {size}',
    'result.savings': 'Eingespart: {percent}% ({bytes})',

    'error.noFile': 'Bitte zuerst ein Bild hochladen',
    'error.invalidFormat': 'Nicht unterstütztes Format',
    'error.failedLoad': 'Bild konnte nicht geladen werden',
    'error.failedClean': 'Bereinigung fehlgeschlagen: {msg}',

    'footer.privacy': 'Ihre Fotos verlassen nie Ihren Browser',
    'footer.openSource': 'Open Source',
    'footer.github': 'Auf GitHub ansehen',
  },

  es: {
    'app.title': 'EXIF Stripper',
    'app.tagline': 'Eliminar metadatos EXIF — 100% en el navegador',
    'privacy.badge': 'Solo cliente',
    'privacy.tooltip': 'Ningún dato sale de tu dispositivo',

    'dropzone.title': 'Arrastra fotos aquí',
    'dropzone.subtitle': 'o haz clic para buscar',
    'dropzone.accept': 'Soporta JPEG, PNG, WebP',

    'workspace.fileName': '{name}',
    'workspace.fileInfo': '{size} • {dimensions}',
    'workspace.originalMetadata': 'Metadatos originales',
    'workspace.cleanedImage': 'Imagen limpiada',

    'metadata.camera': 'Cámara',
    'metadata.dateTaken': 'Fecha',
    'metadata.location': 'Ubicación',
    'metadata.exposure': 'Exposición',
    'metadata.iso': 'ISO',
    'metadata.lens': 'Lente',
    'metadata.unknown': 'Desconocido',
    'metadata.none': 'Sin metadatos',

    'btn.strip': 'Eliminar EXIF',
    'btn.saving': 'Limpiando...',
    'btn.download': 'Descargar imagen',
    'btn.downloadStarted': 'Descarga iniciada',
    'btn.reset': 'Reiniciar',
    'btn.addMore': 'Agregar más',

    'output.format': 'Formato de salida',
    'output.quality': 'Calidad',
    'output.keepFormat': 'Mantener original',
    'output.convertTo': 'Converter a JPEG',
    'output.convertToWebP': 'Converter a WebP',

    'progress.processing': 'Procesando {current} / {total}',
    'progress.finalizing': 'Finalizando...',
    'progress.completed': 'Todas las imágenes limpiadas',

    'result.label': 'Tu imagen limpia está lista',
    'result.pages': 'limpiado',
    'result.sizeBefore': 'Antes: {size}',
    'result.sizeAfter': 'Después: {size}',
    'result.savings': 'Ahorro: {percent}% ({bytes})',

    'error.noFile': 'Por favor sube una foto primero',
    'error.invalidFormat': 'Formato no soportado',
    'error.failedLoad': 'Error al cargar la imagen',
    'error.failedClean': 'Error al limpiar: {msg}',

    'footer.privacy': 'Tus fotos nunca salen de tu navegador',
    'footer.openSource': 'Código abierto',
    'footer.github': 'Ver en GitHub',
  },

  pt: {
    'app.title': 'EXIF Stripper',
    'app.tagline': 'Remover metadados EXIF — 100% no navegador',
    'privacy.badge': 'Apenas cliente',
    'privacy.tooltip': 'Nenhum dado sai do seu dispositivo',

    'dropzone.title': 'Solte fotos aqui',
    'dropzone.subtitle': 'ou clique para navegar',
    'dropzone.accept': 'JPEG, PNG, WebP suportados',

    'workspace.fileName': '{name}',
    'workspace.fileInfo': '{size} • {dimensions}',
    'workspace.originalMetadata': 'Metadados originais',
    'workspace.cleanedImage': 'Imagem limpa',

    'metadata.camera': 'Câmera',
    'metadata.dateTaken': 'Data',
    'metadata.location': 'Localização',
    'metadata.exposure': 'Exposição',
    'metadata.iso': 'ISO',
    'metadata.lens': 'Lente',
    'metadata.unknown': 'Desconhecido',
    'metadata.none': 'Sem metadados',

    'btn.strip': 'Remover EXIF',
    'btn.saving': 'Limpar...',
    'btn.download': 'Baixar imagem',
    'btn.downloadStarted': 'Download iniciado',
    'btn.reset': 'Redefinir',
    'btn.addMore': 'Adicionar mais',

    'output.format': 'Formato de saída',
    'output.quality': 'Qualidade',
    'output.keepFormat': 'Manter original',
    'output.convertTo': 'Converter para JPEG',
    'output.convertToWebP': 'Converter para WebP',

    'progress.processing': 'Processando {current} / {total}',
    'progress.finalizing': 'Finalizando...',
    'progress.completed': 'Todas imagens limpas',

    'result.label': 'Sua imagem limpa está pronta',
    'result.pages': 'limpo',
    'result.sizeBefore': 'Antes: {size}',
    'result.sizeAfter': 'Depois: {size}',
    'result.savings': 'Economia: {percent}% ({bytes})',

    'error.noFile': 'Por favor faça upload de uma foto primeiro',
    'error.invalidFormat': 'Formato não suportado',
    'error.failedLoad': 'Erro ao carregar imagem',
    'error.failedClean': 'Erro ao limpar: {msg}',

    'footer.privacy': 'Suas fotos nunca saem do navegador',
    'footer.openSource': 'Código aberto',
    'footer.github': 'Ver no GitHub',
  },

  nl: {
    'app.title': 'EXIF Stripper',
    'app.tagline': 'EXIF metadata verwijderen — 100% in je browser',
    'privacy.badge': 'Alleen cliëntkant',
    'privacy.tooltip': 'Geen gegevens verlaten je apparaat',

    'dropzone.title': "Sleep foto's hierheen",
    'dropzone.subtitle': 'of klik om te bladeren',
    'dropzone.accept': 'JPEG, PNG, WebP ondersteund',

    'workspace.fileName': '{name}',
    'workspace.fileInfo': '{size} • {dimensions}',
    'workspace.originalMetadata': 'Originele metadata',
    'workspace.cleanedImage': 'Gereinigde afbeelding',

    'metadata.camera': 'Camera',
    'metadata.dateTaken': 'Datum',
    'metadata.location': 'Locatie',
    'metadata.exposure': 'Blootstelling',
    'metadata.iso': 'ISO',
    'metadata.lens': 'Lens',
    'metadata.unknown': 'Onbekend',
    'metadata.none': 'Geen metadata gevonden',

    'btn.strip': 'EXIF Verwijderen',
    'btn.saving': 'Reinigen...',
    'btn.download': 'Afbeelding downloaden',
    'btn.downloadStarted': 'Download gestart',
    'btn.reset': 'Herstellen',
    'btn.addMore': 'Meer toevoegen',

    'output.format': 'Output formaat',
    'output.quality': 'Kwaliteit',
    'output.keepFormat': 'Origineel behouden',
    'output.convertTo': 'Converteer naar JPEG',
    'output.convertToWebP': 'Converteer naar WebP',

    'progress.processing': 'Verwerken {current} / {total}',
    'progress.finalizing': 'Afronden...',
    'progress.completed': 'Alle afbeeldingen gereinigd',

    'result.label': 'Je gereinigde afbeelding is klaar',
    'result.pages': 'gereinigd',
    'result.sizeBefore': 'Voorheen: {size}',
    'result.sizeAfter': 'Daarna: {size}',
    'result.savings': 'Besparing: {percent}% ({bytes})',

    'error.noFile': 'Upload eerst een foto',
    'error.invalidFormat': 'Niet ondersteund bestandstype',
    'error.failedLoad': 'Kan afbeelding niet laden',
    'error.failedClean': 'Reiniging mislukt: {msg}',

    'footer.privacy': "Jouw foto's verlaten nooit je browser",
    'footer.openSource': 'Open bron',
    'footer.github': 'Bekijk op GitHub',
  },

  it: {
    'app.title': 'EXIF Stripper',
    'app.tagline': 'Rimuovi metadati EXIF — 100% nel browser',
    'privacy.badge': 'Solo lato client',
    'privacy.tooltip': 'Nessun dato lascia il tuo dispositivo',

    'dropzone.title': 'Trascina le foto qui',
    'dropzone.subtitle': 'o clicca per sfogliare',
    'dropzone.accept': 'JPEG, PNG, WebP supportati',

    'workspace.fileName': '{name}',
    'workspace.fileInfo': '{size} • {dimensions}',
    'workspace.originalMetadata': 'Metadati originali',
    'workspace.cleanedImage': 'Immagine ripulita',

    'metadata.camera': 'Fotocamera',
    'metadata.dateTaken': 'Data',
    'metadata.location': 'Posizione',
    'metadata.exposure': 'Esposizione',
    'metadata.iso': 'ISO',
    'metadata.lens': 'Obiettivo',
    'metadata.unknown': 'Sconosciuto',
    'metadata.none': 'Nessun metadato trovato',

    'btn.strip': 'Rimuovi EXIF',
    'btn.saving': 'Pulizia...',
    'btn.download': 'Scarica immagine',
    'btn.downloadStarted': 'Download avviato',
    'btn.reset': 'Ripristina',
    'btn.addMore': 'Aggiungi più',

    'output.format': 'Formato output',
    'output.quality': 'Qualità',
    'output.keepFormat': 'Mantenere originale',
    'output.convertTo': 'Converti in JPEG',
    'output.convertToWebP': 'Converti in WebP',

    'progress.processing': 'Elaborazione {current} / {total}',
    'progress.finalizing': 'Finalizzazione...',
    'progress.completed': 'Tutte le immagini pulite',

    'result.label': 'La tua immagine ripulita è pronta',
    'result.pages': 'ripulito',
    'result.sizeBefore': 'Prima: {size}',
    'result.sizeAfter': 'Dopo: {size}',
    'result.savings': 'Risparmio: {percent}% ({bytes})',

    'error.noFile': 'Carica prima una foto',
    'error.invalidFormat': 'Formato file non supportato',
    'error.failedLoad': 'Caricamento immagine fallito',
    'error.failedClean': 'Pulizia fallita: {msg}',

    'footer.privacy': 'Le tue foto non lasciano mai il browser',
    'footer.openSource': 'Open Source',
    'footer.github': 'Visualizza su GitHub',
  },
};

// === Initialize Language ===
let currentLang = detectLanguage();

function detectLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGES[stored]) {
      return stored;
    }
  } catch (_e) {
    // localStorage not available
  }
  const browserLang = navigator.language.slice(0, 2);
  if (LANGUAGES[browserLang]) {
    return browserLang;
  }
  return 'en';
}

export function getCurrentLang() {
  return currentLang;
}

export function setCurrentLang(langCode) {
  if (LANGUAGES[langCode]) {
    currentLang = langCode;
    localStorage.setItem(STORAGE_KEY, langCode);
    document.documentElement.lang = langCode;
    return true;
  }
  return false;
}

export function t(key, params = {}) {
  const translation = TRANSLATIONS[currentLang]?.[key];
  if (!translation) {
    console.warn(`Missing translation for key: ${key} (lang: ${currentLang})`);
    return key;
  }
  return translation.replace(/\{(\w+)\}/g, (_, param) => params[param] ?? `{${param}}`);
}

export async function initI18n() {
  // Set document language
  document.documentElement.lang = currentLang;

  // Translate elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  for (const el of elements) {
    const key = el.getAttribute('data-i18n');
    if (key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t(key);
      } else {
        el.textContent = t(key);
      }
    }
  }

  // Translate aria-label attributes
  const ariaElements = document.querySelectorAll('[data-i18n-attr]');
  for (const el of ariaElements) {
    const attrMapping = el.getAttribute('data-i18n-attr'); // "aria-label:key"
    const [attrName, translateKey] = attrMapping.split(':');
    if (attrName && translateKey) {
      el.setAttribute(attrName, t(translateKey));
    }
  }

  // Translate title attributes
  const titleElements = document.querySelectorAll('[data-i18n-title]');
  for (const el of titleElements) {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.title = t(key);
    }
  }

  // Setup language selector if present
  const langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    setupLangSelector(langSelector);
  }
}

function setupLangSelector(container) {
  // Create dropdown
  const select = document.createElement('select');
  select.className = 'lang-selector';
  select.setAttribute('aria-label', 'Select language');

  for (const [code, lang] of Object.entries(LANGUAGES)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = lang.name;
    option.selected = code === currentLang;
    select.appendChild(option);
  }

  select.addEventListener('change', () => {
    if (setCurrentLang(select.value)) {
      // Reload page to re-translate everything
      window.location.reload();
    }
  });

  container.appendChild(select);
}
