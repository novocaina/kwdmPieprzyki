import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Form] Login',
  props<{ login: string; password: string; }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ login: string; }>()
);

export const register = createAction(
  '[Login Form] Register',
  props<{ login: string; password: string; role: string; confirmPassword: string; name: string; lastname: string; city: string; adress: string; postalCode:string; telephoneNumber: string }>()
);

export const registerSuccess = createAction(
  '[Auth API] Register Success',
  props<{ login: string; }>()
);

export const registerFail = createAction(
  '[Auth API] Register Fail',
  props<{ errorMsg: string; }>()
);

export const userLogged = createAction(
  '[Auth API] User Logged',
  props<{ login: string; role: string; id: string; }>()
);

export const loginFail = createAction(
  '[Auth API] Login Fail',
  props<{ errorMsg: string; }>()
);

export const logout = createAction(
  '[Menu] Logout'
);

export const logoutSuccess = createAction(
  '[Auth API] Logout Success'
);

export const logoutFail = createAction(
  '[Auth API] Logout Fail',
  props<{ errorMsg: string; }>()
);

export const setUserContext = createAction(
  '[Auth Effect] Set User Context',
  props<{ login: string; role: string; id: string; }>()
);

