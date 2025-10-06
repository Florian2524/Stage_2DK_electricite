import React from "react";

// Champ réutilisable : input / textarea / select / checkbox
export default function Field({
  id,
  name,
  label,
  hint,          // petit texte d’aide à droite du label
  as = "input",  // "input" | "textarea" | "select" | "checkbox"
  options = [],  // pour <select> : [{value, label}]
  value,
  checked,
  onChange,
  error,
  className = "",
  ...rest
}) {
  const base =
    "mt-2 w-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#F6C90E]";

  // Label commun (sauf checkbox où le label suit l’input)
  const LabelTop = () => (
    <label htmlFor={id} className="block text-sm font-medium text-zinc-200">
      {label} {hint && <span className="text-zinc-400 italic">{hint}</span>}
    </label>
  );

  const Error = () =>
    error ? <p className="mt-1 text-sm text-red-400">{error}</p> : null;

  if (as === "textarea") {
    return (
      <div className={"mb-5 " + className}>
        <LabelTop />
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={base}
          {...rest}
        />
        <Error />
      </div>
    );
  }

  if (as === "select") {
    return (
      <div className={"mb-5 " + className}>
        <LabelTop />
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={base}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Error />
      </div>
    );
  }

  if (as === "checkbox") {
    return (
      <div className={"mb-6 flex items-start gap-3 " + className}>
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={!!checked}
          onChange={onChange}
          className="mt-1 h-4 w-4 accent-[#F6C90E]"
          {...rest}
        />
        <label htmlFor={id} className="text-sm text-zinc-300">
          {label}
        </label>
        {error && <p className="ml-auto text-sm text-red-400">{error}</p>}
      </div>
    );
  }

  // input (texte, email, etc.)
  return (
    <div className={"mb-5 " + className}>
      <LabelTop />
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={base}
        {...rest}
      />
      <Error />
    </div>
  );
}
