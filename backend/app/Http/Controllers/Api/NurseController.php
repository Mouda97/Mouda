<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Nurse;
use Illuminate\Support\Facades\Validator;

class NurseController extends Controller
{
    // Liste des infirmiers
    public function index()
    {
        $nurses = Nurse::all();
        return response()->json([
            'success' => true,
            'data' => $nurses,
            'message' => 'Liste des infirmiers récupérée avec succès.'
        ], 200);
    }

    // Création d'un infirmier
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:nurses,email',
            'phone' => 'nullable|string|max:20',
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

        $nurse = Nurse::create($request->only([
            'first_name', 'last_name', 'email', 'phone', 'registration_number', 'address', 'date_of_birth', 'gender', 'photo', 'notes'
        ]));

        return response()->json([
            'success' => true,
            'data' => $nurse,
            'message' => 'Infirmier créé avec succès.'
        ], 201);
    }

    // Affiche un infirmier
    public function show($id)
    {
        $nurse = Nurse::find($id);
        if (!$nurse) {
            return response()->json([
                'success' => false,
                'message' => 'Infirmier introuvable.'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $nurse,
            'message' => 'Infirmier trouvé.'
        ], 200);
    }

    // Mise à jour d'un infirmier
    public function update(Request $request, $id)
    {
        $nurse = Nurse::find($id);
        if (!$nurse) {
            return response()->json([
                'success' => false,
                'message' => 'Infirmier introuvable.'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:nurses,email,' . $id,
            'phone' => 'nullable|string|max:20',
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
        $nurse->update($request->only([
            'first_name', 'last_name', 'email', 'phone', 'registration_number', 'address', 'date_of_birth', 'gender', 'photo', 'notes'
        ]));
        return response()->json([
            'success' => true,
            'data' => $nurse,
            'message' => 'Infirmier mis à jour avec succès.'
        ], 200);
    }

    // Suppression d'un infirmier
    public function destroy($id)
    {
        $nurse = Nurse::find($id);
        if (!$nurse) {
            return response()->json([
                'success' => false,
                'message' => 'Infirmier introuvable.'
            ], 404);
        }
        $nurse->delete();
        return response()->json([
            'success' => true,
            'message' => 'Infirmier supprimé avec succès.'
        ], 204);
    }
}
