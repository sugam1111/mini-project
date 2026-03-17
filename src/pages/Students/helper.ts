import type { Student } from "@/types/student";
import axios from "axios";

const STUDENT_API = import.meta.env.VITE_STUDENTS_API;

export async function getStudents(): Promise<Student[]> {
  const stored = localStorage.getItem("students");
  if (stored) return JSON.parse(stored) as Student[];

  const response = await axios.get<Student[]>(STUDENT_API);
  localStorage.setItem("students", JSON.stringify(response.data));
  return response.data;
}

export async function createStudent(student: Student) {
  const stored = localStorage.getItem("students");
  const students = stored ? (JSON.parse(stored) as Student[]) : [];
  const updated = [...students, student];
  localStorage.setItem("students", JSON.stringify(updated));
  return student;
}

// ✅ UPDATE
export async function updateStudent(student: Student) {
  const stored = localStorage.getItem("students");
  const students = stored ? (JSON.parse(stored) as Student[]) : [];

  const updated = students.map((s) => (s.id === student.id ? student : s));
  localStorage.setItem("students", JSON.stringify(updated));

  return student;
}

// ✅ DELETE
export async function deleteStudent(id: string) {
  const stored = localStorage.getItem("students");
  const students = stored ? (JSON.parse(stored) as Student[]) : [];

  const updated = students.filter((s) => s.id !== id);
  localStorage.setItem("students", JSON.stringify(updated));

  return id;
}