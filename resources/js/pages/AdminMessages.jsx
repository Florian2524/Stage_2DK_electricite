import React, { useEffect, useRef, useState } from "react";

const fmt = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit"
});
const short = (s = "", n = 80) => (s.length > n ? s.slice(0, n - 1) + "… " : s);

export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState({ subject: "", body: "" });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);

  const [filter, setFilter] = useState({
    only_unread: false,
    ownership: "",
    work: "",
    q: "",
  });

  const abortRef = useRef(null);

  async function load() {
    setLoading(true);
    setErr("");

    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const qs = new URLSearchParams();
      qs.set("plain", "1"); // tableau simple côté API
      if (filter.only_unread) qs.set("only_unread", "1");
      if (filter.ownership) qs.set("ownership", filter.ownership);
      if (filter.work) qs.set("work", filter.work);

      const url = `/api/admin/contact-messages?${qs.toString()}`;

      const res = await fetch(url, {
        credentials: "include",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();

      // tableau simple attendu
      let rows = Array.isArray(payload?.data) ? payload.data
               : Array.isArray(payload) ? payload
               : [];

      // filtre client léger (recherche)
      const q = filter.q.trim().toLowerCase();
      if (q) {
        rows = rows.filter(r =>
          [r.name, r.email, r.subject, r.message]
            .filter(Boolean)
            .some(v => String(v).toLowerCase().includes(q))
        );
      }

      setItems(rows);

      // conservez la sélection si présente
      if (selected) {
        const still = rows.find(r => r.id === selected.id);
        if (still) setSelected(still);
        else setSelected(null);
      }
    } catch (e) {
      if (e?.name !== "AbortError") {
        console.error("[AdminMessages] load", e);
        setErr("Impossible de charger les messages.");
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.only_unread, filter.ownership, filter.work, filter.q]);

  async function openMessage(id) {
    setErr("");
    try {
      const res = await fetch(`/api/admin/contact-messages/${id}`, {
        credentials: "include",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSelected(data);
      setReply(r => ({
        subject: r.subject || `Re: ${data.subject || "Votre demande"}`,
        body: r.body || "",
      }));
      // marque lu côté liste
      setItems(list => list.map(x => (x.id === id ? { ...x, is_read: true } : x)));
    } catch (e) {
      console.error("[AdminMessages] open", e);
      setErr("Impossible d’ouvrir ce message.");
    }
  }

  async function toggleRead(id, next) {
    // pas d’endpoint dédié → on triche en ouvrant (show marque lu), sinon on rafraîchit
    if (next) {
      await openMessage(id);
    } else {
      // reset en DB non prévu ici — on simule côté UI
      setItems(list => list.map(x => (x.id === id ? { ...x, is_read: false } : x)));
      if (selected?.id === id) setSelected(s => ({ ...s, is_read: false }));
    }
  }

  async function removeMessage(id) {
    if (!confirm("Supprimer ce message ?")) return;
    try {
      const res = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setItems(list => list.filter(x => x.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e) {
      console.error("[AdminMessages] delete", e);
      setErr("Suppression impossible.");
    }
  }

  async function sendReply() {
    if (!selected) return;
    if (!reply.subject.trim() || !reply.body.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/admin/contact-messages/${selected.id}/reply`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: reply.subject.trim(),
          body: reply.body.trim(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Réponse envoyée.");
      setReply({ subject: `Re: ${selected.subject}`, body: "" });
    } catch (e) {
      console.error("[AdminMessages] reply", e);
      setErr("Échec de l’envoi de la réponse.");
    } finally {
      setSending(false);
    }
  }

  const unreadCount = items.filter(m => !m.is_read).length;

  return (
    <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100">
              Messages
              {unreadCount > 0 && (
                <span className="ml-3 text-sm font-semibold px-2 py-1 rounded bg-[#F6C90E]/15 text-[#F6C90E]">
                  {unreadCount} non lus
                </span>
              )}
            </h1>
            <p className="text-sm text-zinc-400">Demandes reçues via le formulaire de contact.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="px-4 h-10 border border-zinc-700 hover:bg-zinc-900 rounded"
            >
              Recharger
            </button>
          </div>
        </header>

        {/* Barre de filtres */}
        <div className="mb-4 flex flex-wrap gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filter.only_unread}
              onChange={e => setFilter(f => ({ ...f, only_unread: e.target.checked }))}
            />
            Non lus
          </label>

          <select
            className="bg-zinc-900 border border-zinc-700 text-sm px-2 h-9 rounded"
            value={filter.ownership}
            onChange={e => setFilter(f => ({ ...f, ownership: e.target.value }))}
          >
            <option value="">Tous statuts</option>
            <option value="proprietaire">Propriétaire</option>
            <option value="locataire">Locataire</option>
          </select>

          <input
            className="bg-zinc-900 border border-zinc-700 text-sm px-3 h-9 rounded w-64"
            placeholder="Filtrer par type de travaux (slug)"
            value={filter.work}
            onChange={e => setFilter(f => ({ ...f, work: e.target.value }))}
          />

          <input
            className="bg-zinc-900 border border-zinc-700 text-sm px-3 h-9 rounded w-72"
            placeholder="Rechercher (nom, email, sujet, message)"
            value={filter.q}
            onChange={e => setFilter(f => ({ ...f, q: e.target.value }))}
          />
        </div>

        {err && <p className="text-sm text-red-400 mb-4">{err}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Liste */}
          <div className="md:col-span-1">
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              {loading ? (
                <ListSkeleton />
              ) : items.length === 0 ? (
                <div className="p-6 text-zinc-400 text-sm">
                  Aucun message ne correspond aux filtres.
                </div>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {items.map(m => {
                    const isSelected = selected?.id === m.id;
                    return (
                      <li key={m.id}>
                        <button
                          onClick={() => openMessage(m.id)}
                          className={
                            "w-full text-left px-4 py-3 hover:bg-zinc-900 transition " +
                            (isSelected ? "bg-zinc-900/60 ring-1 ring-zinc-700" : "")
                          }
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="font-semibold truncate">{m.name}</div>
                                {!m.is_read && (
                                  <span className="text-[10px] font-bold uppercase tracking-wide bg-[#F6C90E] text-black px-1.5 py-0.5 rounded">
                                    Non lu
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-zinc-300 truncate">
                                {short(m.subject || "—", 60)}
                              </div>
                              {m.ownership && (
                                <div className="text-xs text-zinc-500">
                                  Statut&nbsp;: {m.ownership}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-zinc-400 shrink-0">
                              {m.created_at ? fmt.format(new Date(m.created_at)) : "—"}
                            </div>
                          </div>
                        </button>

                        {/* Actions rapides sous l’item sélectionné */}
                        {isSelected && (
                          <div className="px-4 pb-3 flex gap-2 text-xs">
                            <button
                              onClick={() => toggleRead(m.id, !m.is_read)}
                              className="px-2 h-7 border border-zinc-700 rounded hover:bg-zinc-900"
                            >
                              {m.is_read ? "Marquer non lu" : "Marquer lu"}
                            </button>
                            <button
                              onClick={() => navigator.clipboard?.writeText(selected?.email || m.email || "")}
                              className="px-2 h-7 border border-zinc-700 rounded hover:bg-zinc-900"
                            >
                              Copier l’e-mail
                            </button>
                            <button
                              onClick={() => removeMessage(m.id)}
                              className="px-2 h-7 border border-red-500/50 text-red-300 rounded hover:bg-red-500/10"
                            >
                              Supprimer
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Détail */}
          <div className="md:col-span-2">
            <div className="md:sticky md:top-6">
              {!selected ? (
                <div className="p-8 border border-zinc-800 rounded-lg text-zinc-400">
                  Sélectionnez un message.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-950/40">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xl font-bold">{selected.subject}</div>
                        <div className="text-sm text-zinc-400 mt-1">
                          Reçu le {selected.created_at ? fmt.format(new Date(selected.created_at)) : "—"}
                        </div>
                      </div>
                      <button
                        onClick={() => removeMessage(selected.id)}
                        className="text-red-300 border border-red-500/50 rounded px-3 h-9 hover:bg-red-500/10"
                      >
                        Supprimer
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                      <Info label="Nom" value={selected.name} />
                      <Info label="E-mail" value={selected.email} />
                      <Info label="Téléphone" value={selected.phone || "—"} />
                      <Info label="Statut" value={selected.ownership || "—"} />
                      <Info className="col-span-2" label="Adresse" value={selected.site_address || "—"} />
                      <Info className="col-span-2" label="Travaux" value={(selected.works_json || []).join(", ") || "—"} />
                    </div>

                    <div className="mt-5">
                      <div className="text-sm text-zinc-400 mb-1">Message</div>
                      <pre className="whitespace-pre-wrap bg-zinc-900/40 p-3 rounded border border-zinc-800">
                        {selected.message}
                      </pre>
                      <div className="mt-2 text-xs">
                        <span className="text-zinc-400">RGPD:&nbsp;</span>{selected.rgpd ? "oui" : "non"}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-950/40">
                    <div className="text-lg font-semibold mb-3">Répondre</div>
                    <input
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 h-10 mb-2"
                      value={reply.subject}
                      onChange={e => setReply(r => ({ ...r, subject: e.target.value }))}
                      placeholder="Objet"
                    />
                    <textarea
                      className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 h-40"
                      value={reply.body}
                      onChange={e => setReply(r => ({ ...r, body: e.target.value }))}
                      placeholder="Votre réponse…"
                    />
                    <div className="mt-3">
                      <button
                        onClick={sendReply}
                        disabled={sending}
                        className="px-4 h-10 font-semibold border border-[#F6C90E] text-[#F6C90E] rounded hover:bg-black disabled:opacity-60"
                      >
                        {sending ? "Envoi…" : "Envoyer"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value, className = "" }) {
  return (
    <div className={className}>
      <div className="text-zinc-400">{label}</div>
      <div className="text-zinc-100 break-words">{value}</div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <ul className="divide-y divide-zinc-800 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="px-4 py-3">
          <div className="h-4 w-40 bg-zinc-800 rounded mb-2" />
          <div className="h-3 w-56 bg-zinc-900 rounded mb-1" />
          <div className="h-3 w-24 bg-zinc-900 rounded" />
        </li>
      ))}
    </ul>
  );
}
