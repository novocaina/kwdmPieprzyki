import { createAction, props } from "@ngrx/store";
import { DocumentPatients, DocumentExam, Info } from "./documents.states";

export const getDocumentPatientsById = createAction(
  "[Documents] Get Document Patients By Id",
  props<{ id: string }>()
);

export const getDocumentPatientsByIdSuccess = createAction(
  "[Documents API] Get Document Patients By Id Success",
  props<{ document: any }>()
);

export const getDocumentPatientsByIdFail = createAction(
  "[Documents] Get Document Patients By Id Fail",
  props<{ error: string }>()
);

export const getDocumentExamsById = createAction(
  "[Documents] Get Document Exams By Id",
  props<{ id: string }>()
);

export const getDocumentExamsByIdSuccess = createAction(
  "[Documents API] Get Document Exams By Id Success",
  props<{ document: any }>()
);

export const getDocumentExamsByIdFail = createAction(
  "[Documents] Get Document Exams By Id Fail",
  props<{ error: string }>()
);

export const uploadPatients = createAction(
  "[Documents] Upload Patients",
  props<{ patients: DocumentPatients }>()
);

export const setPatient = createAction(
  "[Documents] Set Patient",
  props<{ patient: Info }>()
);

export const uploadPatientsSuccess = createAction(
  "[Documents API] Upload Patients Success",
  props<{ document: any }>()
);

export const uploadPatientsFail = createAction(
  "[Documents] Upload Patients Fail",
  props<{ error: string }>()
);

export const uploadExams = createAction(
  "[Documents] Upload Exams",
  props<{ exams: DocumentExam }>()
);

export const uploadExamsSuccess = createAction(
  "[Documents API] Upload Exams Success",
  props<{ document: any }>()
);

export const uploadExamsFail = createAction(
  "[Documents] Upload Exams Fail",
  props<{ error: string }>()
);
