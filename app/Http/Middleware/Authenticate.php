<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Redirection quand l'utilisateur n'est pas authentifié.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Si la requête attend du JSON (API React), ne pas rediriger
        if ($request->expectsJson()) {
            return null;
        }

        // Sinon, redirige vers la page de connexion Laravel/React
        return route('login');
    }
}
