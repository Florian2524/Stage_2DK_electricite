<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ServiceImageUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        // L'auth admin est gérée par le middleware sur la route
        return true;
    }

    public function rules(): array
    {
        return [
            // image: vérifie largeur/hauteur et MIME
            // mimes: formats autorisés
            // max: 2048 Ko (≈2 Mo)
            'file' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Aucun fichier reçu.',
            'file.image'    => 'Le fichier doit être une image.',
            'file.mimes'    => 'Formats autorisés : JPG, JPEG, PNG, WEBP.',
            'file.max'      => 'Taille maximale : 2 Mo.',
        ];
    }
}
