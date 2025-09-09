// Zones d'intervention
export default function Zones() {
  const zones = ['Guéret', 'Aubusson', 'La Souterraine', 'Bourganeuf', 'Bénévent-l’Abbaye', 'Autour 40km']
  return (
    <section id="zones" className="section bg-white">
      <div className="container-2dk">
        <h2 className="text-3xl font-bold">Zones d’intervention</h2>
        <p className="text-slate-600 mt-2">Déplacements rapides sur le secteur.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {zones.map((z) => (
            <span key={z} className="badge">{z}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
