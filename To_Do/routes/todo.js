const express = require('express');
const router = express.Router();
const path = require('path');

let tasks = [];

// Priority Decreasing Algorithm (every GET)
function decayPriorities() {
    tasks.forEach(task => {
        if (task.priority > 1) task.priority--; // Decrease priority daily or per refresh
    });
}

// Homepage
router.get('/', (req, res) => {
    decayPriorities();
    const sorted = tasks.sort((a, b) => b.priority - a.priority);

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>To-Do List</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="container">
            <h2>Priority To-Do List</h2>
            <form action="/add" method="POST">
                <input type="text" name="task" placeholder="New task..." required>
                <input type="number" name="priority" placeholder="Priority (1-10)" min="1" max="10" required>
                <button type="submit">Add</button>
            </form>
            <ul>
    `;

    sorted.forEach((t, i) => {
        html += `
            <li>
                <span>${t.text} (Priority: ${t.priority})</span>
                <form action="/delete" method="POST">
                    <input type="hidden" name="index" value="${i}">
                    <button type="submit">🗑</button>
                </form>
            </li>
        `;
    });

    html += `
            </ul>
        </div>
    </body>
    </html>`;

    res.send(html);
});

// Add task
router.post('/add', (req, res) => {
    const { task, priority } = req.body;
    tasks.push({ text: task, priority: parseInt(priority) });
    res.redirect('/');
});

// Delete task
router.post('/delete', (req, res) => {
    const index = parseInt(req.body.index);
    tasks.splice(index, 1);
    res.redirect('/');
});

module.exports = router;
