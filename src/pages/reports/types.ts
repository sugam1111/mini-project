import type { Student } from "@/pages/Students/types";
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




export interface ToastProps{
  title: string;
  description?: string;
  name?: string;
  type?: "success" | "error";
  action?: "create" | "update" | "delete";
};
