import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import api from "../lib/api";

// Tableau de bord + liste des services (lecture seule)
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Etats pour la liste de services
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services au montage
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get("/api/admin/services");
        if (alive) setServices(Array.isArray(data) ? data : []);
      } catch (e) {
        // 401 = plus de session → retour login
        if (e?.status === 401) {
          navigate("/admin/login", { replace: true });
          return;
        }
        if (alive) setError(e?.data?.message || "Erreur lors du chargement des services.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [navigate]);

  async function onLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  async function onRefresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get("/api/admin/services");
      setServices(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e?.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(e?.data?.message || "Erreur lors du rechargement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-zinc-100">Tableau de bord</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              className="px-5 h-10 font-semibold bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-black"
              disabled={loading}
              title="Rafraîchir la liste"
            >
              {loading ? "Chargement…" : "Rafraîchir"}
            </button>
            <button
              onClick={onLogout}
              className="px-5 h-10 font-semibold bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-black"
              title="Se déconnecter"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        <p className="mt-4 text-zinc-400">
          Bonjour, <span className="text-zinc-100 font-semibold">{user?.name}</span>.
        </p>

        {/* Bloc Services */}
        <div className="mt-8 p-5 bg-zinc-900 border border-zinc-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-100">Services</h2>
            {/* futur: bouton "Ajouter" ici */}
          </div>

          {/* Etats */}
          {loading && (
            <p className="mt-4 text-sm text-zinc-400">Chargement des services…</p>
          )}

          {!loading && error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}

          {!loading && !error && services.length === 0 && (
            <p className="mt-4 text-sm text-zinc-400">Aucun service.</p>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-300 border-b border-zinc-800">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Titre</th>
                    <th className="py-2 pr-4">Slug</th>
                    <th className="py-2 pr-4">Créé le</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => {
                    const title = s.title || s.name || s.label || "(sans titre)";
                    const slug = s.slug || s.key || "";
                    return (
                      <tr key={s.id} className="border-b border-zinc-800 hover:bg-zinc-800/40">
                        <td className="py-2 pr-4 text-zinc-300">{s.id}</td>
                        <td className="py-2 pr-4 text-zinc-100">{title}</td>
                        <td className="py-2 pr-4 text-zinc-300">{slug}</td>
                        <td className="py-2 pr-4 text-zinc-400">
                          {s.created_at ? new Date(s.created_at).toLocaleString() : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
