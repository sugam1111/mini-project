
import { Navigate, Route, Routes } from "react-router-dom";





import ReportsPage from "@/pages/reports/page";
import AppLayout from "./components/ui/app-layout";
import MarksPage from "./pages/Students/page";
import { APP_ROUTES } from "./config/routes";



export default function App() {
  return (
    <div className="m-4">
      <AppLayout >
      <Routes>
        <Route path="/" element={<Navigate to={APP_ROUTES.reports} replace />} />
        <Route path={APP_ROUTES.reports} element={<ReportsPage />} />
        <Route path={APP_ROUTES.marks} element = {<MarksPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </AppLayout>
    </div>
  );
}




