<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MountainController;
use App\Http\Controllers\AuthController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/mountains', [MountainController::class, 'getAllMountains']);
Route::get('/mountains/{id}', [MountainController::class, 'getMountainById']);
Route::post('/mountains/create', [MountainController::class, 'createMountain'])->middleware('auth:sanctum');
Route::delete('/mountains/{id}', [MountainController::class, 'deleteMountain'])->middleware('auth:sanctum');
Route::put('/mountains/{id}', [MountainController::class, 'updateMountain'])->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');