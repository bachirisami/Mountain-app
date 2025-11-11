<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mountain extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'height',
        'location',
        'latitude',
        'longitude',
        'image_url',
    ];

    public function scopeFilterName($query, $name)
    {
        if ($name) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%'.strtolower($name).'%']);
        }
    }
}
