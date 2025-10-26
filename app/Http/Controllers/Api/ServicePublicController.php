<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServicePublicController extends Controller
{
    // GET /api/services : liste des services actifs
    public function index(Request $request)
    {
        $query = Service::query();

        // On ne renvoie que les actifs (si colonne présente)
        if (self::hasColumn('services', 'is_active')) {
            $query->where('is_active', true);
        }

        // Tri intelligent : position puis name, sinon id
        if (self::hasColumn('services', 'position')) {
            $query->orderBy('position');
        }
        if (self::hasColumn('services', 'name')) {
            $query->orderBy('name');
        }
        $query->orderBy('id');

        $services = $query->get();

        return $services->map(function (Service $s) {
            return $this->publicPayload($s);
        });
    }

    // GET /api/services/{slug} : détail par slug (robuste)
    public function show(Request $request, string $slug)
    {
        $slug = Str::slug($slug);
        $service = Service::query()->get()->first(function (Service $s) use ($slug) {
            $candidates = [
                $s->slug ?? null,
                Str::slug($s->name ?? ''),
                Str::slug($s->title ?? ''),
                Str::slug($s->label ?? ''),
            ];
            return in_array($slug, array_filter($candidates), true);
        });

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        // Par défaut, on expose seulement si actif
        $includeInactive = (bool) $request->boolean('include_inactive', false);
        if (!$includeInactive && self::hasColumn('services', 'is_active') && !$service->is_active) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return $this->publicPayload($service);
    }

    private function publicPayload(Service $s): array
    {
        // Résolution d’URL publique : priorité à image_path -> url(storage)
        $imagePathUrl = $s->image_path ? Storage::url($s->image_path) : null;

        return [
            'id'               => $s->id,
            'name'             => $s->name,
            'slug'             => $s->slug,
            'excerpt'          => $s->excerpt ?? null,
            'description'      => $s->description ?? null,
            'duration_minutes' => $s->duration_minutes,
            'base_price'       => $s->base_price,
            'position'         => $s->position ?? 0,
            'is_active'        => (bool) ($s->is_active ?? true),

            // Contenu riche pour la page
            'content_heading'  => $s->content_heading ?? null,
            'content_md'       => $s->content_md ?? null,
            'bottom_note'      => $s->bottom_note ?? null,

            // Images
            'image_url'        => $imagePathUrl ?: ($s->image_url ?? null), 
            'image_path'       => $s->image_path ?? null,                    
            'image_path_url'   => $imagePathUrl,                             
        ];
    }

    private static function hasColumn(string $table, string $column): bool
    {
        static $cache = [];
        if (!isset($cache[$table])) {
            $cache[$table] = \Schema::getColumnListing($table);
        }
        return in_array($column, $cache[$table], true);
    }
}
