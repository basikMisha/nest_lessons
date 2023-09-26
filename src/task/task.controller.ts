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
} from '@nestjs/common';
import { ITask } from './task.interface';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { AllExceptionsFilter } from '@src/exception-filters/exception.filter';

@Controller('task')
export class TaskController {
  constructor(private testService: TaskService) {}

  @Get()
  getTasks(): ITask[] {
    // throw new HttpException('Some error', 404);
    throw new Error('error');
    return this.testService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.testService.getTaskById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTask(@Body() task: CreateTaskDTO): ITask {
    return this.testService.createTask(task);
  }
}
