import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { MockComponent, MockProvider } from 'ng-mocks';

import { mockClasses } from '../../test-mock-data/classes';

import { ReportingComponent } from './reporting.component';
import { ReportingService } from './reporting.service';
import { FilterComponent } from './filter/filter.component';
import { StatsComponent } from './stats/stats.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { Classroom, Filter, normalizeData } from './reporting';
import { mockActivities } from '../../test-mock-data/activities';
import { By } from '@angular/platform-browser';

const filter: Filter = {
  className: 'Class 1',
  studentName: 'Student 1',
  daterange: {
    from: { year: 2018, month: 9, day: 1 },
    to: { year: 2018, month: 10, day: 1 },
  },
  lastChange: 'classroom',
};

describe('ReportingComponent', () => {
  let component: ReportingComponent;
  let fixture: ComponentFixture<ReportingComponent>;
  let reportingService: ReportingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ReportingComponent,
        MockComponent(FilterComponent),
        MockComponent(StatsComponent),
        MockComponent(DataGridComponent),
      ],
      providers: [
        MockProvider(ReportingService, {
          getAllClasses: () => of(mockClasses.classes),
          getAllActivities: (f: Filter, classes: Classroom[]) =>
            of(normalizeData(f, mockActivities.data, classes)),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingComponent);
    reportingService = TestBed.inject(ReportingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive classes', () => {
    spyOn(reportingService, 'getAllClasses').and.returnValue(EMPTY);
    component.ngOnInit();

    expect(reportingService.getAllClasses).toHaveBeenCalledTimes(1);
    expect(component.classes[2]).toEqual(mockClasses.classes[2]);
  });

  it('should not call getAllActivities api when change student', () => {
    spyOn(reportingService, 'getAllActivities').and.returnValue(EMPTY);
    component.onChangeFilter({ ...filter, lastChange: 'student' });

    expect(reportingService.getAllActivities).not.toBeCalled();
  });

  it('should call getAllActivities api when change className or daterange', () => {
    spyOn(reportingService, 'getAllActivities').and.returnValue(EMPTY);
    component.onChangeFilter({ ...filter, lastChange: 'classroom' });

    expect(reportingService.getAllActivities).toBeCalled();
  });

  it('should call getAllActivities api when change className or daterange', () => {
    spyOn(reportingService, 'getAllActivities').and.returnValue(EMPTY);
    component.onChangeFilter({ ...filter, lastChange: 'student' });

    expect(reportingService.getAllActivities).not.toBeCalled();
  });

  it('should receive activities', () => {
    component.onChangeFilter({ ...filter, lastChange: 'classroom' });

    expect(component.activities?.length).toBeGreaterThan(0);
  });

  it('should display "Overall results" text', () => {
    component.onChangeFilter({ ...filter, lastChange: 'classroom' });
    const h6 = fixture.debugElement.query(By.css('h6'));
    expect(h6.nativeElement.textContent).toContain(
      'Overall results for period'
    );
  });
});
