<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PatientNote;
use Illuminate\Support\Facades\Auth;

class PatientNoteController extends Controller
{
    public function store(Request $request, $patientId)
    {
        $request->validate([
            'note' => 'required|string',
        ]);

        $note = PatientNote::create([
            'patient_id' => $patientId,
            'author_id' => Auth::id(),
            'note' => $request->note,
        ]);

        return response()->json(['data' => $note], 201);
    }

    public function index($patientId)
    {
        $notes = PatientNote::where('patient_id', $patientId)
            ->with('author:id,name')
            ->orderByDesc('created_at')
            ->get();
        return response()->json(['data' => $notes]);
    }
}
