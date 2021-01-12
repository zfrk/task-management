import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-task.filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Like } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    return foundTask;
  }

  async getTaskWithFilters(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);

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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    this.taskRepository.update(id, updateTaskDto);
    return task;
  }

  async deleteTask(id: number): Promise<Task> {
    const found = await this.getTaskById(id);
    await this.taskRepository.remove(found);
    return found;
  }
}
