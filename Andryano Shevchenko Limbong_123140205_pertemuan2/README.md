# 📋 Personal Dashboard - Task Manager

Aplikasi manajemen tugas modern yang dibangun dengan **ES6+ JavaScript** murni tanpa framework eksternal. Aplikasi ini dirancang untuk membantu mengelola tugas sehari-hari dengan efisien menggunakan fitur-fitur JavaScript terkini.

## 👨‍💻 Informasi Pengembang
- **Nama**: Andryano Shevchenko Limbong
- **NIM**: 123140205
- **Mata Kuliah**: Pemrograman Web
- **Repository**: [GitHub - Pemrograman Web ITERA](https://github.com/cengkooo/pemrograman_web_itera_123140205)

## ✨ Fitur-Fitur Utama

### 1. CRUD Operations (Create, Read, Update, Delete)
- ✅ **Tambah Tugas**: Tambahkan tugas baru dengan judul, deskripsi, prioritas, dan deadline
- ✅ **Lihat Tugas**: Tampilkan semua tugas dalam format kartu yang modern dan terorganisir
- ✅ **Edit Tugas**: Ubah detail tugas yang sudah ada dengan form pre-filled
- ✅ **Hapus Tugas**: Hapus tugas dengan konfirmasi keamanan

### 2. Manajemen Prioritas
- 🔴 **Prioritas Tinggi**: Untuk tugas urgent dan penting
- 🟡 **Prioritas Sedang**: Untuk tugas normal
- 🟢 **Prioritas Rendah**: Untuk tugas yang bisa ditunda

### 3. Filter dan Status
- **Filter Semua**: Tampilkan semua tugas
- **Filter Progress**: Tampilkan tugas yang belum selesai
- **Filter Selesai**: Tampilkan tugas yang sudah selesai
- Visual indicator dengan color-coding untuk setiap prioritas

### 4. Statistik Real-Time
- 📊 Total jumlah tugas
- ✅ Jumlah tugas yang selesai
- ⏳ Jumlah tugas dalam progress
- 🔴 Jumlah tugas prioritas tinggi yang belum selesai

### 5. Penyimpanan Data Persisten
- Data disimpan di **localStorage** browser
- Data tetap tersimpan meskipun browser ditutup
- Auto-save setiap kali ada perubahan
- Tidak memerlukan server atau database eksternal

### 6. Real-Time Clock
- Tampilan waktu real-time yang update setiap detik
- Format Indonesia (tanggal, bulan, tahun, jam, menit, detik)
- Menggunakan **Async/Await** untuk update asynchronous

### 7. Desain Responsif & Modern
- ✨ Gradient background yang menarik
- 🎨 Card-based design dengan shadow effects
- 📱 Fully responsive (desktop, tablet, mobile)
- 🎭 Smooth animations dan transitions
- 💫 Hover effects untuk interaktivitas

## 🎯 Implementasi ES6+ Features

### 1. **Classes (ES6+)**
```javascript
class Task {
    constructor(id, title, description, priority, deadline, completed = false) {
        this.id = id;
        this.title = title;
        // ... properties lainnya
    }
    
    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
    }
    // ... methods untuk CRUD operations
}
```

**Keuntungan:**
- Struktur kode yang lebih terorganisir
- Encapsulation data dan methods
- Reusable dan maintainable
- OOP approach yang modern

### 2. **Arrow Functions**
```javascript
// Arrow function untuk callback
loadTasks = () => {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

// Arrow function dalam array methods
tasks.map(task => /* render task */)
tasks.filter(t => t.completed)
```

**Keuntungan:**
- Syntax lebih concise dan readable
- Lexical `this` binding (tidak perlu `.bind(this)`)
- Perfect untuk callbacks dan array methods

### 3. **Template Literals**
```javascript
// Dynamic HTML generation
taskList.innerHTML = tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''} ${task.priority}">
        <div class="task-title">${task.title}</div>
        <div class="task-description">${task.description}</div>
        ${task.deadline ? `<span>📅 ${formattedDate}</span>` : ''}
    </div>
`).join('');
```

**Keuntungan:**
- Multi-line strings tanpa concatenation
- Embedded expressions dengan `${}`
- Lebih readable untuk HTML generation
- Dynamic content insertion

### 4. **Async/Await (ES8)**
```javascript
const updateDateTime = async () => {
    return new Promise((resolve) => {
        const dateTimeString = now.toLocaleDateString('id-ID', options);
        resolve(dateTimeString);
    });
};

