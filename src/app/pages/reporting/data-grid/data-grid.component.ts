import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Filter, FormattedData, getDateObjs } from '../reporting';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataGridComponent implements OnChanges {
  @Input() activities!: FormattedData[];
  @Input() filter!: Filter;

  fromDate!: Date;
  toDate!: Date;
  studentName!: string | null;

  ngOnChanges() {
    // tslint:disable-next-line: no-non-null-assertion
    const { from, to } = getDateObjs(this.filter.daterange!);
    this.studentName = this.filter.studentName;
    this.fromDate = from;
    this.toDate = to;
  }
}
