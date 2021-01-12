import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task.filter.dto';
import { TaskStatusValidationPipe } from './pipes/tast-status-validation-pipe';
import { Task } from './task.entity';
import { SearchQueryValidationPipe } from './pipes/task-query-validation-pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  @UsePipes(SearchQueryValidationPipe)
  getTask(
    @Query(ValidationPipe)
    filterDto: GetTaskFilterDto,
  ): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    } else return this.taskService.getAllTasks();
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    console.log(updateTaskDto);
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
