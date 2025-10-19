<!doctype html>
<html lang="fr">
  <body style="font-family:system-ui,Arial,sans-serif;line-height:1.5;color:#111;margin:0;padding:24px;">
    <h2 style="margin:0 0 12px 0;">Bonjour {{ $m->name }},</h2>

    <p style="margin:0 0 12px 0;">
      Nous avons bien reçu votre demande « <strong>{{ $m->subject }}</strong> ».
      Un membre de l’équipe 2DK Électricité vous recontactera prochainement.
    </p>

    @if($m->message)
      <p style="margin:0 0 8px 0;">Votre message :</p>
      <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:6px;border:1px solid #e5e7eb;margin:0 0 16px 0;">{{ $m->message }}</pre>
    @endif

    <ul style="margin:0 0 16px 20px;padding:0;">
      @if($m->phone)<li>Téléphone : {{ $m->phone }}</li>@endif
      @if($m->ownership)<li>Statut : {{ $m->ownership === 'proprietaire' ? 'Propriétaire' : 'Locataire' }}</li>@endif
      @if($m->site_address)<li>Adresse : {{ $m->site_address }}</li>@endif
      @if(is_array($m->works_json) && count($m->works_json))
        <li>Travaux : {{ implode(', ', $m->works_json) }}</li>
      @endif
    </ul>

    <p style="margin:0 0 12px 0;">Cordialement,<br>2DK Électricité</p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">
    <p style="font-size:12px;color:#6b7280;margin:0;">
      Cet e-mail est un accusé automatique. Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.
    </p>
  </body>
</html>
