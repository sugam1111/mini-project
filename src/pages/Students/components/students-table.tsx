import React, { useMemo, useState } from "react";
import type { Student } from "@/types/student";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SimplePagination from "@/components/ui/PaginationUI";
import { Input } from "@/components/ui/input";

type Props = {
  data: Student[];
};

export default function StudentsTable({ data }: Props) {

  const [search, setSearch] = useState("")

  const [pagination, setPagination] = useState({
    pageIndex : 0,
    pageSize : 2,
  })

  const filteredMarks = useMemo(() => {
    const q =  search.trim().toLowerCase();
    if (!q) return data;


    return data.filter((r) => 
    (r.name ?? "").toLowerCase().includes(q) ||
    (r.class ?? "").toLowerCase().includes(q)
    )
  },[data, search])

  const columns = React.useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Roll", accessorKey: "rollNumber" },
      { header: "Class", accessorKey: "class" },
      { header: "Math", accessorKey: "marks.math" },
      { header: "Science", accessorKey: "marks.science" },
      { header: "English", accessorKey: "marks.english" },
    ],
    []
  );

  const table = useReactTable({
    data : filteredMarks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel : getPaginationRowModel(),
    state : {pagination},
    onPaginationChange : setPagination

  });

  return (
    <div className="rounded-xl border overflow-hidden">
      <div>
        <div className="w-full sm:max-w-sm">
        <Input
          placeholder="Search Marks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      </div>
      <Table>
        <TableHeader className="bg-muted/40">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getPaginationRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center">
                No students found
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
  );
}