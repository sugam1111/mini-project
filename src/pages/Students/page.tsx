import { useStudentsQuery } from "./hooks/use-students";
import StudentsTable from "./components/students-table";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";

export default function StudentsPage() {
  const { data, isLoading, isError } = useStudentsQuery();

  if (isLoading) return <Loader />;

  if (isError) {
    return <div className="p-6 text-red-500">Something went wrong.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Marks</h1>
        <Button>Add Report</Button>
      </div>
      <StudentsTable data={data ?? []} />
    </div>
  );
}
