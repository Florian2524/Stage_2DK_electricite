import React, { useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout.jsx';

export default function Create({ services, prefillService }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    service_id: prefillService?.id ?? (services[0]?.id ?? ''),
    customer_name: '',
    customer_email: '',
    phone: '',
    address: '',
    scheduled_at: '',
    notes: '',
  });

  useEffect(() => {
    if (prefillService?.id) {
      setData('service_id', prefillService.id);
    }
  }, [prefillService]);

  const submit = (e) => {
    e.preventDefault();
    post(route('appointments.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <GuestLayout>
      <Head title="Prendre rendez-vous" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Prendre rendez-vous</h1>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Service</label>
            <select
              className="w-full rounded-xl border p-2"
              value={data.service_id}
              onChange={(e) => setData('service_id', e.target.value)}
            >
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.service_id && <p className="text-red-600 text-sm mt-1">{errors.service_id}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Nom</label>
              <input className="w-full rounded-xl border p-2"
                     value={data.customer_name}
                     onChange={(e) => setData('customer_name', e.target.value)} />
              {errors.customer_name && <p className="text-red-600 text-sm mt-1">{errors.customer_name}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border p-2"
                     value={data.customer_email}
                     onChange={(e) => setData('customer_email', e.target.value)} />
              {errors.customer_email && <p className="text-red-600 text-sm mt-1">{errors.customer_email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Téléphone</label>
              <input className="w-full rounded-xl border p-2"
                     value={data.phone}
                     onChange={(e) => setData('phone', e.target.value)} />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Date & heure</label>
              <input type="datetime-local" className="w-full rounded-xl border p-2"
                     value={data.scheduled_at}
                     onChange={(e) => setData('scheduled_at', e.target.value)} />
              {errors.scheduled_at && <p className="text-red-600 text-sm mt-1">{errors.scheduled_at}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Adresse (optionnel)</label>
            <textarea className="w-full rounded-xl border p-2"
                      rows="3"
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)} />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Notes (optionnel)</label>
            <textarea className="w-full rounded-xl border p-2"
                      rows="3"
                      value={data.notes}
                      onChange={(e) => setData('notes', e.target.value)} />
            {errors.notes && <p className="text-red-600 text-sm mt-1">{errors.notes}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button disabled={processing}
                    className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-50">
              Confirmer le rendez-vous
            </button>
            <Link href={route('services.index')} className="rounded-xl border px-4 py-2">
              Retour aux services
            </Link>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
