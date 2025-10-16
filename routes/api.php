<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json(['pong' => true]);
});

// ⬇️ Ajout ici d'autres routes API purement publiques si besoin, 
// mais pas les routes Admin protégées par Sanctum. 
// Les routes Admin restent dans routes/web.php sous middleware.