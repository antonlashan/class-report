import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';

import { mockActivities } from '../../test-mock-data/activities';
import { mockClasses } from '../../test-mock-data/classes';
import { createDateObj, Filter } from './reporting';

import { ReportingService } from './reporting.service';

describe('ReportingService', () => {
  let httpTestingController: HttpTestingController;
  let reportingService: ReportingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportingService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    reportingService = TestBed.inject(ReportingService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(reportingService).toBeTruthy();
  });

  it(
    'should match getAllClasses Observable data',
    waitForAsync(() => {
      reportingService.getAllClasses().subscribe((data) => {
        expect(data[0]).toEqual({
          name: 'Class 1',
          students: ['Student 0', 'Student 1', 'Student 2', 'Student 3'],
        });
      });

      const req = httpTestingController.expectOne(
        'production/matific-test-classes'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockClasses);
    })
  );

  it(
    'should match getAllActivities Observable data',
    waitForAsync(() => {
      const filter: Filter = {
        className: 'Class 1',
        studentName: 'Student 1',
        daterange: {
          from: { year: 2018, month: 9, day: 1 },
          to: { year: 2018, month: 10, day: 1 },
        },
        lastChange: 'classroom',
      };

      reportingService
        .getAllActivities(filter, mockClasses.classes)
        .subscribe((data) => {
          expect(data[0]).toEqual({
            content: 'Pile Up',
            skill: 'Count to 10',
            strength: 'weak',
            type: 'Activity',
            date: createDateObj(2018, 9, 29),
            student: 'Student 0',
            time: '30m',
            value: 50,
          });
        });

      const req = httpTestingController.expectOne(
        'production/matific-test-activities'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockActivities);
    })
  );
});
