<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'name', 'email', 'subject', 'message',
        'phone', 'ownership', 'site_address', 'works_json', 'rgpd',
        'is_read',
    ];

    protected $casts = [
        'is_read'    => 'boolean',
        'rgpd'       => 'boolean',
        'works_json' => 'array',
    ];
}
