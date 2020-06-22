import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EnvService } from "src/env.service";
import { Doctor, DoctorsState, DoctorItem } from "./doctors.states";

@Injectable({
  providedIn: "root",
})
export class DoctorsService {
  api: string;

  constructor(envService: EnvService, private http: HttpClient) {
    this.api = envService.getApiUrl();
  }

  getDoctorById(id: string) {
    return this.http.get(`${this.api}doctors/${id}`);
  }

  getAllDoctors() {
    return this.http.get<DoctorItem[]>(`${this.api}doctors/allDoctors`);
  }

  addOrUpdateDoctorById(id: string, doctor: Doctor) {
    return this.http.post(`${this.api}doctors/addOdUpdate/${id}`, {
      model: doctor,
    });
  }

  deleteDoctorById(id: string) {
    return this.http.delete(`${this.api}doctors/${id}`);
  }
}
