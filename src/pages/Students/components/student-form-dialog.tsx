import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/dialog/dialog";
import { Input } from "@/components/ui/input";
import { useCreateStudent, useUpdateStudent } from "../hooks/use-students";
import { useAppToast } from "@/components/hooks/useToast";
import type { StudentFormProps, StudentFormState } from "../types";
import { buildStudentPayload } from "./functionFilter";
import { studentSchema } from "../validator";

type StudentFormErrors = Partial<Record<keyof StudentFormState, string>>;

const INITIAL_FORM: StudentFormState = {
  name: "",
  rollNumber: "",
  className: "",
  math: "",
  science: "",
  english: "",
};

const INITIAL_ERRORS: StudentFormErrors = {
  name: "",
  rollNumber: "",
  className: "",
  math: "",
  science: "",
  english: "",
};

export default function StudentFormDialog({
  open,
  onOpenChange,
  editing,
}: StudentFormProps) {
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const { appToast } = useAppToast();

  const isEdit = !!editing;

  const [form, setForm] = useState<StudentFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<StudentFormErrors>(INITIAL_ERRORS);

  useEffect(function() {
    if (!open) return;

    if (editing) {
      setForm({
        name: editing.name ?? "",
        rollNumber: String(editing.rollNumber ?? ""),
        className: editing.class ?? "",
        math: String(editing.marks?.math ?? ""),
        science: String(editing.marks?.science ?? ""),
        english: String(editing.marks?.english ?? ""),
      });
    } else {
      setForm(INITIAL_FORM);
    }

    setErrors(INITIAL_ERRORS);
  }, [open, editing]);

  function handleChange(key: keyof StudentFormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validateForm() {
    const result = studentSchema.safeParse(form);

    if (result.success) {
      setErrors(INITIAL_ERRORS);
      return true;
    }

    const fieldErrors: StudentFormErrors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof StudentFormState;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  }

  function handleSave() {
    const isValid = validateForm();
    if (!isValid) return;

    const student = buildStudentPayload(form, editing);
    const mutation = isEdit ? updateMutation : createMutation;

    mutation.mutate(student, {
      onSuccess: () => {
        appToast({
          type: isEdit ? "update" : "create",
          name: student.name,
        });
        onOpenChange(false);
      },
      onError: () => {
        appToast({
          type: "error",
          description: "Something went wrong",
        });
      },
    });
  }

  function close() { onOpenChange(false); }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) { handleChange("name", e.target.value); }

  function handleRollNumberChange(e: React.ChangeEvent<HTMLInputElement>) { handleChange("rollNumber", e.target.value); }

  function handleClassNameChange(e: React.ChangeEvent<HTMLInputElement>) { handleChange("className", e.target.value); }

  function handleMathChange(e: React.ChangeEvent<HTMLInputElement>) { handleChange("math", e.target.value); }

  function handleScienceChange(e: React.ChangeEvent<HTMLInputElement>) { handleChange("science", e.target.value); }

  function handleEnglishChange(e: React.ChangeEvent<HTMLInputElement>) { handleChange("english", e.target.value); }

  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit Student Marks" : "Add Student Marks"}
      description="Enter student details and marks."
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={form.name}
              onChange={handleNameChange}
              className={errors.name ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.name && (
              <p className="text-xs font-medium text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Roll Number</label>
            <Input
              type="number"
              value={form.rollNumber}
              onChange={handleRollNumberChange}
              className={errors.rollNumber ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.rollNumber && (
              <p className="text-xs font-medium text-red-500">{errors.rollNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Input
              value={form.className}
              onChange={handleClassNameChange}
              className={errors.className ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.className && (
              <p className="text-xs font-medium text-red-500">{errors.className}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Math</label>
            <Input
              type="number"
              value={form.math}
              onChange={handleMathChange}
              className={errors.math ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.math && (
              <p className="text-xs font-medium text-red-500">{errors.math}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Science</label>
            <Input
              type="number"
              value={form.science}
              onChange={handleScienceChange}
              className={errors.science ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.science && (
              <p className="text-xs font-medium text-red-500">{errors.science}</p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">English</label>
            <Input
              type="number"
              value={form.english}
              onChange={handleEnglishChange}
              className={errors.english ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.english && (
              <p className="text-xs font-medium text-red-500">{errors.english}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-red-500 hover:bg-red-700"
            variant="outline"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-800 hover:bg-blue-900"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : isEdit ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}