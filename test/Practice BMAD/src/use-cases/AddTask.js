import { Task } from '../entities/Task.js';
import { TaskRepository } from '../repositories/TaskRepository.js';

export class AddTask {
  constructor() {
    this.repository = new TaskRepository();
  }

  async execute(description) {
    const id = Date.now().toString();
    const task = new Task(id, description);
    await this.repository.add(task);
    return task;
  }
}