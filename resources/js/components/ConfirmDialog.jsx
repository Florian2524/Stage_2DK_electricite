import React, { useEffect, useRef } from "react";

/**
 * ConfirmDialog
 * Props:
 * - open: bool
 * - title: string
 * - message: string | ReactNode
 * - confirmText: string
 * - cancelText: string
 * - onConfirm: () => void | Promise<void>
 * - onCancel: () => void
 * - busy: bool (désactive les boutons)
 */
export default function ConfirmDialog({
  open,
  title = "Confirmation",
  message = "Êtes-vous sûr ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onCancel,
  busy = false,
}) {
  const dialogRef = useRef(null);
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (open) {
      // focus sur le bouton Annuler
      setTimeout(() => cancelBtnRef.current?.focus(), 0);
      const onKey = (e) => {
        if (e.key === "Escape") onCancel?.();
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-title"
      ref={dialogRef}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={busy ? undefined : onCancel} />
      {/* Panel */}
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">
        <div className="px-5 pt-5">
          <h2 id="confirm-title" className="text-lg font-semibold text-zinc-100">
            {title}
          </h2>
          <div className="mt-2 text-sm text-zinc-300">{message}</div>
        </div>
        <div className="px-5 pb-5 pt-4 flex items-center justify-end gap-2">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-4 h-10 border border-zinc-600 text-zinc-200 hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="px-4 h-10 font-semibold bg-red-600 text-white border border-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? "Suppression…" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
