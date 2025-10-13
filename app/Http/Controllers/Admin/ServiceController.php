<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class ServiceController extends Controller
{
    // GET /api/admin/services
    public function index(Request $request)
    {
        // On s'adapte au schéma actuel de la table
        $cols = Schema::getColumnListing('services');

        $query = Service::query();

        if (in_array('title', $cols, true)) {
            $query->orderBy('title');
        } elseif (in_array('name', $cols, true)) {
            $query->orderBy('name');
        } elseif (in_array('label', $cols, true)) {
            $query->orderBy('label');
        } else {
            $query->orderBy('id'); // fallback sûr
        }

        return response()->json($query->get());
    }
}
