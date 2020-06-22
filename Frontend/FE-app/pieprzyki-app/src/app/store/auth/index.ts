import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey } from "./auth.module";
import * as authActions from "./auth.actions";
import { AuthState } from "./auth.states";

export const authFeature = createFeatureSelector<AuthState>(authFeatureKey);

export const loggedIn = createSelector(
  authFeature,
  (state: AuthState) => state.user.id
);

export const userRole = createSelector(
  authFeature,
  (state: AuthState) => state.user.role
);

export const idSelector = createSelector(
  authFeature,
  (state: AuthState) => state.user.id
);

export const loginSelector = createSelector(
  authFeature,
  (state: AuthState) => state.user.login
);

export * from "./auth.module";
export { authActions };
export { AuthState } from "./auth.states";
