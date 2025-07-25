<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    /**
     * Retourne la liste des médecins (formatée pour le frontend)
     */
    public function index()
    {
        return response()->json([
            'data' => Doctor::all()
        ]);
    }
}
