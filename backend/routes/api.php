<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\PrescriptionController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\VitalSignController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\DoctorController;


// Cette route gère les requêtes OPTIONS pour toutes les routes API.
// Elle doit être placée avant les routes protégées par auth:sanctum
// pour s'assurer que les requêtes preflight ne sont pas interceptées par l'authentification.
Route::options('{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');


/*
|--------------------------------------------------------------------------
| Routes API publiques
|--------------------------------------------------------------------------
| Ces routes sont accessibles sans authentification.
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Routes protégées par Sanctum (auth:sanctum)
|--------------------------------------------------------------------------
| L'utilisateur doit être connecté avec un token pour accéder à ces routes.
*/

Route::middleware('auth:sanctum')->group(function () {

    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Vérifier le token
    Route::get('/user', function (Request $request) {
        return response()->json([
            'status' => 'success',
            'user' => $request->user()
        ]);
    });

    // CRUD API pour chaque entité
    Route::apiResource('patients', PatientController::class);
    // Notes patient
    Route::apiResource('appointments', AppointmentController::class);
    Route::apiResource('prescriptions', PrescriptionController::class);
    Route::apiResource('consultations', ConsultationController::class);
    Route::apiResource('vital-signs', VitalSignController::class);
    Route::apiResource('documents', DocumentController::class);
    // Route personnalisée pour récupérer les documents d'un patient
    Route::get('/patients/{id}/documents', [DocumentController::class, 'getByPatient']);
    Route::apiResource('doctors', \App\Http\Controllers\Api\DoctorController::class);
    Route::patch('/doctors/{id}/status', [\App\Http\Controllers\Api\DoctorController::class, 'changeStatus']);
    // Ajout de la ressource utilisateurs (admin/infirmiers)
    Route::apiResource('users', \App\Http\Controllers\Api\UserController::class);
// ...fin du fichier sans accolade en trop

// Route temporairement publique pour tester l'accès GET /doctors sans authentification
// Route::get('/doctors', [\App\Http\Controllers\Api\DoctorController::class, 'index']);

    // CRUD API pour chaque entité
    Route::apiResource('patients', PatientController::class);
    Route::apiResource('appointments', AppointmentController::class);
    Route::apiResource('prescriptions', PrescriptionController::class);
    Route::apiResource('consultations', ConsultationController::class);
    Route::apiResource('vital-signs', VitalSignController::class);
    Route::apiResource('documents', DocumentController::class);
});
