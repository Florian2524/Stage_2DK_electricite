import React from 'react';
import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout.jsx';

export default function Index({ services }) {
  return (
    <GuestLayout>
      <Head title="Nos services" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Nos services</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map(s => (
            <div key={s.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">{s.name}</h2>
                <span className="text-sm opacity-70">{s.duration_minutes} min</span>
              </div>
              {s.description && <p className="mt-2 opacity-80">{s.description}</p>}
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold">{Number(s.base_price).toFixed(2)} €</span>
                <Link
                  href={route('appointments.create', { service_id: s.id })}
                  className="rounded-xl border px-3 py-2 hover:bg-gray-50"
                >
                  Prendre RDV
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GuestLayout>
  );
}
