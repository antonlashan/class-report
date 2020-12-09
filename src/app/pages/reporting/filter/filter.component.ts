import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { PickerData } from '../../../shared/datepicker-range/datepicker-range.component';
import { Classroom, Filter } from '../reporting';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
  @Input() classes: Classroom[] = [];
  @Output() changeFilter: EventEmitter<Filter> = new EventEmitter();

  classNames: string[] = [];
  studentNames: string[] = [];
  // tslint:disable-next-line: variable-name
  _filter: Filter = {
    className: null,
    studentName: null,
    daterange: null,
    lastChange: null,
  };
  set filter(f: Filter) {
    this._filter = f;
    this.changeFilter.emit(f);
  }
  get filter() {
    return this._filter;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.classes.currentValue.length) {
      this.classNames = this.classes.map((c) => c.name);
    }
  }

  onChangeClass(className: string) {
    this.filter = {
      ...this.filter,
      className,
      studentName: null,
      lastChange: 'classroom',
    };
    const classroom = this.classes.find((c) => c.name === className);
    this.studentNames = classroom ? classroom.students : [];
  }

  onChangeStudent(studentName: string) {
    this.filter = { ...this.filter, studentName, lastChange: 'student' };
  }

  onChangeDate(d: PickerData) {
    this.filter = { ...this.filter, daterange: d, lastChange: 'daterange' };
  }
}
