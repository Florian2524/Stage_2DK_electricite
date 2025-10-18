import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";

import srvInstall from "../../images/services/installation.jpg";
import srvNormes from "../../images/services/mise-aux-normes.jpg";
import srvRenov from "../../images/services/renovation.jpg";
import srvDepan from "../../images/services/depannage.jpg";

// --- Helpers images: on essaie par mots-clés sur slug ET name ---
function pickImageByKey(s = "") {
  const n = String(s || "").toLowerCase();
  if (n.includes("norm")) return srvNormes;
  if (n.includes("rénov") || n.includes("renov")) return srvRenov;
  if (n.includes("dép") || n.includes("depan")) return srvDepan;
  if (n.includes("install")) return srvInstall;
  return null;
}

// --- Mini “parser Markdown” sécurisé: **gras** et listes (-) ---
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}
function mdToHtml(md = "") {
  if (!md) return "";
  const lines = md.replace(/\r\n?/g, "\n").split("\n");

  const out = [];
  let inList = false;
  const pbuf = [];

  const flushP = () => {
    if (!pbuf.length) return;
    const text = pbuf.join(" ").trim();
    if (!text) return;
    const html = escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    out.push(`<p class="mb-4 leading-relaxed">${html}</p>`);
    pbuf.length = 0;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const m = line.match(/^\s*-\s+(.*)$/);
    if (m) {
      if (pbuf.length) flushP();
      if (!inList) {
        inList = true;
        out.push(`<ul class="list-disc pl-5 mb-4 marker:text-[#F6C90E] space-y-2">`);
      }
      const item = escapeHtml(m[1]).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      out.push(`<li>${item}</li>`);
      continue;
    }
    if (!line.trim()) {
      if (inList) { out.push("</ul>"); inList = false; }
      flushP();
      continue;
    }
    pbuf.push(line);
  }
  if (inList) out.push("</ul>");
  flushP();
  return out.join("\n");
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setErr("");
        setData(null);
        const res = await api.get(`/api/services/${slug}`);
        if (!cancel) setData(res);
      } catch {
        if (!cancel) setErr("Ce service est introuvable.");
      }
    })();
    return () => { cancel = true; };
  }, [slug]);

  const imgSrc = useMemo(() => {
    if (!data) return null;
    // 1) image_url back-office
    if (data.image_url) return data.image_url;
    // 2) image locale par slug ou nom (mots-clés)
    return pickImageByKey(data.slug) || pickImageByKey(data.name) || null;
  }, [data]);

  if (err) {
    return (
      <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
        <section className="max-w-6xl mx-auto px-6 md:px-10 xl:px-16 py-10">
          <h1 className="text-3xl font-extrabold text-zinc-100 mb-3">Service introuvable</h1>
          <p className="text-zinc-400">{err}</p>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-[70vh] bg-[#0B0B0B] text-zinc-200">
        <section className="max-w-6xl mx-auto px-6 md:px-10 xl:px-16 py-10">
          <div className="h-8 w-2/3 bg-zinc-800 animate-pulse mb-3" />
          <div className="h-4 w-3/4 bg-zinc-800 animate-pulse mb-8" />
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 h-[320px] bg-zinc-800 animate-pulse" />
            <div className="md:col-span-5 space-y-3">
              <div className="h-7 w-3/4 bg-zinc-800 animate-pulse" />
              <div className="h-4 w-full bg-zinc-800 animate-pulse" />
              <div className="h-4 w-5/6 bg-zinc-800 animate-pulse" />
              <div className="h-4 w-4/6 bg-zinc-800 animate-pulse" />
              <div className="h-11 w-48 bg-zinc-800 animate-pulse mt-4" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  const heading = data.content_heading || "";
  const html = mdToHtml(data.content_md || "");

  return (
    <main className="bg-[#0B0B0B] text-zinc-200">
      <section className="max-w-6xl mx-auto px-6 md:px-10 xl:px-16 py-8 md:py-10">
        {/* Titre de page */}
        <h1 className="text-[40px] md:text-[48px] font-extrabold text-[#F6C90E] leading-tight">
          {data.name} à Bordeaux Métropole (CUB)
        </h1>

        {/* Sous-titre (excerpt) */}
        {!!data.excerpt && (
          <p className="mt-2 text-lg text-zinc-300">{data.excerpt}</p>
        )}

        <div className="mt-8 grid md:grid-cols-12 gap-6">
          {/* Image */}
          <div className="md:col-span-7">
            <div className="bg-black ring-1 ring-black/30">
              {imgSrc ? (
                <img src={imgSrc} alt={data.name} className="w-full h-full object-cover" />
              ) : (
                <div className="aspect-[4/3] bg-zinc-800" />
              )}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="md:col-span-5">
            {!!heading && (
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F6C90E] leading-tight">
                {heading}
              </h2>
            )}

            {!!html && (
              <div
                className="mt-3 text-[17px] text-zinc-200"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}

            <Link
              to="/contact"
              className="inline-block mt-4 px-6 py-3 bg-[#D31920] text-white font-semibold hover:brightness-95"
            >
              Contactez-nous
            </Link>
          </div>
        </div>

        {/* Bandeau note bas de page */}
        {!!data.bottom_note && (
          <div className="mt-8 flex items-start gap-3">
            <span className="mt-1 inline-block h-6 w-1.5 bg-[#F6C90E]" />
            <p className="text-zinc-200">{data.bottom_note}</p>
          </div>
        )}
      </section>
    </main>
  );
}
