export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-2dk py-10 grid md:grid-cols-3 gap-8">
        <div>
          <img
            src="/logo.png?v=2"             /* cache-buster */
            alt="2DK Électricité"
            className="shrink-0 !h-20 md:!h-24 w-auto"
            onError={(e) => (e.currentTarget.src = '/logo-2dk.svg')}
          />
          <p className="mt-4 text-sm text-white/80">
            Dépannage, installation, rénovation et IRVE. Intervention locale.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Informations</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>📞 06 00 00 00 00</li>
            <li>✉️ contact@2dk-electricite.fr</li>
            <li>🕘 Lun–Sam : 8h–19h</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Légal</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><a className="hover:underline" href="#">Mentions légales</a></li>
            <li><a className="hover:underline" href="#">Politique de confidentialité</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-2dk py-4 text-xs text-white/60">
          © {new Date().getFullYear()} 2DK Électricité — Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
