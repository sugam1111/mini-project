import { CheckCheck, Trash2, Pencil, CircleAlert, Plus } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  name?: string;
  type?: "success" | "error";
  action?: "create" | "update" | "delete";
};

const Toast = ({
  title,
  description,
  name,
  type = "success",
  action,
}: Props) => {
  const isSuccess = type === "success";

  const getMessage = () => {
    if (!name) return null;

    if (!isSuccess) return "action failed";

    switch (action) {
      case "create":
        return "has been saved successfully";
      case "update":
        return "has been updated successfully";
      case "delete":
        return "has been deleted successfully";
      default:
        return "";
    }
  };

  const ActionIcon = () => {
    if (!isSuccess) return <CircleAlert size={18} />;

    switch (action) {
      case "create":
        return <Plus size={18} />;
      case "update":
        return <Pencil size={18} />;
      case "delete":
        return <Trash2 size={18} />;
      default:
        return <CheckCheck size={18} />;
    }
  };

  return (
    <div
      className={`relative flex min-w-[340px] max-w-[440px] items-start gap-4 overflow-hidden rounded-3xl border p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]
      ${
        isSuccess
          ? "border-emerald-200 bg-white"
          : "border-rose-200 bg-white"
      }`}
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
        <ActionIcon />
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

        {name && getMessage() && (
          <p className="mt-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{name}</span>{" "}
            {getMessage()}
          </p>
        )}

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Toast;