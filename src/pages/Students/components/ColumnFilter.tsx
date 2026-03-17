import type { Column, Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

export default function ColumnFilter<T>({
  column,
  table,
}: {
  column: Column<T, unknown>;
  table: Table<T>;
}) {
  const filterValue = column.getFilterValue();
  const id = column.id;

  const isRangeTextNumberColumn =
    id === "rollNumber" ||
    id === "math" ||
    id === "science" ||
    id === "english";

  const isDropdownColumn =
    id === "class" ||
    id === "studentClass" ||
    id === "status" ||
    id === "createdBy";

  if (isDropdownColumn) {
    const options: string[] = Array.from(
      new Set(
        table
          .getPreFilteredRowModel()
          .rows.map((row) => String(row.getValue(id) ?? ""))
          .filter((v) => v !== "")
      )
    ).sort();

    return (
      <div className="mt-2">
        <select
          className="h-8 w-full rounded-md border bg-background px-2 text-sm"
          value={String(filterValue ?? "")}
          onChange={(e) => column.setFilterValue(e.target.value || undefined)}
        >
          <option value="">All</option>
          {options.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <Input
        className="h-8"
        placeholder={
          isRangeTextNumberColumn ? "e.g. 1-5, 10-, -50, 7" : "Filter..."
        }
        value={String(filterValue ?? "")}
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    </div>
  );
}