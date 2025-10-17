👇

📝 Aplikasi Manajemen Tugas Mahasiswa

Aplikasi ini dibuat untuk membantu mahasiswa dalam mengelola aktivitas akademik seperti tugas, proyek, dan deadline.
Pengguna dapat menambahkan, mengedit, menandai selesai, mencari, serta menghapus tugas secara interaktif.
Seluruh data disimpan secara lokal menggunakan localStorage, sehingga tetap tersimpan meskipun halaman direfresh.

🚀 Fitur Utama

Tambah Tugas Baru
Pengguna dapat menambahkan tugas dengan informasi:

Nama Tugas

Mata Kuliah

Deadline

Edit Tugas
Pengguna dapat memperbarui data tugas (baik yang sudah maupun belum selesai).

Tandai Tugas Selesai/Belum Selesai
Tugas dapat ditandai sebagai “selesai” atau “belum selesai” untuk memudahkan manajemen.

Hapus Tugas
Menghapus tugas yang sudah tidak diperlukan.

Filter & Pencarian Tugas

Filter berdasarkan status (semua, selesai, belum selesai).

Pencarian berdasarkan nama mata kuliah atau nama tugas.

Statistik Jumlah Tugas Belum Selesai
Menampilkan total tugas yang masih aktif.

Validasi Form Input

Nama tugas tidak boleh kosong.

Mata kuliah tidak boleh kosong.

Deadline harus berupa tanggal yang valid.

Desain Responsif & Interaktif
Menggunakan CSS modern dengan tampilan minimalis dan user-friendly.

💾 Penggunaan localStorage

Aplikasi ini menggunakan localStorage untuk menyimpan seluruh data tugas agar tetap tersimpan di browser pengguna.
Berikut mekanisme penyimpanan datanya:

Menyimpan Data:

localStorage.setItem('tasks', JSON.stringify(tasks));


Mengambil Data:

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


Pemanggilan Awal:
Saat halaman pertama kali dimuat, data dari localStorage akan otomatis diambil dan ditampilkan ke tabel tugas.

Pembaruan Otomatis:
Setiap kali pengguna menambah, mengedit, menghapus, atau mengubah status tugas, localStorage akan diperbarui secara otomatis.

✅ Validasi Form

Sebelum data disimpan, sistem akan memeriksa:

Input “Nama Tugas” tidak boleh kosong.

Input “Mata Kuliah” tidak boleh kosong.

Input “Deadline” harus berupa tanggal yang valid.

Jika salah satu kondisi tidak terpenuhi, pengguna akan mendapatkan pesan error dan data tidak akan disimpan.

🧩 Cara Menjalankan Aplikasi

Download / Clone Repository

git clone https://github.com/username/nama-repo.git


Masuk ke Folder Proyek

cd nama-repo


Buka File HTML di Browser
Cukup buka file index.html di browser favorit kamu (Chrome, Edge, Firefox, dll).
Tidak perlu server tambahan karena aplikasi berjalan sepenuhnya di sisi klien.

📸 Screenshot Aplikasi
Tampilan	Deskripsi

	Tampilan utama aplikasi dengan daftar tugas

	Form tambah tugas baru

	Form edit tugas dan filter pencarian

(Gantilah nama file screenshot sesuai hasil tangkapan layar aplikasimu.)

🧱 Daftar Fitur yang Telah Diimplementasikan
Fitur	Status
CRUD (Create, Read, Update, Delete)	✅
Penyimpanan Data menggunakan localStorage	✅
Validasi Form Input	✅
Fitur Filter dan Pencarian	✅
Statistik Jumlah Tugas Aktif	✅
Desain UI/UX Menarik	✅
Dokumentasi Lengkap	✅
🧠 Teknologi yang Digunakan

HTML5 — Struktur halaman aplikasi

CSS3 — Styling dan tata letak responsif

JavaScript (ES6) — Logika utama aplikasi dan pengelolaan localStorage

📄 Lisensi

Aplikasi ini dibuat untuk keperluan Tugas Praktikum Pemrograman Web / Front-End Development.
Seluruh kode dapat digunakan untuk pembelajaran dan pengembangan pribadi.
