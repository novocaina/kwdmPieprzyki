import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { DocumentsState, getPatient } from "src/app/store/documents";
import { Store, select } from "@ngrx/store";
import {
  getFileById,
  getDescriptionById,
  addDescriptionById,
} from "src/app/store/files/files.actions";
import { getFile, getDescription } from "src/app/store/files";
import { Router } from "@angular/router";
import { Routes } from "src/app/shared/enums/routes.enum";
import { uploadExams } from "src/app/store/documents/documents.actions";

@Component({
  selector: "app-patients-info",
  templateUrl: "./patients-info.component.html",
  styleUrls: ["./patients-info.component.scss"],
})
export class PatientsInfoComponent {
  private sub = new Subscription();
  form: FormGroup;
  examForm: FormGroup;
  nameOfMedicalUnit: string;
  examination: string;
  examinationAddress: string;
  examinationData: string;
  photoContent: any;
  descritpion: any;
  descritpionFrom: any;
  id: any;
  data: any;
  showForm: boolean;
  predictions: string[] = [];

  patient$ = this.store.pipe(select(getPatient));
  photo$ = this.store.pipe(select(getFile));
  description$ = this.store.pipe(select(getDescription));

  constructor(private store: Store<DocumentsState>, private router: Router) {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      address: new FormControl(),
      surname: new FormControl(),
      name: new FormControl(),
      examination: new FormControl(),
      doctor: new FormControl(),
      nameOfMedicalUnit: new FormControl(),
      examinationData: new FormControl(),
      examinationAddress: new FormControl(),
      examinationDescription: new FormControl(),
      examinationMed: new FormControl(),
      doctorDesc: new FormControl(),
    });
  }

  onSave(path) {
    const form = this.form.value;

    this.store.dispatch(
      addDescriptionById({
        id: this.id,
        name: this.getPhotoName(path),
        description: form.doctorDesc,
      })
    );
    this.router.navigateByUrl(Routes.Dashboard);
  }

  getPhotoName(path: string) {
    let list = path.split("/", 6);
    let imageName = list[5].split("?", 1);
    return imageName.toString();
  }

  onCheck(path) {
    this.store.dispatch(
      getDescriptionById({ id: this.id, name: this.getPhotoName(path) })
    );
  }

  ngOnInit() {
    this.sub.add(
      this.patient$.subscribe((params) => {
        if (params) {
          this.id = params.patientId;
          this.store.dispatch(getFileById({ id: params.patientId }));
          this.form.patchValue({
            address: params.info.adress,
            surname: params.info.lastname,
            name: params.info.name,
            examinationDescription: params.exams[0].description,
            examinationMed: params.exams[0].medicaments.join(","),
            doctor: params.doctor.name + ' ' + params.doctor.lastname
          });
          this.examinationData = params.exams[0].date;
        }
      })
    );

    this.sub.add(
      this.photo$.subscribe((params) => {
        if (params) {
          this.photoContent = params.data;
          this.photoContent.forEach((element, index) => {
            if (element && element.descriptions && element.descriptions.Prediction) {
              const pred = element.descriptions.Prediction;
              this.predictions[index] = pred == 0 ? 'Zmiana łagodna' : 'Zmiana złościwa';
            }
          });
        }
      })
    );

    this.sub.add(
      this.description$.subscribe((params) => {
        if (params) {
          this.descritpion = params;
        }
      })
    );

    this.examForm = new FormGroup({
      date: new FormControl(),
      descrip: new FormControl(),
      nameExam: new FormControl(),
      drugs: new FormControl(),
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  create() {
    const formValue = this.examForm.value;
    this.store.dispatch(
      uploadExams({
        exams: {
          id: this.id,
          exams: [
            {
              date: formValue.date,
              description: formValue.descrip,
              title: formValue.nameExam,
              medicaments: [formValue.drugs],
            },
          ],
        },
      })
    );

    this.router.navigateByUrl(Routes.Login);
  }

  addExam() {
    this.showForm = true;
  }
  get show() {
    return this.showForm === true;
  }
}
