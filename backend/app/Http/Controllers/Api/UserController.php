<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // Liste des infirmiers
    public function index(Request $request)
    {
        $role = $request->query('role');
        $query = User::query();
        if ($role) {
            $query->where('role', $role);
        }
        $users = $query->get();
        return response()->json([
            'success' => true,
            'data' => $users,
            'message' => 'Liste des utilisateurs récupérée avec succès.'
        ], 200);
    }

    // Affiche un utilisateur
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur introuvable.'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Utilisateur trouvé.'
        ], 200);
    }

    // Mise à jour d'un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur introuvable.'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'specialty' => 'nullable|string|max:255',
            'is_active' => 'sometimes|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Erreur de validation.'
            ], 422);
        }
        $user->update($request->only(['name', 'email', 'phone', 'specialty', 'is_active']));
        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Utilisateur mis à jour avec succès.'
        ], 200);
    }

    // Suppression d'un utilisateur
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur introuvable.'
            ], 404);
        }
        $user->delete();
        return response()->json([
            'success' => true,
            'message' => 'Utilisateur supprimé avec succès.'
        ], 204);
    }
}
