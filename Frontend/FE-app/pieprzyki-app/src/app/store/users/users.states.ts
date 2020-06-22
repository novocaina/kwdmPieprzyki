export interface UsersState {
  user: {
    data: any;
    loading: boolean;
    loaded: boolean;
    error: string;
  };
  users: {
    data: any;
    loading: boolean;
    loaded: boolean;
    error: string;
  }
}

export interface User {
  id?: string;
  roleId?: any;
  email?:string;
  name?: string;
  lastname?: string;
  ageDate?: string;
  city?: string;
  adress?: string;
  postalCode?: string;
  telephoneNumber?: string;
  doctorId?: string;
}
