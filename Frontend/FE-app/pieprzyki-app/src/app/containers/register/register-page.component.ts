import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthState } from "src/app/store/auth";
import { Store } from "@ngrx/store";
import { register } from "src/app/store/auth/auth.actions";
import { Router } from "@angular/router";
import { Routes } from "src/app/shared/enums/routes.enum";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  roles = [
    { id: 1, value: "Lekarz" },
    { id: 2, value: "Pacjent" },
  ];

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      repPassword: new FormControl(),
      phone: new FormControl(),
      postal: new FormControl(),
      city: new FormControl(),
      address: new FormControl(),
      surname: new FormControl(),
      name: new FormControl(),
      role: new FormControl(),
    });
  }

  createAccount() {
    const formValue = this.registerForm.value;
    this.store.dispatch(
      register({
        login: formValue.email,
        password: formValue.password,
        role: this.roles[formValue.role].value,
        confirmPassword: formValue.repPassword,
        name: formValue.name,
        lastname: formValue.surname,
        city: formValue.city,
        adress: formValue.address,
        postalCode: formValue.postal,
        telephoneNumber: formValue.phone
      })
    );

    this.router.navigateByUrl(Routes.Login);
  }

  loginBtnClick() {
    this.router.navigateByUrl(Routes.Login);
  }
}
