/**
 * main.js — EXIF Stripper
 * Remove EXIF metadata from images by re-encoding via canvas
 */

import { initI18n, t } from './i18n.js';

// State
let uploadedFiles = [];

// Elements
const dropzoneSection = document.getElementById('dropzone-section');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const addMoreBtn = document.getElementById('btn-add-more');
const workspace = document.getElementById('workspace');
const fileCountEl = document.getElementById('file-count');
const resetBtn = document.getElementById('btn-reset');
const imagesGrid = document.getElementById('images-grid');
const outputFormatSelect = document.getElementById('output-format-select');
const qualitySelect = document.getElementById('quality-select');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');
const progressText = document.getElementById('progress-text');
const resultInfo = document.getElementById('result-info');
const resultDetails = document.getElementById('result-details');
const stripBtn = document.getElementById('btn-strip');
const downloadBtn = document.getElementById('btn-download');
const downloadAllBtn = document.getElementById('btn-download-all');
const srLive = document.getElementById('sr-live');

// === Initialization ===
async function init() {
  await initI18n();
  setupEventListeners();
}

function setupEventListeners() {
  // Dropzone
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });
  fileInput.addEventListener('change', handleFileSelect);

  // Add more
  addMoreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Reset
  resetBtn.addEventListener('click', resetAll);

  // Strip
  stripBtn.addEventListener('click', stripExifBatch);

  // Download
  downloadBtn.addEventListener('click', downloadCleanedImage);
  downloadAllBtn.addEventListener('click', downloadAllImages);
}

// === Drag & Drop ===
function handleDragOver(e) {
  e.preventDefault();
  dropzone.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  dropzone.classList.remove('dragover');
}

async function handleDrop(e) {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
  await handleFiles(files);
}

async function handleFileSelect(e) {
  const files = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'));
  await handleFiles(files);
  fileInput.value = '';
}

async function handleFiles(files) {
  if (files.length === 0) return;

  for (const file of files) {
    try {
      const imageData = await loadImage(file);
      uploadedFiles.push(imageData);
    } catch (err) {
      console.error('Failed to load image:', file.name, err);
      announce(`Failed to load ${file.name}`);
    }
  }

  if (uploadedFiles.length > 0) {
    workspace.hidden = false;
    dropzoneSection.hidden = true;
    fileCountEl.textContent = `${uploadedFiles.length} ${t('result.pages')}`.replace(
      '{count}',
      uploadedFiles.length,
    );
    renderImages();
    announce(`${uploadedFiles.length} images loaded`);
  }
}

// === Load Image ===
async function loadImage(file) {
  // Use createImageBitmap with from-image to respect EXIF orientation
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    // Fallback for browsers without createImageBitmap or imageOrientation support
    bitmap = await loadFallbackBitmap(file);
  }

  const objectUrl = URL.createObjectURL(file);
  const dimensions = `${bitmap.width}x${bitmap.height}`;

  return {
    id: crypto.randomUUID(),
    file,
    src: objectUrl,
    width: bitmap.width,
    height: bitmap.height,
    dimensions,
    size: formatBytes(file.size),
    rawSize: file.size,
    originalType: file.type,
    _bitmap: bitmap,
  };
}

function loadFallbackBitmap(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            createImageBitmap(blob).then(resolve).catch(reject);
          } else {
            resolve({ width: img.width, height: img.height, _img: img, _src: e.target.result });
          }
        });
      };
      img.onerror = () => reject(new Error(t('error.failedLoad')));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error(t('error.failedLoad')));
    reader.readAsDataURL(file);
  });
}

// === Rendering ===
function renderImages() {
  imagesGrid.innerHTML = '';

  uploadedFiles.forEach((imageData, idx) => {
    const card = createImageCard(imageData, idx);
    imagesGrid.appendChild(card);
  });

  toggleButtons();
}

