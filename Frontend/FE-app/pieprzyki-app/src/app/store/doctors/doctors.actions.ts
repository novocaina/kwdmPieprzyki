import { createAction, props } from "@ngrx/store";
import { Doctor } from "./doctors.states";

export const getDoctorById = createAction(
  "[Doctors] Get Doctor By Id",
  props<{ id: string }>()
);

export const getDoctorByIdSuccess = createAction(
  "[Doctors API] Get Doctor By Id Success",
  props<{ doctor: Doctor }>()
);

export const getDoctorByIdFail = createAction(
  "[Doctors] Get Doctor By Id Fail",
  props<{ error: string }>()
);

export const getAllDoctors = createAction("[Doctors] Get All Doctors");

export const getAllDoctorsSuccess = createAction(
  "[Doctors API] Get All Doctors Success",
  props<{ doctor: any }>()
);

export const getAllDoctorsFail = createAction(
  "[Doctors] Get All Doctors Fail",
  props<{ error: string }>()
);

export const addOrUpdateDoctorById = createAction(
  "[Doctors] Add Or Update Doctor By Id",
  props<{ id: string; doctor: Doctor }>()
);

export const addOrUpdateDoctorByIdSuccess = createAction(
  "[Doctors API] Add Or Update Doctor By Id Success",
  props<{ doctor: Doctor }>()
);

export const addOrUpdateDoctorByIdFail = createAction(
  "[Doctors] Add Or Update Doctor By Id Fail",
  props<{ error: string }>()
);

export const deleteDoctorById = createAction(
  "[Doctors] Delete Doctor",
  props<{ id: string }>()
);

export const deleteDoctorByIdSuccess = createAction(
  "[Doctors] Delete Doctor Success"
);

export const deleteDoctorByIdFail = createAction(
  "[Doctors] Delete Doctor Fail",
  props<{ error: string }>()
);
