export default function CTA() {
  return (
    <section className="section bg-cta-grad">
      <div className="container-2dk text-white grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">Besoin d’un électricien réactif ?</h2>
          <p className="mt-2 text-white/90">Profitez de nos conseils personnalisés et d’interventions de qualité près de chez vous.</p>
        </div>
        <div className="flex md:justify-end gap-3">
          <a href="tel:+33600000000" className="btn btn-outline">📞 06 00 00 00 00</a>
          <a href="#contact" className="btn btn-primary">Demander un devis</a>
        </div>
      </div>
    </section>
  )
}
