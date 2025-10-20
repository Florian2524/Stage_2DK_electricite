<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\ServiceImageController;
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

    // Contact (PUBLIC) — limite d’envoi 5 req/min
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('api.contact.store');

    // ✅ Liste publique des services (actifs)
    Route::get('/services', function () {
        $cols = Schema::getColumnListing('services');
        $q = Service::query();

        if (in_array('is_active', $cols, true)) {
            $q->where('is_active', true);
        }

        if (in_array('position', $cols, true)) $q->orderBy('position');
        elseif (in_array('name', $cols, true)) $q->orderBy('name');

        $services = $q->get();

        $payload = $services->map(function (Service $s) use ($cols) {
            $name = $s->name ?? 'Service';
            $slug = $s->slug ?? \Illuminate\Support\Str::slug($name);
            $imagePathUrl = (in_array('image_path', $cols, true) && $s->image_path)
                ? Storage::url($s->image_path)
                : null;

            $excerpt = in_array('excerpt', $cols, true) ? ($s->excerpt ?? '') : '';
            $description = $excerpt
                ?: (in_array('description', $cols, true) ? ($s->description ?? '') : '');

            return [
                'id'             => $s->id,
                'name'           => $name,
                'slug'           => $slug,
                'excerpt'        => $excerpt,
                'description'    => $description ?: '', // ✅ affiche rien si vide
                'image_url'      => $imagePathUrl,
                'image_path_url' => $imagePathUrl,
            ];
        });

        return response()->json($payload);
    })->name('api.services.public');

    // ✅ Détail d’un service par slug
    Route::get('/services/{slug}', function (Request $request, string $slug) {
        $cols = Schema::getColumnListing('services');
        $q = Service::query();

        if (in_array('is_active', $cols, true) && !$request->boolean('include_inactive')) {
            $q->where('is_active', true);
        }

        $service = in_array('slug', $cols, true)
            ? $q->where('slug', $slug)->first()
            : null;

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $imagePathUrl = (in_array('image_path', $cols, true) && $service->image_path)
            ? Storage::url($service->image_path)
            : null;

        return response()->json([
            'id'              => $service->id,
            'name'            => $service->name ?? 'Service',
            'slug'            => $service->slug ?? \Illuminate\Support\Str::slug($service->name ?? ''),
            'lead'            => $service->lead ?? '', // ✅ champ ajouté
            'excerpt'         => $service->excerpt ?? '',
            'description'     => $service->description ?? '',
            'content_heading' => $service->content_heading ?? '',
            'content_md'      => $service->content_md ?? '',
            'bottom_note'     => $service->bottom_note ?? '',
            'base_price'      => $service->base_price ?? 0,
            'image_url'       => $imagePathUrl,
            'image_path_url'  => $imagePathUrl,
            'is_active'       => (bool)($service->is_active ?? true),
            'position'        => $service->position ?? null,
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

        // Upload / suppression d'image
        Route::post  ('/services/{service}/image',  [ServiceImageController::class, 'store'])->name('services.image.store');
        Route::delete('/services/{service}/image',  [ServiceImageController::class, 'destroy'])->name('services.image.destroy');

        // Messages de contact
        Route::get   ('/contact-messages',                       [ContactMessageController::class, 'index'])->name('contact.index');
        Route::get   ('/contact-messages/{contactMessage}',      [ContactMessageController::class, 'show'])->name('contact.show');
        Route::delete('/contact-messages/{contactMessage}',      [ContactMessageController::class, 'destroy'])->name('contact.destroy');
        Route::post  ('/contact-messages/{contactMessage}/reply',[ContactMessageController::class, 'reply'])->name('contact.reply');

        // Profil Admin connecté
        Route::get('/me', fn (Request $request) => response()->json($request->user()))->name('me');
    });

/*
|--------------------------------------------------------------------------
| SPA React
|--------------------------------------------------------------------------
*/
Route::view('/', 'app');

// Catch-all vers la SPA, en évitant api/sanctum/storage
Route::get('/{any}', fn () => view('app'))
    ->where('any', '^(?!api|sanctum|storage).*$');
