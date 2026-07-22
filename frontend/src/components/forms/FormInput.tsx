import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, required, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          ref={ref}
          required={required}
          className={cn(
            "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:bg-white transition",
            error
              ? "border-red-300 focus:ring-red-500 bg-red-50/30"
              : "border-slate-200 focus:ring-emerald-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
