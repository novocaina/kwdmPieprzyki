export interface DocumentsState {
  document: {
    data: any;
    loading: boolean;
    loaded: boolean;
    error: string;
  };
  patient: {
    data: any;
  };
}

export interface DocumentPatients {
  patientsID: string[];
  info: Info[];
}

export interface DocumentExam {
  id: string;
  exams: Exam[];
}

export interface PatientInfo {
  email?: string;
  name?: string;
  lastname?: string;
  ageDate?: string;
  city?: string;
  adress?: string;
  postalCode?: string;
  telephoneNumber?: string;
}

export interface Exam {
  date: string;
  description: string;
  title: string;
  medicaments: string[];
}

export interface Info {
  patientId: string;
  info: PatientInfo;
  exams: Exam[];
}
