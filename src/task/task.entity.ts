import { ITask, Status } from './task.interface';

export class Task implements ITask {
  task: string;
  email: string;
  id = new Date().getTime();
  status: Status;
  tags: string[];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(task: string, email?: string, tags?: string[], status?: Status) {
    this.task = task;
    this.tags = tags || [];
    this.status = status || Status.CREATED;
    this.email = email || null;
  }
}
