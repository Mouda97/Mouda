<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Consultation;

class ConsultationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = \App\Models\Patient::all();
        $doctors = \App\Models\Doctor::all();
        $symptomsList = [
            'Fièvre, toux',
            'Douleur abdominale',
            'Céphalées',
            'Fatigue chronique',
            'Douleur thoracique',
            'Essoufflement',
            'Vertiges',
            'Palpitations',
            'Vomissements',
            'Diarrhée',
            'Crise d\'asthme',
            'Éruption cutanée',
            'Douleurs articulaires',
            'Troubles visuels',
            'Toux sèche',
            'Maux de gorge',
            'Perte d\'appétit',
            'Insomnie',
            'Douleur lombaire',
            'Oedème',
        ];
        $diagnosisList = [
            'Paludisme', 'Gastro-entérite', 'Migraine', 'Hypertension', 'Angine de poitrine', 'Asthme', 'Dermatite', 'Arthrite', 'Conjonctivite', 'Bronchite', 'Diabète', 'Rhume', 'Grippe', 'Insuffisance rénale', 'Pneumonie', 'Otite', 'Anémie', 'Allergie', 'Sciatique', 'Insomnie'
        ];
        $treatmentList = [
            'Paracétamol, repos', 'Antibiotiques', 'Antipaludéens', 'Bronchodilatateurs', 'Corticoïdes', 'Antihypertenseurs', 'Crème topique', 'Antidiabétiques', 'Hydratation', 'Régime alimentaire', 'Antihistaminiques', 'Antalgiques', 'Physiothérapie', 'Repos strict', 'Surveillance', 'Inhalateurs', 'Antiviraux', 'Suppléments vitaminiques', 'Antifongiques', 'Chirurgie mineure'
        ];
        $prescriptions = [
            'Paracétamol 500mg, 3x/jour', 'Amoxicilline 1g, 2x/jour', 'Artemether-Lumefantrine, 2x/jour', 'Ventoline, 2 bouffées 3x/jour', 'Prednisone 20mg, 1x/jour', 'Amlodipine 5mg, 1x/jour', 'Crème hydrocortisone, 2x/jour', 'Metformine 500mg, 2x/jour', 'ORS, à volonté', 'Régime pauvre en sel', 'Loratadine 10mg, 1x/jour', 'Ibuprofène 400mg, 2x/jour', 'Séances de kiné', 'Repos au lit', 'Surveillance glycémie', 'Inhalateur salbutamol', 'Oseltamivir 75mg, 2x/jour', 'Vitamine C 1g, 1x/jour', 'Fluconazole 150mg, 1x/semaine', 'Désinfection locale'
        ];
        $recommendations = [
            'Hydratation abondante', 'Éviter les efforts', 'Surveillance tensionnelle', 'Éviter les allergènes', 'Repos', 'Suivi médical', 'Éviter le soleil', 'Régime adapté', 'Surveillance glycémie', 'Éviter le stress', 'Contrôle dans 1 semaine', 'Contrôle dans 2 semaines', 'Contrôle dans 1 mois', 'Surveillance ECG', 'Éviter le froid', 'Éviter les irritants', 'Surveillance poids', 'Éviter les aliments gras', 'Surveillance température', 'Contrôle ophtalmo'
        ];

        for ($i = 0; $i < 30; $i++) {
            $patient = $patients[$i % $patients->count()];
            $doctor = $doctors[$i % $doctors->count()];
            Consultation::create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctor->id,
                'consultation_date' => now()->subDays(30 - $i)->format('Y-m-d 10:00:00'),
                'symptoms' => $symptomsList[$i % count($symptomsList)],
                'diagnosis' => $diagnosisList[$i % count($diagnosisList)],
                'treatment' => $treatmentList[$i % count($treatmentList)],
                'recommendations' => $recommendations[$i % count($recommendations)],
                'prescription' => $prescriptions[$i % count($prescriptions)],
                'follow_up' => $recommendations[($i+1) % count($recommendations)],
            ]);
        }
    }
}