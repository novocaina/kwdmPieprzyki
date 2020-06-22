import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './files.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FilesEffects } from './files.effects';

export const filesFeatureKey = 'files';

@NgModule({
  imports: [
    StoreModule.forFeature(filesFeatureKey, reducer),
    EffectsModule.forFeature([FilesEffects])
  ],
})

export class FilesStoreModule { }
