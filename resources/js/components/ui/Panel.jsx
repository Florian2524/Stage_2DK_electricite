import React from "react";

// Conteneur générique : supporte 'as' + propage les props (onSubmit, id, ...)
export default function Panel({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag
      className={
        "border border-zinc-800 hover:border-[#F6C90E]/40 transition bg-zinc-900/40 " +
        className
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
