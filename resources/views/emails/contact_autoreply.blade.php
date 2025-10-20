<p>Bonjour {{ $msg->name }},</p>
<p>Nous avons bien reçu votre message concernant « {{ $msg->subject }} » et vous remercions de votre confiance.</p>
<p>Notre équipe revient vers vous au plus vite. Conservez cet e‑mail : il récapitule votre demande.</p>
<hr>
<p><strong>Votre message :</strong></p>
<p style="white-space: pre-wrap">{{ $msg->message }}</p>
<p style="margin-top:16px; font-size:12px; opacity:.7">— Ceci est un e‑mail automatique —</p>