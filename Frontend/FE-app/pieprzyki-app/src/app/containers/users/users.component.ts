import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "src/app/shared/enums/routes.enum";
import { Store, select } from "@ngrx/store";
import { setPatient } from "src/app/store/documents/documents.actions";
import { UsersState, getUsersData } from 'src/app/store/users';
import { getUsers } from 'src/app/store/users/users.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
  private sub = new Subscription();
  users: any = [];
  displayedColumns = [
    "name",
    "surname",
    "address",
    "examination",
    "description",
    "medicamention",
  ];

  getPatients$ = this.store.pipe(select(getUsersData));

  constructor(private router: Router, private store: Store<UsersState>) { }

  ngOnInit() {
    this.store.dispatch(getUsers());
    this.sub.add(this.getPatients$.subscribe(data => {
      if (data) {
        this.users = data.data;
      }
    }))
  }

  onClientSelection(element) {
    this.store.dispatch(setPatient({ patient: element }));
    this.router.navigate([Routes.Dashboard + Routes.EditPatient]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
