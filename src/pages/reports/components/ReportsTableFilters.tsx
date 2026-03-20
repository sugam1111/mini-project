import { Button } from "@/components/ui/button";
import ColumnFilter from "@/pages/Students/components/ColumnFilter";
import type { Report } from "@/types/types";
import type { Table } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { useState } from "react";

export default function ReportsTableFilters({
  table,
}: {
  table: Table<Report>;
}) {
  const [open, setOpen] = useState(false);

  const classColumn = table.getColumn("student.class");
  const statusColumn = table.getColumn("status");
  const createdByColumn = table.getColumn("createdBy");
  const titleColumn = table.getColumn("title");
  const remarksColumn = table.getColumn("remarks");

  return (
    <div className="relative inline-block">
      <Button
        type="button"
        className="h-10 rounded-xl bg-blue-900 text-white hover:bg-blue-800"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-[40] mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="space-y-3">
            {classColumn && (
              <FilterItem label="Class" >
                <ColumnFilter column={classColumn} table={table} />
              </FilterItem>
            )}

            {statusColumn && (
              <FilterItem label="Status">
                <ColumnFilter column={statusColumn} table={table} />
              </FilterItem>
            )}

            {createdByColumn && (
              <FilterItem label="Created By">
                <ColumnFilter column={createdByColumn} table={table} />
              </FilterItem>
            )}

            {titleColumn && (
              <FilterItem label="Report Name">
                <ColumnFilter column={titleColumn} table={table} />
              </FilterItem>
            )}

            {remarksColumn && (
              <FilterItem label="Remarks">
                <ColumnFilter column={remarksColumn} table={table} />
              </FilterItem>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}