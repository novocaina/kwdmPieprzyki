import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState, loggedIn } from "./store/auth";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";
import { logout } from "./store/auth/auth.actions";
import { Routes } from './shared/enums/routes.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AuthState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(loggedIn),
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate([Routes.Login]);
          this.store.dispatch(logout());
        }

        return !!isLoggedIn;
      })
    );
  }
}
