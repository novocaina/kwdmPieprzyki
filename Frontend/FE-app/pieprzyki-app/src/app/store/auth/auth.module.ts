import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import {MatSnackBarModule} from '@angular/material/snack-bar'

export const authFeatureKey = 'auth';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeatureKey, reducer),
    EffectsModule.forFeature([AuthEffects]),
    MatSnackBarModule
  ],
})

export class AuthStoreModule { }
