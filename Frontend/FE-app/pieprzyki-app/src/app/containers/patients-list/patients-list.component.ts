import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "src/app/shared/enums/routes.enum";
import { Store, select } from "@ngrx/store";
import { DocumentsState, getPatients } from "src/app/store/documents";
import { loggedIn } from "src/app/store/auth";
import {
  getDocumentPatientsById,
  setPatient,
} from "src/app/store/documents/documents.actions";
import { Info } from "src/app/store/documents/documents.states";
import { Subscription } from "rxjs";

@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.scss"],
})
export class PatientsListComponent {
  private sub = new Subscription();
  info: Info[];
  displayedColumns = [
    "name",
    "surname",
    "examination",
    "description",
    "medicamention",
  ];

  idSelector$ = this.store.pipe(select(loggedIn));
  getPatients$ = this.store.pipe(select(getPatients));

  constructor(private router: Router, private store: Store<DocumentsState>) {}

  ngOnInit() {
    this.sub.add(
      this.idSelector$.subscribe((id) => {
        if (id) {
          this.store.dispatch(getDocumentPatientsById({ id: id }));
        }
      })
    );

    this.sub.add(
      this.getPatients$.subscribe((data) => {
        if (data) {
          this.info = data.data.info;
        }
      })
    );
  }

  onClientSelection(element) {
    this.store.dispatch(setPatient({ patient: element }));
    this.router.navigate([Routes.Dashboard + Routes.PatientsInfo]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
