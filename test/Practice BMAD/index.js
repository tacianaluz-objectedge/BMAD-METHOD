import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'tasks.json');

// --- Data Layer (Logic) ---
const loadTasks = async () => {
    try {
        const data = await fs.readFile(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Retorna vazio se o arquivo não existir
    }
};

const saveTasks = async (tasks) => {
    await fs.writeFile(DB_FILE, JSON.stringify(tasks, null, 2));
};

// --- Actions (Features) ---
const actions = {
    add: async (text) => {
        const tasks = await loadTasks();
        const newTask = { id: Date.now(), text, completed: false };
        await saveTasks([...tasks, newTask]);
        console.log(`✅ Task added: "${text}"`);
    },
    list: async () => {
        const tasks = await loadTasks();
        if (tasks.length === 0) return console.log("📭 No tasks found.");
        console.table(tasks);
    },
    remove: async (id) => {
        const tasks = await loadTasks();
        const filtered = tasks.filter(t => t.id !== parseInt(id));
        await saveTasks(filtered);
        console.log(`🗑️ Task ${id} removed.`);
    }
};

// --- CLI Entry Point (Interface) ---
const [,, command, ...args] = process.argv;

if (actions[command]) {
    await actions[command](args.join(' '));
} else {
    console.log("Usage: node index.js [add|list|remove] [args]");
}