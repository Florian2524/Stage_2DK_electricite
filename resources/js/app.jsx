import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Contact from "./components/Contact";
import MentionsLegales from "./components/MentionsLegales";
import Footer from "./components/Footer";

// ✅ Admin (imports)
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceForm from "./pages/ServiceForm"; // ⬅️ NEW

// ✅ Pages Services (dédiées, conservées)
import Installation from "./services/Installation";
import MiseAuxNormes from "./services/MiseAuxNormes";
import Renovation from "./services/Renovation";
import Depannage from "./services/Depannage";

// ⚠️ Supprimé : la page ./pages/Services (on utilise la section sur la Home)
// import Services from "./pages/Services";

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

      {/* ✅ Contexte d'auth tout autour des routes */}
      <AuthProvider>
        <Routes>
          {/* Accueil */}
          <Route path="/" element={<Home />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactez-nous" element={<Contact />} />

          {/* Mentions légales */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />

          {/* ✅ Services (publiques dédiées existantes) */}
          {/* Pas de route /services : la section est sur la Home */}
          <Route path="/services/installation" element={<Installation />} />
          <Route path="/services/mise-aux-normes" element={<MiseAuxNormes />} />
          <Route path="/services/renovation" element={<Renovation />} />
          <Route path="/services/depannage" element={<Depannage />} />

          {/* ✅ Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* NEW: création */}
          <Route
            path="/admin/services/new"
            element={
              <ProtectedRoute>
                <ServiceForm />
              </ProtectedRoute>
            }
          />
          {/* NEW: édition */}
          <Route
            path="/admin/services/:id/edit"
            element={
              <ProtectedRoute>
                <ServiceForm />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>

      <Footer />
    </BrowserRouter>
  );
}

const el = document.getElementById("app");
if (el) {
  createRoot(el).render(<App />);
}
