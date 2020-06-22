import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Router } from "@angular/router";
import { Routes } from "src/app/shared/enums/routes.enum";
import { UsersState } from 'src/app/store/users';
import { addOrUpdateUserById } from 'src/app/store/users/users.actions';
import { User } from 'src/app/store/users/users.states';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { DoctorsState, getAllDoctorsSelector } from 'src/app/store/doctors';
import { Subscription } from 'rxjs';
import { getAllDoctors } from "src/app/store/doctors/doctors.actions";
import { DoctorItem } from "src/app/store/doctors/doctors.states";
import { AuthState } from 'src/app/store/auth';
import { register } from 'src/app/store/auth/auth.actions';

@Component({
  selector: "app-add-patient-page",
  templateUrl: "./add-patient-page.component.html",
  styleUrls: ["./add-patient-page.component.scss"],
})
export class AddPatientComponent implements OnInit {
  registerForm: FormGroup;
  doctors: DoctorItem[];
  getAllDoctorsSelector$ = this.storeDoctor.pipe(select(getAllDoctorsSelector));
  doctors$ = this.storeDoctor.dispatch(getAllDoctors());
  sub = new Subscription();

  constructor(private store: Store<UsersState>, private storeAuth: Store<AuthState>, private router: Router, private storeDoctor: Store<DoctorsState>) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      repPassword: new FormControl(),
      phone: new FormControl(),
      postal: new FormControl(),
      city: new FormControl(),
      address: new FormControl(),
      surname: new FormControl(),
      name: new FormControl(),
      doctorId: new FormControl()
    });

    this.sub.add(
      this.getAllDoctorsSelector$.subscribe((d) => {
        if (d) {
          this.doctors = d.data;
        }
      })
    );
  }

  createAccount() {
    const formValue = this.registerForm.value;

    console.log(formValue);
    this.storeAuth.dispatch(
      register({
        login: formValue.email,
        password: 'Test123.',
        role: 'User',
        confirmPassword: 'Test123.',
        name: formValue.name,
        lastname: formValue.surname,
        city: formValue.city,
        adress: formValue.address,
        postalCode: formValue.postal,
        telephoneNumber: formValue.phone
      })
    );

    this.router.navigate([Routes.Dashboard]);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
