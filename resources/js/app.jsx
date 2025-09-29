import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop"; // ⬅️ import ici
import Home from "./components/Home";
import Contact from "./components/Contact";

function NotFound() {
  return (
    <main className="min-h-[50vh] flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold">Page introuvable</h1>
        <p className="mt-2 text-zinc-600">La page demandée n’existe pas.</p>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ⬅️ Ajouté ici, s’applique à toutes les routes */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactez-nous" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const el = document.getElementById("app");
if (el) {
  createRoot(el).render(<App />);
}
