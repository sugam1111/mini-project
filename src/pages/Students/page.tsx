import { Loader } from "@/components/Loader/loader";
import { useState } from "react";
import StudentFormDialog from "./components/student-form-dialog";
import StudentsTable from "./components/students-table";
import { useStudentsQuery } from "./hooks/use-students";
import type { Student } from "@/types/types";

export default function StudentsPage() {
  const { data, isLoading, isError } = useStudentsQuery();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);

  if (isLoading) return <Loader />;
  if (isError) return <div className="p-6 text-red-500">Something went wrong.</div>;

  return (
    <div className=" space-y-4">
       <div className="flex items-center justify-between">
        <h1 className="text-6xl pl-3 font-semibold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
          Marks
        </h1>{" "}
      </div>

      <StudentsTable
        data={data ?? []}
        onEdit={(s) => {
          setEditing(s);
          setOpen(true);
        }}
        onAdd={() => {
          setEditing(null);
          setOpen(true)
        }}
      />

      <StudentFormDialog open={open} onOpenChange={setOpen} editing={editing} />
    </div>
  );
}