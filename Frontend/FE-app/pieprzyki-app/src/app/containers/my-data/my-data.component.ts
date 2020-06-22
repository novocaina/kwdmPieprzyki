import { Component } from "@angular/core";
import {
  getDocumentExamsById,
  setPatient,
} from "src/app/store/documents/documents.actions";
import { loggedIn } from "src/app/store/auth";
import { select, Store } from "@ngrx/store";
import { getExams, DocumentsState } from "src/app/store/documents";
import { Exam } from "src/app/store/documents/documents.states";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { Routes } from "src/app/shared/enums/routes.enum";

@Component({
  selector: "app-my-data",
  templateUrl: "./my-data.component.html",
  styleUrls: ["./my-data.component.scss"],
})
export class MyDataComponent {
  private sub = new Subscription();
  exams: Exam[];
  displayedColumns = ["date", "examination", "description"];

  idSelector$ = this.store.pipe(select(loggedIn));
  getExams$ = this.store.pipe(select(getExams));

  constructor(private store: Store<DocumentsState>, private router: Router) {}

  onClientSelection(element) {
    this.store.dispatch(setPatient({ patient: element }));
    this.router.navigate([Routes.Dashboard + Routes.Patient]);
  }

  ngOnInit() {
    this.sub.add(
      this.idSelector$.subscribe((id) => {
        if (id) {
          this.store.dispatch(getDocumentExamsById({ id: id }));
        }
      })
    );

    this.sub.add(
      this.getExams$.subscribe((e) => {
        if (e) {
          this.exams = e.data.exams;
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
