<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    // LISTE
    public function index(Request $request)
    {
        $columns = Schema::getColumnListing('services');

        $orderable = collect(['position', 'title', 'name', 'label', 'created_at', 'id'])
            ->first(fn ($c) => in_array($c, $columns, true));

        $q = Service::query();

        if (in_array('is_active', $columns, true) && $request->boolean('only_active')) {
            $q->where('is_active', true);
        }
        if ($orderable) {
            $q->orderBy($orderable);
        }

        return response()->json($q->get());
    }

    // DÉTAIL
    public function show(Service $service)
    {
        return response()->json($service);
    }

    // CRÉATION
    public function store(Request $request)
    {
        [$data, $fillable] = $this->validatedData($request);
        $columns = Schema::getColumnListing('services');
        $data = $this->applyDefaults($data, $columns);

        $service = new Service();
        foreach ($data as $k => $v) {
            if (in_array($k, $fillable, true)) {
                $service->setAttribute($k, $this->castValue($k, $v));
            }
        }
        $service->save();

        return response()->json($service, 201);
    }

    // MISE À JOUR
    public function update(Request $request, Service $service)
    {
        [$data, $fillable] = $this->validatedData($request, $service->id);
        $columns = Schema::getColumnListing('services');
        $data = $this->applyDefaults($data, $columns);

        foreach ($data as $k => $v) {
            if (in_array($k, $fillable, true)) {
                $service->setAttribute($k, $this->castValue($k, $v));
            }
        }
        $service->save();

        return response()->json($service);
    }

    // SUPPRESSION
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->noContent();
    }

    /**
     * Valide selon les colonnes réellement présentes et renvoie [ $data, $fillable ].
     * Gère aussi l’alias "description de carte" : si 'excerpt' existe, on y copie request('description').
     */
    protected function validatedData(Request $request, ?int $ignoreId = null): array
    {
        $columns = Schema::getColumnListing('services');

        // --- Normaliser les alias de titre
        if (in_array('name', $columns, true)) {
            if ($request->filled('title') && !$request->filled('name')) {
                $request->merge(['name' => $request->input('title')]);
            }
            if ($request->filled('label') && !$request->filled('name')) {
                $request->merge(['name' => $request->input('label')]);
            }
        } elseif (in_array('title', $columns, true)) {
            if ($request->filled('name') && !$request->filled('title')) {
                $request->merge(['title' => $request->input('name')]);
            }
            if ($request->filled('label') && !$request->filled('title')) {
                $request->merge(['title' => $request->input('label')]);
            }
        }

        // --- Mapper "Description (carte Accueil)" -> excerpt si présent en BDD
        if (in_array('excerpt', $columns, true) && $request->filled('description') && !$request->filled('excerpt')) {
            $request->merge(['excerpt' => $request->input('description')]);
        }

        $rules = [];

        // Colonne "titre" probable
        $titleCol = collect(['title', 'name', 'label'])
            ->first(fn ($c) => in_array($c, $columns, true));

        if ($titleCol) {
            $unique = Rule::unique('services', $titleCol);
            if ($ignoreId) $unique = $unique->ignore($ignoreId);
            $rules[$titleCol] = [
                $ignoreId ? 'sometimes' : 'required',
                'string', 'min:2', 'max:120', $unique
            ];
        }

        // Slug
        if (in_array('slug', $columns, true)) {
            $u = Rule::unique('services', 'slug');
            if ($ignoreId) $u = $u->ignore($ignoreId);
            $rules['slug'] = ['nullable', 'string', 'max:140', $u];
        }

        // Statut / position / prix
        if (in_array('is_active', $columns, true))    $rules['is_active']    = ['sometimes', 'boolean'];
        if (in_array('position', $columns, true))     $rules['position']     = ['nullable', 'integer', 'min:0'];
        if (in_array('base_price', $columns, true))   $rules['base_price']   = ['nullable', 'numeric', 'min:0'];

        // Image meta (stockage local géré ailleurs)
        if (in_array('image_url', $columns, true))    $rules['image_url']    = ['nullable', 'url', 'max:1024'];
        if (in_array('image_path', $columns, true))   $rules['image_path']   = ['nullable', 'string', 'max:255'];

        // Contenu "court" (hover + sous-titre H1)
        if (in_array('excerpt', $columns, true))      $rules['excerpt']      = ['nullable', 'string', 'max:255'];
        if (in_array('description', $columns, true))  $rules['description']  = ['nullable', 'string', 'max:255'];
        if (in_array('lead', $columns, true))         $rules['lead']         = ['nullable', 'string', 'max:255'];

        // Contenu "long"
        if (in_array('content_heading', $columns, true)) $rules['content_heading'] = ['nullable', 'string', 'max:255'];
        if (in_array('content_md', $columns, true))      $rules['content_md']      = ['nullable', 'string'];
        if (in_array('content', $columns, true))         $rules['content']         = ['nullable', 'string'];
        if (in_array('bottom_note', $columns, true))     $rules['bottom_note']     = ['nullable', 'string', 'max:1000'];

        $data = $request->validate($rules);

        // champs remplissables = colonnes (hors timestamps)
        $fillable = array_values(array_diff($columns, ['created_at', 'updated_at', 'deleted_at']));

        return [$data, $fillable];
    }

    protected function castValue(string $key, $value)
    {
        if (in_array($key, ['is_active', 'active', 'enabled'], true)) {
            return filter_var($value, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE) ?? false;
        }
        if ($key === 'position') {
            return is_numeric($value) ? (int) $value : 0;
        }
        if ($key === 'base_price') {
            return is_numeric($value) ? (float) $value : 0.0;
        }
        return $value;
    }

    /**
     * Applique des valeurs par défaut (slug, position, is_active).
     * Ne force PAS 'description' : la carte utilise 'excerpt' si dispo.
     */
    protected function applyDefaults(array $data, array $columns): array
    {
        if (in_array('slug', $columns, true)) {
            $title = $data['name'] ?? $data['title'] ?? $data['label'] ?? null;
            if (!array_key_exists('slug', $data) && $title) {
                $data['slug'] = Str::slug($title);
            }
        }
        if (in_array('position', $columns, true) && !array_key_exists('position', $data)) {
            $data['position'] = 0;
        }
        if (in_array('is_active', $columns, true) && !array_key_exists('is_active', $data)) {
            $data['is_active'] = false;
        }

        // Si excerpt absent en payload mais description fournie et colonne 'excerpt' existante
        if (in_array('excerpt', $columns, true) && !array_key_exists('excerpt', $data) && array_key_exists('description', $data)) {
            $data['excerpt'] = (string) ($data['description'] ?? '');
        }

        return $data;
    }
}
