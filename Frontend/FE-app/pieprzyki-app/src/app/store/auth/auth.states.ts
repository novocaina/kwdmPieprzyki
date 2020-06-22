import { User } from '../users/users.states';

export interface AuthState {
  login: {
    loading: boolean;
    loaded: boolean;
    login: string;
    password: string;
  },
  logout: {
    loading: boolean;
    loaded: boolean;
    error: string;
  },
  user: {
    role: string;
    login: string;
    id: string;
  },
  newUser: {
    role: string;
    login: string;
    error: string;
    confirmPassword: string;
    password: string;
  }
}

export interface LoginModel extends User {
  login: string;
  password: string;
}

export interface Registration extends LoginModel {
  confirmPassword: string;
  userRole: string;
}
