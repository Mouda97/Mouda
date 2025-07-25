<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    /**
     * Retourne tous les documents d'un patient donné (GET /api/patients/{id}/documents)
     *
     * @param int $patientId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByPatient($patientId)
    {
        // Vérifie que l'ID est bien un entier positif
        if (!is_numeric($patientId) || $patientId <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'ID patient invalide.'
            ], 400);
        }

        // Récupère tous les documents liés à ce patient
        $documents = Document::where('patient_id', $patientId)
            ->with(['patient', 'uploadedBy'])
            ->get();

        // Si aucun document trouvé, retourne une liste vide
        return response()->json([
            'success' => true,
            'data' => $documents,
            'message' => 'Documents du patient récupérés avec succès.'
        ], 200)
        // Ajoute le header CORS explicitement si besoin (utile pour debug local)
        ->header('Access-Control-Allow-Origin', '*');
    }
    /**
     * Affiche la liste de tous les documents (route /api/documents)
     */
    public function index()
    {
        $documents = Document::with(['patient', 'createdBy'])->get();

        return response()->json([
            'success' => true,
            'data' => $documents,
            'message' => 'Liste des documents récupérée avec succès.'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10 Mo max
            'patient_id' => 'nullable|exists:patients,id',
            'type' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $mimeType = $file->getClientMimeType();
        $size = $file->getSize();
        $path = $file->store('documents', 'public');

        $patientId = $request->input('patient_id');
        \Log::info('Upload document - patient_id reçu', ['patient_id' => $patientId, 'all' => $request->all()]);
        if (empty($patientId)) {
            return response()->json([
                'success' => false,
                'message' => 'patient_id manquant ou vide lors de l’upload du document.'
            ], 422);
        }

        $document = \App\Models\Document::create([
            'patient_id' => $patientId,
            'name' => $originalName,
            'type' => $request->input('type', 'other'),
            'file_path' => $path,
            'mime_type' => $mimeType,
            'file_size' => $size,
            'uploaded_by' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $document,
            'message' => 'Document uploadé avec succès.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
