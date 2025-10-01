import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Contact from "./components/Contact";
import MentionsLegales from "./components/MentionsLegales";
import FinalCTA from "./sections/FinalCTA"; // ✅ footer global

// ✅ Pages Services
import Installation from "./services/Installation";
import MiseAuxNormes from "./services/MiseAuxNormes";
import Renovation from "./services/Renovation";
import Depannage from "./services/Depannage";

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
      <ScrollToTop />
      <Header />

      <Routes>
        {/* Accueil */}
        <Route path="/" element={<Home />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactez-nous" element={<Contact />} />

        {/* Mentions légales */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />

        {/* ✅ Services */}
        <Route path="/services/installation" element={<Installation />} />
        <Route path="/services/mise-aux-normes" element={<MiseAuxNormes />} />
        <Route path="/services/renovation" element={<Renovation />} />
        <Route path="/services/depannage" element={<Depannage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ footer global présent sur toutes les pages */}
      <FinalCTA />
    </BrowserRouter>
  );
}

const el = document.getElementById("app");
if (el) {
  createRoot(el).render(<App />);
}
