import type { Student, StudentFormState } from "../../types";

export const isStudentFormCompletelyEmpty = (form: StudentFormState) => {
  return (
    !form.name.trim() &&
    !form.className.trim() &&
    !form.rollNumber.trim() &&
    !form.math.trim() &&
    !form.science.trim() &&
    !form.english.trim()
  );
};

export const hasStudentFormEmptyFields = (form: StudentFormState) => {
  return (
    !form.name.trim() ||
    !form.className.trim() ||
    !form.rollNumber.trim() ||
    !form.math.trim() ||
    !form.science.trim() ||
    !form.english.trim()
  );
};

export const buildStudentPayload = (
  form: StudentFormState,
  editing?: Student | null
): Student => {
  return {
    id: editing?.id ?? crypto.randomUUID(),
    name: form.name.trim(),
    rollNumber: Number(form.rollNumber),
    class: form.className.trim(),
    marks: {
      math: Number(form.math),
      science: Number(form.science),
      english: Number(form.english),
    },
  };
};