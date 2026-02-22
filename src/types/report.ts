export interface Marks {
    math : number;
    science : number;
    english : number;
} 



export interface Student { 
    id : string;
    name : string;
    rollNumber : number;
    class : string;
    marks : Marks;
}

export type ReportStatus = "Draft" | "Published" | "Archived" ;

export interface Report {
  id: string;
  title: string;
  createdBy: string;
  createdAt: string;
  status: ReportStatus;
  remarks: string;
  student: Student;

}