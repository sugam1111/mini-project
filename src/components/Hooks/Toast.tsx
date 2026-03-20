import { CheckCheck, Trash2, Pencil, CircleAlert, Plus } from "lucide-react";
import { toast } from "sonner";

type ToastType = "create" | "update" | "delete" | "error";

type ToastOptions = {
  type: ToastType;
  name?: string;
  description?: string;
};

type ToastContentProps = {
  title: string;
  description?: string;
  message?: string;
  status: "success" | "error";
  type: ToastType;
};

const toastConfig = {
  create: {
    title: "Saved",
    status: "success" as const,
    getMessage: (name?: string) =>
      name ? `${name} has been saved successfully` : undefined,
  },
  update: {
    title: "Updated",
    status: "success" as const,
    getMessage: (name?: string) =>
      name ? `${name} has been updated successfully` : undefined,
  },
  delete: {
    title: "Deleted",
    status: "success" as const,
    getMessage: (name?: string) =>
      name ? `${name} has been deleted successfully` : undefined,
  },
  error: {
    title: "Failed",
    status: "error" as const,
    getMessage: () => undefined,
  },
};

function ToastIcon({ type, status }: { type: ToastType; status: "success" | "error" }) {
  if (status === "error") {
    return <CircleAlert size={18} />;
  }

  switch (type) {
    case "create":
      return <Plus size={18} />;
    case "update":
      return <Pencil size={18} />;
    case "delete":
      return <Trash2 size={18} />;
    default:
      return <CheckCheck size={18} />;
  }
}

function ToastContent({
  title,
  description,
  message,
  status,
  type,
}: ToastContentProps) {
  const isSuccess = status === "success";

  return (
    <div
      className={`relative flex min-w-[340px] max-w-[440px] items-start gap-4 overflow-hidden rounded-3xl border p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]
      ${isSuccess ? "border-emerald-200 bg-white" : "border-rose-200 bg-white"}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 ${
          isSuccess
            ? "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400"
            : "bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400"
        }`}
      />

      <div
        className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
        ${
          isSuccess
            ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
            : "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
        }`}
      >
        <ToastIcon type={type} status={status} />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em]
            ${
              isSuccess
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {isSuccess ? "Success" : "Failed"}
          </span>
        </div>

        {message && <p className="mt-1 text-sm text-slate-600">{message}</p>}

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
}

export function showAppToast({ type, name, description }: ToastOptions) {
  const config = toastConfig[type];
  const message = config.getMessage(name);

  toast.custom(() => (
    <ToastContent
      title={config.title}
      description={description}
      message={message}
      status={config.status}
      type={type}
    />
  ));
}

export function useAppToast() {
  return {
    appToast: showAppToast,
  };
}

export default ToastContent;