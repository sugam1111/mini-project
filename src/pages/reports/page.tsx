import { useState } from "react";

import type { Report } from "@/types/report";
import ReportFormDialog from "./components/report-form-dialog";
import { useReportsQuery } from "./hooks/use-reports";
import ReportsTable from "./components/reports-table";

export default function ReportsPage() {
  const { data, isLoading, isError } = useReportsQuery();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Report | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setEditing(null);
    }
    setOpen(nextOpen);
  };

  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (report: Report) => {
    setEditing(report);
    setOpen(true);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Something went wrong.</div>;

  return (
    <div className=" space-y-4  flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-6xl pl-3 font-semibold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
          Reports
        </h1>{" "}
      </div>

      <ReportsTable data={data ?? []} onAdd={handleAdd} onEdit={handleEdit} />

      <ReportFormDialog
        open={open}
        onOpenChange={handleOpenChange}
        editing={editing}
      />
    </div>
  );
}
