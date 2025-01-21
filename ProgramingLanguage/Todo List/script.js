document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todoList');

    // Load tasks from LocalStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to LocalStorage
    const saveTasks = () => {
        const tasks = Array.from(todoList.children).map(item => item.querySelector('span').textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (taskText) => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => editTask(span));
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(li));
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    };

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Edit task
    const editTask = (span) => {
        const newTaskText = prompt('Edit your task:', span.textContent);
        if (newTaskText !== null) {
            span.textContent = newTaskText.trim();
            saveTasks();
        }
    };

    // Delete task
    const deleteTask = (li) => {
        li.remove();
        saveTasks();
    };

    loadTasks();
});