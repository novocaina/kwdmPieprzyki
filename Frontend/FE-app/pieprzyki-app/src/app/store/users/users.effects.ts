import { UsersService } from "./users.service";
import { switchMap, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  getUserById,
  getUserByIdSuccess,
  getUserByIdFail,
  addOrUpdateUserById,
  addOrUpdateUserByIdSuccess,
  addOrUpdateUserByIdFail,
  deleteUserById,
  deleteUserByIdSuccess,
  deleteUserByIdFail,
  getUsers,
  getUsersSuccess,
  getUsersFail,
} from "./users.actions";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private service: UsersService) {}

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserById),
      switchMap((action) =>
        this.service.getUserById(action.id).pipe(
          switchMap((data: any) => [getUserByIdSuccess({ user: data })]),
          catchError((error) => of(getUserByIdFail({ error: error.error })))
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getUsers),
    switchMap((action) =>
      this.service.getUsers().pipe(
        switchMap((data: any) => [getUsersSuccess({ user: data })]),
        catchError((error) => of(getUsersFail({ error: error.error })))
      )
    )
  )
);

  addOrUpdateUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrUpdateUserById),
      switchMap((action) =>
        this.service.addOrUpdateUserById(action.id, action.user).pipe(
          switchMap((data: any) => [
            addOrUpdateUserByIdSuccess({ user: data }),
          ]),
          catchError((error) =>
            of(addOrUpdateUserByIdFail({ error: error.error }))
          )
        )
      )
    )
  );

  deleteUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserById),
      switchMap((action) =>
        this.service.deleteUserById(action.id).pipe(
          switchMap((data: any) => [deleteUserByIdSuccess()]),
          catchError((error) => of(deleteUserByIdFail({ error: error.error })))
        )
      )
    )
  );
}
