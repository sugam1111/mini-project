import { Navigate, Route, Routes } from "react-router-dom";

import ReportsPage from "@/pages/reports/page";
import AppLayout from "./components/Layout/layout";
import MarksPage from "./pages/Students/page";
import { APP_ROUTES } from "./config/routes";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-white  border-b flex items-center justify-center relative">
        <img className="h-12 absolute left-0" src="/Logo.png" alt="school logo" />

        <h1 className=" py-5 text-center text-4xl font-bold text-purple-700">
          Students Report & Marks
        </h1>
      </div>

      <div className="m-4">
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to={APP_ROUTES.reports} replace />} />
            <Route path={APP_ROUTES.reports} element={<ReportsPage />} />
            <Route path={APP_ROUTES.marks} element={<MarksPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </AppLayout>
      </div>
    </div>
  );
}