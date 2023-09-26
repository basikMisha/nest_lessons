import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  UseFilters,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { ITask } from './task.interface';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { EmailPipe } from './pipes/email.pipe';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(): ITask[] {
    // throw new HttpException('Some error', 404);
    // throw new Error('error');
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): ITask {
    return this.taskService.getTaskById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTask(@Body() task: CreateTaskDTO): ITask {
    return this.taskService.createTask(task);
  }

  @Get('email/:email')
  getTaskByEmail(@Param('email', EmailPipe) email: string): ITask[] {
    return this.taskService.getTasksByEmail(email);
  }
}
