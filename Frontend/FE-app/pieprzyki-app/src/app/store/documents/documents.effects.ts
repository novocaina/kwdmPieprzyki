import { DocumentsService } from "./documents.service";
import { switchMap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {
  getDocumentPatientsById,
  getDocumentPatientsByIdSuccess,
  getDocumentPatientsByIdFail,
  getDocumentExamsById,
  getDocumentExamsByIdSuccess,
  getDocumentExamsByIdFail,
  uploadPatients,
  uploadPatientsSuccess,
  uploadPatientsFail,
  uploadExams,
  uploadExamsSuccess,
  uploadExamsFail,
} from "./documents.actions";
import { of } from "rxjs";

@Injectable()
export class DocumentsEffects {
  constructor(private actions$: Actions, private service: DocumentsService) {}

  getDocumentPatientsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDocumentPatientsById),
      switchMap((action) =>
        this.service.getDocumentPatientsById(action.id).pipe(
          switchMap((data: any) => [
            getDocumentPatientsByIdSuccess({ document: data }),
          ]),
          catchError((error) =>
            of(getDocumentPatientsByIdFail({ error: error.error }))
          )
        )
      )
    )
  );

  getDocumentExamsById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDocumentExamsById),
      switchMap((action) =>
        this.service.getDocumentExamsById(action.id).pipe(
          switchMap((data: any) => [
            getDocumentExamsByIdSuccess({ document: data }),
          ]),
          catchError((error) =>
            of(getDocumentExamsByIdFail({ error: error.error }))
          )
        )
      )
    )
  );

  uploadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadPatients),
      switchMap((action) =>
        this.service.uploadPatients(action.patients).pipe(
          switchMap((data: any) => [uploadPatientsSuccess({ document: data })]),
          catchError((error) => of(uploadPatientsFail({ error: error.error })))
        )
      )
    )
  );

  uploadExams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadExams),
      switchMap((action) =>
        this.service.uploadExams(action.exams).pipe(
          switchMap((data: any) => [uploadExamsSuccess({ document: data })]),
          catchError((error) => of(uploadExamsFail({ error: error.error })))
        )
      )
    )
  );
}