const renderTasksWithAnimation = async () => {
    taskList.style.opacity = '0.5';
    await new Promise(resolve => setTimeout(resolve, 100));
    renderTasks();
    taskList.style.opacity = '1';
};
```

**Keuntungan:**
- Handling asynchronous operations lebih clean
- Menghindari callback hell
- Error handling dengan try-catch
- Code lebih readable dan maintainable

### 5. **Destructuring**
```javascript
// Destructuring dalam fungsi
const { total, completed, pending, highPriority } = taskManager.getStats();

// Destructuring dataset
const { filter } = btn.dataset;
```

**Keuntungan:**
- Extract values lebih cepat
- Code lebih concise
- Mengurangi repetitive code

### 6. **Spread Operator & Rest Parameters**
```javascript
// Spread untuk array manipulation
this.tasks = [...newTasks, updatedTask];

// Array methods dengan spread
const allTasks = [...completedTasks, ...pendingTasks];
```

### 7. **Default Parameters**
```javascript
constructor(id, title, description, priority, deadline, completed = false, createdAt = new Date()) {
    // Default values untuk parameters
}
```

## 🔒 localStorage Implementation

### Cara Kerja
```javascript
class TaskManager {
    // Simpan ke localStorage
    saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    // Muat dari localStorage
    loadTasks = () => {
        const tasksJSON = localStorage.getItem('tasks');
        if (tasksJSON) {
            const tasksData = JSON.parse(tasksJSON);
            return tasksData.map(taskData => new Task(...));
        }
        return [];
    }
}
```

### Keuntungan localStorage:
- ✅ Data persisten di browser
- ✅ Tidak memerlukan koneksi internet
- ✅ Performa cepat (akses lokal)
- ✅ Kapasitas hingga 5-10MB per domain
- ✅ API yang simple dan mudah digunakan

### Keterbatasan:
- ⚠️ Data hanya tersimpan di browser yang sama
- ⚠️ Tidak bisa sync antar device
- ⚠️ Dihapus jika cache browser dihapus
- ⚠️ Hanya bisa menyimpan string (perlu JSON.stringify/parse)

## 📁 Struktur File

```
personal-dashboard/
├── index.html          # Struktur HTML aplikasi
├── src/
│   ├── styles.css      # Styling dan layout modern
│   └── app.js          # Logika aplikasi dengan ES6+
├── scripts/
│   └── create-zip.js   # Utility untuk membuat ZIP
├── package.json        # NPM configuration
└── README.md          # Dokumentasi lengkap
```

## 🚀 Cara Menggunakan

### 1. Setup Aplikasi
```bash
# Clone repository
git clone https://github.com/cengkooo/pemrograman_web_itera_123140205.git

# Masuk ke folder project
cd "Andryano Shevchenko Limbong_123140205_Pertemuan2"

# Buka index.html di browser
# Atau gunakan live server
npm start
```

### 2. Menambah Tugas Baru
1. Isi form di sisi kiri:
   - **Judul Tugas** (wajib)
   - **Deskripsi** (opsional)
   - **Prioritas** (Tinggi/Sedang/Rendah)
   - **Deadline** (tanggal dan waktu)
2. Klik tombol **"Tambah Tugas"**
3. Tugas akan muncul di daftar dengan animasi slide-in

### 3. Mengelola Tugas
- **Tandai Selesai**: Klik tombol "✅ Selesai" untuk menandai tugas sebagai completed
- **Edit Tugas**: Klik tombol "✏️ Edit" untuk mengubah detail tugas
- **Hapus Tugas**: Klik tombol "🗑️ Hapus" (akan ada konfirmasi)

### 4. Filter Tugas
Gunakan tombol filter di atas daftar tugas:
- **Semua**: Tampilkan semua tugas
- **Progress**: Hanya tugas yang belum selesai
- **Selesai**: Hanya tugas yang sudah selesai

### 5. Monitoring Statistik
Pantau 4 kartu statistik di bagian atas:
- Total Tugas
- Tugas Selesai
- Tugas Dalam Progress
- Prioritas Tinggi (yang belum selesai)

## 🎨 Teknologi yang Digunakan

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: 
  - Flexbox & Grid Layout
  - CSS Animations & Transitions
  - Gradient backgrounds
  - Box shadows & Border radius
- **JavaScript ES6+**:
  - Classes
  - Arrow Functions
  - Template Literals
  - Async/Await
  - Destructuring
  - Spread Operator

### Storage
- **localStorage API**: Client-side data persistence

### Development Tools
- **Live Server**: Development server
- **Archiver**: Untuk create ZIP file

## 🌐 Browser Compatibility

| Browser | Versi | Status |
|---------|-------|--------|
| Chrome  | 51+   | ✅ Fully Supported |
| Firefox | 54+   | ✅ Fully Supported |
| Safari  | 10+   | ✅ Fully Supported |
| Edge    | 15+   | ✅ Fully Supported |
| Opera   | 38+   | ✅ Fully Supported |
| IE      | ❌     | Not Supported (ES6+) |

## 💡 Tips Penggunaan

### Backup Data
```javascript
// Buka DevTools (F12) > Console
// Copy data tasks
console.log(localStorage.getItem('tasks'));

