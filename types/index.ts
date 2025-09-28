export interface Subject {
  _id: string;
  name: string;
  code?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  _id: string;
  subjectId: string;
  title: string;
  year: string;
  fileUrl: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
}