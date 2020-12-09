import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginParams } from '../../auth/auth';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  failierMsg = '';
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.deAuthenticate();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/reporting';
  }

  onSubmit() {
    this.submitted = true;
    this.failierMsg = '';

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value as LoginParams;
    const currUser = this.authService.authenticate({ email, password });

    if (currUser) {
      this.router.navigate([this.returnUrl]);
    } else {
      this.failierMsg = 'Login failed';
    }
  }
}
