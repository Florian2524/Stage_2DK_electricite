<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // POST /api/auth/login
    public function login(Request $request)
    {
        // Validation simple
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Tentative de connexion (guard "web", session)
        if (! Auth::attempt($credentials, remember: true)) {
            throw ValidationException::withMessages([
                'email' => 'Identifiants invalides.',
            ]);
        }

        // Regénère l’ID de session pour la sécurité
        $request->session()->regenerate();

        // Réponse OK (le cookie "laravel_session" est posé automatiquement)
        return response()->json(['message' => 'Connecté'], 200);
    }

    // POST /api/auth/logout
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté'], 200);
    }
}
