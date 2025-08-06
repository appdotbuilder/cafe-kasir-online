<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - show welcome for guests, POS for authenticated users
Route::get('/', function () {
    if (auth()->check()) {
        return app(\App\Http\Controllers\PosController::class)->index();
    }
    return Inertia::render('welcome');
})->name('home');

// POS System Routes
Route::middleware(['auth'])->group(function () {
    Route::post('/pos', [PosController::class, 'store'])->name('pos.store');
    Route::patch('/pos/{order}', [PosController::class, 'update'])->name('pos.update');
    
    Route::get('/payment/{order}', [PaymentController::class, 'show'])->name('payment.show');
    Route::post('/payment', [PaymentController::class, 'store'])->name('payment.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
