import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EnvService } from "src/env.service";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { Registration, LoginModel } from './auth.states';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  api: string;
  private localStorageUserContextKey = "user_context";

  constructor(envService: EnvService, private http: HttpClient, private localStorageService: LocalStorageService) {
    this.api = envService.getApiUrl();
  }

  login(login: string, password: string) {
    const loginModel: LoginModel = {
      login: login,
      password: password
    };

    return this.http.post(`${this.api}Account/login`, { Login: login,
      Password: password })
      .pipe(map((response) => {
        this.localStorageService.set(
          this.localStorageUserContextKey, JSON.stringify(response));
        return response;
      })
      );
  }

  register(login: string, password: string, role: string, confirmPassword: string, name: string, lastname: string, city: string, adress: string, postalCode:string, telephoneNumber: string) {
    const registration = {
      login: login,
      password: password,
      confirmPassword: confirmPassword,
      userRole: role,
      name: name,
      lastname: lastname,
      city: city,
      adress: adress,
      postalCode: postalCode,
      telephoneNumber: telephoneNumber
    };

    return this.http.post(`${this.api}Account/registration`, registration )
      .pipe(map((response) => {
        this.localStorageService.set(this.localStorageUserContextKey, JSON.stringify(response));
        return response;
      })
      );
  }
}
