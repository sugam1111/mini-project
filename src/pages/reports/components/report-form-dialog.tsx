import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/Dialog/dialog";
import { Input } from "@/components/ui/input";
import type { Report, ReportDialog } from "@/types/types";
import { toast } from "sonner";
import { useCreateReport, useUpdateReport } from "../hooks/use-reports";
import Toast from "@/components/Hooks/Toast";


export default function ReportFormDialog({ open, onOpenChange, editing }: ReportDialog) {
  const createMutation = useCreateReport();
  const updateMutation = useUpdateReport();
  const isEdit = !!editing;

  const [form, setForm] = useState({
    title: "",
    createdBy: "",
    status: "Draft",
    remarks: "",
    studentName: "",
    studentClass: "",
  });

  useEffect(() => {
    if (!open) return;

    if (editing) {
      setForm({
        title: editing.title ?? "",
        createdBy: editing.createdBy ?? "",
        status: editing.status ?? "Draft",
        remarks: editing.remarks ?? "",
        studentName: editing.student?.name ?? "",
        studentClass: editing.student?.class ?? "",
      });
    } else {
      setForm({
        title: "",
        createdBy: "",
        status: "Draft",
        remarks: "",
        studentName: "",
        studentClass: "",
      });
    }
  }, [open, editing]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const allEmpty =
      !form.title.trim() &&
      !form.createdBy.trim() &&
      !form.studentName.trim() &&
      !form.studentClass.trim();

    if (!isEdit && allEmpty) return;

    const hasEmpty =
      !form.title.trim() ||
      !form.createdBy.trim() ||
      !form.studentName.trim() ||
      !form.studentClass.trim();

    if (hasEmpty) {
      toast.custom(() => (
        <Toast title="Report is empty please fill the form !!" />
      ));
      return;
    }

    const report: Report = {
      id: editing?.id ?? crypto.randomUUID(),
      title: form.title.trim(),
      createdBy: form.createdBy.trim(),
      createdAt: editing?.createdAt ?? new Date().toISOString(),
      status: form.status as Report["status"],
      remarks: form.remarks.trim(),
      student: {
        id: editing?.student.id ?? crypto.randomUUID(),
        name: form.studentName.trim(),
        rollNumber: editing?.student.rollNumber ?? 0,
        class: form.studentClass.trim(),
        marks: editing?.student.marks ?? { math: 0, science: 0, english: 0 },
      },
    };

    const mutation = isEdit ? updateMutation : createMutation;

    mutation.mutate(report, {
      onSuccess: () => {
        toast.custom(() => (
          <Toast action={isEdit ? "update" : "create"}  title={isEdit ? "Updated Succesfully" : "Saved Succesfully"}  name={report.student.name}/>
        ));
        onOpenChange(false);
      },
      onError: () => toast.error("Something went wrong"),
    });
  };

  const saving = createMutation.isPending || updateMutation.isPending;

  const close = () => onOpenChange(false);
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit Report" : "Add Report"}
      description="Enter report details."
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Created By</label>
            <Input
              value={form.createdBy}
              onChange={(e) => handleChange("createdBy", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Remarks</label>
            <Input
              value={form.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Student Name</label>
            <Input
              value={form.studentName}
              onChange={(e) => handleChange("studentName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Student Class</label>
            <Input
              value={form.studentClass}
              onChange={(e) => handleChange("studentClass", e.target.value)}
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button className="bg-red-500 hover:bg-red-600 hover:text-white text-white font-bold" variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button className="bg-blue-800 hover:bg-blue-900 font-bold" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}