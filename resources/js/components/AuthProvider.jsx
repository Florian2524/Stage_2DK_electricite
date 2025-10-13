import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import api from "../lib/api";

// Contexte d'auth (partagé dans toute l'app)
const AuthContext = createContext(null);

// Hook pratique
export function useAuth() {
  return useContext(AuthContext);
}

// Provider global : stocke user + actions login/logout
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);   // charge l'état au démarrage
  const [error, setError] = useState(null);

  // Récupère l'utilisateur connecté au montage
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await api.me();
        if (mounted) setUser(me);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Connexion
  async function login({ email, password }) {
    setError(null);
    try {
      await api.login({ email, password });
      const me = await api.me();
      setUser(me);
      return { ok: true };
    } catch (e) {
      setUser(null);
      setError(e?.data?.message || "Identifiants invalides");
      return { ok: false, error: e };
    }
  }

  // Déconnexion
  async function logout() {
    try { await api.logout(); } catch {}
    setUser(null);
  }

  // Expose ce qui est utile
  const value = useMemo(() => ({ user, loading, error, login, logout }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
