import { useQuery } from "@tanstack/react-query";
import { getReports } from "../helper";

export function useReportsQuery(){
    return useQuery({
        queryKey : ["reports"],
        queryFn : getReports,
    })
}