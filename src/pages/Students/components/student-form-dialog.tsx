import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Student, StudentFormState } from "@/types/student";
import { toast } from "sonner";
import { useCreateStudent, useUpdateStudent } from "../hooks/use-students";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing?: Student | null;
};

export default function StudentFormDialog({ open, onOpenChange, editing }: Props) {
  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const isEdit = !!editing;

  const [form, setForm] = useState<StudentFormState>({
    name: "",
    rollNumber: "",
    className: "",
    math: "",
    science: "",
    english: "",
  });

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
      setForm({
        name: "",
        rollNumber: "",
        className: "",
        math: "",
        science: "",
        english: "",
      });
    }
  }, [open, editing]);

  const handleChange = (key: keyof StudentFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const allEmpty =
      !form.name.trim() &&
      !form.className.trim() &&
      !form.rollNumber.trim() &&
      !form.math.trim() &&
      !form.science.trim() &&
      !form.english.trim();

    if (!isEdit && allEmpty) return;

    const hasEmpty =
      !form.name.trim() ||
      !form.className.trim() ||
      !form.rollNumber.trim() ||
      !form.math.trim() ||
      !form.science.trim() ||
      !form.english.trim();

    if (hasEmpty) {
      toast.error("Please fill all the fields");
      return;
    }

    const student: Student = {
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

    const mutation = isEdit ? updateMutation : createMutation;

    mutation.mutate(student, {
      onSuccess: () => {
        toast.success(isEdit ? "Updated" : "Saved");
        onOpenChange(false);
      },
      onError: () => toast.error("Something went wrong"),
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
            <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
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
            <Input value={form.className} onChange={(e) => handleChange("className", e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Math</label>
            <Input type="number" value={form.math} onChange={(e) => handleChange("math", e.target.value)} />
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
          <Button className="bg-red-500 hover:bg-red-700" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-800 hover:bg-blue-900" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}