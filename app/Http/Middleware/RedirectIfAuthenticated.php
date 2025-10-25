<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Si l'utilisateur est déjà connecté, redirige-le ailleurs.
     */
    public function handle(Request $request, Closure $next, ...$guards): Response
    {
        foreach ($guards as $guard) {
            if (auth()->guard($guard)->check()) {
                // Redirige les utilisateurs déjà loggés vers le tableau de bord
                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
}
