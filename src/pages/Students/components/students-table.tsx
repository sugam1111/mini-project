import type { Student } from "@/types/student";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import SimplePagination from "@/components/ui/PaginationUI";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { studentColumns } from "./students-table/columns";
import ColumnFilter from "./students-table/ColumnFilter";



type Props = {
  data: Student[];
};

export default function StudentsTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "rollNumber", desc: false },
  ]);

  const searchedData = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;

    return data.filter(
      (r) =>
        (r.name ?? "").toLowerCase().includes(q) ||
        (r.class ?? "").toLowerCase().includes(q),
    );
  }, [data, search]);

  const table = useReactTable({
    data: searchedData,
    columns: studentColumns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    state: { pagination, sorting, columnFilters },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [search, columnFilters]);

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="p-3">
        <div className="w-full sm:max-w-sm">
          <Input
            placeholder="Search (name or class)..."
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
                  {header.isPlaceholder ? null : (
                    <div>
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-2"
                            : ""
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: "🔼",
                          desc: "🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>

                      {header.column.getCanFilter() ? (
                        <ColumnFilter column={header.column} />
                      ) : null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
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