export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_40%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-[120px] font-extrabold leading-none tracking-tight text-purple-600 sm:text-[160px]">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Page not found
        </h2>

        <p className="mt-3 max-w-md text-sm text-slate-500 sm:text-base">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-purple-700"
          >
            Go to Reports Page
          </a>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}