import { Component, Input } from '@angular/core';

import { BarChartData } from '../reporting';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() chartData!: BarChartData[];
}
