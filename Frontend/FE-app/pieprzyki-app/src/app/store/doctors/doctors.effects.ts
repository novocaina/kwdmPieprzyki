import { DoctorsService } from "./doctors.service";
import { switchMap, catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  getDoctorById,
  getDoctorByIdSuccess,
  getDoctorByIdFail,
  addOrUpdateDoctorById,
  addOrUpdateDoctorByIdSuccess,
  addOrUpdateDoctorByIdFail,
  deleteDoctorById,
  deleteDoctorByIdSuccess,
  deleteDoctorByIdFail,
  getAllDoctors,
  getAllDoctorsSuccess,
  getAllDoctorsFail,
} from "./doctors.actions";

@Injectable()
export class DoctorsEffects {
  constructor(private actions$: Actions, private service: DoctorsService) {}

  getDoctorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDoctorById),
      switchMap((action) =>
        this.service.getDoctorById(action.id).pipe(
          switchMap((data: any) => [getDoctorByIdSuccess({ doctor: data })]),
          catchError((error) => of(getDoctorByIdFail({ error: error.error })))
        )
      )
    )
  );

  getAllDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllDoctors),
      switchMap(() =>
        this.service.getAllDoctors().pipe(
          map(
            (result) => getAllDoctorsSuccess({ doctor: result }),
            catchError((error) => of(getAllDoctorsFail({ error: error.error })))
          )
        )
      )
    )
  );

  addOrUpdateDoctorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrUpdateDoctorById),
      switchMap((action) =>
        this.service.addOrUpdateDoctorById(action.id, action.doctor).pipe(
          switchMap((data: any) => [
            addOrUpdateDoctorByIdSuccess({ doctor: data }),
          ]),
          catchError((error) =>
            of(addOrUpdateDoctorByIdFail({ error: error.error }))
          )
        )
      )
    )
  );

  deleteDoctorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDoctorById),
      switchMap((action) =>
        this.service.deleteDoctorById(action.id).pipe(
          switchMap((data: any) => [deleteDoctorByIdSuccess()]),
          catchError((error) =>
            of(deleteDoctorByIdFail({ error: error.error }))
          )
        )
      )
    )
  );
}
