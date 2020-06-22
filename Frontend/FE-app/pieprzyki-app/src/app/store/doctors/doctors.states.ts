import { User } from "../users/users.states";

export interface DoctorsState {
  doctor: {
    data: any;
    loading: boolean;
    loaded: boolean;
    error: string;
  };
}

export interface Doctor extends User {
  plicenceNumber?: string;
  specialisation?: string;
}

export interface DoctorItem {
  model?: Doctor;
  eTag?: string;
  timestamp: string;
  rowKey?: string;
  partitionKey?: string;
}
