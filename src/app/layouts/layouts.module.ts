import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './authenticate/authenticate.component';
import { NonAuthLayoutComponent } from './non-authenticate/non-authenticate.component';

@NgModule({
  declarations: [AuthLayoutComponent, NonAuthLayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutsModule {}
