<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    // Liste publique des services
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('name')
            ->get(['id','name','description','duration_minutes','base_price']);

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
    }
}
