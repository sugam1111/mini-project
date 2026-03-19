import type { Report, ReportTableTypes } from "@/types/types";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { getReportColumns } from "./reports-table/columns";
import ReportsTableFilters from "./reports-table/ReportsTableFilters";
import { useDeleteReport } from "../hooks/use-reports";
import Toast from "@/components/Hooks/Toast";


export default function ReportsTable({ data, onEdit, onAdd }: ReportTableTypes) {
  const del = useDeleteReport();

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (r) =>
        (r.title ?? "").toLowerCase().includes(q) ||
        (r.createdBy ?? "").toLowerCase().includes(q) ||
        (r.status ?? "").toLowerCase().includes(q) ||
        (r.remarks ?? "").toLowerCase().includes(q) ||
        (r.student?.name ?? "").toLowerCase().includes(q) ||
        (r.student?.class ?? "").toLowerCase().includes(q),
    );
  }, [data, search]);

  useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [search, columnFilters]);

  const handleDelete = async(report: Report) => {
    const ok = confirm(`Delete report "${report.title}"?`);
    if (!ok) return;
  await  del.mutateAsync(report.id, {
      onSuccess: () => toast.custom(() => (
        <Toast title="Deleted !" name={report.student.name}  action="delete" />
      )),

      onError: () => toast.custom(() => (
        <Toast title="Delete Failed" name={report.title} type="error" />
      )),
    });
  };

  const columns = useMemo(
    () =>
      getReportColumns({
        onEdit,
        onDelete: handleDelete,
        deleting: del.isPending,
      }),
    [onEdit, del.isPending],
  );

  const table = useReactTable({
    data: filteredReports,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination, sorting, columnFilters },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  });

  return (
    <div className="mx-4  md:max-w-200 lg:max-w-full overflow-x-hidden">
  <div className="w-full min-w-0 space-y-3 ">
    <div className="w-full min-w-0 rounded-2xl bg-white px-1">
      <div className="flex flex-col gap-5">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            className="h-10  w-full min-w-0 flex-1 rounded-xl border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-slate-300 sm:h-11 sm:px-4"
            placeholder="Search by title, student, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className=" min-w-0 rounded-xl  p-2 ">
            <ReportsTableFilters  table={table} />
          </div>

          <Button
            onClick={onAdd}
            className="h-10 w-full shrink-0 rounded-xl bg-purple-700 cursor-pointer px-4 text-sm font-medium text-white shadow-sm transition hover:bg-purple-900 sm:h-11 sm:w-auto sm:px-5"
          >
            Add Report
          </Button>
        </div>

        
      </div>
    </div>

    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-sm">
      <div className="w-full min-h-87.5  min-w-0 overflow-x-auto">
        <Table className="w-full min-w-175 table-auto">
          <TableHeader className="bg-purple-200 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none whitespace-nowrap px-2 py-2 text-xs sm:px-3 sm:py-3 sm:text-sm"
                        : "whitespace-nowrap px-2 py-2 text-xs sm:px-3 sm:py-3 sm:text-sm"
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1 sm:gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        <span className="text-[10px] text-slate-400 sm:text-xs">
                          {{
                            asc: "🔼",
                            desc: "🔽",
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
                  className="px-3 py-10 text-center text-sm"
                >
                  No reports found
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
                      className="whitespace-nowrap px-2 py-3 text-xs text-slate-700 sm:px-3 sm:py-3.5 sm:text-sm"
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

      <div className="w-full overflow-x-auto border-t border-slate-200 bg-slate-50/70 px-2 py-3 sm:px-4">
        <SimplePagination table={table} />
      </div>
    </div>
  </div>
</div>
  );
}
