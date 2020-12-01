import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  BarChartData,
  Classroom,
  Filter,
  FormattedData,
  getBarChartData,
  Stats,
} from './reporting';
import { ReportingService } from './reporting.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  private activitySubs?: Subscription;

  classes: Classroom[] = [];
  activities?: FormattedData[];
  chartData?: BarChartData[];
  filter!: Filter;
  constructor(private reportingService: ReportingService) {}

  ngOnInit() {
    this.subs.add(
      this.reportingService.getAllClasses().subscribe((classes) => {
        this.classes = classes;
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
        if (typeof this.activitySubs !== 'undefined') {
          this.activitySubs.unsubscribe();
        }
        this.activitySubs = this.reportingService
          .getAllActivities(filter, this.classes)
          .subscribe((data) => {
            this.activities = data;
            this.chartData = getBarChartData(data);
          });
      }
    }
  }
}
