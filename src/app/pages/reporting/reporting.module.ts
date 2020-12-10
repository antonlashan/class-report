import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartModule } from '@swimlane/ngx-charts';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';
import { FilterComponent } from './filter/filter.component';
import { StatsComponent } from './stats/stats.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DatepickerRangeModule } from '../../shared/datepicker-range/datepicker-range.module';
import { ReportingService } from './reporting.service';
import { FilterStudentsPipe } from './data-grid/filter.pipe';
import { StrengthColorDirective } from './data-grid/strength-color.directive';

@NgModule({
  declarations: [
    ReportingComponent,
    FilterComponent,
    StatsComponent,
    DataGridComponent,
    FilterStudentsPipe,
    StrengthColorDirective,
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    DatepickerRangeModule,
    BarChartModule,
  ],
  providers: [ReportingService],
})
export class ReportingModule {}
