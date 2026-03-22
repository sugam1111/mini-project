import { z } from "zod";

export const reportSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  createdBy: z.string().trim().min(1, "Created By is required"),
  status: z.enum(["Draft", "Published", "Archived"]),
  remarks: z.string().trim().min(1, "Remarks is required"),
  studentName: z.string().trim().min(1, "Student Name is required"),
  studentClass: z.string().trim().min(1, "Student Class is required"),
});