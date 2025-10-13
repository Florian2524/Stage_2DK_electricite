<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;

// Auth SPA
Route::prefix('api')->group(function () {
    Route::post('/auth/login',  [AuthController::class, 'login'])->name('auth.login');
    Route::post('/auth/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

// Admin (protégé par session Sanctum)
Route::middleware(['auth:sanctum'])->prefix('api/admin')->group(function () {
    Route::get('/services', [AdminServiceController::class, 'index'])->name('admin.services.index');

    // 👇 Nouveau : “qui suis-je ?”
    Route::get('/me', function (Request $request) {
        return response()->json($request->user());
    })->name('admin.me');
});

// SPA React
Route::view('/', 'app');
Route::view('/{any}', 'app')->where('any', '^(?!api|sanctum|storage).*$');
