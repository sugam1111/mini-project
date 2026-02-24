import type { Student } from "./student";

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