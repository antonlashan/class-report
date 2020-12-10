import { Directive, ElementRef, Input } from '@angular/core';

import { Strength, strenthColors } from '../reporting';

@Directive({
  selector: '[appStrengthColor]',
})
export class StrengthColorDirective {
  strenthColors = strenthColors();
  @Input('appStrengthColor') set changeStrength(str: Strength) {
    this.el.nativeElement.style.color = this.strenthColors[str];
  }

  constructor(private el: ElementRef<HTMLSpanElement>) {}
}
