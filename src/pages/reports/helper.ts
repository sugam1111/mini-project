import type { Report } from "@/types/report";
import axios from "axios";

const REPORTS_API = import.meta.env.VITE_REPORTS_API as string;

export async function getReports() {
  const stored = localStorage.getItem("reports");

  if (stored) {
    return JSON.parse(stored);
  }

  const res = await axios.get(REPORTS_API);

  localStorage.setItem("reports", JSON.stringify(res.data));

  return res.data;
}

export async function createReport(report: Report) {
  const stored = localStorage.getItem("reports");
  const reports = stored ? JSON.parse(stored) : [];
// takes previous reports and adds new below it 
  const updated = [...reports, report];

  localStorage.setItem("reports", JSON.stringify(updated));

  return report;
}

export async function updateReport(report: Report) {
  const stored = localStorage.getItem("reports");
  const reports = stored ? JSON.parse(stored) : [];

  const updated = reports.map((r: any) =>
    r.id === report.id ? report : r
  );

  localStorage.setItem("reports", JSON.stringify(updated));

  return report;
}

export async function deleteReport(id: string) {
  const stored = localStorage.getItem("reports");
  const reports = stored ? JSON.parse(stored) : [];

  const updated = reports.filter((r: any) => r.id !== id);

  localStorage.setItem("reports", JSON.stringify(updated));

  return id;
}