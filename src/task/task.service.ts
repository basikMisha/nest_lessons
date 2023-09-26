import {
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

  getTaskById(id: string): ITask {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      // throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
      // throw new NotFoundException('Task is not found');
      throw new NotFoundTaskException();
    }
    return task;
  }

  createTask({ task, tags, status }: CreateTaskDTO): ITask {
    const newTask = new Task(task, tags, status);
    this.tasks.push(newTask);
    return newTask;
  }
}
