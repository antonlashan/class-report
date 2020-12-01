import { Component, Input } from '@angular/core';
import { FormattedData } from '../reporting';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent {
  @Input() activities: FormattedData[] = [];
  @Input() selectedStudent!: string | null;
}
