# EXIF Stripper

> Remove EXIF metadata from your photos — 100% client-side, privacy-first

<div align="center">

![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red)
![Platform](https://img.shields.io/badge/Platform-Web-green)
![Tests](https://img.shields.io/badge/Tests-Playwright%20%7C%20Vitest-blue)

**Your photos never leave your browser — no uploads, no servers, no tracking**

</div>

---

## 🔒 Privacy-First Design

When you share photos online, they often carry hidden metadata: **GPS location**, camera model, timestamp, software used, and more. This information can reveal where you live, when the photo was taken, and what device you use.

EXIF Stripper removes all of this metadata by **re-encoding your images through the HTML Canvas API** — entirely in your browser. Your files never leave your device.

---

## ⚡ Key Features

- **🔒 100% Local Processing** — All operations happen in your browser via canvas re-encoding
- **🖼️ Multiple Formats** — Support for JPEG, PNG, and WebP
- **📤 Batch Processing** — Strip multiple images at once
- **🎨 Output Format Choice** — Convert to JPEG, PNG, or WebP
- **⚙️ Quality Control** — Adjust output quality for JPEG/WebP
- **📥 Individual & Bulk Download** — Download cleaned images one by one or all at once
- **♿ Accessible** — Full keyboard navigation and screen reader support (ARIA-compliant)
- **🔒 Privacy-First** — Everything runs in your browser, nothing is uploaded

---

## 🚀 Quick Start

```bash
git clone https://github.com/Hichiro6/exif-stripper.git
cd exif-stripper

npm install
npm run dev
```

---

## 📖 Usage Guide

### Step 1: Upload Your Photos
Drag and drop image files (JPEG, PNG, WebP) onto the dropzone, or click to browse.

### Step 2: Choose Output Settings
- **Output format**: JPEG, PNG, or WebP
- **Quality level**: adjustable slider for lossy formats

### Step 3: Strip & Download
Click **Strip EXIF** to re-encode the images without metadata.
Download cleaned images individually or all at once.

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **[Vite](https://vitejs.dev/)** | Build tool & dev server |
| **Canvas API** | Image re-encoding (strips all metadata) |
| **[Biome](https://biomejs.dev/)** | Linting & formatting |
| **[Vitest](https://vitest.dev/)** | Unit testing |
| **[Playwright](https://playwright.dev/)** | E2E testing |

---

## 🧪 Testing

```bash
npm run test:run       # Unit tests
npm run test:e2e       # E2E suite (upload, processing, download, reset)
npm run test:ui        # Interactive mode
```

---

## 📂 Project Structure

```
exif-stripper/
├── src/
│   ├── main.js           # Application logic
│   └── i18n.js           # Internationalization
├── styles/
│   └── main.css          # Global styles
├── public/
│   ├── manifest.json     # PWA manifest
│   └── favicon.svg
├── tests/
│   ├── unit/             # Unit tests
│   └── e2e/              # Playwright E2E tests + fixtures
├── vite.config.js        # Vite configuration
├── playwright.config.js  # Playwright configuration
└── biome.json            # Biome linting rules
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |
| `npm run test:run` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

---

## 📝 Use Cases

- **Social media** — Share photos without leaking your GPS location
- **Email attachments** — Send images without camera/device metadata
- **Online marketplaces** — Upload product photos without exposing timestamps
- **Journalism** — Protect sources by stripping identifying metadata
- **Privacy compliance** — Ensure GDPR-compliant image sharing

---

## 🔐 Security & Privacy

- ✅ **No network calls** — All processing is local
- ✅ **No analytics** — No tracking or telemetry
- ✅ **No cookies** — Nothing stored externally
- ✅ **Open source** — Code is auditable
- ✅ **Client-side only** — No backend requirements

---

## 📄 License

Copyright © 2026 Hichiro6

Licensed under **CC BY-NC-ND 4.0** — Non-commercial use with attribution, no derivative works.

See [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ for privacy-conscious users**

[Report Bug](https://github.com/Hichiro6/exif-stripper/issues) · [Request Feature](https://github.com/Hichiro6/exif-stripper/issues)

</div>
