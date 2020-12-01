import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layouts/authenticate/authenticate.component';
import { NonAuthLayoutComponent } from './layouts/non-authenticate/non-authenticate.component';

const routes: Routes = [
  {
    path: '',
    component: NonAuthLayoutComponent,
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import('./pages/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'reporting',
        loadChildren: () =>
          import('./pages/reporting/reporting.module').then(
            (m) => m.ReportingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
