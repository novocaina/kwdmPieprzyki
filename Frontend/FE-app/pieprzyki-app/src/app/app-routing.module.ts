import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./containers/login-page/login-page.component";
import { DashboardComponent } from "./containers/dashboard/dashboard.component";
import { AuthGuard } from "./auth.guard";
import { RegisterPageComponent } from "./containers/register/register-page.component";
import { SettingsComponent } from "./containers/settings/settings.component";
import { PatientsListComponent } from "./containers/patients-list/patients-list.component";
import { MyDataComponent } from "./containers/my-data/my-data.component";
import { PatientsInfoComponent } from "./containers/patients-info/patients-info.component";
import { AddDataComponent } from './containers/add-data/add-data.component';
import { LoginGuard } from './login.guard';
import { PatientComponent } from './containers/patient/patient.component';
import { AddPatientComponent } from './containers/add-patient/add-patient-page.component';
import { UsersComponent } from './containers/users/users.component';
import { EditPatientComponent } from './containers/edit-patient/edit-patient-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "settings",
        component: SettingsComponent,
      },
      {
        path: "patients-data",
        component: UsersComponent,
      },
      {
        path: "edit-patients-data",
        component: EditPatientComponent,
      },
      {
        path: "add-patient",
        component: AddPatientComponent,
      },
      {
        path: "patients",
        component: PatientsListComponent,
      },
      {
        path: "patients-info",
        component: PatientsInfoComponent,
      },
      {
        path: "patient",
        component: PatientComponent,
      },
      {
        path: "add-data",
        component: AddDataComponent,
      },
      {
        path: "data",
        component: MyDataComponent,
      },
    ],
  },
  {
    path: "*",
    redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
