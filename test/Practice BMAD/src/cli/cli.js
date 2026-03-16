import { AddTask } from '../use-cases/AddTask.js';
import { DeleteTask } from '../use-cases/DeleteTask.js';
import { ListTasks } from '../use-cases/ListTasks.js';

export class CLI {
  constructor() {
    this.addTask = new AddTask();
    this.deleteTask = new DeleteTask();
    this.listTasks = new ListTasks();
  }

  async run(args) {
    const command = args[0];
    switch (command) {
      case 'add':
        const description = args.slice(1).join(' ');
        const task = await this.addTask.execute(description);
        console.log(`Task added: ${task.description}`);
        break;
      case 'list':
        const tasks = await this.listTasks.execute();
        tasks.forEach(t => console.log(`${t.id}: ${t.description} [${t.status}]`));
        break;
      case 'delete':
        const id = args[1];
        await this.deleteTask.execute(id);
        console.log(`Task deleted: ${id}`);
        break;
      default:
        console.log('Usage: node index.js <add|list|delete> [args]');
    }
  }
}