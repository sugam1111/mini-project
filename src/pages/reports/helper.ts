import type { Report } from "@/types/report";
import axios from "axios";

const REPORTS_API = import.meta.env.VITE_REPORTS_API as string;

export async function getReports(): Promise<Report[]> {
    const stored = localStorage.getItem("reports");

    if(stored){
      return JSON.parse(stored) as Report[];
    }

    const res = await axios.get<Report[]>(REPORTS_API);

    localStorage.setItem("reports", JSON.stringify(res.data));

    return res.data
}