<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = [
        'service_id','customer_name','customer_email','phone','address',
        'scheduled_at','status','notes',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
