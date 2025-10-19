<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Service extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'excerpt',
        'duration_minutes',
        'base_price',
        'position',
        'is_active',
        'content_heading',
        'content_md',
        'bottom_note',
        'image_url',   // image distante (compat)
        'image_path',  // image locale (upload)
    ];

    // Fournit automatiquement une url(storage) si image_path est défini
    protected $appends = ['image_path_url'];

    public function getImagePathUrlAttribute(): ?string
    {
        return $this->image_path ? Storage::url($this->image_path) : null;
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}
