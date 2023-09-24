import { Injectable } from '@nestjs/common';
import { ITask } from './task.interface';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [
    { id: 1, task: 'task1' },
    { id: 2, task: 'task2' },
  ];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(id: string): ITask {
    const task = this.tasks.find((task) => task.id === +id);
    return task;
  }

  createTask(task: string): ITask {
    const newTask = new Task(task)
    this.tasks.push(newTask);
    return newTask;
  }
}
