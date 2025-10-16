<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;

// ⬇️ imports utiles pour l'endpoint public
use App\Models\Service;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| API publique (toujours dans web.php pour Sanctum côté SPA)
|--------------------------------------------------------------------------
*/
Route::prefix('api')->group(function () {
    // Auth (cookies de session via Sanctum)
    Route::post('/auth/login',  [AuthController::class, 'login'])->name('auth.login');
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('auth.logout');

    // Ping simple (optionnel)
    Route::get('/ping', fn () => response()->json(['pong' => true]))->name('api.ping');

    // ⬇️ Public: liste des services "visibles" (actifs)
    Route::get('/services', function (Request $request) {
        $cols = Schema::getColumnListing('services');

        // Tri "intelligent" selon colonnes existantes
        $orderBy = collect(['position', 'name', 'title', 'created_at', 'id'])
            ->first(fn ($c) => in_array($c, $cols, true));

        $q = Service::query();

        // Ne renvoyer que les actifs si colonne présente
        if (in_array('is_active', $cols, true)) {
            $q->where('is_active', true);
        }

        if ($orderBy) {
            $q->orderBy($orderBy, 'asc');
        }

        // Ne renvoyer que des champs "publics"
        $services = $q->get()->map(function ($s) use ($cols) {
            $name = $s->name ?? $s->title ?? $s->label ?? null;
            $slug = $s->slug ?? ($name ? Str::slug($name) : null);

            return [
                'id' => $s->id,
                'name' => $name,
                'slug' => $slug,
                'excerpt' => in_array('excerpt', $cols, true) ? ($s->excerpt ?? '') : '',
                'description' => in_array('description', $cols, true) ? ($s->description ?? '') : '',
                'base_price' => in_array('base_price', $cols, true)
                    ? ($s->base_price ?? 0)
                    : (in_array('price', $cols, true) ? ($s->price ?? 0) : 0),
                'duration_minutes' => in_array('duration_minutes', $cols, true) ? ($s->duration_minutes ?? 0) : 0,
                'image_url' => in_array('image_url', $cols, true) ? ($s->image_url ?? null) : null,
            ];
        });

        return response()->json($services);
    })->name('api.services.public');
});

/*
|--------------------------------------------------------------------------
| API Admin (protégée par session Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')
    ->prefix('api/admin')
    ->as('admin.')
    ->group(function () {
        // Liste
        Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');

        // CRUD
        Route::get   ('/services/{service}', [AdminServiceController::class, 'show'])->name('services.show');
        Route::post  ('/services',           [AdminServiceController::class, 'store'])->name('services.store');
        Route::put   ('/services/{service}', [AdminServiceController::class, 'update'])->name('services.update');
        Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('services.destroy');

        // Qui suis-je ?
        Route::get('/me', function (Request $request) {
            return response()->json($request->user());
        })->name('me');
    });

/*
|--------------------------------------------------------------------------
| SPA React (rendu unique + catch-all côté client)
|--------------------------------------------------------------------------
*/
Route::view('/', 'app');

// Catch-all côté client (exclut api/sanctum/storage)
Route::get('/{any}', fn () => view('app'))
    ->where('any', '^(?!api|sanctum|storage).*$');
