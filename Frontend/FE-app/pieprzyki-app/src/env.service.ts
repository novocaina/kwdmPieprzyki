import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  env: {
    apiUrl: string;
  };

  constructor() {
    const browserWindow: any = window || {};
    this.env = browserWindow.__env || { apiUrl: null };
  }

  getApiUrl() {
    return this.env.apiUrl;
  }
}
