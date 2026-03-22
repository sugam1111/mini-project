import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/dialog/dialog";
import { Input } from "@/components/ui/input";
import { useCreateStudent, useUpdateStudent } from "../hooks/use-students";
import { useAppToast } from "@/components/hooks/useToast";
import type { Student, StudentFormProps, StudentFormState } from "../types";

const isStudentFormCompletelyEmpty = (form: StudentFormState): boolean => {
  return (
    !form.name.trim() &&
    !form.rollNumber.trim() &&
    !form.className.trim() &&
    !form.math.trim() &&
    !form.science.trim() &&
    !form.english.trim()
  );
};

const hasStudentFormEmptyFields = (form: StudentFormState): boolean => {
  return (
    !form.name.trim() ||
    !form.rollNumber.trim() ||
    !form.className.trim() ||
    !form.math.trim() ||
    !form.science.trim() ||
    !form.english.trim()
  );
};

const buildStudentPayload = (
  form: StudentFormState,
  editing?: Student | null,
): Student => {
  return {
    id: editing?.id ?? crypto.randomUUID(),
    name: form.name.trim(),
    rollNumber: Number(form.rollNumber.trim()),
    class: form.className.trim(),
    marks: {
      math: Number(form.math.trim()),
      science: Number(form.science.trim()),
      english: Number(form.english.trim()),
    },
  };
};

const INITIAL_FORM: StudentFormState = {
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

  useEffect(() => {
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
  }, [open, editing]);

  const handleChange = (key: keyof StudentFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!isEdit && isStudentFormCompletelyEmpty(form)) return;

    if (hasStudentFormEmptyFields(form)) {
      appToast({
        type: "error",
        description: "Please fill out all the fields in the form",
      });
      return;
    }

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
        });
      },
    });
  };

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
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Roll Number</label>
            <Input
              type="number"
              value={form.rollNumber}
              onChange={(e) => handleChange("rollNumber", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Input
              value={form.className}
              onChange={(e) => handleChange("className", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Math</label>
            <Input
              type="number"
              value={form.math}
              onChange={(e) => handleChange("math", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Science</label>
            <Input
              type="number"
              value={form.science}
              onChange={(e) => handleChange("science", e.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">English</label>
            <Input
              type="number"
              value={form.english}
              onChange={(e) => handleChange("english", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-red-500 hover:bg-red-700"
            variant="outline"
            onClick={() => onOpenChange(false)}
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