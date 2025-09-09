<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\AppointmentCreated;

class AppointmentController extends Controller
{
    // Formulaire de prise de RDV
    public function create(Request $request)
    {
        $serviceId = (int) $request->query('service_id');
        $prefill   = $serviceId ? Service::find($serviceId) : null;

        return Inertia::render('Appointments/Create', [
            'services'       => Service::where('is_active', true)->orderBy('name')->get(['id','name']),
            'prefillService' => $prefill ? ['id' => $prefill->id, 'name' => $prefill->name] : null,
        ]);
    }

    // Enregistrement du RDV + email
    public function store(Request $request)
    {
        $data = $request->validate([
            'service_id'     => ['required','exists:services,id'],
            'customer_name'  => ['required','string','min:2','max:100'],
            'customer_email' => ['required','email'],
            'phone'          => ['required','string','min:6','max:30'],
            'address'        => ['nullable','string'],
            'scheduled_at'   => ['required','date','after:now'],
            'notes'          => ['nullable','string'],
        ]);

        // Création + chargement du service pour l'email
        $appointment = Appointment::create($data)->load('service');

        // Envoi au client (Mailpit en dev via MAIL_HOST=mailpit:1025)
        Mail::to($appointment->customer_email)->send(new AppointmentCreated($appointment));

        // Copie interne (optionnelle) vers l'adresse d'expéditeur
        if (config('mail.from.address')) {
            Mail::to(config('mail.from.address'))->send(new AppointmentCreated($appointment));
        }

        return redirect()->route('appointments.thanks');
    }

    // Page de remerciement
    public function thanks()
    {
        return Inertia::render('Appointments/Thanks');
    }
}
