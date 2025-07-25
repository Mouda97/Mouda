<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Données de test pour les patients camerounais
        $status = ['suivi-chronique', 'aigu', 'termine']; // Correction des statuts selon l'enum de la base de données
        $bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        
        Patient::create([
            'first_name' => 'Emmanuel',
            'last_name' => 'Mbarga',
            'date_of_birth' => '1965-03-15',
            'gender' => 'M',
            'phone' => '01 23 45 67 89',
            'email' => 'jean.dupont@email.com',
            'address' => '123 Rue de la Paix, 75001 Paris',
            'blood_type' => 'A+',
            'allergies' => ['Pénicilline', 'Fruits à coque'],
            'medical_history' => ['Hypertension', 'Diabète type 2'],
            'assigned_doctor_id' => 1,
            'assigned_nurse_id' => 2,
            'status' => 'suivi-chronique',
            'room' => '205',
            'last_consultation' => '2024-01-15',
        ]);

        Patient::create([
            'first_name' => 'Marie',
            'last_name' => 'Martin',
            'date_of_birth' => '1978-08-22',
            'gender' => 'F',
            'phone' => '01 23 45 67 90',
            'email' => 'marie.martin@email.com',
            'address' => '456 Avenue des Champs, 75008 Paris',
            'blood_type' => 'O-',
            'allergies' => ['Aspirine'],
            'medical_history' => ['Asthme'],
            'assigned_doctor_id' => 1,
            'assigned_nurse_id' => 2,
            'status' => 'aigu',
            'room' => '312',
            'last_consultation' => '2024-01-20',
        ]);

        Patient::create([
            'first_name' => 'Franck',
            'last_name' => 'Etoo',
            'date_of_birth' => '1982-05-12',
            'gender' => 'M',
            'phone' => '237 698 45 23 12',
            'email' => 'franck.etoo@email.com',
            'address' => 'Quartier Bonamoussadi, Douala',
            'blood_type' => 'B+',
            'allergies' => ['Sulfamides'],
            'medical_history' => ['Paludisme chronique'],
            'assigned_doctor_id' => 2,
            'assigned_nurse_id' => 3,
            'status' => 'suivi-chronique',
            'room' => '105',
            'last_consultation' => '2024-01-18',
        ]);

        Patient::create([
            'first_name' => 'Alice',
            'last_name' => 'Nkom',
            'date_of_birth' => '1990-11-30',
            'gender' => 'F',
            'phone' => '237 655 78 90 34',
            'email' => 'alice.nkom@email.com',
            'address' => 'Avenue Kennedy, Yaoundé',
            'blood_type' => 'O+',
            'allergies' => ['Latex'],
            'medical_history' => ['Hypertension'],
            'assigned_doctor_id' => 1,
            'assigned_nurse_id' => 2,
            'status' => 'suivi-chronique',
            'room' => '201',
            'last_consultation' => '2024-01-22',
        ]);

        Patient::create([
            'first_name' => 'Paul',
            'last_name' => 'Biya',
            'date_of_birth' => '1975-07-20',
            'gender' => 'M',
            'phone' => '237 677 12 34 56',
            'email' => 'paul.biya@email.com',
            'address' => 'Quartier Bastos, Yaoundé',
            'blood_type' => 'AB+',
            'allergies' => ['Pénicilline'],
            'medical_history' => ['Diabète type 2'],
            'assigned_doctor_id' => 3,
            'assigned_nurse_id' => 1,
            'status' => 'suivi-chronique',
            'room' => '304',
            'last_consultation' => '2024-01-19',
        ]);

        Patient::create([
            'first_name' => 'Sophie',
            'last_name' => 'Tchokonte',
            'date_of_birth' => '1988-03-15',
            'gender' => 'F',
            'phone' => '237 699 56 78 90',
            'email' => 'sophie.tchokonte@email.com',
            'address' => 'Quartier Makepe, Douala',
            'blood_type' => 'A-',
            'allergies' => ['Aspirine'],
            'medical_history' => ['Asthme'],
            'assigned_doctor_id' => 2,
            'assigned_nurse_id' => 3,
            'status' => 'aigu',
            'room' => '102',
            'last_consultation' => '2024-01-21',
        ]);

        Patient::create([
            'first_name' => 'Christian',
            'last_name' => 'Bassogog',
            'date_of_birth' => '1980-09-25',
            'gender' => 'M',
            'phone' => '237 655 23 45 67',
            'email' => 'christian.bassogog@email.com',
            'address' => 'Quartier Omnisport, Yaoundé',
            'blood_type' => 'O-',
            'allergies' => ['Iode'],
            'medical_history' => ['Ulcère gastrique'],
            'assigned_doctor_id' => 1,
            'assigned_nurse_id' => 2,
            'status' => 'suivi-chronique',
            'room' => '203',
            'last_consultation' => '2024-01-17',
        ]);

        // ... Continuation des données (Je continue avec plus de patients pour atteindre 40)

        Patient::create([
            'first_name' => 'Marthe',
            'last_name' => 'Ekemeyong',
            'date_of_birth' => '1992-12-05',
            'gender' => 'F',
            'phone' => '237 677 89 01 23',
            'email' => 'marthe.ekemeyong@email.com',
            'address' => 'Quartier Bepanda, Douala',
            'blood_type' => 'B-',
            'allergies' => ['Sulfamides'],
            'medical_history' => ['Anémie'],
            'assigned_doctor_id' => 3,
            'assigned_nurse_id' => 1,
            'status' => 'suivi-chronique',
            'room' => '306',
            'last_consultation' => '2024-01-23',
        ]);

        // Ajout de plus de patients avec des noms camerounais...
        Patient::create([
            'first_name' => 'Samuel',
            'last_name' => 'Eto\'o',
            'date_of_birth' => '1985-04-18',
            'gender' => 'M',
            'phone' => '237 699 34 56 78',
            'email' => 'samuel.etoo@email.com',
            'address' => 'Quartier New-Bell, Douala',
            'blood_type' => 'A+',
            'allergies' => ['Pollen'],
            'medical_history' => ['Arthrose'],
            'assigned_doctor_id' => 2,
            'assigned_nurse_id' => 3,
            'status' => 'suivi-chronique',
            'room' => '208',
            'last_consultation' => '2024-01-24',
        ]);

        Patient::create([
            'first_name' => 'Jeanne',
            'last_name' => 'Fotso',
            'date_of_birth' => '1987-08-30',
            'gender' => 'F',
            'phone' => '237 655 90 12 34',
            'email' => 'jeanne.fotso@email.com',
            'address' => 'Quartier Nyalla, Douala',
            'blood_type' => 'AB-',
            'allergies' => ['Lactose'],
            'medical_history' => ['Migraine chronique'],
            'assigned_doctor_id' => 1,
            'assigned_nurse_id' => 2,
            'status' => 'termine',
            'room' => '210',
            'last_consultation' => '2024-01-25',
        ]);

        // ... Et ainsi de suite jusqu'à 40 patients

        // Je vais continuer à ajouter les patients restants avec des variations de noms, adresses
        // et conditions médicales typiques du Cameroun
        
        Patient::create([
            'first_name' => 'Vincent',
            'last_name' => 'Aboubakar',
            'date_of_birth' => '1983-06-14',
            'gender' => 'M',
            'phone' => '237 677 67 89 01',
            'email' => 'vincent.aboubakar@email.com',
            'address' => 'Quartier Bonapriso, Douala',
            'blood_type' => 'O+',
            'allergies' => ['Arachides'],
            'medical_history' => ['Hypertension', 'Diabète type 1'],
            'assigned_doctor_id' => 3,
            'assigned_nurse_id' => 1,
            'status' => 'suivi-chronique',
            'room' => '301',
            'last_consultation' => '2024-01-26',
        ]);

        // Continuons avec plus de données...

        for ($i = 1; $i <= 30; $i++) {
            $gender = rand(0, 1) ? 'M' : 'F';
            $firstName = $gender === 'M' ? 
                ['Roger', 'Patrick', 'Michel', 'André', 'Pierre', 'Joseph', 'Claude', 'François', 'Georges'][rand(0, 8)] :
                ['Marie', 'Catherine', 'Anne', 'Christine', 'Suzanne', 'Jacqueline', 'Françoise', 'Thérèse'][rand(0, 7)];
            
            $lastNames = ['Kamto', 'Nkoulou', 'Ondoa', 'Mbia', 'Nkono', 'Enow', 'Feckou', 'Tchami', 'Milla', 
                         'Song', 'Matip', 'Oyongo', 'Moukandjo', 'Choupo', 'Nsame', 'Ngamaleu', 'Zambo'];
            
            Patient::create([
                'first_name' => $firstName,
                'last_name' => $lastNames[rand(0, count($lastNames) - 1)],
                'date_of_birth' => date('Y-m-d', strtotime('-' . rand(20, 80) . ' years')),
                'gender' => $gender,
                'phone' => '237 6' . rand(55, 99) . ' ' . rand(10, 99) . ' ' . rand(10, 99) . ' ' . rand(10, 99),
                'email' => strtolower($firstName) . '.' . strtolower($lastNames[rand(0, count($lastNames) - 1)]) . $i . '@email.com', // Ajout de l'index pour garantir l'unicité
                'address' => 'Quartier ' . ['Akwa', 'Bonanjo', 'Deido', 'Bonaberi', 'Madagascar', 'Ndogbong', 'PK14', 'Logbessou', 'Logpom'][rand(0, 8)] . ', ' . ['Douala', 'Yaoundé'][rand(0, 1)],
                'blood_type' => $bloodTypes[rand(0, count($bloodTypes) - 1)],
                'allergies' => array_rand(array_flip(['Pénicilline', 'Aspirine', 'Latex', 'Pollen', 'Sulfamides', 'Iode', 'Arachides']), rand(1, 3)),
                'medical_history' => array_rand(array_flip(['Paludisme', 'Hypertension', 'Diabète', 'Asthme', 'Drépanocytose', 'Ulcère', 'Arthrose', 'Tuberculose']), rand(1, 3)),
                'assigned_doctor_id' => rand(1, 3),
                'assigned_nurse_id' => rand(1, 3),
                'status' => $status[rand(0, count($status) - 1)],
                'room' => rand(100, 399),
                'last_consultation' => date('Y-m-d', strtotime('-' . rand(1, 30) . ' days')),
            ]);
        }
    }
}