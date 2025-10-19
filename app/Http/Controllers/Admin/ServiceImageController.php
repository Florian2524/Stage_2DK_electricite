<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceImageUploadRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceImageController extends Controller
{
    /**
     * Upload d'une image pour un service.
     * Route prévue : POST /api/admin/services/{service}/image
     * Body: multipart/form-data avec 'file'
     */
    public function store(ServiceImageUploadRequest $request, Service $service)
    {
        $file = $request->file('file');

        // Stockage sur le disque "public" -> storage/app/public/services/xxx.ext
        $path = $file->store('services', 'public'); // génère un nom unique

        // Supprimer l'ancienne image si elle existe (et qu'elle n'est pas la même)
        if ($service->image_path && $service->image_path !== $path) {
            Storage::disk('public')->delete($service->image_path);
        }

        $service->image_path = $path;
        $service->save();

        return response()->json([
            'success'    => true,
            'image_path' => $service->image_path,
            // URL publique: /storage/services/xxx.ext (grâce à storage:link)
            'image_url'  => Storage::url($service->image_path),
        ]);
    }

    /**
     * Suppression de l'image du service.
     * Route prévue : DELETE /api/admin/services/{service}/image
     */
    public function destroy(Request $request, Service $service)
    {
        if ($service->image_path) {
            Storage::disk('public')->delete($service->image_path);
            $service->image_path = null;
            $service->save();
        }

        return response()->json(['success' => true]);
    }
}
