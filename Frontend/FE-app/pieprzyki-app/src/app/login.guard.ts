import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthState, loggedIn } from "./store/auth";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";
import { Routes } from './shared/enums/routes.enum';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(loggedIn),
      map((loggedIn) => {
        if (loggedIn) {
          this.router.navigate([Routes.Dashboard]);
          return false;
        }
        return true;
      }),
    );
  }
}
