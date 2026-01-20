<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServicePublicController;

Route::get('/ping', fn () => response()->json(['pong' => true]));

// ✅ API publique Services

Route::get('/services',        [ServicePublicController::class, 'index']);
Route::get('/services/{slug}', [ServicePublicController::class, 'show']);

// ⚠️ Ne pas déclarer ici les routes Admin protégées par Sanctum (restent dans routes/web.php)
