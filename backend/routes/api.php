<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MountainController;
use App\Http\Controllers\LoginController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/mountains', [MountainController::class, 'getAllMountains'])->middleware('auth:sanctum');
Route::get('/mountains/{id}', [MountainController::class, 'getMountainById'])->middleware('auth:sanctum');
Route::post('/mountains/create', [MountainController::class, 'createMountain'])->middleware('auth:sanctum');
Route::delete('/mountains/{id}', [MountainController::class, 'deleteMountain'])->middleware('auth:sanctum');
Route::put('/mountains/{id}', [MountainController::class, 'updateMountain'])->middleware('auth:sanctum');

Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');