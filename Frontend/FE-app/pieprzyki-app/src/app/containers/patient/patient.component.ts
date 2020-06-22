import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { DocumentsState, getExams } from "src/app/store/documents";
import { Store, select } from "@ngrx/store";
import {
  getFileById,
  getDescriptionById,
} from "src/app/store/files/files.actions";
import { getFile, getDescription } from "src/app/store/files";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { getUserById } from "src/app/store/users/users.actions";
import { getUser } from "src/app/store/users";

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"],
})
export class PatientComponent {
  private sub = new Subscription();
  form: FormGroup;
  nameOfMedicalUnit: string;
  examination: string;
  examinationAddress: string;
  examinationData: string;
  photoContent: any;
  descritpion: any;
  descritpionFrom: any;
  predictions: string[] = [];
  id: any;

  getUser$ = this.store.pipe(select(getUser));
  photo$ = this.store.pipe(select(getFile));
  description$ = this.store.pipe(select(getDescription));
  getExams$ = this.store.pipe(select(getExams));

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<DocumentsState>
  ) {
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
    });
  }

  getPhotoName(path: string) {
    let list = path.split("/", 6);
    let imageName = list[5].split("?", 1);
    return imageName.toString();
  }

  ngOnInit() {
    const userContextFromStorage = this.localStorageService.get("user_context");
    if (userContextFromStorage) {
      var parsed = JSON.parse(userContextFromStorage);
      this.store.dispatch(getUserById({ id: parsed.data.id }));
      this.store.dispatch(getFileById({ id: parsed.data.id }));
    }

    this.sub.add(
      this.getUser$.subscribe((params) => {
        if (params) {
          this.id = params.patientId;

          this.form.patchValue({
            address: params.data.adress,
            surname: params.data.lastname,
            name: params.data.name,
          });
        }
      })
    );
    this.sub.add(
      this.getExams$.subscribe((params) => {
        if (params) {
          this.form.patchValue({
            examinationDescription: params.data.exams[0].description,
            examinationMed: params.data.exams[0].medicaments.join(",")
          });

          this.examinationData = params.date;
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
            this.store.dispatch(getDescriptionById({ id: parsed.data.id, name: this.getPhotoName(element.path) }));
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
