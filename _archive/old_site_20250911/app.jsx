import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header.jsx";

function mountHeader() {
  const el = document.getElementById("header-root");
  if (!el) return;
  const propsStr = el.getAttribute("data-props") || "{}";
  const props = JSON.parse(propsStr);
  const root = createRoot(el);
  root.render(<Header {...props} />);
}

mountHeader();
