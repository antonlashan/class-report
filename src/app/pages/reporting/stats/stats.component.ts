import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BarChartData, strenthColors } from '../reporting';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
  @Input() chartData!: BarChartData[];
  strenthColors = strenthColors();
  colorScheme = {
    domain: [
      this.strenthColors.excellent,
      this.strenthColors.good,
      this.strenthColors.ok,
      this.strenthColors.weak,
    ],
  };
}
