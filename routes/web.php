<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\ServiceImageController;

// 👇 AJOUTS
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Admin\ContactMessageController;

use App\Models\Service;

/*
|--------------------------------------------------------------------------
| API publique (web.php pour Sanctum côté SPA)
|--------------------------------------------------------------------------
*/
Route::prefix('api')->group(function () {
    // Auth
    Route::post('/auth/login',  [AuthController::class, 'login'])->name('auth.login');
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('auth.logout');

    // Ping
    Route::get('/ping', fn () => response()->json(['pong' => true]))->name('api.ping');

    // ✅ Formulaire de contact (PUBLIC) — limite d’envoi 5 req / minute
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('api.contact.store');

    // Liste publique des services (actifs)
    Route::get('/services', function (Request $request) {
        $cols = Schema::getColumnListing('services');

        $orderBy = collect(['position', 'name', 'title', 'created_at', 'id'])
            ->first(fn ($c) => in_array($c, $cols, true));

        $q = Service::query();

        if (in_array('is_active', $cols, true)) {
            $q->where('is_active', true);
        }
        if ($orderBy) {
            $q->orderBy($orderBy, 'asc');
        }

        $services = $q->get()->map(function ($s) use ($cols) {
            $name = $s->name ?? $s->title ?? $s->label ?? null;
            $slug = $s->slug ?? ($name ? Str::slug($name) : null);

            // ✅ Résolution d’URL publique si image_path (storage:link requis)
            $imagePathUrl = in_array('image_path', $cols, true) && $s->image_path
                ? Storage::url($s->image_path)
                : null;

            return [
                'id'               => $s->id,
                'name'             => $name,
                'slug'             => $slug,
                'excerpt'          => in_array('excerpt', $cols, true) ? ($s->excerpt ?? '') : '',
                'description'      => in_array('description', $cols, true) ? ($s->description ?? '') : '',
                'base_price'       => in_array('base_price', $cols, true)
                    ? ($s->base_price ?? 0)
                    : (in_array('price', $cols, true) ? ($s->price ?? 0) : 0),
                'duration_minutes' => in_array('duration_minutes', $cols, true) ? ($s->duration_minutes ?? 0) : 0,

                // ✅ image_url = priorité à l’URL publique de image_path, sinon image_url distante
                'image_url'        => $imagePathUrl ?: (in_array('image_url', $cols, true) ? ($s->image_url ?? null) : null),

                // (optionnel mais pratique côté front)
                'image_path_url'   => $imagePathUrl,
            ];
        });

        return response()->json($services);
    })->name('api.services.public');

    // Détail public d’un service par slug (matching 100% PHP, actif par défaut; preview via ?include_inactive=1)
    Route::get('/services/{slug}', function (Request $request, string $slug) {
        $cols   = Schema::getColumnListing('services');
        $target = Str::slug($slug);

        // Récupération (actifs par défaut, prévisualisation possible)
        $services = Service::query()
            ->when(in_array('is_active', $cols, true) && !$request->boolean('include_inactive'),
                fn ($q) => $q->where('is_active', true))
            ->get();

        // Cherche un match par: colonne slug OU slug(name/title/label)
        $found = $services->first(function ($s) use ($cols, $target) {
            $candidates = [];

            if (in_array('slug', $cols, true) && !empty($s->slug)) {
                $candidates[] = $s->slug;
            }
            if (!empty($s->name))  $candidates[] = $s->name;
            if (!empty($s->title)) $candidates[] = $s->title;
            if (!empty($s->label)) $candidates[] = $s->label;

            foreach ($candidates as $c) {
                if (Str::slug($c) === $target) return true;
            }
            return false;
        });

        if (!$found) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $s       = $found;
        $name    = $s->name ?? $s->title ?? $s->label ?? null;
        $slugOut = (in_array('slug', $cols, true) && !empty($s->slug))
            ? $s->slug
            : ($name ? Str::slug($name) : null);

        // ✅ Résolution d’URL publique si image_path
        $imagePathUrl = in_array('image_path', $cols, true) && $s->image_path
            ? Storage::url($s->image_path)
            : null;

        return response()->json([
            'id'              => $s->id,
            'name'            => $name,
            'slug'            => $slugOut,
            'excerpt'         => in_array('excerpt', $cols, true) ? ($s->excerpt ?? '') : '',
            'description'     => in_array('description', $cols, true) ? ($s->description ?? '') : '',
            'duration_minutes'=> in_array('duration_minutes', $cols, true) ? ($s->duration_minutes ?? 0) : 0,
            'base_price'      => in_array('base_price', $cols, true) ? ($s->base_price ?? 0) : 0,

            // Contenu riche
            'content_heading' => in_array('content_heading', $cols, true) ? ($s->content_heading ?? null) : null,
            'content_md'      => in_array('content_md', $cols, true) ? ($s->content_md ?? null) : null,
            'bottom_note'     => in_array('bottom_note', $cols, true) ? ($s->bottom_note ?? null) : null,

            // Images
            'image_url'       => $imagePathUrl ?: (in_array('image_url', $cols, true) ? ($s->image_url ?? null) : null),
            'image_path_url'  => $imagePathUrl,
        ]);
    })->name('api.services.show');
});

/*
|--------------------------------------------------------------------------
| API Admin (protégée Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')
    ->prefix('api/admin')
    ->as('admin.')
    ->group(function () {
        // CRUD Services
        Route::get   ('/services',           [AdminServiceController::class, 'index'])->name('services.index');
        Route::get   ('/services/{service}', [AdminServiceController::class, 'show'])->name('services.show');
        Route::post  ('/services',           [AdminServiceController::class, 'store'])->name('services.store');
        Route::put   ('/services/{service}', [AdminServiceController::class, 'update'])->name('services.update');
        Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('services.destroy');

        // ✅ Upload / suppression d'image (protégées)
        Route::post  ('/services/{service}/image', [ServiceImageController::class, 'store'])->name('services.image.store');
        Route::delete('/services/{service}/image', [ServiceImageController::class, 'destroy'])->name('services.image.destroy');

        // ➕ Messages de contact (ADMIN)
        Route::get   ('/contact-messages',                      [ContactMessageController::class, 'index'])->name('contact.index');
        Route::get   ('/contact-messages/{contactMessage}',     [ContactMessageController::class, 'show'])->name('contact.show');
        Route::delete('/contact-messages/{contactMessage}',     [ContactMessageController::class, 'destroy'])->name('contact.destroy');
        Route::post  ('/contact-messages/{contactMessage}/reply',[ContactMessageController::class, 'reply'])->name('contact.reply');

        // Profil Admin connecté
        Route::get('/me', function (Request $request) {
            return response()->json($request->user());
        })->name('me');
    });

/*
|--------------------------------------------------------------------------
| SPA React
|--------------------------------------------------------------------------
*/
Route::view('/', 'app');

Route::get('/{any}', fn () => view('app'))
    ->where('any', '^(?!api|sanctum|storage).*$');
