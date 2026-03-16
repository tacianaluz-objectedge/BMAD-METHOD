export class Task {
  constructor(id, description, status = 'pending') {
    this.id = id;
    this.description = description;
    this.status = status;
  }
}