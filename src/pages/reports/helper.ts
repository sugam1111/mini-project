import type {Report} from "@/types/report"
import axios from "axios"


const REPORTS_API = import.meta.env.VITE_REPORTS_API as string;

export async function getReports() : Promise<Report[]>{
    const response =  await axios.get(REPORTS_API);

    const data:Report[] =  response.data;

    return data
}