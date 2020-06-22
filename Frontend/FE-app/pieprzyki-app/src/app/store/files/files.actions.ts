import { createAction, props } from "@ngrx/store";
import { FileModel, Description } from "./files.states";

export const getFileById = createAction(
  "[Files] Get File By Id",
  props<{ id: string }>()
);

export const getFileByIdSuccess = createAction(
  "[Files API] Get File By Id Success",
  props<{ file: FileModel }>()
);

export const getFileByIdFail = createAction(
  "[Files] Get File By Id Fail",
  props<{ error: string }>()
);

export const addFileById = createAction(
  "[Files] Add File By Id",
  props<{ id: string; file: File }>()
);

export const addFileByIdSuccess = createAction(
  "[Files API] Add File By Id Success",
  props<{ file: any }>()
);

export const addFileByIdFail = createAction(
  "[Files] Add File By Id Fail",
  props<{ error: string }>()
);

export const getDescriptionById = createAction(
  "[Files] Get Description By Id",
  props<{ id: string; name: string }>()
);

export const getDescriptionByIdSuccess = createAction(
  "[Files API] Get Description By Id Success",
  props<{ description: Description }>()
);

export const getDescriptionByIdFail = createAction(
  "[Files] Get Description By Id Fail",
  props<{ error: string }>()
);

export const addDescriptionById = createAction(
  "[Files] Add Description By Id",
  props<{ id: string; name: string; description: Description }>()
);

export const addDescriptionByIdSuccess = createAction(
  "[Files API] Add Description By Id Success",
  props<{ description: Description }>()
);

export const addDescriptionByIdFail = createAction(
  "[Files] Add Description By Id Fail",
  props<{ error: string }>()
);
