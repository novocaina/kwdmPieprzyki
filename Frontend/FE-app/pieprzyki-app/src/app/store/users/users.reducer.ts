import { createReducer, on, Action } from "@ngrx/store";
import {
  getUserById,
  getUserByIdSuccess,
  getUserByIdFail,
  deleteUserByIdFail,
  addOrUpdateUserById,
  addOrUpdateUserByIdSuccess,
  addOrUpdateUserByIdFail,
  deleteUserById,
  deleteUserByIdSuccess,
  getUsers,
  getUsersSuccess,
  getUsersFail,
} from "./users.actions";
import { UsersState } from "./users.states";

export const initialState: UsersState = {
  user: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  },
  users: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  }
};

export const usersReducer = createReducer(
  initialState,
  on(getUserById, (state) => ({
    ...state,
    user: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(getUserByIdSuccess, (state, action) => ({
    ...state,
    user: {
      data: action.user,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getUserByIdFail, (state, action) => ({
    ...state,
    user: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(getUsers, (state) => ({
    ...state,
    users: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(getUsersSuccess, (state, action) => ({
    ...state,
    users: {
      data: action.user,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getUsersFail, (state, action) => ({
    ...state,
    users: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(addOrUpdateUserById, (state) => ({
    ...state,
    user: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(addOrUpdateUserByIdSuccess, (state, action) => ({
    ...state,
    user: {
      data: action.user,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(addOrUpdateUserByIdFail, (state, action) => ({
    ...state,
    user: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(deleteUserById, (state) => ({
    ...state,
    user: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(deleteUserByIdSuccess, (state, action) => ({
    ...state,
    user: {
      data: null,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(deleteUserByIdFail, (state, action) => ({
    ...state,
    user: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
