// resources/js/components/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);   // charge l'état au démarrage
  const [error, setError] = useState(null);

  // Récupère l'utilisateur connecté au montage (source de vérité = serveur)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await api.me(); // GET /api/user
        if (mounted) setUser(me);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Connexion (note: remember est optionnel)
  async function login({ email, password, remember = false }) {
    setError(null);
    try {
      // POST /api/auth/login (on envoie remember au back)
      await api.login({ email, password, remember });
      const me = await api.me(); // on revalide le profil après login
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

  const value = useMemo(() => ({ user, loading, error, login, logout }), [user, loading, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
