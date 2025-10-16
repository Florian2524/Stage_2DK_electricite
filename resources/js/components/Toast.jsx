import React, { useEffect } from "react";

/**
 * Toast
 * props:
 * - open: bool
 * - message: string
 * - variant: "success" | "error" | "info"
 * - onClose: () => void
 * - timeout: ms (par défaut 2200)
 */
export default function Toast({ open, message, variant = "success", onClose, timeout = 2200 }) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => onClose?.(), timeout);
    return () => clearTimeout(id);
  }, [open, timeout, onClose]);

  if (!open) return null;

  const color =
    variant === "error" ? "bg-red-600 border-red-500" :
    variant === "info"  ? "bg-zinc-800 border-zinc-600" :
                          "bg-emerald-600 border-emerald-500";

  return (
    <div className="fixed z-[200] bottom-6 left-1/2 -translate-x-1/2">
      <div className={`px-4 py-2 rounded-lg text-white border shadow-lg ${color}`}>
        {message}
      </div>
    </div>
  );
}
