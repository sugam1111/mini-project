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