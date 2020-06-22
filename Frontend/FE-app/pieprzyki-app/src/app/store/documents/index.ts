import { createFeatureSelector, createSelector } from "@ngrx/store";
import { documentsFeatureKey } from "./documents.module";
import * as usersActions from "./documents.actions";
import { DocumentsState } from "./documents.states";

export const documentsFeature = createFeatureSelector<DocumentsState>(
  documentsFeatureKey
);

export const getPatients = createSelector(
  documentsFeature,
  (state: DocumentsState) => state.document.data
);

export const getPatient = createSelector(
  documentsFeature,
  (state: DocumentsState) => state.patient.data
);

export const getExams = createSelector(
  documentsFeature,
  (state: DocumentsState) => state.document.data
);

export * from "./documents.module";
export { usersActions };
export { DocumentsState } from "./documents.states";
