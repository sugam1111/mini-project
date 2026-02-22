import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../helper";

export function useStudentsQuery(){
    return useQuery({
        queryKey : ["students"],
        queryFn : getStudents
    })
}