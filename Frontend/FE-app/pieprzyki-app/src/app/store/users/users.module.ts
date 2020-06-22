import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./users.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UsersEffects } from "./users.effects";

export const usersFeatureKey = "users";

@NgModule({
  imports: [
    StoreModule.forFeature(usersFeatureKey, reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
})
export class UsersStoreModule {}
