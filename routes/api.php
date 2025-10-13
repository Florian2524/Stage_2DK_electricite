<?php

use Illuminate\Support\Facades\Route;

// GET /api/ping -> doit répondre { pong: true }
Route::get('/ping', fn () => response()->json(['pong' => true]));

// GET /api/admin/services -> doit répondre { ok: true } si connecté
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::get('/services', fn () => response()->json(['ok' => true, 'from' => 'routes/api.php']));
});
