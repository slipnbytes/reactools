export interface DocumentFile {
  path: string;
  name: string;
  fullName: string;
  fullPath: string;
  slug: string[];
}

export interface DocumentData {
  title: string;
}

export interface Document {
  content: string;
  info: DocumentFile;
  data: DocumentData;
}
