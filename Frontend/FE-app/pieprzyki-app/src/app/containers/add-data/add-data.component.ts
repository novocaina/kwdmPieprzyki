import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FilesState } from "src/app/store/files";
import { Store, select } from "@ngrx/store";
import { addFileById } from "src/app/store/files/files.actions";
import {
  getDoctor,
  DoctorsState,
  getAllDoctorsSelector,
} from "src/app/store/doctors";
import { getAllDoctors } from "src/app/store/doctors/doctors.actions";
import { DoctorItem } from "src/app/store/doctors/doctors.states";

@Component({
  selector: "app-add-data",
  templateUrl: "./add-data.component.html",
  styleUrls: ["./add-data.component.scss"],
})
export class AddDataComponent implements OnInit {
  files: any[] = [];
  public id;
  public doctorsList: DoctorItem[];
  private sub = new Subscription();
  getAllDoctorsSelector$ = this.storeDoctor.pipe(select(getAllDoctorsSelector));

  constructor(
    private store: Store<FilesState>,
    private storeDoctor: Store<DoctorsState>
  ) {}

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      this.store.dispatch(
        addFileById({
          id: this.id,
          file: element,
        })
      );
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  ngOnInit() {
    this.storeDoctor.dispatch(getAllDoctors());
    this.sub.add(
      this.getAllDoctorsSelector$.subscribe((d) => {
        if (d) {
          this.doctorsList = d.data;
        }
      })
    );
  }

  onSelectOption(event) {
    this.id = event.source.value;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
