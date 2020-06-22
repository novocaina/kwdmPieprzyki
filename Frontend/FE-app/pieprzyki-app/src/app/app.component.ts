import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { loggedIn, loginSelector, userRole, AuthState } from "./store/auth";
import { userLogged, setUserContext, logout } from "./store/auth/auth.actions";
import { Router } from "@angular/router";
import { Routes } from './shared/enums/routes.enum';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Pieprzyki";
  Routes = Routes;
  href: string;
  isLogged: boolean = false;

  isLoggedIn$ = this.store.pipe(select(loggedIn));
  login$ = this.store.pipe(select(loginSelector));
  role$ = this.store.pipe(select(userRole));

  constructor(private router: Router, private store: Store<AuthState>, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const userContextFromStorage = this.localStorageService.get("user_context");

    if (userContextFromStorage) {
      var parsed = JSON.parse(userContextFromStorage);
      this.store.dispatch(
        userLogged({
          login: parsed.login,
          role: parsed.role,
          id: parsed.id
        })
      );
      this.store.dispatch(
        setUserContext({
          login: parsed.login,
          role: parsed.role,
          id: parsed.id
        })
      );
    }
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onDashboard(path) {
    this.router.navigateByUrl(path);
  }
}
