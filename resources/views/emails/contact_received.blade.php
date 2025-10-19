<!doctype html>
<html lang="fr">
  <body>
    <h2>Nouvelle demande de contact</h2>
    <p><strong>Nom :</strong> {{ $m->name }}</p>
    <p><strong>Email :</strong> {{ $m->email }}</p>
    <p><strong>Sujet :</strong> {{ $m->subject }}</p>
    <p><strong>Message :</strong></p>
    <pre style="white-space: pre-wrap; font-family: inherit;">{{ $m->message }}</pre>
    <hr>
    <p>Reçue le {{ $m->created_at->format('d/m/Y H:i') }}</p>
  </body>
</html>
