// resources/js/pages/ServiceForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../lib/api";

export default function ServiceForm() {
  const { id } = useParams();
  const isEdit = useMemo(() => !!id, [id]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    is_active: true,
    position: 0,
    duration_minutes: 0,
    base_price: 0,
    excerpt: "",
    description: "",
  });

  const [loading, setLoading] = useState(isEdit); // si édition, on charge d'abord
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  // Précharge CSRF et, si édition, charge la fiche
  useEffect(() => {
    (async () => {
      try {
        await api.ensureCsrf();
        if (isEdit) {
          const data = await api.get(`/api/admin/services/${id}`);
          setForm((f) => ({
            ...f,
            // On mappe prudemment : on ne casse rien si la colonne n’existe pas
            name: data.name ?? data.title ?? data.label ?? "",
            slug: data.slug ?? "",
            is_active: !!data.is_active,
            position: Number.isFinite(+data.position) ? +data.position : 0,
            duration_minutes: Number.isFinite(+data.duration_minutes) ? +data.duration_minutes : 0,
            base_price: Number.isFinite(+data.base_price) ? +data.base_price : (Number.isFinite(+data.price) ? +data.price : 0),
            excerpt: data.excerpt ?? "",
            description: data.description ?? "",
          }));
        }
      } catch (e) {
        setErr("Impossible de charger le service.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    let v = value;
    if (type === "checkbox") v = checked;
    if (type === "number") v = value === "" ? "" : Number(value);
    setField(name, v);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    // validation minimale
    if (!form.name || form.name.trim().length < 2) {
      setErr("Le nom est obligatoire (2 caractères min).");
      return;
    }
    setSaving(true);
    try {
      // payload souple : le backend ignore ce qui n’est pas en base
      const payload = {
        name: form.name,
        slug: form.slug || undefined,
        is_active: !!form.is_active,
        position: Number.isFinite(+form.position) ? +form.position : 0,
        duration_minutes: Number.isFinite(+form.duration_minutes) ? +form.duration_minutes : 0,
        base_price: Number.isFinite(+form.base_price) ? +form.base_price : 0,
        excerpt: form.excerpt || "",
        description: form.description || "",
      };

      if (isEdit) {
        await api.put(`/api/admin/services/${id}`, payload);
      } else {
        await api.post("/api/admin/services", payload);
      }

      navigate("/admin", {
  replace: true,
  state: { flash: { success: isEdit ? "Service mis à jour." : "Service créé." } },
});
    } catch (e2) {
      const msg =
        (e2?.data?.message) ||
        (typeof e2?.data === "string" ? e2.data : null) ||
        "Échec de l’enregistrement.";
      setErr(msg);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-zinc-400">Chargement…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100">
              {isEdit ? "Modifier un service" : "Nouveau service"}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {isEdit ? `ID #${id}` : "Créer un nouveau service"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="btn-square inline-flex items-center justify-center px-4 h-11 font-semibold border border-zinc-600 hover:bg-zinc-900 transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              form="service-form"
              disabled={saving}
              className="btn-square inline-flex items-center justify-center px-4 h-11 font-semibold bg-[#F6C90E] text-black border border-[#F6C90E] hover:bg-black hover:text-[#F6C90E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          </div>
        </header>

        {err && <p className="mt-4 text-red-500 text-sm">{err}</p>}

        <form id="service-form" onSubmit={onSubmit} className="mt-6 space-y-6">
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm text-zinc-300 mb-1">
              Nom du service *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
              value={form.name}
              onChange={onChange}
              required
            />
            <p className="text-xs text-zinc-500 mt-1">
              2 caractères minimum. Sera utilisé pour générer le slug si vide.
            </p>
          </div>

          {/* Slug (optionnel) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="slug" className="block text-sm text-zinc-300 mb-1">
                Slug (optionnel)
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                placeholder="ex: installation"
                className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.slug}
                onChange={onChange}
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm text-zinc-300 mb-1">
                Position
              </label>
              <input
                id="position"
                name="position"
                type="number"
                className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.position}
                onChange={onChange}
                min={0}
              />
            </div>

            {/* Actif */}
            <div className="flex items-end h-full">
              <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={!!form.is_active}
                  onChange={onChange}
                  className="h-4 w-4"
                />
                Actif
              </label>
            </div>
          </div>

          {/* Durée & Prix de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration_minutes" className="block text-sm text-zinc-300 mb-1">
                Durée (minutes)
              </label>
              <input
                id="duration_minutes"
                name="duration_minutes"
                type="number"
                className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.duration_minutes}
                onChange={onChange}
                min={0}
              />
            </div>
            <div>
              <label htmlFor="base_price" className="block text-sm text-zinc-300 mb-1">
                Prix de base (€)
              </label>
              <input
                id="base_price"
                name="base_price"
                type="number"
                step="0.01"
                className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.base_price}
                onChange={onChange}
                min={0}
              />
            </div>
          </div>

          {/* Extrait */}
          <div>
            <label htmlFor="excerpt" className="block text-sm text-zinc-300 mb-1">
              Extrait (court)
            </label>
            <input
              id="excerpt"
              name="excerpt"
              type="text"
              className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
              value={form.excerpt}
              onChange={onChange}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm text-zinc-300 mb-1">
              Description détaillée
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
              value={form.description}
              onChange={onChange}
            />
          </div>
        </form>
      </section>
    </main>
  );
}
