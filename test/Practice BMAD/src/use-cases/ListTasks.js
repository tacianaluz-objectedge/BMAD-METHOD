import { TaskRepository } from '../repositories/TaskRepository.js';

export class ListTasks {
  constructor() {
    this.repository = new TaskRepository();
  }

  async execute() {
    return await this.repository.getAll();
  }
}