import { Pipe, PipeTransform } from '@angular/core';

import { FormattedData } from '../reporting';

@Pipe({ name: 'filterStudents' })
export class FilterStudentsPipe implements PipeTransform {
  transform(data: FormattedData[], studentName: string | null) {
    if (studentName) {
      return data.filter((d) => d.student === studentName);
    }
    return data;
  }
}
