import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/Layout/layout";
import { APP_ROUTES } from "./config/routes";
import { Loader } from "./components/Loader/loader";

const ReportsPage = lazy(() => import("@/pages/reports/page"));
const MarksPage = lazy(() => import("./pages/Students/page"));

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 relative flex items-center justify-center border-b bg-white">
        <img className="absolute left-0 h-12" src="/Logo.png" alt="school logo" />

        <h1 className="py-5 text-center text-4xl font-bold text-purple-700">
          Students Report & Marks
        </h1>
      </div>

      <div className="m-4">
        <AppLayout>
          <Suspense fallback={<div className="p-6 text-center"><Loader /></div>}>
            <Routes>
              <Route path="/" element={<Navigate to={APP_ROUTES.reports} replace />} />
              <Route path={APP_ROUTES.reports} element={<ReportsPage />} />
              <Route path={APP_ROUTES.marks} element={<MarksPage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Suspense>
        </AppLayout>
      </div>
    </div>
  );
}