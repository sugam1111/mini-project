import React, { useMemo, useState } from "react";
import type { Report } from "@/types/report";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SimplePagination from "@/components/ui/PaginationUI";
import { useReportsQuery } from "../hooks/use-reports";



function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString();
}

export default function ReportsTable() {
  const { data = [], isLoading, isError } = useReportsQuery();

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;

    return data.filter((r) =>
      (r.title ?? "").toLowerCase().includes(q) ||
      (r.createdBy ?? "").toLowerCase().includes(q) ||
      (r.status ?? "").toLowerCase().includes(q) ||
      (r.remarks ?? "").toLowerCase().includes(q) ||
      (r.student?.name ?? "").toLowerCase().includes(q) ||
      (r.student?.class ?? "").toLowerCase().includes(q)
    );
  }, [data, search]);

  // reset to page 1 on search change
  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [search]);

  const columns = React.useMemo(
    () => [
      { header: "Name", accessorKey: "student.name" },
      { header: "Class", accessorKey: "student.class" },
      { header: "Report Name", accessorKey: "title" },
      { header: "Created By", accessorKey: "createdBy" },
      {
        header: "Created Date",
        accessorKey: "createdAt",
        cell: ({ row }: { row: { original: Report } }) =>
          formatDate(row.original.createdAt),
      },
      { header: "Status", accessorKey: "status" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredReports,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-3">
      <div className="w-full sm:max-w-sm">
        <Input
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader className="bg-purple-50">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center">
                  Failed to load reports
                </TableCell>
              </TableRow>
            ) : table.getPaginationRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center">
                  No reports found
                </TableCell>
              </TableRow>
            ) : (
              table.getPaginationRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <SimplePagination table={table} />
      </div>
    </div>
  );
}