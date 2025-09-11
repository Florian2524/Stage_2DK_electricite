import React, { useMemo, useState, useEffect } from "react";

export default function Header({ brand, phone, email, routes = [] }) {
  const [open, setOpen] = useState(false);

  // Détermine le lien actif par URL (côté client)
  const activeHref = typeof window !== "undefined" ? window.location.pathname : "/";
  const nav = useMemo(() => {
    return routes.map(r => ({ ...r, active: new URL(r.href, window.location.origin).pathname === activeHref }));
  }, [routes, activeHref]);

  // Empêche le scroll du body lorsque le menu mobile est ouvert
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      {/* Topbar */}
      <div className="bg-gray-900 text-gray-100">
        <div className="container-2dk flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{brand}</span>
            <a className="underline underline-offset-2 hover:text-white" href={`tel:${phone.replace(/\s+/g,'')}`}>{phone}</a>
            <a className="underline underline-offset-2 hover:text-white" href={`mailto:${email}`}>{email}</a>
          </div>
          <a
            href="/contact"
            className="rounded-lg bg-amber-400 px-3 py-1 font-medium text-gray-900 hover:bg-amber-300 transition"
          >
            Demander un devis
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-2dk flex h-16 items-center justify-between">
        {/* Logo + Brand */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt={`${brand} - logo`}
            className="h-10 w-auto"
            loading="eager"
          />
          <span className="hidden sm:block text-lg font-semibold">{brand}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-gray-900 ${
                link.active ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm"
        >
          Menu
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 w-80 max-w-[85%] bg-white shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
                <span className="text-base font-semibold">{brand}</span>
              </div>
              <button
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border px-2.5 py-1.5 text-sm"
              >
                Fermer
              </button>
            </div>

            <nav className="mt-6 grid gap-2">
              {nav.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 ${
                    link.active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300 transition"
            >
              Demander un devis
            </a>

            <div className="mt-6 border-t pt-4 text-xs text-gray-500">
              <p>Tél : <a className="underline underline-offset-2" href={`tel:${phone.replace(/\s+/g,'')}`}>{phone}</a></p>
              <p>Email : <a className="underline underline-offset-2" href={`mailto:${email}`}>{email}</a></p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
