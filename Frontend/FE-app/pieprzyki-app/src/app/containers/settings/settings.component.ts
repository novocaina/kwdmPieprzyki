import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { UsersState, getUser } from "src/app/store/users";
import {
  getUserById,
  addOrUpdateUserById,
} from "src/app/store/users/users.actions";
import { loggedIn, userRole } from "src/app/store/auth";
import { Roles } from "src/app/shared/enums/roles.enum";
import { User } from "src/app/store/users/users.states";
import {
  addOrUpdateDoctorById,
  getDoctorById,
} from "src/app/store/doctors/doctors.actions";
import { Doctor, DoctorsState } from "src/app/store/doctors/doctors.states";
import { getDoctor } from "src/app/store/doctors";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
  form: FormGroup;
  private sub = new Subscription();
  private id: string;
  private role: string;
  doctor: Doctor;

  getUser$ = this.store.pipe(select(getUser));
  getDoctor$ = this.storeDoctor.pipe(select(getDoctor));
  userRole$ = this.store.pipe(select(userRole));
  idSelector$ = this.store.pipe(select(loggedIn));

  constructor(
    private store: Store<UsersState>,
    private storeDoctor: Store<DoctorsState>
  ) {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      postal: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      licenceNumber: new FormControl("", Validators.required),
      specialisation: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.sub.add(this.idSelector$.subscribe((id) => {
      if (id) {
        this.id = id;
      }
    }));

    this.sub.add(this.userRole$.subscribe((role) => {
      if (role) {
        this.role = role;
        if (this.role === Roles.User) {
          this.store.dispatch(getUserById({ id: this.id }));
        } else {
          this.storeDoctor.dispatch(getDoctorById({ id: this.id }));
        }
      }
    }));

    this.sub.add(this.getUser$.subscribe((u) => {
      if (u) {
        this.doctor = null;
        this.setFormUserData(u.data);
      }
    }));

    this.sub.add(this.getDoctor$.subscribe((d) => {
      if (d) {
        this.doctor = d.data;
        this.setFormDoctorData(d.data);
      }
    }));
  }

  setFormUserData(user) {
    this.form.patchValue({
      email: user.email,
      phone: user.telephoneNumber,
      postal: user.postalCode,
      city: user.city,
      address: user.adress,
      surname: user.lastname,
      name: user.name,
      role: Roles[user.roleId],
    });
  }

  setFormDoctorData(doctor) {
    this.form.patchValue({
      email: doctor.email,
      phone: doctor.telephoneNumber,
      postal: doctor.postalCode,
      city: doctor.city,
      address: doctor.adress,
      surname: doctor.lastname,
      name: doctor.name,
      role: Roles[doctor.roleId],
      licenceNumber: doctor.licenceNumber,
      specialisation: doctor.specialisation,
    });
  }

  save() {
    const formValue = this.form.value;
    if (this.role === Roles.User) {
      this.store.dispatch(
        addOrUpdateUserById({
          id: this.id,
          user: {
            name: formValue.name,
            email: formValue.email,
            lastname: formValue.surname,
            city: formValue.city,
            adress: formValue.address,
            postalCode: formValue.postal,
            telephoneNumber: formValue.phone,
          },
        })
      );
    } else {
      this.store.dispatch(
        addOrUpdateDoctorById({
          id: this.id,
          doctor: {
            name: formValue.name,
            email: formValue.email,
            lastname: formValue.surname,
            city: formValue.city,
            adress: formValue.address,
            postalCode: formValue.postal,
            telephoneNumber: formValue.phone,
            plicenceNumber: formValue.licenceNumber,
            specialisation: formValue.specialisation,
          },
        })
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
