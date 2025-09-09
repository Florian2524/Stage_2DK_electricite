@component('mail::message')
# Demande de rendez-vous reçue

Bonjour {{ $appointment->customer_name }},

Nous avons bien reçu votre demande de rendez-vous.

- **Service** : {{ $appointment->service->name }}
- **Date & heure** : {{ $appointment->scheduled_at->format('d/m/Y H:i') }}
- **Téléphone** : {{ $appointment->phone }}

Nous revenons vers vous rapidement pour confirmer.

@component('mail::button', ['url' => config('app.url')])
Retour au site
@endcomponent

Merci,  
{{ config('app.name') }}
@endcomponent
