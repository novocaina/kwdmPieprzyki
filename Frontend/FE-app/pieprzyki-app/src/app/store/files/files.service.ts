import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvService } from "src/env.service";
import { Description } from "./files.states";

@Injectable({
  providedIn: "root",
})
export class FilesService {
  api: string;

  constructor(envService: EnvService, private http: HttpClient) {
    this.api = envService.getApiUrl();
  }

  getFilesId(id: string) {
    return this.http.get(`${this.api}files/images/${id}`);
  }

  addFilesById(id: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const headers = new HttpHeaders().append(
      "Content-Disposition",
      "multipart/form-data"
    );
    return this.http.post(`${this.api}files/upload/${id}`, formData, {
      headers,
    });
  }

  getDescriptionById(id: string, name: string) {
    return this.http.get(`${this.api}files/description/${id}/${name}`);
  }

  addDescriptionById(id: string, name: string, description: Description) {
    return this.http.post(`${this.api}files/uploadDescription/${id}/${name}?description=${description}`, {});
  }
}
