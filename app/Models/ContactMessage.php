<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ContactMessage extends Model
{
use HasFactory;


protected $fillable = [
'name', 'email', 'subject', 'message',
'phone', 'ownership', 'site_address',
'works_json', 'rgpd', 'is_read',
];


protected $casts = [
'rgpd' => 'boolean',
'is_read' => 'boolean',
'works_json' => 'array',
];
}