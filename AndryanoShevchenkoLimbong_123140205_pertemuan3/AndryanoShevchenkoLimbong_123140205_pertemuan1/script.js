class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.editingTaskId = null; // Menandai task yang sedang di-edit
    this.loadElements();
    this.render();
    this.addEventListeners();
  }

  loadElements() {
    this.form = document.querySelector('.task-form');
    this.nameInput = document.querySelector('.input-task-name');
    this.courseInput = document.querySelector('.input-task-course');
    this.deadlineInput = document.querySelector('.input-task-deadline');
    this.list = document.querySelector('.task-list');
    this.taskCount = document.querySelector('.task-count');
    this.searchInput = document.querySelector('.input-search');
    this.filterSelect = document.querySelector('.select-filter');
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(name, course, deadline) {
    if (!name.trim() || !course.trim() || !deadline) {
      alert('⚠️ Semua field harus diisi!');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (deadline < today) {
      alert('⚠️ Deadline tidak boleh di masa lalu!');
      return;
    }

    const newTask = {
      id: Date.now(),
      name,
      course,
      deadline,
      done: false
    };

    this.tasks.push(newTask);
    this.save();
    this.render();
    this.form.reset();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.save();
    this.render();
  }

  toggleTask(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    this.save();
    this.render();
  }

  startEdit(id) {
    // Batalkan edit lain jika sedang ada
    if (this.editingTaskId !== null && this.editingTaskId !== id) {
      this.editingTaskId = null;
    }
    this.editingTaskId = id;
    this.render();
  }

  saveEdit(id, newName, newCourse, newDeadline) {
    if (!newName.trim() || !newCourse.trim() || !newDeadline) {
      alert('⚠️ Semua kolom harus diisi!');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (newDeadline < today) {
      alert('⚠️ Deadline tidak boleh di masa lalu!');
      return;
    }

    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, name: newName, course: newCourse, deadline: newDeadline } : t
    );

    this.editingTaskId = null;
    this.save();
    this.render();
  }

  cancelEdit() {
    this.editingTaskId = null;
    this.render();
  }

  render() {
    const keyword = this.searchInput.value.toLowerCase();
    const filter = this.filterSelect.value;
    this.list.innerHTML = '';

    let filtered = this.tasks.filter(task =>
      task.name.toLowerCase().includes(keyword) ||
      task.course.toLowerCase().includes(keyword)
    );

    if (filter === 'pending') filtered = filtered.filter(t => !t.done);
    if (filter === 'done') filtered = filtered.filter(t => t.done);

    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.done ? 'done' : ''}`;

      // Form Edit Mode
      if (this.editingTaskId === task.id) {
        li.innerHTML = `
          <form class="edit-form">
            <input type="text" class="edit-name" value="${task.name}" placeholder="Nama Tugas" required>
            <input type="text" class="edit-course" value="${task.course}" placeholder="Mata Kuliah" required>
            <input type="date" class="edit-deadline" value="${task.deadline}" required>
            <div class="edit-buttons">
              <button type="button" class="btn-save">Simpan</button>
              <button type="button" class="btn-cancel">Batal</button>
            </div>
          </form>
        `;

        const form = li.querySelector('.edit-form');
        const btnSave = form.querySelector('.btn-save');
        const btnCancel = form.querySelector('.btn-cancel');

        btnSave.addEventListener('click', () => {
          const newName = form.querySelector('.edit-name').value.trim();
          const newCourse = form.querySelector('.edit-course').value.trim();
          const newDeadline = form.querySelector('.edit-deadline').value;
          this.saveEdit(task.id, newName, newCourse, newDeadline);
        });

        btnCancel.addEventListener('click', () => this.cancelEdit());
      } else {
        // Tampilan Normal Task
        li.innerHTML = `
          <div class="task-info">
            <span>${task.name} - ${task.course}</span>
            <small>Deadline: ${task.deadline}</small>
          </div>
          <div class="task-actions">
            <button class="btn-done" title="Tandai Selesai">✅</button>
            <button class="btn-edit" title="Edit">✏️</button>
            <button class="btn-delete" title="Hapus">🗑️</button>
          </div>
        `;

        li.querySelector('.btn-done').addEventListener('click', () => this.toggleTask(task.id));
        li.querySelector('.btn-edit').addEventListener('click', () => this.startEdit(task.id));
        li.querySelector('.btn-delete').addEventListener('click', () => this.deleteTask(task.id));
      }

      this.list.appendChild(li);
    });

    const pendingCount = this.tasks.filter(t => !t.done).length;
    this.taskCount.textContent = `Tugas belum selesai: ${pendingCount}`;
  }

  addEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask(
        this.nameInput.value,
        this.courseInput.value,
        this.deadlineInput.value
      );
    });

    this.searchInput.addEventListener('input', () => this.render());
    this.filterSelect.addEventListener('change', () => this.render());
  }
}

new TaskManager();
