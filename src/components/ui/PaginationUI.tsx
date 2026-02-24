import type { Table } from "@tanstack/react-table";

type Props = {
  table: Table<any>;
};

export default function SimplePagination({ table }: Props) {

  // this line is for saying which page you are in to display in ui 
  const pageIndex = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 py-4 border-t">
      <button
        className="h-8 w-8 rounded-full border flex items-center justify-center disabled:opacity-50"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        ‹
      </button>

      <span className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm">
        {pageIndex + 1}
      </span>

      <span className="text-sm text-muted-foreground">/ {totalPages}</span>

      <button
        className="h-8 w-8 rounded-full border flex items-center justify-center disabled:opacity-50"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        ›
      </button>
    </div>
  );
}