function createImageCard(imageData, index) {
  const card = document.createElement('div');
  card.className = 'page-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `Image ${index + 1}`);

  // Thumbnail wrapper
  const thumbWrapper = document.createElement('div');
  thumbWrapper.className = 'page-card__thumb';

  const img = document.createElement('img');
  img.src = imageData.src;
  img.className = 'page-card__img';
  img.alt = `Photo ${index + 1}`;
  thumbWrapper.appendChild(img);

  // File info
  const infoDiv = document.createElement('div');
  infoDiv.className = 'page-card__info';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'page-card__name';
  nameSpan.textContent = imageData.file.name;

  const dimsSpan = document.createElement('span');
  dimsSpan.className = 'page-card__dims';
  dimsSpan.textContent = `${imageData.dimensions} • ${imageData.size}`;

  infoDiv.appendChild(nameSpan);
  infoDiv.appendChild(dimsSpan);
  thumbWrapper.appendChild(infoDiv);

  card.appendChild(thumbWrapper);

  return card;
}

function toggleButtons() {
  if (uploadedFiles.length > 1) {
    stripBtn.hidden = false;
    stripBtn.textContent = t('btn.strip');
    downloadBtn.hidden = true;
    downloadAllBtn.hidden = true;
  } else {
    // Single image: show strip button, hide download until cleaned
    stripBtn.hidden = false;
    stripBtn.textContent = t('btn.strip');
    downloadBtn.hidden = true;
    downloadAllBtn.hidden = true;
  }
}

// === EXIF Stripping via Canvas ===
async function stripExifBatch() {
  if (uploadedFiles.length === 0) {
    alert(t('error.noFile'));
    return;
  }

  const format = outputFormatSelect.value;
  const qualityMap = { high: 0.95, medium: 0.85, low: 0.7 };
  const quality = qualityMap[qualitySelect.value];

  stripBtn.disabled = true;
  stripBtn.textContent = t('btn.saving');
  progressContainer.hidden = false;
  progressFill.style.width = '0%';
  progressPercent.textContent = '0%';
  resultInfo.hidden = true;
  downloadBtn.hidden = true;

  try {
    const cleanedImages = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const imageData = uploadedFiles[i];

      progressText.textContent = t('progress.processing', {
        current: i + 1,
        total: uploadedFiles.length,
      });
      const percent = Math.round(((i + 1) / uploadedFiles.length) * 100);
      progressFill.style.width = `${percent}%`;
      progressPercent.textContent = `${percent}%`;

      const cleaned = await cleanImage(imageData, format, quality);
      cleanedImages.push(cleaned);

      // Show before/after size comparison
      const savings = calculateSavings(imageData.file.size, cleaned.blob.size);
      imageData.cleaned = cleaned;
      imageData.savings = savings;
    }

    // Finalize
    progressFill.style.width = '100%';
    progressPercent.textContent = '100%';
    resultInfo.hidden = false;

    if (uploadedFiles.length === 1) {
      const imageData = uploadedFiles[0];
      resultDetails.textContent = `${t('result.savings', imageData.savings)}`;
    } else {
      const totalSaved = uploadedFiles.reduce((sum, img) => sum + img.savings.bytes, 0);
      resultDetails.textContent = `${uploadedFiles.length} ${t('result.pages')} • Saved: ${formatBytes(totalSaved)}`;
    }

    // Show appropriate download button after processing
    stripBtn.hidden = true;
    if (uploadedFiles.length === 1) {
      downloadBtn.hidden = false;
      downloadAllBtn.hidden = true;
    } else {
      downloadBtn.hidden = true;
      downloadAllBtn.hidden = false;
    }
    announce(t('progress.completed'));
  } catch (err) {
    console.error('Exif stripping failed:', err);
    progressText.textContent = t('error.failedClean', { msg: err.message });
    resultInfo.querySelector('.result-label').textContent = t('error.failedClean', {
      msg: err.message,
    });
    resultInfo.style.background = 'rgba(232, 69, 69, 0.1)';
    resultInfo.style.borderColor = 'var(--danger)';
    resultInfo.hidden = false;
  } finally {
    stripBtn.disabled = false;
    stripBtn.textContent = t('btn.strip');
  }
}

