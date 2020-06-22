import { createReducer, on, Action } from '@ngrx/store';
import { login, loginFail, loginSuccess, logout, logoutSuccess, setUserContext, logoutFail, userLogged, register, registerSuccess, registerFail } from './auth.actions';
import { AuthState } from './auth.states';

export const initialState: AuthState = {
  login: {
    loading: false,
    loaded: false,
    login: null,
    password: null
  },
  logout: {
    loading: false,
    loaded: false,
    error: null
  },
  user: {
    role: undefined,
    login: undefined,
    id: undefined
  },
  newUser: {
    confirmPassword: null,
    password: null,
    login: null,
    role: undefined,
    error: null,
  }
};

export const authReducer = createReducer(initialState,

  on(login, (state) => ({
    ...state,
    login: {
      password: null,
      login: null,
      loading: true,
      loaded: false,
      error: undefined
    }
  })),

  on(loginSuccess, (state, action) => ({
    ...state,
    login: {
      login: action.login,
      password: null,
      loading: false,
      loaded: true,
      error: undefined
    }
  })),

  on(loginFail, (state, action) => ({
    ...state,
    login: {
      password: null,
      login: null,
      loading: false,
      loaded: true,
      error: action.errorMsg
    }
  })),

  on(register, (state, action) => ({
    ...state,
    newUser: {
      role: action.role,
      login: action.login
    }
  })),

  on(registerSuccess, (state, action) => ({
    ...state,
    newUser: {
      login: action.login
    }
  })),

  on(registerFail, (state, action) => ({
    ...state,
    newUser: {
      confirmPassword: null,
      password: null,
      login: null,
      role: undefined,
      error: action.errorMsg
    }
  })),

  on(userLogged, (state, action) => ({
    ...state,
    login: {
      confirmPassword: null,
      password: null,
      login: action.login,
      role: action.role,
      loading: false,
      loaded: true,
      error: undefined
    },
    user: {
      id: action.id,
      role: action.role,
      login: action.login
    }
  })),

  on(logout, (state) => ({
    ...state,
    logout: {
      loading: true,
      loaded: false,
      error: undefined
    }
  })),

  on(logoutSuccess, (state) => ({
    ...state,
    logout: {
      loading: false,
      loaded: true,
      error: undefined
    },
    user: {
      id: undefined,
      role: undefined,
      login: undefined,
      username: undefined
    }
  })),

  on(logoutFail, (state, action) => ({
    ...state,
    logout: {
      loading: false,
      loaded: true,
      error: action.errorMsg
    }
  })),

  on(setUserContext, (state, action) => ({
    ...state,
    user: {
      role: action.role,
      login: action.login,
      id: action.id
    }
  }))

);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
