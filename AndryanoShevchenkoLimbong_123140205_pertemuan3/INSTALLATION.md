# 🚀 Panduan Instalasi Personal Book Tracker

## Prasyarat Sistem

Sebelum memulai, pastikan Anda memiliki:

- **Node.js** versi 14.0.0 atau lebih baru
- **npm** versi 6.0.0 atau lebih baru (biasanya sudah include dengan Node.js)
- **Git** (opsional, untuk clone repository)
- Text editor (VS Code, Sublime, dll)
- Browser modern (Chrome, Firefox, Edge, Safari)

## Cek Versi

Buka terminal/command prompt dan jalankan:

```bash
node --version
# Output: v14.x.x atau lebih baru

npm --version
# Output: 6.x.x atau lebih baru
```

## Langkah-langkah Instalasi

### Step 1: Download/Clone Project

#### Opsi A: Download ZIP
1. Download project sebagai ZIP
2. Extract ke folder yang diinginkan
3. Buka terminal di folder tersebut

#### Opsi B: Clone dengan Git
```bash
git clone <repository-url>
cd personal-book-tracker
```

### Step 2: Install Dependencies

```bash
npm install
```

Tunggu hingga proses instalasi selesai. Ini akan menginstall semua package yang diperlukan:
- react
- react-dom
- react-router-dom
- react-scripts
- @testing-library/react
- dan lainnya

**Catatan**: Proses ini membutuhkan koneksi internet dan bisa memakan waktu 2-5 menit tergantung kecepatan internet.

### Step 3: Verifikasi Instalasi

Setelah instalasi selesai, cek folder `node_modules` sudah terbuat:

```bash
ls -la
# atau di Windows:
dir
```

Anda harus melihat folder `node_modules` dan file `package-lock.json`

### Step 4: Jalankan Development Server

```bash
npm start
```

**Yang terjadi:**
- Development server akan start di `http://localhost:3000`
- Browser akan otomatis terbuka
- Aplikasi akan auto-reload saat ada perubahan code

**Jika browser tidak otomatis terbuka:**
Buka browser manual dan akses: `http://localhost:3000`

### Step 5: Verifikasi Aplikasi Berjalan

Anda harus melihat:
- ✅ Halaman beranda dengan judul "Personal Book Tracker"
- ✅ Navigation bar dengan menu "Beranda" dan "Statistik"
- ✅ Tombol "Tambah Buku"
- ✅ Theme warna Black Coffee (coklat gelap)

## Troubleshooting

### Problem: Port 3000 sudah digunakan

**Error:**
```
Something is already running on port 3000
```

**Solusi:**
```bash
# Gunakan port lain
PORT=3001 npm start

# Atau di Windows:
set PORT=3001 && npm start
```

### Problem: npm install gagal

**Error:**
```
npm ERR! code EACCES
```

**Solusi:**
```bash
# Linux/Mac - gunakan sudo (hati-hati)
sudo npm install

# Windows - run Command Prompt as Administrator
```

### Problem: Module not found

**Error:**
```
Module not found: Can't resolve 'react-router-dom'
```

**Solusi:**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### Problem: Blank page atau error di browser

**Solusi:**
1. Clear browser cache
2. Restart development server (Ctrl+C lalu npm start lagi)
3. Cek console browser untuk error message

## Menjalankan Tests

```bash
# Run semua tests
npm test

# Run tests dengan coverage
npm test -- --coverage

# Run specific test file
npm test BookForm.test.js

# Run tests tanpa watch mode
npm test -- --watchAll=false
```

## Build untuk Production

```bash
npm run build
```

**Hasil:**
- Folder `build/` akan terbuat
- Berisi optimized production files
- Siap untuk di-deploy ke hosting

## Deploy ke Hosting

### Option 1: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Tambahkan di package.json:
```json
"homepage": "https://yourusername.github.io/personal-book-tracker",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

### Option 2: Netlify

1. Build project:
```bash
npm run build
```

2. Drag & drop folder `build/` ke Netlify

### Option 3: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## File dan Folder Struktur

Setelah instalasi, struktur folder Anda:

```
personal-book-tracker/
├── node_modules/          # Dependencies (jangan commit ke Git)
├── public/                # Static files
│   ├── index.html
│   └── manifest.json
├── src/                   # Source code
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json           # Project metadata & scripts
├── package-lock.json      # Lock file untuk dependencies
├── README.md             # Dokumentasi project
└── .gitignore            # Files yang diabaikan Git
```

## Tips Development

### Hot Reloading
Setiap kali Anda save file, aplikasi akan auto-reload. Tidak perlu refresh manual.

### Console Logging
Gunakan browser DevTools (F12) untuk debugging:
```javascript
console.log('Debug:', data);
```

### React DevTools
Install React DevTools extension di browser untuk debugging React components.

### VS Code Extensions (Recommended)
- ESLint
- Prettier
- ES7+ React/Redux snippets
- Auto Rename Tag
- Path Intellisense

## Perintah NPM Lengkap

```bash
# Development
npm start              # Jalankan development server
npm test              # Jalankan tests
npm run build         # Build production

# Maintenance
npm install           # Install dependencies
npm update            # Update dependencies
npm audit             # Check vulnerabilities
npm audit fix         # Fix vulnerabilities

# Cleaning
rm -rf node_modules   # Hapus node_modules
npm cache clean --force  # Clear npm cache
```

## Environment Variables (Opsional)

Buat file `.env` di root folder:

```env
REACT_APP_VERSION=1.0.0
REACT_APP_NAME=Personal Book Tracker
PORT=3000
```

Akses di code:
```javascript
console.log(process.env.REACT_APP_VERSION);
```

## Update Dependencies

Untuk update ke versi terbaru:

```bash
# Update semua minor/patch versions
npm update

# Update ke major versions
npx npm-check-updates -u
npm install
```

## Kesimpulan

Setelah mengikuti panduan ini, Anda harus memiliki:

✅ Project ter-install dengan benar
✅ Development server berjalan
✅ Tests berjalan dengan baik
✅ Siap untuk development

## Support

Jika mengalami masalah:

1. Cek error message di terminal
2. Cek browser console (F12)
3. Coba restart development server
4. Clear cache dan reinstall dependencies
5. Buat issue di repository

---

**Selamat Coding! 🚀**