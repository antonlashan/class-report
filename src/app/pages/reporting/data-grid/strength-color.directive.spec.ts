import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthColorDirective } from './strength-color.directive';
import { Strength, strenthColors } from '../reporting';

@Component({
  template: ` <span [appStrengthColor]="'weak'">Test</span> `,
})
export class TestComponent {}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )})`
    : null;
};

describe('StrengthColorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, StrengthColorDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have weak color <span>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('span');
    const bgColor = h2.style.color;
    expect(bgColor).toBe(hexToRgb(strenthColors()[Strength.weak]));
  });
});
