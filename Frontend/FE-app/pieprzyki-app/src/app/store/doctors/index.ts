import { createFeatureSelector, createSelector } from "@ngrx/store";
import { doctorsFeatureKey } from "./doctors.module";
import * as doctorsActions from "./doctors.actions";
import { DoctorsState } from "./doctors.states";

export const doctorsFeature = createFeatureSelector<DoctorsState>(
  doctorsFeatureKey
);

export const getDoctor = createSelector(
  doctorsFeature,
  (state: DoctorsState) => state.doctor.data
);

export const getAllDoctorsSelector = createSelector(
  doctorsFeature,
  (state: DoctorsState) => state.doctor.data
);

export * from "./doctors.module";
export { doctorsActions };
export { DoctorsState } from "./doctors.states";
