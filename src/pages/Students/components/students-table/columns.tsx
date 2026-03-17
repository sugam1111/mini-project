import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "@/types/student";
import { rangeTextNumber } from "./filter";
import { Button } from "@/components/ui/button";

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
      accessorFn: (row) => row.marks?.math,
      
      filterFn: rangeTextNumber,
    },
    {
      header: "Science",
      id: "science",
      accessorFn: (row) => row.marks?.science,
      filterFn: rangeTextNumber,
    },
    {
      header: "English",
      id: "english",
      accessorFn: (row) => row.marks?.english,
      filterFn: rangeTextNumber,
    },

    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex gap-2 whitespace-nowrap ">
            <Button className="bg-blue-900 text-white" size="sm" variant="outline" onClick={() => onEdit(student)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              disabled={!!deleting}
              onClick={() => onDelete(student)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
}