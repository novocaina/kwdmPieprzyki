import {
  BrowserModule,
  EVENT_MANAGER_PLUGINS,
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ClickModifiersPlugin } from "./shared/plugins/click-modifier.plugin";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { LoginPageComponent } from "./containers/login-page/login-page.component";
import { AuthGuard } from "./auth.guard";
import { AuthStoreModule } from "./store/auth";
import { CommonModule } from "@angular/common";
import { RegisterPageComponent } from "./containers/register/register-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SettingsComponent } from "./containers/settings/settings.component";
import { PatientsListComponent } from "./containers/patients-list/patients-list.component";
import { MyDataComponent } from "./containers/my-data/my-data.component";
import { PatientsInfoComponent } from "./containers/patients-info/patients-info.component";
import { AddDataComponent } from "./containers/add-data/add-data.component";
import { DoctorsStoreModule } from "./store/doctors";
import { FilesStoreModule } from "./store/files";
import { UsersStoreModule } from "./store/users";
import { LoginGuard } from "./login.guard";
import { DragDropDirective } from "./shared/directives/drag-and-drop.directive";
import { HasRoleDirective } from "./shared/directives/has-role.directive";
import { DocumentsStoreModule } from "./store/documents/documents.module";
import { PatientComponent } from './containers/patient/patient.component';
import { AddPatientComponent } from './containers/add-patient/add-patient-page.component';
import { UsersComponent } from './containers/users/users.component';
import { EditPatientComponent } from './containers/edit-patient/edit-patient-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    MyDataComponent,
    AddPatientComponent,
    DragDropDirective,
    EditPatientComponent,
    SettingsComponent,
    PatientsListComponent,
    AddDataComponent,
    DashboardComponent,
    HasRoleDirective,
    LoginPageComponent,
    UsersComponent,
    RegisterPageComponent,
    PatientsInfoComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    CommonModule,
    StoreDevtoolsModule.instrument({
      name: "pieprzyki",
      maxAge: 50,
      logOnly: environment.production,
    }),
    HttpClientModule,
    AuthStoreModule,
    DoctorsStoreModule,
    FilesStoreModule,
    UsersStoreModule,
    DocumentsStoreModule,
  ],
  providers: [
    HttpClient,
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: ClickModifiersPlugin,
      multi: true,
    },
    AuthGuard,
    LoginGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
