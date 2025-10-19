import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../components/AuthProvider";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Confirm delete
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null); // { id, name }
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toast, setToast] = useState({ open: false, message: "", variant: "success" });
  const showToast = (message, variant = "success") =>
    setToast({ open: true, message, variant });
  const closeToast = () => setToast(t => ({ ...t, open: false }));

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  async function load() {
    try {
      setErr("");
      setLoading(true);
      const data = await api.get("/api/admin/services");
      setServices(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr("Impossible de charger les services.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Affiche un toast si on arrive de /new ou /edit
  useEffect(() => {
    const msg = location.state?.flash?.success;
    if (msg) {
      showToast(msg, "success");
      // on nettoie l'état d'historique pour éviter de ré-afficher au back/forward
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    try { await logout(); } catch {}
    navigate("/admin/login", { replace: true });
  }

  function askDelete(svc) {
    setTarget({ id: svc.id, name: svc.name || svc.title || svc.label || `#${svc.id}` });
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!target?.id) return;
    setDeleting(true);
    try {
      await api.del(`/api/admin/services/${target.id}`);
      setServices(prev => prev.filter(s => s.id !== target.id));
      setConfirmOpen(false);
      setTarget(null);
      showToast("Service supprimé.");
    } catch (e) {
      setErr("Suppression impossible. Réessaie.");
      showToast("Échec de la suppression.", "error");
    } finally {
      setDeleting(false);
    }
  }

  async function toggleActive(svc) {
    const next = !svc.is_active;
    // Optimistic UI
    setServices(prev => prev.map(s => s.id === svc.id ? { ...s, is_active: next } : s));
    try {
      await api.put(`/api/admin/services/${svc.id}`, { is_active: next });
      showToast(next ? "Service activé." : "Service désactivé.");
    } catch (e) {
      // rollback
      setServices(prev => prev.map(s => s.id === svc.id ? { ...s, is_active: !next } : s));
      showToast("Impossible de changer l’état.", "error");
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100">Tableau de bord</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Gestion des services {services.length ? `(${services.length})` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={load}
              className="btn-square inline-flex items-center justify-center px-4 h-11 font-semibold border border-zinc-600 hover:bg-zinc-900 transition-colors"
              title="Rafraîchir la liste"
            >
              Rafraîchir
            </button>
            {/* ⬇️ Nouveau bouton Messages (admin) */}
            <Link
              to="/admin/messages"
              className="btn-square inline-flex items-center justify-center px-4 h-11 font-semibold border border-zinc-600 hover:bg-zinc-900 transition-colors"
              title="Voir les messages"
            >
              Messages
            </Link>
            <Link
              to="/admin/services/new"
              className="btn-square inline-flex items-center justify-center px-4 h-11 font-semibold bg-[#F6C90E] text-black border border-[#F6C90E] hover:bg-black hover:text-[#F6C90E] transition-colors"
            >
              + Nouveau service
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-square inline-flex items-center justify-center px-4 h-11 font-semibold border border-red-500 text-red-400 hover:bg-red-600/10 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </header>

        {err && <p className="mt-4 text-red-500 text-sm">{err}</p>}

        {loading ? (
          <p className="mt-6 text-zinc-400">Chargement…</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border border-zinc-700">
              <thead className="bg-zinc-900/60">
                <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-sm [&>th]:font-semibold [&>th]:text-zinc-300 border-b border-zinc-700">
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Actif</th>
                  <th className="w-56">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-zinc-400">
                      Aucun service pour le moment.
                    </td>
                  </tr>
                ) : (
                  services.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-zinc-800 hover:bg-zinc-900/40"
                    >
                      <td className="px-3 py-2 text-zinc-400">{s.id}</td>
                      <td className="px-3 py-2">{s.name || s.title || s.label}</td>
                      <td className="px-3 py-2">
                        <label className="inline-flex items-center gap-2 select-none">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={!!s.is_active}
                            onChange={() => toggleActive(s)}
                          />
                          <span
                            className={`w-10 h-6 rounded-full transition-colors
                              ${s.is_active ? "bg-emerald-600" : "bg-zinc-600"}
                              relative inline-block`}
                            aria-hidden
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform
                                ${s.is_active ? "translate-x-4" : ""}`}
                            />
                          </span>
                          <span className="text-sm text-zinc-300">
                            {s.is_active ? "Actif" : "Inactif"}
                          </span>
                        </label>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/services/${s.id}/edit`}
                            className="px-3 h-9 inline-flex items-center border border-zinc-600 text-sm hover:bg-zinc-900 transition-colors"
                          >
                            Éditer
                          </Link>
                          <button
                            type="button"
                            onClick={() => askDelete(s)}
                            className="px-3 h-9 inline-flex items-center border border-red-600 text-sm text-red-400 hover:bg-red-600/10 transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer le service"
        message={
          <span>
            Voulez-vous vraiment supprimer{" "}
            <span className="font-semibold text-zinc-100">{target?.name}</span> ?
            <br />
            Cette action est définitive.
          </span>
        }
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={confirmDelete}
        onCancel={() => { if (!deleting) { setConfirmOpen(false); setTarget(null); } }}
        busy={deleting}
      />

      {/* Toast */}
      <Toast open={toast.open} message={toast.message} variant={toast.variant} onClose={closeToast} />
    </main>
  );
}
