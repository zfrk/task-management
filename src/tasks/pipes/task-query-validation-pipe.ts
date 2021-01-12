import { PipeTransform } from '@nestjs/common';
import { GetTaskFilterDto } from '../dto/get-task.filter.dto';
export class SearchQueryValidationPipe implements PipeTransform {
  transform(value: any) {
    let taskFilter = new GetTaskFilterDto();

    taskFilter = value;
    if (taskFilter.search) {
      taskFilter.search = '%' + taskFilter.search + '%';
    }
    return taskFilter;
  }
}
