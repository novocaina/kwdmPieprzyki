import { createReducer, on, Action } from "@ngrx/store";
import { FilesState } from "./files.states";
import {
  getFileById,
  getFileByIdSuccess,
  getFileByIdFail,
  addFileById,
  addFileByIdSuccess,
  addFileByIdFail,
  getDescriptionById,
  getDescriptionByIdSuccess,
  getDescriptionByIdFail,
  addDescriptionById,
  addDescriptionByIdSuccess,
  addDescriptionByIdFail,
} from "./files.actions";

export const initialState: FilesState = {
  file: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  },
  description: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  },
};

export const filesReducer = createReducer(
  initialState,
  on(getFileById, (state) => ({
    ...state,
    file: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(getFileByIdSuccess, (state, action) => ({
    ...state,
    file: {
      data: action.file,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getFileByIdFail, (state, action) => ({
    ...state,
    file: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(addFileById, (state) => ({
    ...state,
    file: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(addFileByIdSuccess, (state, action) => ({
    ...state,
    file: {
      data: action.file,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(addFileByIdFail, (state, action) => ({
    ...state,
    file: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(getDescriptionById, (state) => ({
    ...state,
    description: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(getDescriptionByIdSuccess, (state, action) => ({
    ...state,
    description: {
      data: action.description,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getDescriptionByIdFail, (state, action) => ({
    ...state,
    description: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(addDescriptionById, (state) => ({
    ...state,
    description: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(addDescriptionByIdSuccess, (state, action) => ({
    ...state,
    description: {
      data: action.description,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(addDescriptionByIdFail, (state, action) => ({
    ...state,
    description: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  }))
);

export function reducer(state: FilesState | undefined, action: Action) {
  return filesReducer(state, action);
}
