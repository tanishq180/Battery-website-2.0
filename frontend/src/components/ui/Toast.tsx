import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose, className }) => {
  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div
      className={cn(
        "p-4 rounded-xl border shadow-md flex items-start justify-between space-x-3 transition-all duration-200",
        isSuccess && "bg-emerald-50 border-emerald-200 text-emerald-900",
        isError && "bg-red-50 border-red-200 text-red-900",
        !isSuccess && !isError && "bg-slate-900 border-slate-800 text-white",
        className
      )}
    >
      <div className="flex items-start space-x-3">
        {isSuccess && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />}
        {isError && <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />}
        <p className="text-xs sm:text-sm font-medium leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
