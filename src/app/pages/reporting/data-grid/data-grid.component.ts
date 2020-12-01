import { Component, Input, OnChanges } from '@angular/core';
import {
  Filter,
  FormattedData,
  getDateObjs,
  strenthColors,
} from '../reporting';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnChanges {
  @Input() activities!: FormattedData[];
  @Input() filter!: Filter;
  strenthColors = strenthColors();

  fromDate!: Date;
  toDate!: Date;

  ngOnChanges() {
    // tslint:disable-next-line: no-non-null-assertion
    const { from, to } = getDateObjs(this.filter.daterange!);
    this.fromDate = from;
    this.toDate = to;
  }
}
