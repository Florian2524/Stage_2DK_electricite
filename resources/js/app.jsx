import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <Home />
    </div>
  );
}

const el = document.getElementById("app");
if (el) {
  createRoot(el).render(<App />);
}
