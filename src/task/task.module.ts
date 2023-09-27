import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { LoggerMiddleware } from './middlewave/logger/logger.middleware';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TaskController);
  }
}
