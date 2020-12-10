import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridComponent } from './data-grid.component';
import { FilterStudentsPipe } from './filter.pipe';
import { StrengthColorDirective } from './strength-color.directive';

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataGridComponent,
        FilterStudentsPipe,
        StrengthColorDirective,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
