import { Button } from "@/components/ui/button";
import ColumnFilter from "@/pages/Students/components/columnFilter";
import type { Table } from "@tanstack/react-table";
import { Filter } from "lucide-react";
import { useState } from "react";
import type { Student } from "../types";

export default function StudentsTableFilters({
  table,
}: {
  table: Table<Student>;
}) {
  const [open, setOpen] = useState(false);

  const classColumn = table.getColumn("class");
  const rollNumberColumn = table.getColumn("rollNumber");
  const nameColumn = table.getColumn("name");

  return (
    <div className="relative inline-block">
      <Button
        type="button"
        className="h-11 rounded-xl bg-blue-900 px-4 text-white hover:bg-slate-800"
        onClick={function() { setOpen(function(prev) { return !prev; }); }}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="space-y-3">
            {nameColumn && (
              <FilterItem label="Name">
                <ColumnFilter column={nameColumn} table={table} />
              </FilterItem>
            )}

            {classColumn && (
              <FilterItem label="Class">
                <ColumnFilter column={classColumn} table={table} />
              </FilterItem>
            )}

            {rollNumberColumn && (
              <FilterItem label="Roll Number">
                <ColumnFilter column={rollNumberColumn} table={table} />
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