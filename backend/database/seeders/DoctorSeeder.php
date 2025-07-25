<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $doctors = [
            [ 'first_name' => 'Jean-Claude', 'last_name' => 'Mbianda', 'email' => 'jc.mbianda@chuyde.com', 'specialty' => 'Cardiologie', 'phone' => '690123456', 'registration_number' => 'CM001', 'address' => 'Hôpital Central, Yaoundé', 'date_of_birth' => '1972-03-15', 'gender' => 'M', 'notes' => 'Chef de service', 'status' => 'active', 'available' => true, 'patients_count' => 15 ],
            [ 'first_name' => 'Brigitte', 'last_name' => 'Ngono', 'email' => 'b.ngono@chudouala.com', 'specialty' => 'Pédiatrie', 'phone' => '677234567', 'registration_number' => 'CM002', 'address' => 'CHU Douala', 'date_of_birth' => '1980-07-22', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 10 ],
            [ 'first_name' => 'Samuel', 'last_name' => 'Fouda', 'email' => 's.fouda@hopitalbafoussam.com', 'specialty' => 'Dermatologie', 'phone' => '699876543', 'registration_number' => 'CM003', 'address' => 'Hôpital Régional, Bafoussam', 'date_of_birth' => '1975-11-05', 'gender' => 'M', 'notes' => 'Disponible le matin', 'status' => 'active', 'available' => false, 'patients_count' => 7 ],
            [ 'first_name' => 'Estelle', 'last_name' => 'Mballa', 'email' => 'e.mballa@hopitalgaroua.com', 'specialty' => 'Gynécologie', 'phone' => '698765432', 'registration_number' => 'CM004', 'address' => 'Hôpital Régional, Garoua', 'date_of_birth' => '1985-02-10', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 12 ],
            [ 'first_name' => 'Boris', 'last_name' => 'Tchounga', 'email' => 'b.tchounga@hopitalyaounde.com', 'specialty' => 'Chirurgie', 'phone' => '691234567', 'registration_number' => 'CM005', 'address' => 'Hôpital Général, Yaoundé', 'date_of_birth' => '1978-09-18', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 9 ],
            [ 'first_name' => 'Clarisse', 'last_name' => 'Ewodo', 'email' => 'c.ewodo@hopitalbamenda.com', 'specialty' => 'Ophtalmologie', 'phone' => '695432187', 'registration_number' => 'CM006', 'address' => 'Hôpital Régional, Bamenda', 'date_of_birth' => '1982-12-01', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 8 ],
            [ 'first_name' => 'Arnaud', 'last_name' => 'Nana', 'email' => 'a.nana@hopitalbuea.com', 'specialty' => 'Neurologie', 'phone' => '692345678', 'registration_number' => 'CM007', 'address' => 'Hôpital Régional, Buea', 'date_of_birth' => '1970-06-30', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 6 ],
            [ 'first_name' => 'Josiane', 'last_name' => 'Mbarga', 'email' => 'j.mbarga@hopitalkribi.com', 'specialty' => 'Gastro-entérologie', 'phone' => '693456789', 'registration_number' => 'CM008', 'address' => 'Hôpital de District, Kribi', 'date_of_birth' => '1987-04-12', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 5 ],
            [ 'first_name' => 'Dieudonné', 'last_name' => 'Essomba', 'email' => 'd.essomba@hopitalmaroua.com', 'specialty' => 'ORL', 'phone' => '694567890', 'registration_number' => 'CM009', 'address' => 'Hôpital Régional, Maroua', 'date_of_birth' => '1973-08-25', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 4 ],
            [ 'first_name' => 'Patricia', 'last_name' => 'Ngassa', 'email' => 'p.ngassa@hopitallimbe.com', 'specialty' => 'Rhumatologie', 'phone' => '696789012', 'registration_number' => 'CM010', 'address' => 'Hôpital Régional, Limbe', 'date_of_birth' => '1983-03-19', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 7 ],
            [ 'first_name' => 'Fabrice', 'last_name' => 'Mekoulou', 'email' => 'f.mekoulou@hopitaldschang.com', 'specialty' => 'Médecine interne', 'phone' => '697890123', 'registration_number' => 'CM011', 'address' => 'Hôpital de District, Dschang', 'date_of_birth' => '1979-10-11', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 6 ],
            [ 'first_name' => 'Solange', 'last_name' => 'Biloa', 'email' => 's.biloa@hopitalngoundere.com', 'specialty' => 'Endocrinologie', 'phone' => '698901234', 'registration_number' => 'CM012', 'address' => 'Hôpital Régional, Ngaoundéré', 'date_of_birth' => '1986-05-27', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 5 ],
            [ 'first_name' => 'Gaston', 'last_name' => 'Mbappe', 'email' => 'g.mbappe@hopitaledea.com', 'specialty' => 'Urologie', 'phone' => '699012345', 'registration_number' => 'CM013', 'address' => 'Hôpital de District, Edéa', 'date_of_birth' => '1977-01-09', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 8 ],
            [ 'first_name' => 'Chantal', 'last_name' => 'Ntsama', 'email' => 'c.ntsama@hopitalmbouda.com', 'specialty' => 'Hématologie', 'phone' => '690234567', 'registration_number' => 'CM014', 'address' => 'Hôpital de District, Mbouda', 'date_of_birth' => '1981-11-14', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 7 ],
            [ 'first_name' => 'Pierre', 'last_name' => 'Nkou', 'email' => 'p.nkou@hopitalkumbo.com', 'specialty' => 'Oncologie', 'phone' => '691345678', 'registration_number' => 'CM015', 'address' => 'Hôpital Régional, Kumbo', 'date_of_birth' => '1976-12-03', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 6 ],
            [ 'first_name' => 'Marthe', 'last_name' => 'Abega', 'email' => 'm.abega@hopitalbafia.com', 'specialty' => 'Néphrologie', 'phone' => '692456789', 'registration_number' => 'CM016', 'address' => 'Hôpital de District, Bafia', 'date_of_birth' => '1984-08-16', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 5 ],
            [ 'first_name' => 'Serge', 'last_name' => 'Talla', 'email' => 's.talla@hopitalyagoua.com', 'specialty' => 'Pneumologie', 'phone' => '693567890', 'registration_number' => 'CM017', 'address' => 'Hôpital Régional, Yagoua', 'date_of_birth' => '1974-04-21', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 4 ],
            [ 'first_name' => 'Nadine', 'last_name' => 'Ngoumou', 'email' => 'n.ngoumou@hopitalmora.com', 'specialty' => 'Gynécologie', 'phone' => '694678901', 'registration_number' => 'CM018', 'address' => 'Hôpital de District, Mora', 'date_of_birth' => '1988-06-05', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 3 ],
            [ 'first_name' => 'Blaise', 'last_name' => 'Mouafo', 'email' => 'b.mouafo@hopitalberthoua.com', 'specialty' => 'Médecine générale', 'phone' => '695678912', 'registration_number' => 'CM019', 'address' => 'Hôpital de District, Bertoua', 'date_of_birth' => '1971-02-28', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 6 ],
            [ 'first_name' => 'Sylvie', 'last_name' => 'Ngassam', 'email' => 's.ngassam@hopitalbanyo.com', 'specialty' => 'Pédiatrie', 'phone' => '696789123', 'registration_number' => 'CM020', 'address' => 'Hôpital de District, Banyo', 'date_of_birth' => '1989-09-09', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 5 ],
            [ 'first_name' => 'Alain', 'last_name' => 'Mbouombouo', 'email' => 'a.mbouombouo@hopitalgaroua.com', 'specialty' => 'Gériatrie', 'phone' => '690345678', 'registration_number' => 'CM021', 'address' => 'Hôpital Régional, Garoua', 'date_of_birth' => '1973-07-19', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 4 ],
            [ 'first_name' => 'Joséphine', 'last_name' => 'Bikoi', 'email' => 'j.bikoi@hopitalyaounde.com', 'specialty' => 'Gynécologie', 'phone' => '691456789', 'registration_number' => 'CM022', 'address' => 'Hôpital Général, Yaoundé', 'date_of_birth' => '1982-11-23', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 7 ],
            [ 'first_name' => 'Cédric', 'last_name' => 'Ngassa', 'email' => 'c.ngassa@hopitalbafoussam.com', 'specialty' => 'Cardiologie', 'phone' => '692567890', 'registration_number' => 'CM023', 'address' => 'Hôpital Régional, Bafoussam', 'date_of_birth' => '1977-05-14', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 8 ],
            [ 'first_name' => 'Mireille', 'last_name' => 'Tchouamo', 'email' => 'm.tchouamo@hopitalkribi.com', 'specialty' => 'Pédiatrie', 'phone' => '693678901', 'registration_number' => 'CM024', 'address' => 'Hôpital de District, Kribi', 'date_of_birth' => '1985-09-30', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 6 ],
            [ 'first_name' => 'Germain', 'last_name' => 'Nana', 'email' => 'g.nana@hopitalmaroua.com', 'specialty' => 'Neurologie', 'phone' => '694789012', 'registration_number' => 'CM025', 'address' => 'Hôpital Régional, Maroua', 'date_of_birth' => '1974-02-17', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 5 ],
            [ 'first_name' => 'Carine', 'last_name' => 'Mbida', 'email' => 'c.mbida@hopitallimbe.com', 'specialty' => 'Dermatologie', 'phone' => '695890123', 'registration_number' => 'CM026', 'address' => 'Hôpital Régional, Limbe', 'date_of_birth' => '1986-06-12', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 7 ],
            [ 'first_name' => 'Benoît', 'last_name' => 'Ngou', 'email' => 'b.ngou@hopitaldschang.com', 'specialty' => 'Médecine interne', 'phone' => '696901234', 'registration_number' => 'CM027', 'address' => 'Hôpital de District, Dschang', 'date_of_birth' => '1979-03-08', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 6 ],
            [ 'first_name' => 'Viviane', 'last_name' => 'Tchatchoua', 'email' => 'v.tchatchoua@hopitalngoundere.com', 'specialty' => 'Endocrinologie', 'phone' => '697012345', 'registration_number' => 'CM028', 'address' => 'Hôpital Régional, Ngaoundéré', 'date_of_birth' => '1983-12-21', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => false, 'patients_count' => 5 ],
            [ 'first_name' => 'François', 'last_name' => 'Biloa', 'email' => 'f.biloa@hopitaledea.com', 'specialty' => 'Urologie', 'phone' => '698123456', 'registration_number' => 'CM029', 'address' => 'Hôpital de District, Edéa', 'date_of_birth' => '1978-08-03', 'gender' => 'M', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 8 ],
            [ 'first_name' => 'Aline', 'last_name' => 'Nkou', 'email' => 'a.nkou@hopitalmbouda.com', 'specialty' => 'Hématologie', 'phone' => '699234567', 'registration_number' => 'CM030', 'address' => 'Hôpital de District, Mbouda', 'date_of_birth' => '1987-10-27', 'gender' => 'F', 'notes' => null, 'status' => 'active', 'available' => true, 'patients_count' => 7 ],
        ];

        foreach ($doctors as $doc) {
            $user = \App\Models\User::firstOrCreate(
                ['email' => $doc['email']],
                [
                    'name' => 'Dr. ' . $doc['first_name'] . ' ' . $doc['last_name'],
                    'password' => \Illuminate\Support\Facades\Hash::make('password'),
                    'role' => 'medecin',
                    'specialty' => $doc['specialty'],
                    'phone' => $doc['phone'],
                    'is_active' => true,
                ]
            );
            DB::table('doctors')->insert([
                'user_id' => $user->id,
                'first_name' => $doc['first_name'],
                'last_name' => $doc['last_name'],
                'email' => $doc['email'],
                'specialty' => $doc['specialty'],
                'phone' => $doc['phone'],
                'registration_number' => $doc['registration_number'],
                'address' => $doc['address'],
                'date_of_birth' => $doc['date_of_birth'],
                'gender' => $doc['gender'],
                'photo' => null,
                'notes' => $doc['notes'],
                'status' => $doc['status'],
                'available' => $doc['available'],
                'patients_count' => $doc['patients_count'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}