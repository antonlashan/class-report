import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';

export interface PickerData {
  from: Pick<NgbDate, 'year' | 'month' | 'day'>;
  to: Pick<NgbDate, 'year' | 'month' | 'day'>;
}

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerRangeComponent {
  hoveredDate: NgbDate | null = null;

  @Input() fromDate!: NgbDate | null;
  @Input() toDate!: NgbDate | null;
  @Output() changeDate: EventEmitter<PickerData> = new EventEmitter();
  @ViewChild('datepicker', { static: false }) datepicker!: NgbInputDatepicker;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {}

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.fromDate && this.toDate) {
      this.changeDate.emit({ from: this.fromDate, to: this.toDate });
      this.datepicker.close();
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
