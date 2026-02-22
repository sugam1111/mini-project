// src/pages/reports/page.tsx

import { useReportsQuery } from "./hooks/use-reports";

export default function ReportsPage() {
  const { data, isLoading, isError } = useReportsQuery();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Something went wrong.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Reports</h1>

      {data?.map((report) => (
        <div
          key={report.id}
          className="border rounded-lg p-4"
        >
          <p className="font-medium">{report.title}</p>
          <p className="text-sm text-gray-500">
            {report.createdBy} •{" "}
            {new Date(report.createdAt).toLocaleDateString()} •{" "}
            {report.status}
          </p>
        </div>
      ))}
    </div>
  );
}