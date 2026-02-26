import type { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import type { Student } from "@/types/student";

export default function ColumnFilter({ column }: { column: Column<Student, unknown> }) {
  const filterValue = column.getFilterValue();
  const id = column.id;

  const isRangeTextNumberColumn =
    id === "rollNumber" || id === "math" || id === "science" || id === "english";

  return (
    <div className="mt-2">
      <Input
        className="h-8"
        placeholder={isRangeTextNumberColumn ? "e.g. 1-5, 10-, -50, 7" : "Filter..."}
        value={(filterValue ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    </div>
  );
}