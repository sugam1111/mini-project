import type { Column, Table } from "@tanstack/react-table";

export type ReportStatus = "Draft" | "Published" | "Archived";

export interface Report {
  id: string;
  title: string;
  createdBy: string;
  createdAt: string;
  status: ReportStatus;
  remarks: string;
  student: Student;
}

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

export interface ReportDialog {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: Report | null;
}

export interface ReportTableTypes {
  data: Report[];   
  onEdit: (report: Report) => void;
  onAdd: () => void;
}

export interface ColumnFilterTypo<T> {
  column: Column<T, unknown>;
  table: Table<T>;
}

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
