import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

// Bloque l'accès si non connecté
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="min-h-[40vh] flex items-center justify-center text-zinc-400">
        Chargement…
      </main>
    );
  }

  if (!user) {
    // Redirige vers /admin/login et garde la destination
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
