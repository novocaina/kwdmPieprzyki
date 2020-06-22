import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthState } from 'src/app/store/auth';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/auth/auth.actions';
import { Router } from '@angular/router';
import { Routes } from 'src/app/shared/enums/routes.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private store: Store<AuthState>,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(),
      password: new FormControl()
    });
  }

  loginBtnClick() {
    const formValue = this.loginForm.value;
    this.store.dispatch(login({
      login: formValue.login,
      password: formValue.password
    }));

    this.router.navigateByUrl(Routes.Dashboard);
  }

  registerBtnClick() {
    this.router.navigateByUrl(Routes.Register);
  }
}
