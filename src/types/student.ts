export interface Marks {
  math: number;
  science: number;
  english: number;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: number;
  class: string;
  marks: Marks;
}

export interface StudentFormState {
  name: string;
  rollNumber: string;
  className: string;
  math: string;
  science: string;
  english: string;
};