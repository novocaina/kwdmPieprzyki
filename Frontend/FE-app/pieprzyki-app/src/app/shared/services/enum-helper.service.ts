import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumHelperService {
  constructor() {
  }

  static getNamesAndValues<T extends number>(e: any) {
    return EnumHelperService.getNames(e).map(n => ({ name: n, value: e[n] as T }));
  }

  static getNames(e: any) {
    return Object.keys(e).map(key => e[key]).filter(value => typeof value === 'string') as string[];
  }

  static getValues<T extends number>(e: any) {
    return Object.keys(e)
      .map(k => e[k])
      .filter(v => typeof v === 'number') as T[];
  }
}
