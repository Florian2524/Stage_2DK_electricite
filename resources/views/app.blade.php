<!DOCTYPE html>
<html lang="fr" class="h-full scroll-smooth">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>2DK Électricité</title>

  <!-- Favicon / Logo -->
  <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.png') }}">
  <link rel="apple-touch-icon" href="{{ asset('favicon.png') }}">

  @viteReactRefresh
  @vite('resources/js/app.jsx')

</head>
<body class="h-full bg-white text-zinc-900 antialiased">

  <div id="app"></div>
  
</body>
</html>
