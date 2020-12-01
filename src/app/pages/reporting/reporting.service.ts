import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import {
  Activities,
  Classes,
  Classroom,
  Filter,
  normalizeData,
} from './reporting';

@Injectable()
export class ReportingService {
  constructor(private http: HttpClient) {}

  getAllClasses() {
    return this.http
      .get<Classes>('production/matific-test-classes')
      .pipe(map((data) => data.classes));
  }

  getAllActivities(filter: Filter, classes: Classroom[]) {
    return this.http
      .get<Activities>('production/matific-test-activities')
      .pipe(map((data) => normalizeData(filter, data.data, classes)));
  }
}
