import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./users.states";
import { EnvService } from "src/env.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  api: string;

  constructor(envService: EnvService, private http: HttpClient) {
    this.api = envService.getApiUrl();
  }

  getUserById(id: string) {
    return this.http.get(`${this.api}users/${id}`, { params: { id } });
  }

  getUsers() {
    return this.http.get(`${this.api}users/allUsers`);
  }

  addOrUpdateUserById(id: string, user: User) {
    return this.http.post(`${this.api}users/addOdUpdate/${id}`, user);
  }

  deleteUserById(id: string) {
    return this.http.delete(`${this.api}users/${id}`);
  }
}
