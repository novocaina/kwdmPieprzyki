import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filesFeatureKey } from './files.module';
import * as filesActions from './files.actions';
import { FilesState } from './files.states';

export const filesFeature = createFeatureSelector<FilesState>(filesFeatureKey);

export const getDescription = createSelector(filesFeature,
  (state: FilesState) => state.description.data
);

export const getFile = createSelector(
  filesFeature,
  (state: FilesState) => state.file.data
);

export * from './files.module';
export { filesActions };
export { FilesState } from './files.states';
