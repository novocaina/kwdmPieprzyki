import { createAction, props } from "@ngrx/store";
import { User } from "./users.states";

export const getUserById = createAction(
  "[Users] Get User By Id",
  props<{ id: string }>()
);

export const getUserByIdSuccess = createAction(
  "[Users API] Get User By Id Success",
  props<{ user: any }>()
);

export const getUsersFail = createAction(
  "[Users] Get Users Fail",
  props<{ error: string }>()
);

export const getUsers = createAction(
  "[Users] Get Users");

export const getUsersSuccess = createAction(
  "[Users API] Get Users Success",
  props<{ user: any }>()
);

export const getUserByIdFail = createAction(
  "[Users] Get User By Id Fail",
  props<{ error: string }>()
);

export const addOrUpdateUserById = createAction(
  "[Users] Add Or Update User By Id",
  props<{ id: string; user: User }>()
);

export const addOrUpdateUserByIdSuccess = createAction(
  "[Users API] Add Or Update User By Id Success",
  props<{ user: any }>()
);

export const addOrUpdateUserByIdFail = createAction(
  "[Users] Add Or Update User By Id Fail",
  props<{ error: string }>()
);

export const deleteUserById = createAction(
  "[Users] Delete User",
  props<{ id: string }>()
);

export const deleteUserByIdSuccess = createAction(
  "[Users] Delete User Success"
);

export const deleteUserByIdFail = createAction(
  "[Users] Delete User Fail",
  props<{ error: string }>()
);
