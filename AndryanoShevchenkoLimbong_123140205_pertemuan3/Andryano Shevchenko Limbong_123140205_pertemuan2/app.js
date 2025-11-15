// ========================================
// CLASS IMPLEMENTATION (ES6+)
// ========================================

/**
 * Class untuk mengelola Task/Tugas
 * Menggunakan ES6+ Classes
 */
class Task {
    constructor(id, title, description, priority, deadline, completed = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    // Method untuk toggle status completed
    toggleComplete() {
        this.completed = !this.completed;
    }

    // Method untuk update task
    update(title, description, priority, deadline) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
    }
}

/**
 * Class untuk mengelola Storage dan operasi CRUD
 * Menggunakan localStorage untuk persistence
 */
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.editingTaskId = null;
    }

    // Arrow Function #1: Load tasks dari localStorage
    loadTasks = () => {
        const tasksJSON = localStorage.getItem('tasks');
        if (tasksJSON) {
            const tasksData = JSON.parse(tasksJSON);
            return tasksData.map(taskData =>
                new Task(
                    taskData.id,
                    taskData.title,
                    taskData.description,
                    taskData.priority,
                    taskData.deadline,
                    taskData.completed,
                    new Date(taskData.createdAt)
                )
            );
        }
        return [];
    }

    // Arrow Function #2: Save tasks ke localStorage
    saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Arrow Function #3: Generate unique ID
    generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Add new task
    addTask(title, description, priority, deadline) {
        const newTask = new Task(
            this.generateId(),
            title,
            description,
            priority,
            deadline
        );
        this.tasks.unshift(newTask);
        this.saveTasks();
        return newTask;
    }

    // Update existing task
    updateTask(id, title, description, priority, deadline) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.update(title, description, priority, deadline);
            this.saveTasks();
            return task;
        }
        return null;
    }

    // Delete task
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
    }

    // Toggle task completion
    toggleTaskComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
        }
    }

    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            default:
                return this.tasks;
        }
    }

    // Get statistics
    getStats() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.completed).length,
            pending: this.tasks.filter(t => !t.completed).length,
            highPriority: this.tasks.filter(t => t.priority === 'high' && !t.completed).length
        };
    }

    // 🧹 New Method: Remove dummy or corrupted tasks
    removeDummyTasks() {
        const before = this.tasks.length;
        this.tasks = this.tasks.filter(task =>
            task.title &&
            task.title !== 'undefined' &&
            task.title.trim() !== ''
        );
        const removed = before - this.tasks.length;
        if (removed > 0) {
            console.log(`🧹 Menghapus ${removed} task dummy (title kosong/undefined)`);
            this.saveTasks();
        }
    }
}

// ========================================
// INITIALIZE APP
// ========================================
const taskManager = new TaskManager();
let updateInterval;

// ========================================
// ASYNC FUNCTIONS (ES6+ Async/Await)
// ========================================

const updateDateTime = async () => {
    return new Promise((resolve) => {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const dateTimeString = now.toLocaleDateString('id-ID', options);
        resolve(dateTimeString);
    });
};

const renderTasksWithAnimation = async () => {
    const taskList = document.getElementById('taskList');
    taskList.style.opacity = '0.5';
    await new Promise(resolve => setTimeout(resolve, 100));
    renderTasks();
    taskList.style.opacity = '1';
};

// ========================================
// RENDER FUNCTIONS
// ========================================
const renderTasks = () => {
    const taskList = document.getElementById('taskList');
    const tasks = taskManager.getFilteredTasks();

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <h3>📭 Tidak ada tugas</h3>
                <p>Mulai tambahkan tugas baru untuk meningkatkan produktivitas!</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = tasks.map(task => {
        const deadlineDate = task.deadline ? new Date(task.deadline) : null;
        const formattedDeadline = deadlineDate ?
            `📅 ${deadlineDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}` :
            '📅 Tidak ada deadline';

        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${task.priority}">
                <div class="task-header">
                    <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                    <span class="task-priority priority-${task.priority}">
                        ${task.priority === 'high' ? '🔴 Tinggi' :
            task.priority === 'medium' ? '🟡 Sedang' : '🟢 Rendah'}
                    </span>
                </div>
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                <div class="task-footer">
                    <span class="task-date">${formattedDeadline}</span>
                    <div class="task-actions">
                        <button class="action-btn btn-complete" onclick="toggleComplete('${task.id}')">
                            ${task.completed ? '↩️ Belum' : '✅ Selesai'}
                        </button>
                        <button class="action-btn btn-edit" onclick="editTask('${task.id}')">✏️ Edit</button>
                        <button class="action-btn btn-delete" onclick="deleteTask('${task.id}')">🗑️ Hapus</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

const updateStats = () => {
    const stats = taskManager.getStats();
    document.getElementById('totalTasks').textContent = stats.total;
    document.getElementById('completedTasks').textContent = stats.completed;
    document.getElementById('pendingTasks').textContent = stats.pending;
    document.getElementById('highPriorityTasks').textContent = stats.highPriority;
};

// ========================================
// EVENT HANDLERS
// ========================================
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const deadline = document.getElementById('taskDeadline').value;

    if (taskManager.editingTaskId) {
        taskManager.updateTask(taskManager.editingTaskId, title, description, priority, deadline);
        taskManager.editingTaskId = null;
        document.getElementById('submitBtn').textContent = 'Tambah Tugas';
        document.getElementById('cancelBtn').style.display = 'none';
    } else {
        taskManager.addTask(title, description, priority, deadline);
    }

    e.target.reset();
    await renderTasksWithAnimation();
    updateStats();
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    taskManager.editingTaskId = null;
    document.getElementById('taskForm').reset();
    document.getElementById('submitBtn').textContent = 'Tambah Tugas';
    document.getElementById('cancelBtn').style.display = 'none';
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        taskManager.currentFilter = btn.dataset.filter;
        await renderTasksWithAnimation();
    });
});

// ========================================
// GLOBAL FUNCTIONS
// ========================================
async function toggleComplete(id) {
    taskManager.toggleTaskComplete(id);
    await renderTasksWithAnimation();
    updateStats();
}

function editTask(id) {
    const task = taskManager.tasks.find(t => t.id === id);
    if (task) {
        taskManager.editingTaskId = id;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskPriority').value = task.priority;
        if (task.deadline) {
            const date = new Date(task.deadline);
            document.getElementById('taskDeadline').value = date.toISOString().slice(0, 16);
        }
        document.getElementById('submitBtn').textContent = 'Update Tugas';
        document.getElementById('cancelBtn').style.display = 'block';
        document.querySelector('.add-task-section').scrollIntoView({ behavior: 'smooth' });
    }
}

async function deleteTask(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        taskManager.deleteTask(id);
        await renderTasksWithAnimation();
        updateStats();
    }
}

// ========================================
// INITIALIZATION
// ========================================
const initApp = async () => {
    // 🧹 Bersihkan dummy task sebelum render
    taskManager.removeDummyTasks();

    const dateTime = await updateDateTime();
    document.getElementById('datetime').textContent = dateTime;

    updateInterval = setInterval(async () => {
        const dateTime = await updateDateTime();
        document.getElementById('datetime').textContent = dateTime;
    }, 1000);

    renderTasks();
    updateStats();
};

initApp();

window.addEventListener('beforeunload', () => {
    if (updateInterval) clearInterval(updateInterval);
});
