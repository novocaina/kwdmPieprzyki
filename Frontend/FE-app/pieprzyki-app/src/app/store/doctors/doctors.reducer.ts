import { createReducer, on, Action } from "@ngrx/store";
import { DoctorsState } from "./doctors.states";
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

export const initialState: DoctorsState = {
  doctor: {
    data: null,
    loading: false,
    loaded: false,
    error: null,
  },
};

export const doctorsReducer = createReducer(
  initialState,

  on(getDoctorById, (state) => ({
    ...state,
    doctor: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(getDoctorByIdSuccess, (state, action) => ({
    ...state,
    doctor: {
      data: action.doctor,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getDoctorByIdFail, (state, action) => ({
    ...state,
    doctor: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(getAllDoctors, (state) => ({
    ...state,
    doctor: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(getAllDoctorsSuccess, (state, action) => ({
    ...state,
    doctor: {
      data: action.doctor,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(getAllDoctorsFail, (state, action) => ({
    ...state,
    doctor: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(addOrUpdateDoctorById, (state) => ({
    ...state,
    doctor: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(addOrUpdateDoctorByIdSuccess, (state, action) => ({
    ...state,
    doctor: {
      data: action.doctor,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(addOrUpdateDoctorByIdFail, (state, action) => ({
    ...state,
    doctor: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  })),

  on(deleteDoctorById, (state) => ({
    ...state,
    doctor: {
      data: null,
      loading: true,
      loaded: false,
      error: undefined,
    },
  })),

  on(deleteDoctorByIdSuccess, (state, action) => ({
    ...state,
    doctor: {
      data: null,
      loading: false,
      loaded: true,
      error: undefined,
    },
  })),

  on(deleteDoctorByIdFail, (state, action) => ({
    ...state,
    doctor: {
      data: null,
      loading: false,
      loaded: true,
      error: action.error,
    },
  }))
);

export function reducer(state: DoctorsState | undefined, action: Action) {
  return doctorsReducer(state, action);
}
