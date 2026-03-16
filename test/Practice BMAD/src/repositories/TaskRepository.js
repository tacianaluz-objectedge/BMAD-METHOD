import fs from 'fs';
import path from 'path';

const TASKS_FILE = 'tasks.json';

export class TaskRepository {
  constructor() {
    this.filePath = path.resolve(TASKS_FILE);
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async save(tasks) {
    await fs.promises.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }

  async add(task) {
    const tasks = await this.getAll();
    tasks.push(task);
    await this.save(tasks);
  }

  async delete(id) {
    const tasks = await this.getAll();
    const filtered = tasks.filter(t => t.id !== id);
    await this.save(filtered);
  }
}