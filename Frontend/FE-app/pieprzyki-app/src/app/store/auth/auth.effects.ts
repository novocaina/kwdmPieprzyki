import { AuthService } from "./auth.service";
import { tap, map, switchMap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { login, loginSuccess, loginFail, logoutSuccess, logout, setUserContext, register, registerSuccess, registerFail } from "./auth.actions";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Routes } from 'src/app/shared/enums/routes.enum';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthEffects {
  adParams = ["user_context"];

  constructor(private actions$: Actions, private router: Router, private service: AuthService, private _snackBar: MatSnackBar) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.service.login(action.login, action.password).pipe(
            switchMap((data: any) => {
              if(data.errors.length > 0){
                this._snackBar.open("Niepoprawny login lub hasło" ,null, {
                  duration: 3000,
                });
              }
              return [
            loginSuccess({ login: data.data ? data.data.id : null }),
            setUserContext({ role: data.data ? data.data.userRole : null, id: data.data ? data.data.id : null, login: action.login })
          ] }),
          catchError((error) => {
            return of(loginFail({ errorMsg: error.error }))
        })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.service.register(action.login, action.password, action.role, action.confirmPassword, action.name, action.lastname, action.city, action.adress, action.postalCode, action.telephoneNumber)
        .pipe(
          switchMap((data: any) => [
            registerSuccess({ login: data.login })
          ]),
          catchError((error) => of(registerFail({ errorMsg: error.error })))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate([Routes.Dashboard]))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => this.adParams.forEach((name) => localStorage.removeItem(name))),
      tap(() => this.router.navigate([Routes.Login])),
      map(() => logoutSuccess())
    )
  );
}
