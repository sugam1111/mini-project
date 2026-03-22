import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  rollNumber: z
    .string()
    .trim()
    .min(1, "Roll Number is required")
    .refine((val) => !isNaN(Number(val)), "Roll Number must be a number"),
  className: z.string().trim().min(1, "Class is required"),
  math: z
    .string()
    .trim()
    .min(1, "Math mark is required")
    .refine((val) => !isNaN(Number(val)), "Math must be a number"),
  science: z
    .string()
    .trim()
    .min(1, "Science mark is required")
    .refine((val) => !isNaN(Number(val)), "Science must be a number"),
  english: z
    .string()
    .trim()
    .min(1, "English mark is required")
    .refine((val) => !isNaN(Number(val)), "English must be a number"),
});