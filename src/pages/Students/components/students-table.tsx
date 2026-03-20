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

import SimplePagination from "@/components/Pagination/pagination";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getStudentColumns } from "./students-table/columns";

import { useAppToast } from "@/components/Hooks/Toast";
import { Button } from "@/components/ui/button";
import type { Student, StudentTableProps } from "@/types/types";
import { useDeleteStudent } from "../hooks/use-students";
import StudentsTableFilters from "./StudentTableFilters";

export default function StudentsTable({ data, onEdit, onAdd }: StudentTableProps) {
  const del = useDeleteStudent();
  const {appToast} = useAppToast()

  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
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

 const handleDelete = (student: Student) => {
  const ok = confirm(`Delete ${student.name}?`);
  if (!ok) return;

  del.mutate(student.id, {
    onSuccess: () =>
      appToast({
        type: "delete",
        name: student.name,
      }),
    onError: () =>
      appToast({
        type: "error",
        description: `Failed to delete ${student.name}`,
      }),
  });
};
  const columns = useMemo(
    () =>
      getStudentColumns({
        onEdit,
        onDelete: handleDelete,
        deleting: del.isPending,
      }),
    [onEdit, del.isPending, data, search],
  );

  const table = useReactTable({
    data: searchedData,
    columns,
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
    <div className="space-y-4 mx-4 ">
      <div className="w-full rounded-2xl  bg-white px-1 ">
        <div className="flex flex-col gap-4">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="w-full min-w-0 flex-1">
              <Input
                className="h-11 w-full rounded-xl border-slate-200 bg-slate-50 px-4 text-slate-700 shadow-sm transition placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-slate-300"
                placeholder="Search by name or class..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <StudentsTableFilters table={table} />

            <Button
            
              onClick={onAdd}
              className="h-11 w-full rounded-xl bg-purple-700 px-5 font-medium text-white shadow-sm transition hover:bg-purple-900 sm:w-auto"
            >
              Add Marks
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto min-h-[350px] overflow-y-auto">
          <Table>
            <TableHeader className="bg-purple-200">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-b border-slate-200">
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 whitespace-nowrap px-4 text-sm font-semibold text-slate-700"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={
                            header.column.getCanSort()
                              ? "flex cursor-pointer select-none items-center gap-2 transition hover:text-slate-900"
                              : "flex items-center gap-2"
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <span className="text-[11px] text-slate-400">
                            {{
                              asc: "▲",
                              desc: "▼",
                            }[header.column.getIsSorted() as string] ?? null}
                          </span>
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
                  <TableCell
                    colSpan={columns.length}
                    className="py-14 text-center text-sm text-slate-500"
                  >
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/80"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-3.5 text-sm text-slate-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-slate-200 bg-slate-50/70 px-2 py-3 sm:px-4">
          <SimplePagination table={table} />
        </div>
      </div>
    </div>
  );
}