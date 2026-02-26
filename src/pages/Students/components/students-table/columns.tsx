import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "@/types/student";
import { rangeTextNumber } from "./filter";

export const studentColumns: ColumnDef<Student>[] = [
  { header: "Name", accessorKey: "name" },

  {
    header: "Roll",
    accessorKey: "rollNumber",
    filterFn: rangeTextNumber,
  },

  { header: "Class", accessorKey: "class" },

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
];