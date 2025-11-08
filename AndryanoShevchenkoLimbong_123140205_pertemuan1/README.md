📝 Aplikasi Manajemen Tugas Mahasiswa

Aplikasi ini dibuat untuk membantu mahasiswa dalam mengelola aktivitas akademik seperti tugas, proyek, dan deadline.
Pengguna dapat menambahkan, mengedit, menandai selesai, mencari, serta menghapus tugas secara interaktif.
Seluruh data disimpan secara lokal menggunakan localStorage, sehingga tetap tersimpan meskipun halaman direfresh.

🚀 Fitur Utama

1. Tambah Tugas Baru
   Pengguna dapat menambahkan tugas dengan informasi:

- Nama Tugas
- Mata Kuliah
- Deadline

2. Edit Tugas
   Pengguna dapat memperbarui data tugas (baik yang sudah maupun belum selesai).

4. Tandai Tugas Selesai/Belum Selesai
   Tugas dapat ditandai sebagai “selesai” atau “belum selesai” untuk memudahkan manajemen.

5. Hapus Tugas
   Menghapus tugas yang sudah tidak diperlukan.

6. Filter & Pencarian Tugas
   Filter berdasarkan status (semua, selesai, belum selesai).

7. Pencarian berdasarkan nama mata kuliah atau nama tugas.
- Statistik Jumlah Tugas Belum Selesai
- Menampilkan total tugas yang masih aktif.

8. Validasi Form Input
- Nama tugas tidak boleh kosong.
- Mata kuliah tidak boleh kosong.
- Deadline harus berupa tanggal yang valid.

Desain Responsif & Interaktif
Menggunakan CSS modern dengan tampilan minimalis dan user-friendly.

💾 Penggunaan localStorage

Aplikasi ini menggunakan localStorage untuk menyimpan seluruh data tugas agar tetap tersimpan di browser pengguna.
Berikut mekanisme penyimpanan datanya:

1. Menyimpan Data:
localStorage.setItem('tasks', JSON.stringify(tasks));

2. Mengambil Data:
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

3. Pemanggilan Awal:
Saat halaman pertama kali dimuat, data dari localStorage akan otomatis diambil dan ditampilkan ke tabel tugas.

4. Pembaruan Otomatis:
Setiap kali pengguna menambah, mengedit, menghapus, atau mengubah status tugas, localStorage akan diperbarui secara otomatis.

✅ Validasi Form

Sebelum data disimpan, sistem akan memeriksa:
- Input “Nama Tugas” tidak boleh kosong.
- Input “Mata Kuliah” tidak boleh kosong.
- Input “Deadline” harus berupa tanggal yang valid.

Jika salah satu kondisi tidak terpenuhi, pengguna akan mendapatkan pesan error dan data tidak akan disimpan.

🧩 Cara Menjalankan Aplikasi

Download / Clone Repository

git clone https://github.com/cengkooo/pemrograman_web_itera_123140205.git


Masuk ke Folder Proyek

cd pemrograman_web_itera_123140205


Buka File HTML di Browser
Cukup buka file index.html di browser favorit kamu (Chrome, Edge, Firefox, dll).
Tidak perlu server tambahan karena aplikasi berjalan sepenuhnya di sisi klien.

📸 Screenshot Aplikasi
1. Tampilan Home
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/63be3b45-d0c6-4484-8ea6-bd2cc4fa7814" />


2. Tampilan Tambah Tugas
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bf473d32-60c3-4d5e-bf81-3f6eb45a5821" />

3. Tampilan Edit Tugas
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c03c2f21-0ef0-40a3-9e9b-debaf478955d" />





🧠 Teknologi yang Digunakan

HTML5 — Struktur halaman aplikasi

CSS3 — Styling dan tata letak responsif

JavaScript (ES6) — Logika utama aplikasi dan pengelolaan localStorage

📄 Lisensi

Aplikasi ini dibuat untuk keperluan Tugas Praktikum Pemrograman Web / Front-End Development.
Seluruh kode dapat digunakan untuk pembelajaran dan pengembangan pribadi.
