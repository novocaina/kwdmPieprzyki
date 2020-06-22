import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DocumentsEffects } from "./documents.effects";
import { reducer } from "./documents.reducer";

export const documentsFeatureKey = "documents";

@NgModule({
  imports: [
    StoreModule.forFeature(documentsFeatureKey, reducer),
    EffectsModule.forFeature([DocumentsEffects]),
  ],
})
export class DocumentsStoreModule {}
