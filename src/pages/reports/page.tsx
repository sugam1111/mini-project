"use client";

import { useState } from "react";


import { useReportsQuery } from "./hooks/use-reports";
import ReportsTable from "./components/reports-table";
import { Button } from "@/components/ui/button";
import ReportFormDialog from "./components/report-form-dialog";

export default function ReportsPage() {
  const { data, isLoading, isError } = useReportsQuery();
  const [open, setOpen] = useState(false);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Something went wrong.</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <Button onClick={() => setOpen(true)}>Add Report</Button>
      </div>

      <ReportsTable data={data ?? []} />

      <ReportFormDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}