import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './doctors.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DoctorsEffects } from './doctors.effects';

export const doctorsFeatureKey = 'doctors';

@NgModule({
  imports: [
    StoreModule.forFeature(doctorsFeatureKey, reducer),
    EffectsModule.forFeature([DoctorsEffects])
  ],
})

export class DoctorsStoreModule { }
