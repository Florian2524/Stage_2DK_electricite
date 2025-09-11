// Badges de confiance
export default function Badges() {
  const items = ['Qualifelec', 'IRVE', 'NF C 15-100', 'Particuliers & Pros']
  return (
    <section className="py-6">
      <div className="container-2dk grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((b) => (
          <div key={b} className="badge justify-center">{b}</div>
        ))}
      </div>
    </section>
  )
}
