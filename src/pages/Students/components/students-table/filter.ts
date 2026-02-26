import type { FilterFn } from "@tanstack/react-table";
import type { Student } from "@/types/student";

export function parseRangeText(
  input: string,
): { min?: number; max?: number; exact?: number } | null {
  const s = (input ?? "").trim();
  if (!s) return null;

  const hasDash = s.includes("-");

  if (!hasDash) {
    const n = Number(s);
    if (Number.isNaN(n)) return null;
    return { exact: n };
  }

  const parts = s.split("-").map((p) => p.trim());
  if (parts.length !== 2) return null;

  const left = parts[0];
  const right = parts[1];

  const min = left === "" ? undefined : Number(left);
  const max = right === "" ? undefined : Number(right);

  if (min !== undefined && Number.isNaN(min)) return null;
  if (max !== undefined && Number.isNaN(max)) return null;

  return { min, max };
}

export const rangeTextNumber: FilterFn<Student> = (row, columnId, filterValue) => {
  const q = String(filterValue ?? "").trim();
  if (!q) return true;

  const parsed = parseRangeText(q);
  if (!parsed) return true;

  const raw = row.getValue(columnId);
  const num = typeof raw === "number" ? raw : Number(raw);
  if (Number.isNaN(num)) return false;

  if (parsed.exact !== undefined) return num === parsed.exact;
  if (parsed.min !== undefined && num < parsed.min) return false;
  if (parsed.max !== undefined && num > parsed.max) return false;

  return true;
};