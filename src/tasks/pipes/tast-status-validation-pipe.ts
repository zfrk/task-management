import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusValid(value.status))
      throw new BadRequestException(`"${value.status}" is invalid status`);
    else return value;
  }

  private isStatusValid(status) {
    const idx = this.allowedStatus.indexOf(status);

    return idx !== -1;
  }
}
