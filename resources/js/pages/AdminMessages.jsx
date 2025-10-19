import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";

export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState({ only_unread: false, ownership: "", work: "" });

  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState({ subject: "", body: "" });
  const [sending, setSending] = useState(false);

  async function load() {
    setLoading(true);
    setErr("");
    try {
      await api.ensureCsrf();
      const qs = new URLSearchParams();
      if (filter.only_unread) qs.set("only_unread", "1");
      if (filter.ownership) qs.set("ownership", filter.ownership);
      if (filter.work) qs.set("work", filter.work);
      const data = await api.get(`/api/admin/contact-messages?${qs.toString()}`);
      setItems(data);
    } catch {
      setErr("Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filter.only_unread, filter.ownership, filter.work]);

  const open = async (id) => {
    setErr("");
    try {
      await api.ensureCsrf();
      const data = await api.get(`/api/admin/contact-messages/${id}`);
      setSelected(data);
      setReply({ subject: `Re: ${data.subject}`, body: "" });
      // refresh liste (le message passe à is_read = true)
      load();
    } catch {
      setErr("Impossible d’ouvrir ce message.");
    }
  };

  const destroy = async (id) => {
    if (!confirm("Supprimer ce message ?")) return;
    setErr("");
    try {
      await api.ensureCsrf();
      await api.del(`/api/admin/contact-messages/${id}`);
      setSelected(null);
      load();
    } catch {
      setErr("Suppression impossible.");
    }
  };

  const sendReply = async () => {
    if (!selected) return;
    if (!reply.subject.trim() || !reply.body.trim()) return;
    setSending(true);
    setErr("");
    try {
      await api.ensureCsrf();
      await api.post(`/api/admin/contact-messages/${selected.id}/reply`, {
        subject: reply.subject.trim(),
        body: reply.body.trim(),
      });
      alert("Réponse envoyée.");
      setReply({ subject: `Re: ${selected.subject}`, body: "" });
    } catch {
      setErr("Échec de l’envoi de la réponse.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100">Messages</h1>
            <p className="text-sm text-zinc-400">Demandes reçues via le formulaire de contact.</p>
          </div>
          <Link to="/admin" className="btn-square px-4 h-11 font-semibold border border-zinc-600 hover:bg-zinc-900">
            Retour dashboard
          </Link>
        </header>

        {err && <p className="text-sm text-red-400 mb-4">{err}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Liste */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={filter.only_unread}
                  onChange={(e) => setFilter(f => ({ ...f, only_unread: e.target.checked }))}/>
                Non lus
              </label>
              <select
                className="bg-zinc-900 border border-zinc-700 text-sm px-2 py-1"
                value={filter.ownership}
                onChange={(e)=>setFilter(f=>({ ...f, ownership: e.target.value }))}
              >
                <option value="">Tous statuts</option>
                <option value="proprietaire">Propriétaire</option>
                <option value="locataire">Locataire</option>
              </select>
              <input
                className="bg-zinc-900 border border-zinc-700 text-sm px-2 py-1 flex-1"
                placeholder="Filtrer par type de travaux (slug)"
                value={filter.work}
                onChange={(e)=>setFilter(f=>({ ...f, work: e.target.value.trim() }))}
              />
            </div>

            <div className="border border-zinc-800 divide-y divide-zinc-800">
              {loading ? (
                <div className="p-4 text-zinc-400">Chargement…</div>
              ) : items.length === 0 ? (
                <div className="p-4 text-zinc-400">Aucun message.</div>
              ) : items.map(m => (
                <button key={m.id} onClick={() => open(m.id)}
                  className={`w-full text-left p-3 hover:bg-zinc-900 ${!m.is_read ? "bg-zinc-900/40" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-xs text-zinc-400">{new Date(m.created_at).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-zinc-300">{m.subject}</div>
                  {m.ownership && <div className="text-xs text-zinc-500">Statut: {m.ownership}</div>}
                </button>
              ))}
            </div>
          </div>

          {/* Détail */}
          <div className="md:col-span-2">
            {!selected ? (
              <div className="p-6 border border-zinc-800 text-zinc-400">Sélectionnez un message.</div>
            ) : (
              <div className="space-y-4">
                <div className="p-6 border border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl font-bold">{selected.subject}</div>
                    <button onClick={() => destroy(selected.id)}
                      className="btn-square px-3 h-9 font-semibold border border-zinc-600 hover:bg-zinc-900">
                      Supprimer
                    </button>
                  </div>
                  <div className="text-sm text-zinc-400 mb-3">
                    De {selected.name} &lt;{selected.email}&gt; — {new Date(selected.created_at).toLocaleString()}
                  </div>
                  <pre className="whitespace-pre-wrap text-zinc-200">{selected.message}</pre>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {selected.phone && <div><span className="text-zinc-400">Téléphone: </span>{selected.phone}</div>}
                    {selected.ownership && <div><span className="text-zinc-400">Statut: </span>{selected.ownership}</div>}
                    {selected.site_address && <div className="sm:col-span-2"><span className="text-zinc-400">Adresse: </span>{selected.site_address}</div>}
                    {Array.isArray(selected.works_json) && selected.works_json.length > 0 && (
                      <div className="sm:col-span-2">
                        <span className="text-zinc-400">Travaux: </span>{selected.works_json.join(", ")}
                      </div>
                    )}
                    <div><span className="text-zinc-400">RGPD: </span>{selected.rgpd ? "oui" : "non"}</div>
                  </div>
                </div>

                {/* Réponse rapide */}
                <div className="p-6 border border-zinc-800">
                  <div className="text-lg font-semibold mb-2">Répondre</div>
                  <input
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 mb-2"
                    value={reply.subject}
                    onChange={(e)=>setReply(r=>({ ...r, subject: e.target.value }))}
                    placeholder="Objet"
                  />
                  <textarea
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 h-40"
                    value={reply.body}
                    onChange={(e)=>setReply(r=>({ ...r, body: e.target.value }))}
                    placeholder="Votre message…"
                  />
                  <div className="mt-3">
                    <button
                      onClick={sendReply}
                      disabled={sending}
                      className="btn-square px-4 h-10 font-semibold bg-[#F6C90E] text-black border border-[#F6C90E] hover:bg-black hover:text-[#F6C90E] disabled:opacity-60"
                    >
                      {sending ? "Envoi…" : "Envoyer"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
