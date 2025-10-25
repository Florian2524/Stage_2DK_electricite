<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;

class TrimStrings extends Middleware
{
    /**
     * Champs à ne pas trimmer.
     */
    protected $except = [
        'password',
        'password_confirmation',
    ];
}
