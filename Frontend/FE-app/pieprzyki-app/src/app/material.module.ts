import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatExpansionModule,
  MatRadioModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatBadgeModule
} from "@angular/material";

const modules = [
  CommonModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatExpansionModule,
  MatRadioModule,
  MatTooltipModule,
  NgSelectModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatBadgeModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [],
})
export class MaterialModule {}
