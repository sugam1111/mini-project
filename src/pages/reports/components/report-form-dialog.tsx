import { useEffect, useState } from "react";
import { z } from "zod";
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

type ReportFormErrors = Partial<Record<keyof ReportFormState, string>>;

const reportSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  createdBy: z.string().trim().min(1, "Created By is required"),
  status: z.enum(["Draft", "Published", "Archived"]),
  remarks: z.string().trim().min(1, "Remarks is required"),
  studentName: z.string().trim().min(1, "Student Name is required"),
  studentClass: z.string().trim().min(1, "Student Class is required"),
});

const INITIAL_FORM: ReportFormState = {
  title: "",
  createdBy: "",
  status: "Draft",
  remarks: "",
  studentName: "",
  studentClass: "",
};

const INITIAL_ERRORS: ReportFormErrors = {
  title: "",
  createdBy: "",
  status: "",
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
  const [errors, setErrors] = useState<ReportFormErrors>(INITIAL_ERRORS);

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

    setErrors(INITIAL_ERRORS);
  }, [open, editing]);

  const handleChange = (key: keyof ReportFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = () => {
    const result = reportSchema.safeParse(form);

    if (result.success) {
      setErrors(INITIAL_ERRORS);
      return true;
    }

    const fieldErrors: ReportFormErrors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof ReportFormState;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  };

  const handleSave = () => {
    const isValid = validateForm();
    if (!isValid) return;

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
              className={errors.title ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.title && (
              <p className="text-xs font-medium text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Created By</label>
            <Input
              value={form.createdBy}
              onChange={(e) => handleChange("createdBy", e.target.value)}
              className={errors.createdBy ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.createdBy && (
              <p className="text-xs font-medium text-red-500">{errors.createdBy}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              className={`w-full rounded-md border bg-background px-3 py-2 text-sm ${
                errors.status ? "border-red-500 focus-visible:ring-red-300" : ""
              }`}
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as Report["status"])
              }
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
            {errors.status && (
              <p className="text-xs font-medium text-red-500">{errors.status}</p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Remarks</label>
            <Input
              value={form.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              className={errors.remarks ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.remarks && (
              <p className="text-xs font-medium text-red-500">{errors.remarks}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Student Name</label>
            <Input
              value={form.studentName}
              onChange={(e) => handleChange("studentName", e.target.value)}
              className={errors.studentName ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.studentName && (
              <p className="text-xs font-medium text-red-500">{errors.studentName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Student Class</label>
            <Input
              value={form.studentClass}
              onChange={(e) => handleChange("studentClass", e.target.value)}
              className={errors.studentClass ? "border-red-500 focus-visible:ring-red-300" : ""}
            />
            {errors.studentClass && (
              <p className="text-xs font-medium text-red-500">{errors.studentClass}</p>
            )}
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