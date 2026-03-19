import type { ColumnDef } from "@tanstack/react-table";
import type { Report } from "@/types/types";
import { Button } from "@/components/ui/button";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString();
}

export function getReportColumns(params: {
  onEdit: (report: Report) => void;
  onDelete: (report: Report) => void;
  deleting?: boolean;
}) {
  const { onEdit, onDelete, deleting } = params;

  return [
    {
  id: "studentName",
  header: "Name",
  accessorFn: (row) => row.student?.name ?? "",
},
{
  id: "studentClass",
  header: "Class",
  accessorFn: (row) => row.student?.class ?? "",
},
    {
      id: "title",
      header: "Report",
      accessorKey: "title",
    },
    {
      id: "createdBy",
      header: "Created By",
      accessorKey: "createdBy",
    },
    {
      id: "createdAt",
      header: "Created Date",
      accessorKey: "createdAt",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
    },
    {
      id: "remarks",
      header: "Remarks",
      accessorKey: "remarks",
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const report = row.original;

        return (
          <div className="flex gap-2 whitespace-nowrap">
            <Button
              className="bg-blue-900 text-white"
              size="sm"
              variant="outline"
              onClick={() => onEdit(report)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              disabled={!!deleting}
              onClick={() => onDelete(report)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ] as ColumnDef<Report>[];
}