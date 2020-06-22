import { FilesService } from "./files.service";
import { switchMap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  getFileById,
  getFileByIdSuccess,
  getFileByIdFail,
  addFileById,
  addFileByIdSuccess,
  getDescriptionById,
  getDescriptionByIdSuccess,
  getDescriptionByIdFail,
  addDescriptionById,
  addDescriptionByIdSuccess,
  addDescriptionByIdFail,
  addFileByIdFail,
} from "./files.actions";

@Injectable()
export class FilesEffects {
  constructor(private actions$: Actions, private service: FilesService) {}

  getFileById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFileById),
      switchMap((action) =>
        this.service.getFilesId(action.id).pipe(
          switchMap((data: any) => [getFileByIdSuccess({ file: data })]),
          catchError((error) => of(getFileByIdFail({ error: error.error })))
        )
      )
    )
  );

  addFileById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addFileById),
      switchMap((action) =>
        this.service.addFilesById(action.id, action.file).pipe(
          switchMap((data: any) => [addFileByIdSuccess({ file: data })]),
          catchError((error) => of(addFileByIdFail({ error: error.error })))
        )
      )
    )
  );

  getDescriptionById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDescriptionById),
      switchMap((action) =>
        this.service.getDescriptionById(action.id, action.name).pipe(
          switchMap((data: any) => [
            getDescriptionByIdSuccess({ description: data }),
          ]),
          catchError((error) =>
            of(getDescriptionByIdFail({ error: error.error }))
          )
        )
      )
    )
  );

  addDescriptionById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDescriptionById),
      switchMap((action) =>
        this.service
          .addDescriptionById(action.id, action.name, action.description)
          .pipe(
            switchMap((data: any) => [
              addDescriptionByIdSuccess({ description: data }),
            ]),
            catchError((error) =>
              of(addDescriptionByIdFail({ error: error.error }))
            )
          )
      )
    )
  );
}
