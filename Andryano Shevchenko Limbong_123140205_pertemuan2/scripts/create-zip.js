/**
 * Script untuk membuat file ZIP dari project
 * Menggunakan Node.js dan package archiver
 *
 * Cara menggunakan:
 * 1. Install dependencies: npm install archiver
 * 2. Jalankan script: node zip.js
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Arrow function untuk membuat ZIP
const createZip = () => {
    const outputPath = path.join(__dirname, '..', 'personal-dashboard.zip');
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Kompresi maksimal
    });

    // Event listeners
    output.on('close', () => {
        console.log('✅ ZIP berhasil dibuat!');
        console.log(`📦 Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
        console.log(`📁 Location: ${outputPath}`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
            console.warn('⚠️ Warning:', err);
        } else {
            throw err;
        }
    });

    // Pipe archive data ke file
    archive.pipe(output);

    // Tambahkan file dan folder ke ZIP
    console.log('📝 Menambahkan file ke ZIP...');

    // File utama
    archive.file(path.join(__dirname, '..', 'index.html'), { name: 'index.html' });
    archive.file(path.join(__dirname, '..', 'package.json'), { name: 'package.json' });

    // Folder assets (jika ada)
    archive.directory(path.join(__dirname, '..', 'assets'), 'assets');
    archive.directory(path.join(__dirname, '..', 'src'), 'src');

    // Selesai menambahkan file
    archive.finalize();
};

// Jalankan fungsi
createZip();
