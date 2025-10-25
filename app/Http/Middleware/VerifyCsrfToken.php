<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * URIs exclues de la vérification CSRF.
     */
    protected $except = [
        'api/*', // tes routes API publiques (React)
    ];
}
