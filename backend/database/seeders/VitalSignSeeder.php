<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VitalSign;

class VitalSignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = \App\Models\Patient::all();
        $nurses = \App\Models\Nurse::all();
        $consciousnessList = ['Alerte', 'Somnolent', 'Comateux'];
        $mobilityList = ['Autonome', 'Aide partielle', 'Alité'];
        $nutritionList = ['Normale', 'Réduite', 'Par sonde'];
        $medications = [
            ['Paracétamol 500mg'],
            ['Amoxicilline 1g'],
            ['Ventoline'],
            ['Amlodipine 5mg'],
            ['Metformine 500mg'],
            ['Ibuprofène 400mg'],
            ['ORS'],
            ['Salbutamol 100µg'],
            ['Crème hydrocortisone'],
            ['Prednisone 20mg'],
        ];
        for ($i = 0; $i < 30; $i++) {
            $patient = $patients[$i % $patients->count()];
            $nurse = $nurses[$i % $nurses->count()];
            \App\Models\VitalSign::create([
                'patient_id' => $patient->id,
                'nurse_id' => $nurse->id,
                'measurement_date' => now()->subDays(30 - $i)->format('Y-m-d 08:00:00'),
                'temperature' => 36.5 + ($i % 5) * 0.3,
                'blood_pressure' => (110 + ($i % 5) * 5) . '/' . (70 + ($i % 4) * 5),
                'heart_rate' => 70 + ($i % 10),
                'oxygen_saturation' => 95 + ($i % 5),
                'consciousness' => $consciousnessList[$i % count($consciousnessList)],
                'mobility' => $mobilityList[$i % count($mobilityList)],
                'nutrition' => $nutritionList[$i % count($nutritionList)],
                'medications_administered' => $medications[$i % count($medications)],
                'notes' => 'Observation ' . ($i+1),
                'anomaly_detected' => $i % 4 === 0,
            ]);
        }
    }
}