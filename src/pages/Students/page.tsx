import { Loader } from "@/components/ui/Loader";
import { useStudentsQuery } from "./hooks/use-students";

export default function MarksPage(){
    const {data, isLoading, isError} = useStudentsQuery();

    if (isLoading){
        return <div>
            <Loader />
        </div>
    }

    if(isError){
        return <div>
            <h2 className="text-red-500">Something Went Wrong !!!
            </h2>
        </div>
    }

    return <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Students</h1>

        {data?.map((student) => (
            <div className="border rounded-2xl p-4" key={student.id}>
                <p>Name : {student.name}</p>
                <p>S ID : {student.id} </p>
                <h1 className="font-semibold text-green-500">Marks : </h1>
                <p>science : {student.marks.science}</p>
                <p>math : {student.marks.math}</p>
            </div>
        ))}
    </div>
}