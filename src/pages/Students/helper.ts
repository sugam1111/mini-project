import type { Student } from "@/types/student";
import axios from "axios";

const STUDENT_API = import.meta.env.VITE_STUDENTS_API;

export async function getStudents() : Promise<Student[]>{
    const response = await axios.get(STUDENT_API);
    return response.data;
}