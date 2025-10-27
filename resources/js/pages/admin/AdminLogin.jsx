// resources/js/pages/admin/AdminLogin.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";
import api from "../../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // case "Se souvenir de moi"
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");
  const from = location.state?.from?.pathname || "/admin";

  // Précharge le cookie CSRF au montage (évite le 419 au premier POST)
  useEffect(() => {
    api.ensureCsrf().catch(() => {});
  }, []);

  // Si déjà loggé, redirige vers l’admin
  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true });
  }, [loading, user, from, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setLocalError("");
    setSubmitting(true);
    try {
      // On passe remember au provider (qui le transmettra à l'API)
      const res = await login({ email, password, remember });
      if (res?.ok) {
        navigate(from, { replace: true });
      } else {
        setLocalError("Identifiants invalides.");
      }
    } catch (err) {
      setLocalError("Erreur de connexion.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
      <section className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold text-zinc-100">Connexion administrateur</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Entrez vos identifiants pour accéder à l’administration.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
          <div className="space-y-1">
            <label className="block text-sm text-zinc-300" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-zinc-300" htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {/* Se souvenir de moi (au-dessus du bouton, avec espace) */}
          <div className="mt-2 mb-4">
            <label htmlFor="remember" className="inline-flex items-center gap-2 text-sm select-none">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Se souvenir de moi
            </label>
          </div>

          {(localError || error) && (
            <p className="text-red-500 text-sm">
              {localError || (typeof error === "string" ? error : "Erreur de connexion")}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center px-6 h-12 font-semibold bg-[#F6C90E] text-black border border-[#F6C90E] transition-colors hover:bg-black hover:text-[#F6C90E] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </section>
    </main>
  );
}
