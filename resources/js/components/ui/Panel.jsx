import React from "react";

// Conteneur générique : bordure + fond + hover
export default function Panel({ className = "", children, ...rest }) {
  return (
    <div
      className={
        "border border-zinc-800 hover:border-[#F6C90E]/40 transition bg-zinc-900/40 " +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
}
