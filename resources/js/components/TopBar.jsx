export default function TopBar() {
  return (
    <div className="bg-brand-light text-white text-xs">
      <div className="container-2dk h-9 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Entreprise d’électricité générale — Intervention locale</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+33600000000" className="hover:underline">📞 06 00 00 00 00</a>
          <a href="mailto:contact@2dk-electricite.fr" className="hover:underline">✉️ contact@2dk-electricite.fr</a>
        </div>
      </div>
    </div>
  )
}
