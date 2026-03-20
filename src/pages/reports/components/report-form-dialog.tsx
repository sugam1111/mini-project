import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter } from "@/components/Dialog/dialog";
import { Input } from "@/components/ui/input";
import type { Report, ReportDialog } from "@/types/types";
import { useCreateReport, useUpdateReport } from "../hooks/use-reports";
import { useAppToast } from "@/components/Hooks/Toast";

type ReportFormState = {
  title: string;
  createdBy: string;
  status: Report["status"];
  remarks: string;
  studentName: string;
  studentClass: string;
};

const INITIAL_FORM: ReportFormState = {
  title: "",
  createdBy: "",
  status: "Draft",
  remarks: "",
  studentName: "",
  studentClass: "",
};

export default function ReportFormDialog({
  open,
  onOpenChange,
  editing,
}: ReportDialog) {
  const createMutation = useCreateReport();
  const updateMutation = useUpdateReport();
  const { appToast } = useAppToast();

  const isEdit = !!editing;

  const [form, setForm] = useState<ReportFormState>(INITIAL_FORM);

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
      setForm(INITIAL_FORM);
    }
  }, [open, editing]);

  const handleChange = (key: keyof ReportFormState, value: string) => {
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
      appToast({
        type: "error",
        description: "Please fill out all required report fields.",
      });
      return;
    }

    const report: Report = {
      id: editing?.id ?? crypto.randomUUID(),
      title: form.title.trim(),
      createdBy: form.createdBy.trim(),
      createdAt: editing?.createdAt ?? new Date().toISOString(),
      status: form.status,
      remarks: form.remarks.trim(),
      student: {
        id: editing?.student?.id ?? crypto.randomUUID(),
        name: form.studentName.trim(),
        rollNumber: editing?.student?.rollNumber ?? 0,
        class: form.studentClass.trim(),
        marks: editing?.student?.marks ?? {
          math: 0,
          science: 0,
          english: 0,
        },
      },
    };

    const mutation = isEdit ? updateMutation : createMutation;

    mutation.mutate(report, {
      onSuccess: () => {
        appToast({
          type: isEdit ? "update" : "create",
          name: report.title,
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
              onChange={(e) =>
                handleChange("status", e.target.value as Report["status"])
              }
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
        <Button
          className="bg-red-500 font-bold text-white hover:bg-red-600 hover:text-white"
          variant="outline"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          className="bg-blue-800 font-bold hover:bg-blue-900"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : isEdit ? "Update" : "Save"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}