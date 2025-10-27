import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

// Pages publiques
import Home from "./pages/public/Home";
import Contact from "./pages/public/Contact";
import MentionsLegales from "./pages/public/MentionsLegales";
import ServiceDetail from "./pages/public/ServiceDetail";

// Admin
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ServiceForm from "./pages/admin/ServiceForm";
import AdminMessages from "./pages/admin/AdminMessages";

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
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />

        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactez-nous" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />

          {/* Service dynamique */}
          <Route path="/services/:slug" element={<ServiceDetail />} />

          {/* Admin (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin (protégé) */}
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
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminMessages />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

const el = document.getElementById("app");
if (el) {
  createRoot(el).render(<App />);
}
