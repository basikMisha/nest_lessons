import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ITask } from './task.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private testService: TaskService) {}

  @Get()
  getTasks(): ITask[] {
    return this.testService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.testService.getTaskById(id);
  }

  @Post()
  createTask(@Body('task') task: string): ITask {
    return this.testService.createTask(task);
  }
}
