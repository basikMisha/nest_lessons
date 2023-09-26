import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITask } from './task.interface';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { NotFoundTaskException } from './exceptions/not-found-task.exception';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [];

  getTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(id: number): ITask {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      // throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
      // throw new NotFoundException('Task is not found');
      throw new NotFoundTaskException();
    }
    return task;
  }

  createTask({ task, email, tags, status }: CreateTaskDTO): ITask {
    const newTask = new Task(task, email, tags, status);
    this.tasks.push(newTask);
    return newTask;
  }

  getTasksByEmail(email: string): ITask[] {
    const tasks = this.tasks.filter((task) => task.email === email);
    if (!tasks || tasks.length === 0) {
      throw new BadRequestException('Tasks not found');
    }
    return tasks;
  }
}
