export default function Contact() {
  return (
    <section id="contact" className="section section-dark">
      <div className="container-2dk grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold">Demander un devis</h2>
          <p className="text-white/80 mt-2">
            Décrivez votre besoin, on vous rappelle rapidement pour caler une visite si nécessaire.
          </p>
          <ul className="mt-6 text-sm space-y-2 text-white/80">
            <li>📞 06 00 00 00 00</li>
            <li>✉️ contact@2dk-electricite.fr</li>
            <li>📍 Secteur : déplacement rapide</li>
            <li>🕘 Lun–Sam : 8h–19h</li>
          </ul>
        </div>

        <form className="bg-white/5 border border-white/10 rounded-2xl p-6 grid gap-4">
          <div>
            <label className="text-sm font-medium">Nom</label>
            <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue placeholder-white/50" placeholder="Dupont" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Téléphone</label>
              <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="06..." />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="vous@exemple.fr" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Votre besoin</label>
            <textarea rows="4" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="Décrivez votre projet..."></textarea>
          </div>
          <button type="button" className="btn btn-primary justify-center">Envoyer la demande</button>
          <p className="text-xs text-white/60">En cliquant, vous acceptez d’être recontacté pour votre demande.</p>
        </form>
      </div>
    </section>
  )
}