function cleanImage(imageData, format, quality) {
  return new Promise((resolve, reject) => {
    // Use the orientation-corrected bitmap directly if available
    const bitmap = imageData._bitmap;
    
    if (bitmap && bitmap.close) {
      // ImageBitmap path (preferred — EXIF orientation already applied)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const MAX_MEGAPIXELS = 16.7;
      const megapixels = (bitmap.width * bitmap.height) / 1e6;
      let scale = 1;
      if (megapixels > MAX_MEGAPIXELS) {
        scale = Math.sqrt(MAX_MEGAPIXELS / megapixels);
      }
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);

      if (format === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      encodeCanvas(canvas, format, quality, imageData, resolve, reject);
    } else {
      // Fallback: Image path for older browsers
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const MAX_MEGAPIXELS = 16.7;
        const megapixels = (img.width * img.height) / 1e6;
        let scale = 1;
        if (megapixels > MAX_MEGAPIXELS) {
          scale = Math.sqrt(MAX_MEGAPIXELS / megapixels);
        }
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        if (format === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        encodeCanvas(canvas, format, quality, imageData, resolve, reject);
      };
      img.onerror = () => reject(new Error(t('error.failedLoad')));
      img.src = imageData.src;
    }
  });
}

function encodeCanvas(canvas, format, quality, imageData, resolve, reject) {
  const ctx = canvas.getContext('2d');
  
  // Determine output MIME type
  const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  let mimeType = imageData.originalType;
  if (format === 'jpeg') {
    mimeType = 'image/jpeg';
  } else if (format === 'webp') {
    mimeType = 'image/webp';
  } else if (!supportedTypes.includes(mimeType)) {
    mimeType = 'image/jpeg';
  }

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        reject(new Error(t('error.failedClean', { msg: 'Canvas toBlob returned null' })));
        return;
      }
      resolve({ blob });
    },
    mimeType,
    quality,
  );
}

function calculateSavings(beforeBytes, afterBytes) {
  const saved = beforeBytes - afterBytes;
  const percent = beforeBytes > 0 ? Math.round((saved / beforeBytes) * 100) : 0;

  return {
    bytes: saved,
    percent,
  };
}

// === Downloads ===
function downloadCleanedImage() {
  if (uploadedFiles.length !== 1) return;
  if (!uploadedFiles[0].cleaned) return;

  const imageData = uploadedFiles[0];
  const url = URL.createObjectURL(imageData.cleaned.blob);
  const filename = generateFilename(imageData.file.name, 'clean', imageData.cleaned.blob.type);
  downloadFile(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  announce(t('btn.downloadStarted'));
}

async function downloadAllImages() {
  for (const imageData of uploadedFiles) {
    if (imageData.cleaned) {
      const url = URL.createObjectURL(imageData.cleaned.blob);
      const filename = generateFilename(imageData.file.name, 'clean', imageData.cleaned.blob.type);
      downloadFile(url, filename);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      await delay(500);
    }
  }
  announce(t('btn.downloadStarted'));
}

function downloadFile(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function generateFilename(originalName, suffix, outputMimeType) {
  const baseName = originalName.replace(/\.[^./\\]+$/, '');
  let ext = 'jpg';
  if (outputMimeType) {
    const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
    ext = extMap[outputMimeType] || 'jpg';
  } else {
    const extMatch = originalName.match(/\.([^.]+)$/);
    if (extMatch) {
      ext = extMatch[1].toLowerCase();
    }
  }
  return `${baseName}-${suffix}.${ext}`;
}

// === Utilities ===
function formatBytes(bytes) {
  if (typeof bytes === 'object') {
    bytes = bytes.size;
  }
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

function announce(message) {
  srLive.textContent = message;
}

function resetAll() {
  uploadedFiles = [];
  imagesGrid.innerHTML = '';
  workspace.hidden = true;
  dropzoneSection.hidden = false;
  progressContainer.hidden = true;
  resultInfo.hidden = true;
  downloadBtn.hidden = true;
  downloadAllBtn.hidden = true;
  stripBtn.hidden = false;
  fileCountEl.textContent = '';
  outputFormatSelect.value = 'keep';
  qualitySelect.value = 'medium';
  fileInput.value = '';
  announce('Reset complete');
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start
init();
