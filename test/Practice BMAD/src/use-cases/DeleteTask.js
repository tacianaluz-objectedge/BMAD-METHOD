import { TaskRepository } from '../repositories/TaskRepository.js';

export class DeleteTask {
  constructor() {
    this.repository = new TaskRepository();
  }

  async execute(id) {
    await this.repository.delete(id);
  }
}