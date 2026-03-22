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

export interface StudentFormProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing?: Student | null;
};

export interface StudentTableProps {
  data: Student[];
  onEdit: (student: Student) => void;
  onAdd: () => void;
};


export interface ToastProps{
  title: string;
  description?: string;
  name?: string;
  type?: "success" | "error";
  action?: "create" | "update" | "delete";
};

