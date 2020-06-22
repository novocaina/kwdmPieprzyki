export interface FilesState {
  file: {
    data: any;
    loading: boolean;
    loaded: boolean;
    error: string;
  };
  description: {
    data: Description;
    loading: boolean;
    loaded: boolean;
    error: string;
  };
}

export interface FileModel {
  file?: any;
}

export interface Description {
  description?: string;
}
