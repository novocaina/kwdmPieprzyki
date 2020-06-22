import { createFeatureSelector, createSelector } from "@ngrx/store";
import { usersFeatureKey } from "./users.module";
import * as usersActions from "./users.actions";
import { UsersState } from "./users.states";

export const usersFeature = createFeatureSelector<UsersState>(usersFeatureKey);

export const getUser = createSelector(
  usersFeature,
  (state: UsersState) => state.user.data
);

export const getUsersData = createSelector(
  usersFeature,
  (state: UsersState) => state.users.data
);

export * from "./users.module";
export { usersActions };
export { UsersState } from "./users.states";
