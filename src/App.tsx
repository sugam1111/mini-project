import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { APP_ROUTES } from "./config/routes";
import AppLayout from "./components/layout/layout";
import NotFoundPage from "./pages/not-found";

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
          <Suspense fallback={<div className="p-6 text-center">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to={APP_ROUTES.reports} replace />} />
              <Route path={APP_ROUTES.reports} element={<ReportsPage />} />
              <Route path={APP_ROUTES.marks} element={<MarksPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </div>
    </div>
  );
}