import { createReducer, on, Action } from "@ngrx/store";
import { DocumentsState } from "./documents.states";
import {
  getDocumentPatientsById,
  getDocumentPatientsByIdSuccess,
  getDocumentPatientsByIdFail,
  getDocumentExamsById,
  getDocumentExamsByIdSuccess,
  getDocumentExamsByIdFail,
  uploadPatients,
  uploadPatientsSuccess,
  uploadPatientsFail,
  uploadExams,
  uploadExamsSuccess,
  uploadExamsFail,
  setPatient,
} from "./documents.actions";

export const initialState: DocumentsState = {
  document: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  },
  patient:{
    data: null
  }
};

export const documentsReducer = createReducer(
  initialState,
  on(getDocumentPatientsById, (state) => ({
    ...state,
    document: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(setPatient, (state, action) => ({
    ...state,
    patient: {
      data: action.patient,
    },
  })),

  on(getDocumentPatientsByIdSuccess, (state, action) => ({
    ...state,
    document: {
      data: action.document,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getDocumentPatientsByIdFail, (state, action) => ({
    ...state,
    document: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(getDocumentExamsById, (state) => ({
    ...state,
    document: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(getDocumentExamsByIdSuccess, (state, action) => ({
    ...state,
    document: {
      data: action.document,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getDocumentExamsByIdFail, (state, action) => ({
    ...state,
    document: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(uploadPatients, (state) => ({
    ...state,
    document: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(uploadPatientsSuccess, (state, action) => ({
    ...state,
    document: {
      data: action.document,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(uploadPatientsFail, (state, action) => ({
    ...state,
    document: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(uploadExams, (state) => ({
    ...state,
    document: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(uploadExamsSuccess, (state, action) => ({
    ...state,
    document: {
      data: action.document,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(uploadExamsFail, (state, action) => ({
    ...state,
    document: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  }))
);

export function reducer(state: DocumentsState | undefined, action: Action) {
  return documentsReducer(state, action);
}
