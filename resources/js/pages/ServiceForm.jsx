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
    description: "",
    content_heading: "",
    content_md: "",
    bottom_note: "",
    image_url: "",
    image_path: null,
    image_path_url: null,
  });

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await api.ensureCsrf();
        if (isEdit) {
          const data = await api.get(`/api/admin/services/${id}`);
          setForm((f) => ({
            ...f,
            name: data.name ?? data.title ?? data.label ?? "",
            slug: data.slug ?? "",
            is_active: !!data.is_active,
            position: Number.isFinite(+data.position) ? +data.position : 0,
            description: data.description ?? "",
            content_heading: data.content_heading ?? "",
            content_md: data.content_md ?? "",
            bottom_note: data.bottom_note ?? "",
            image_url: data.image_url ?? "",
            image_path: data.image_path ?? null,
            image_path_url: data.image_path_url ?? null,
          }));
        }
      } catch {
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
    if (!form.name || form.name.trim().length < 2) {
      setErr("Le nom est obligatoire (2 caractères min).");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        slug: form.slug || undefined,
        is_active: !!form.is_active,
        position: Number.isFinite(+form.position) ? +form.position : 0,
        description: form.description || "",
        content_heading: form.content_heading || null,
        content_md: form.content_md || null,
        bottom_note: form.bottom_note || null,
        image_url: form.image_url || null,
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
        e2?.data?.message ||
        (typeof e2?.data === "string" ? e2.data : null) ||
        "Échec de l’enregistrement.";
      setErr(msg);
    } finally {
      setSaving(false);
    }
  }

  function onFileSelect(e) {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : "");
  }

  async function uploadImage() {
    if (!isEdit) {
      setErr("Enregistre d’abord le service pour obtenir un ID, puis uploade l’image.");
      return;
    }
    if (!imageFile) {
      setErr("Aucun fichier sélectionné.");
      return;
    }
    setErr("");
    try {
      await api.ensureCsrf();
      const fd = new FormData();
      fd.append("file", imageFile);
      const res = await api.post(`/api/admin/services/${id}/image`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({
        ...f,
        image_path: res.image_path ?? null,
        image_path_url: res.image_url ?? null,
      }));
      setImageFile(null);
      setImagePreview("");
    } catch (e2) {
      const msg =
        e2?.data?.message ||
        e2?.data?.errors?.file?.[0] ||
        "Échec de l’upload (format ou taille ?)";
      setErr(msg);
    }
  }

  async function deleteImage() {
    if (!isEdit) return;
    setErr("");
    try {
      await api.ensureCsrf();
      await api.del(`/api/admin/services/${id}/image`);
      setForm((f) => ({ ...f, image_path: null, image_path_url: null }));
      setImageFile(null);
      setImagePreview("");
    } catch {
      setErr("Impossible de supprimer l’image.");
    }
  }

  const resolvedImageForPreview =
    imagePreview || form.image_path_url || form.image_url || "";

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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
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

        <form id="service-form" onSubmit={onSubmit} className="mt-6 space-y-8">
          {/* Bloc général */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm text-zinc-300 mb-1">
                Nom du service *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.name}
                onChange={onChange}
              />
              <p className="text-xs text-zinc-500 mt-1">
                Minimum 2 caractères. Sert aussi à générer automatiquement l’adresse de la page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="slug" className="block text-sm text-zinc-300 mb-1">
                  Adresse de la page (optionnelle)
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
                <p className="text-xs text-zinc-500 mt-1">
                  Laisse ce champ vide pour que l’adresse de la page soit créée automatiquement à partir du nom du service.
                </p>
              </div>
              <div>
                <label htmlFor="position" className="block text-sm text-zinc-300 mb-1">
                  Position
                </label>
                <input
                  id="position"
                  name="position"
                  type="number"
                  min={0}
                  className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                  value={form.position}
                  onChange={onChange}
                />
              </div>
              <div className="flex items-end h-full">
                <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    name="is_active"
                    className="h-4 w-4"
                    checked={!!form.is_active}
                    onChange={onChange}
                  />
                  Actif
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm text-zinc-300 mb-1">
                Description (carte Accueil)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.description}
                onChange={onChange}
              />
              <p className="text-xs text-zinc-500 mt-1">
                Texte affiché dans les cartes de la catégorie “Services” sur la page d’accueil.
              </p>
            </div>
          </div>

          {/* Bloc contenu dynamique */}
          <div className="space-y-6 border-t border-zinc-800 pt-6">
            <h2 className="text-lg font-semibold text-zinc-200">
              Contenu de la page service
            </h2>

            <div>
              <label
                htmlFor="content_heading"
                className="block text-sm text-zinc-300 mb-1"
              >
                Titre du bloc (colonne droite)
              </label>
              <input
                id="content_heading"
                name="content_heading"
                type="text"
                className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.content_heading}
                onChange={onChange}
                placeholder="Ex: Intervention rapide et sécurisée"
              />
            </div>

            <div>
              <label htmlFor="content_md" className="block text-sm text-zinc-300 mb-1">
                Contenu principal (texte formaté)
              </label>
              <textarea
                id="content_md"
                name="content_md"
                rows={8}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                value={form.content_md}
                onChange={onChange}
                placeholder={`Texte libre avec **gras** et listes :
- Diagnostic du tableau
- Réparation de disjoncteurs
- Conseils de sécurité`}
              />
              <p className="text-xs text-zinc-500 mt-1">
                Utilise le format Markdown : <code>**gras**</code>, listes avec{" "}
                <code>-</code>, et une ligne vide pour séparer les paragraphes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="bottom_note"
                  className="block text-sm text-zinc-300 mb-1"
                >
                  Note en bas de page
                </label>
                <input
                  id="bottom_note"
                  name="bottom_note"
                  type="text"
                  className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                  value={form.bottom_note}
                  onChange={onChange}
                  placeholder="Ex: Nous assurons un dépannage rapide sur Bordeaux Métropole."
                />
              </div>

              <div>
                <label
                  htmlFor="image_url"
                  className="block text-sm text-zinc-300 mb-1"
                >
                  Image (URL) — optionnel
                </label>
                <input
                  id="image_url"
                  name="image_url"
                  type="url"
                  className="w-full h-12 px-4 bg-zinc-900 border border-zinc-700 text-zinc-100 outline-none focus:border-zinc-500"
                  value={form.image_url}
                  onChange={onChange}
                  placeholder="https://…"
                />
                <p className="text-xs text-zinc-500 mt-1">
                  Si aucune image locale n’est uploadée, on utilisera cette URL.
                </p>
              </div>
            </div>
          </div>

          {/* Bloc image locale */}
          <div className="space-y-4 border-t border-zinc-800 pt-6">
            <h2 className="text-lg font-semibold text-zinc-200">
              Image du service (upload local)
            </h2>

            {resolvedImageForPreview ? (
              <div className="w-full max-w-md">
                <img
                  src={resolvedImageForPreview}
                  alt={form.name || "Aperçu"}
                  className="w-full h-auto object-cover ring-1 ring-black/30"
                />
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">Aucune image pour le moment.</p>
            )}

            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onFileSelect}
                className="text-sm file:mr-3 file:px-4 file:py-2 file:border file:border-zinc-600 file:bg-zinc-900 file:text-zinc-200 file:hover:bg-zinc-800"
              />
              <button
                type="button"
                onClick={uploadImage}
                disabled={!imageFile || !isEdit}
                className="btn-square inline-flex items-center justify-center px-4 h-10 font-semibold bg-[#F6C90E] text-black border border-[#F6C90E] hover:bg-black hover:text-[#F6C90E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isEdit ? "Uploader l’image" : "Enregistrer d’abord"}
              </button>
              {form.image_path_url && (
                <button
                  type="button"
                  onClick={deleteImage}
                  className="btn-square inline-flex items-center justify-center px-4 h-10 font-semibold border border-zinc-600 hover:bg-zinc-900 transition-colors"
                >
                  Supprimer l’image
                </button>
              )}
            </div>
            <p className="text-xs text-zinc-500">
              Formats autorisés : JPG, JPEG, PNG, WEBP. Taille max : 2 Mo.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
