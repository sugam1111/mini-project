import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { rangeTextNumber } from "./filter";
import type { Student } from "../types";

export function getStudentColumns(params: {
  onEdit: (s: Student) => void;
  onDelete: (s: Student) => void;
  deleting?: boolean;
}) : ColumnDef<Student>[] {
  const { onEdit, onDelete, deleting } = params;

  return [
    { header: "Name", accessorKey: "name" },

    { header: "Roll", accessorKey: "rollNumber", filterFn: rangeTextNumber },

    { header: "Class", accessorKey: "class", filterFn: "equals" },

    {
      header: "Math",
      id: "math",
      accessorFn: function(row) { return row.marks?.math; },
      
      filterFn: rangeTextNumber,
    },
    {
      header: "Science",
      id: "science",
      accessorFn: function(row) { return row.marks?.science; },
      filterFn: rangeTextNumber,
    },
    {
      header: "English",
      id: "english",
      accessorFn: function(row) { return row.marks?.english; },
      filterFn: rangeTextNumber,
    },

    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableColumnFilter: false,
      cell: function({ row }) {
        const student = row.original;
        return (
          <div className="flex gap-2 whitespace-nowrap ">
            <Button className="bg-blue-900 text-white" size="sm" variant="outline" onClick={function() { onEdit(student); }}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              disabled={!!deleting}
              onClick={function() { onDelete(student); }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
}