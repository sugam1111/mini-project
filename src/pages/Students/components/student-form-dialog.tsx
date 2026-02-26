import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { StudentFormState } from "@/types/student";
import type { Student } from "@/types/student";
import { createStudent } from "../helper";

export default function StudentFormDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState<StudentFormState>({
    name: "",
    rollNumber: "",
    className: "",
    math: "",
    science: "",
    english: "",
  });

  const handleChange = (key: keyof StudentFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setOpen(false);
      setForm({
        name: "",
        rollNumber: "",
        className: "",
        math: "",
        science: "",
        english: "",
      });
    },
  });

  const handleSave = () => {
    const newStudent: Student = {
      id:
        (crypto as any)?.randomUUID?.() ??
        `std-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: form.name.trim(),
      rollNumber: Number(form.rollNumber),
      class: form.className.trim(),
      marks: {
        math: Number(form.math),
        science: Number(form.science),
        english: Number(form.english),
      },
    };

    mutation.mutate(newStudent);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Marks</Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Add Student Marks"
        description="Enter student details and marks."
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Aarav Sharma"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Roll Number</label>
              <Input
                type="number"
                value={form.rollNumber}
                onChange={(e) => handleChange("rollNumber", e.target.value)}
                placeholder="e.g. 12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Input
                value={form.className}
                onChange={(e) => handleChange("className", e.target.value)}
                placeholder="e.g. 10-A"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Math</label>
              <Input
                type="number"
                value={form.math}
                onChange={(e) => handleChange("math", e.target.value)}
                placeholder="0 - 100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Science</label>
              <Input
                type="number"
                value={form.science}
                onChange={(e) => handleChange("science", e.target.value)}
                placeholder="0 - 100"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">English</label>
              <Input
                type="number"
                value={form.english}
                onChange={(e) => handleChange("english", e.target.value)}
                placeholder="0 - 100"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </>
  );
}