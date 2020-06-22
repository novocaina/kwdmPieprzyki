import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Router } from "@angular/router";
import { Routes } from "src/app/shared/enums/routes.enum";
import { UsersState } from 'src/app/store/users';
import { DoctorsState, getAllDoctorsSelector } from 'src/app/store/doctors';
import { Subscription } from 'rxjs';
import { getAllDoctors } from "src/app/store/doctors/doctors.actions";
import { DoctorItem } from "src/app/store/doctors/doctors.states";
import { AuthState } from 'src/app/store/auth';
import { getPatient, DocumentsState } from 'src/app/store/documents';
import { addOrUpdateUserById } from 'src/app/store/users/users.actions';
import { User } from 'src/app/store/users/users.states';

@Component({
  selector: "app-edit-patient-page",
  templateUrl: "./edit-patient-page.component.html",
  styleUrls: ["./edit-patient-page.component.scss"],
})
export class EditPatientComponent implements OnInit {
  private id: string;
  registerForm: FormGroup;
  sub = new Subscription();
  doctors: DoctorItem[];

  getAllDoctorsSelector$ = this.storeDoctor.pipe(select(getAllDoctorsSelector));
  doctors$ = this.storeDoctor.dispatch(getAllDoctors());
  patient$ = this.docstore.pipe(select(getPatient));

  constructor(private docstore: Store<DocumentsState>, private store: Store<UsersState>, private storeAuth: Store<AuthState>, private router: Router, private storeDoctor: Store<DoctorsState>) { }

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

    this.sub.add(this.patient$.subscribe((params) => {
      if (params) {
        this.id = params.partitionKey;

        this.registerForm.patchValue({
          address: params.model.adress,
          phone: params.model.telephoneNumber,
          city: params.model.city,
          postal: params.model.postalCode,
          surname: params.model.lastname,
          name: params.model.name,
          doctorId: 'bde35821-eeb2-41c8-9271-c2538e0e80d5',
        });
      }
    }));
  }

  createAccount() {
    const formValue = this.registerForm.value;

    const user: User = {
      id: this.id,
      email: formValue.email,
      roleId: 'User',
      name: formValue.name,
      lastname: formValue.surname,
      city: formValue.city,
      adress: formValue.address,
      postalCode: formValue.postal,
      telephoneNumber: formValue.phone,
      doctorId: formValue.doctorId
    }
    this.store.dispatch(addOrUpdateUserById({ id: this.id, user: user }));
    this.router.navigate([Routes.Dashboard]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
