<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>2DK Électricité</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="antialiased bg-gray-50 text-gray-900">

    {{-- Point d’ancrage du Header React avec des props côté Laravel --}}
    <div
        id="header-root"
        data-props='@json([
            "brand" => "2DK Électricité",
            "phone" => "+33 6 12 34 56 78",
            "email" => "contact@2dk-electricite.fr",
            "routes" => [
                ["name" => "Accueil", "href" => route("home")],
                ["name" => "Services", "href" => route("services")],
                ["name" => "Tarifs", "href" => route("tarifs")],
                ["name" => "Réalisations", "href" => route("realisations")],
                ["name" => "Contact", "href" => route("contact")],
            ]
        ])'
    ></div>

    {{-- Contenu de page (placeholder pour l’instant) --}}
    <main class="container-2dk py-10">
        <h1 class="text-3xl font-bold">Bienvenue chez 2DK Électricité</h1>
        <p class="mt-3 text-gray-600">Votre électricien — installations, dépannages, mises aux normes.</p>
    </main>

</body>
</html>
