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

import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceForm from "./pages/ServiceForm";

import ServiceDetail from "./services/ServiceDetail";

// ⬇️ AJOUT
import AdminMessages from "./pages/AdminMessages";

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

      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/contactez-nous" element={<Contact />} />

          <Route path="/mentions-legales" element={<MentionsLegales />} />

          {/* Service dynamique */}
          <Route path="/services/:slug" element={<ServiceDetail />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/new"
            element={
              <ProtectedRoute>
                <ServiceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/:id/edit"
            element={
              <ProtectedRoute>
                <ServiceForm />
              </ProtectedRoute>
            }
          />

          {/* ⬇️ AJOUT : page des messages admin */}
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminMessages />
              </ProtectedRoute>
            }
          />

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