// Paste untuk restore
localStorage.setItem('tasks', 'your-backup-json');
```

### Clear All Data
```javascript
// Hapus semua tugas
localStorage.removeItem('tasks');
// Atau clear semua localStorage
localStorage.clear();
```

### Mobile Usage
- Aplikasi fully responsive
- Gunakan di smartphone dengan nyaman
- Portrait & landscape mode supported
- Touch-friendly buttons

### Keyboard Shortcuts
- `Tab` untuk navigasi antar field
- `Enter` pada form untuk submit
- `Esc` saat edit untuk cancel (jika diimplementasikan)

## 🔧 Advanced Features

### Generate Unique ID
```javascript
generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
```
Menggunakan timestamp dan random string untuk ID unik

### Real-time Clock Update
```javascript
const initApp = async () => {
    // Update setiap detik
    setInterval(async () => {
        const dateTime = await updateDateTime();
        document.getElementById('datetime').textContent = dateTime;
    }, 1000);
}
```

### Smooth Animations
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

## 📝 Fitur yang Telah Diimplementasikan

### Core Features
- ✅ Tambah tugas dengan form lengkap
- ✅ Edit tugas (form pre-fill otomatis)
- ✅ Hapus tugas dengan konfirmasi
- ✅ Toggle status completed/pending
- ✅ Prioritas tugas (High/Medium/Low)

### Data Management
- ✅ Penyimpanan ke localStorage
- ✅ Auto-load data saat aplikasi start
- ✅ Auto-save setiap perubahan
- ✅ Generate unique ID untuk setiap task

### UI/UX
- ✅ Real-time clock display
- ✅ Statistik dinamis
- ✅ Filter by status
- ✅ Color-coded priorities
- ✅ Smooth animations
- ✅ Hover effects
- ✅ Responsive design
- ✅ Empty state message

### Code Quality
- ✅ ES6+ Class-based architecture
- ✅ Arrow functions
- ✅ Template literals
- ✅ Async/await
- ✅ Clean code structure
- ✅ Comprehensive comments

## 🐛 Known Issues & Future Improvements

### Current Limitations
- Data hanya tersimpan di browser lokal
- Tidak ada sync antar device
- Tidak ada user authentication
- Tidak ada export/import feature

## 📸 Screenshots

### Desktop View
<img width="1920" height="941" alt="image" src="https://github.com/user-attachments/assets/6d281a08-fe70-415e-b9dc-cc8ae0dec138" />

<img width="1920" height="942" alt="image" src="https://github.com/user-attachments/assets/1fe25c9c-2687-43ce-9a0c-95f86488654a" />

*Tampilan desktop dengan layout dua kolom*

### Mobile View
<img width="362" height="785" alt="image" src="https://github.com/user-attachments/assets/0b1ef895-3b19-49a5-a0be-c33f4e95b3eb" />

<img width="363" height="781" alt="image" src="https://github.com/user-attachments/assets/9b4ca3fc-e242-4ef7-bb77-07b1940e9416" />

*Tampilan mobile dengan layout responsif*


## 🤝 Kontribusi

Jika ingin berkontribusi:
1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Kontak

Andryano Shevchenko Limbong
- GitHub: [@cengkooo](https://github.com/cengkooo)
- Repository: [Pemrograman Web ITERA](https://github.com/cengkooo/pemrograman_web_itera_123140205)

---

**⭐ Star repository ini jika bermanfaat!**

Made with ❤️ by Andryano Shevchenko Limbong
