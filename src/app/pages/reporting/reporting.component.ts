import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import {
  BarChartData,
  Classroom,
  Filter,
  FormattedData,
  getBarChartData,
  getDateObjs,
} from './reporting';
import { ReportingService } from './reporting.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportingComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  private activitySubs?: Subscription;

  classes: Classroom[] = [];
  activities?: FormattedData[];
  chartData?: BarChartData[];
  filter!: Filter;
  dateFrom?: Date;
  dateTo?: Date;

  constructor(
    private reportingService: ReportingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subs.add(
      this.reportingService.getAllClasses().subscribe((classes) => {
        this.classes = classes;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    if (typeof this.activitySubs !== 'undefined') {
      this.activitySubs.unsubscribe();
    }
  }

  onChangeFilter(filter: Filter) {
    this.filter = filter;

    if (filter.lastChange !== 'student') {
      if (filter.className && filter.daterange) {
        // tslint:disable-next-line: no-non-null-assertion
        const { from, to } = getDateObjs(this.filter.daterange!);
        this.dateFrom = from;
        this.dateTo = to;

        if (typeof this.activitySubs !== 'undefined') {
          this.activitySubs.unsubscribe();
        }
        this.activitySubs = this.reportingService
          .getAllActivities(filter, this.classes)
          .subscribe((data) => {
            this.activities = data;
            this.chartData = getBarChartData(data);
            this.cdr.detectChanges();
          });
      }
    }
  }
}
