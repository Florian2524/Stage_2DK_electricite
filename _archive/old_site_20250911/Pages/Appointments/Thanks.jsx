import React from 'react';
import { Link, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout.jsx';

export default function Thanks() {
  return (
    <GuestLayout>
      <Head title="Merci !" />
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">Merci 🎉</h1>
        <p>Votre demande de rendez-vous a bien été enregistrée. Nous vous contacterons rapidement pour confirmation.</p>
        <Link href={route('services.index')} className="inline-block mt-6 rounded-xl border px-4 py-2">
          Retour aux services
        </Link>
      </div>
    </GuestLayout>
  );
}
