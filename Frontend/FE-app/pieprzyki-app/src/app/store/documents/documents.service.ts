import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DocumentPatients, DocumentExam } from "./documents.states";
import { EnvService } from "src/env.service";

@Injectable({
  providedIn: "root",
})
export class DocumentsService {
  api: string;

  constructor(envService: EnvService, private http: HttpClient) {
    this.api = envService.getApiUrl();
  }

  getDocumentPatientsById(id: string) {
    return this.http.get(`${this.api}documents/patients/${id}`, {
      params: { id },
    });
  }

  getDocumentExamsById(id: string) {
    return this.http.get(`${this.api}documents/examinations/${id}`, {
      params: { id },
    });
  }

  uploadPatients(patients: DocumentPatients) {
    return this.http.post(`${this.api}documents/patients`, patients);
  }

  uploadExams(exams: DocumentExam) {
    return this.http.post(`${this.api}documents/examinations`, exams);
  }
}
