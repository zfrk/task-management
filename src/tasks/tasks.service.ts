import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task.filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    private loggerService: LoggerService,
  ) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return await this.taskRepository.find({ where: { userId: user.id } });
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({
      where: { id: id, userId: user.id },
    });

    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    return foundTask;
  }

  async getTaskWithFilters(
    filterDto: GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user);

    // if (status) {
    //   foundTasks = await this.taskRepository.find({
    //     where: { status: status },
    //   });
    // }
    // if (search) {
    //   foundTasks = await this.taskRepository.find({
    //     where: [{ title: Like(search) }, { description: Like(search) }],
    //   });
    //}
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    this.taskRepository.update(id, updateTaskDto);
    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    //    const found = await this.getTaskById(id, user);
    //    await this.taskRepository.remove(found);
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id} not found`);
    }
  }
}
