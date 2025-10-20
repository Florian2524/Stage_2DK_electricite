@php($w = $msg->works_json ?: [])
<h2>Nouvelle demande de contact</h2>
<p><strong>Nom :</strong> {{ $msg->name }}</p>
<p><strong>Email :</strong> {{ $msg->email }}</p>
<p><strong>Téléphone :</strong> {{ $msg->phone ?? '—' }}</p>
<p><strong>Sujet :</strong> {{ $msg->subject }}</p>
<p><strong>Statut :</strong> {{ $msg->ownership ?? '—' }}</p>
<p><strong>Adresse du bien :</strong> {{ $msg->site_address ?? '—' }}</p>
<p><strong>Travaux :</strong> {{ empty($w) ? '—' : implode(', ', $w) }}</p>
<hr>
<p style="white-space: pre-wrap">{{ $msg->message }}</p>