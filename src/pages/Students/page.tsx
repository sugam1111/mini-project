import { useStudentsQuery } from "./hooks/use-students";
import StudentsTable from "./components/students-table";
import { Loader } from "@/components/ui/Loader";
import StudentFormDialog from "./components/student-form-dialog";

export default function StudentsPage() {
  const { data, isLoading, isError } = useStudentsQuery();

  if (isLoading) return <Loader />;

  if (isError) {
    return <div className="p-6 text-red-500">Something went wrong.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Marks</h1>
        <StudentFormDialog />
      </div>
      <StudentsTable data={data ?? []} />
    </div>
  );
}
