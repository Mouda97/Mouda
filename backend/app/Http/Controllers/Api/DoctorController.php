<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doctor;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    // Changer le statut d'un médecin (active/suspended)
    public function changeStatus(Request $request, $id)
    {
        $doctor = Doctor::find($id);
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Médecin introuvable.'
            ], 404);
        }
        $status = $request->input('status');
        if (!in_array($status, ['active', 'suspended'])) {
            return response()->json([
                'success' => false,
                'message' => 'Statut invalide.'
            ], 422);
        }
        $doctor->status = $status;
        $doctor->save();
        return response()->json([
            'success' => true,
            'data' => $doctor,
            'status' => $doctor->status,
            'message' => 'Statut du médecin mis à jour.'
        ], 200);
}

    // Liste des médecins
    public function index()
    {
        $doctors = Doctor::all();
        // Ajoute le statut pour chaque médecin dans la liste
        $doctorsWithStatus = $doctors->map(function($doctor) {
            $array = $doctor->toArray();
            $array['status'] = $doctor->status;
            return $array;
        });
        return response()->json([
            'success' => true,
            'data' => $doctorsWithStatus,
            'message' => 'Liste des médecins récupérée avec succès.'
        ], 200);
    }

    // Création d'un médecin
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:doctors,email',
            'phone' => 'nullable|string|max:20',
            'specialty' => 'nullable|string|max:255',
            'registration_number' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:M,F',
            'photo' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Erreur de validation.'
            ], 422);
        }

        $doctor = Doctor::create($request->only([
            'first_name', 'last_name', 'email', 'phone', 'specialty', 'registration_number', 'address', 'date_of_birth', 'gender', 'photo', 'notes'
        ]));

        return response()->json([
            'success' => true,
            'data' => $doctor,
            'status' => $doctor->status,
            'message' => 'Médecin créé avec succès.'
        ], 201);
    }

    // Affiche un médecin
    public function show($id)
    {
        $doctor = Doctor::find($id);
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Médecin introuvable.'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $doctor,
            'status' => $doctor->status,
            'message' => 'Médecin trouvé.'
        ], 200);
    }

    // Mise à jour d'un médecin
    public function update(Request $request, $id)
    {
        $doctor = Doctor::find($id);
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Médecin introuvable.'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:doctors,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'specialty' => 'nullable|string|max:255',
            'registration_number' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'sometimes|required|in:M,F',
            'photo' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Erreur de validation.'
            ], 422);
        }
        $doctor->update($request->only([
            'first_name', 'last_name', 'email', 'phone', 'specialty', 'registration_number', 'address', 'date_of_birth', 'gender', 'photo', 'notes'
        ]));
        return response()->json([
            'success' => true,
            'data' => $doctor,
            'status' => $doctor->status,
            'message' => 'Médecin mis à jour avec succès.'
        ], 200);
    }

    // Suppression d'un médecin
    public function destroy($id)
    {
        $doctor = Doctor::find($id);
        if (!$doctor) {
            return response()->json([
                'success' => false,
                'message' => 'Médecin introuvable.'
            ], 404);
        }
        $doctor->delete();
        return response()->json([
            'success' => true,
            'message' => 'Médecin supprimé avec succès.'
        ], 204);
    }
    }
