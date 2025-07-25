<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Nurse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class NurseSeeder extends Seeder
{
    public function run(): void
    {
        $nurses = [
            [ 'first_name' => 'Pauline', 'last_name' => 'Ngueguim', 'email' => 'p.ngueguim@chuyde.com', 'phone' => '690111111', 'registration_number' => 'INF001', 'address' => 'Hôpital Central, Yaoundé', 'date_of_birth' => '1982-04-10', 'gender' => 'F', 'status' => 'active', 'notes' => 'Référente bloc opératoire' ],
            [ 'first_name' => 'Benoît', 'last_name' => 'Mouelle', 'email' => 'b.mouelle@chudouala.com', 'phone' => '677111112', 'registration_number' => 'INF002', 'address' => 'CHU Douala', 'date_of_birth' => '1979-09-22', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Clarisse', 'last_name' => 'Fouda', 'email' => 'c.fouda@hopitalbafoussam.com', 'phone' => '699111113', 'registration_number' => 'INF003', 'address' => 'Hôpital Régional, Bafoussam', 'date_of_birth' => '1985-11-05', 'gender' => 'F', 'status' => 'active', 'notes' => 'Disponible nuit' ],
            [ 'first_name' => 'Esther', 'last_name' => 'Mballa', 'email' => 'e.mballa@hopitalgaroua.com', 'phone' => '698111114', 'registration_number' => 'INF004', 'address' => 'Hôpital Régional, Garoua', 'date_of_birth' => '1988-02-10', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Boris', 'last_name' => 'Tchounga', 'email' => 'b.tchounga@hopitalyaounde.com', 'phone' => '691111115', 'registration_number' => 'INF005', 'address' => 'Hôpital Général, Yaoundé', 'date_of_birth' => '1980-09-18', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Clarisse', 'last_name' => 'Ewodo', 'email' => 'c.ewodo@hopitalbamenda.com', 'phone' => '695111116', 'registration_number' => 'INF006', 'address' => 'Hôpital Régional, Bamenda', 'date_of_birth' => '1982-12-01', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Arnaud', 'last_name' => 'Nana', 'email' => 'a.nana@hopitalbuea.com', 'phone' => '692111117', 'registration_number' => 'INF007', 'address' => 'Hôpital Régional, Buea', 'date_of_birth' => '1977-06-30', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Josiane', 'last_name' => 'Mbarga', 'email' => 'j.mbarga@hopitalkribi.com', 'phone' => '693111118', 'registration_number' => 'INF008', 'address' => 'Hôpital de District, Kribi', 'date_of_birth' => '1987-04-12', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Dieudonné', 'last_name' => 'Essomba', 'email' => 'd.essomba@hopitalmaroua.com', 'phone' => '694111119', 'registration_number' => 'INF009', 'address' => 'Hôpital Régional, Maroua', 'date_of_birth' => '1973-08-25', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Patricia', 'last_name' => 'Ngassa', 'email' => 'p.ngassa@hopitallimbe.com', 'phone' => '696111120', 'registration_number' => 'INF010', 'address' => 'Hôpital Régional, Limbe', 'date_of_birth' => '1983-03-19', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Fabrice', 'last_name' => 'Mekoulou', 'email' => 'f.mekoulou@hopitaldschang.com', 'phone' => '697111121', 'registration_number' => 'INF011', 'address' => 'Hôpital de District, Dschang', 'date_of_birth' => '1979-10-11', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Solange', 'last_name' => 'Biloa', 'email' => 's.biloa@hopitalngoundere.com', 'phone' => '698111122', 'registration_number' => 'INF012', 'address' => 'Hôpital Régional, Ngaoundéré', 'date_of_birth' => '1986-05-27', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Gaston', 'last_name' => 'Mbappe', 'email' => 'g.mbappe@hopitaledea.com', 'phone' => '699111123', 'registration_number' => 'INF013', 'address' => 'Hôpital de District, Edéa', 'date_of_birth' => '1977-01-09', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Chantal', 'last_name' => 'Ntsama', 'email' => 'c.ntsama@hopitalmbouda.com', 'phone' => '690111124', 'registration_number' => 'INF014', 'address' => 'Hôpital de District, Mbouda', 'date_of_birth' => '1981-11-14', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Pierre', 'last_name' => 'Nkou', 'email' => 'p.nkou@hopitalkumbo.com', 'phone' => '691111125', 'registration_number' => 'INF015', 'address' => 'Hôpital Régional, Kumbo', 'date_of_birth' => '1976-12-03', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Marthe', 'last_name' => 'Abega', 'email' => 'm.abega@hopitalbafia.com', 'phone' => '692111126', 'registration_number' => 'INF016', 'address' => 'Hôpital de District, Bafia', 'date_of_birth' => '1984-08-16', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Serge', 'last_name' => 'Talla', 'email' => 's.talla@hopitalyagoua.com', 'phone' => '693111127', 'registration_number' => 'INF017', 'address' => 'Hôpital Régional, Yagoua', 'date_of_birth' => '1974-04-21', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Nadine', 'last_name' => 'Ngoumou', 'email' => 'n.ngoumou@hopitalmora.com', 'phone' => '694111128', 'registration_number' => 'INF018', 'address' => 'Hôpital de District, Mora', 'date_of_birth' => '1988-06-05', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Blaise', 'last_name' => 'Mouafo', 'email' => 'b.mouafo@hopitalberthoua.com', 'phone' => '695111129', 'registration_number' => 'INF019', 'address' => 'Hôpital de District, Bertoua', 'date_of_birth' => '1971-02-28', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Sylvie', 'last_name' => 'Ngassam', 'email' => 's.ngassam@hopitalbanyo.com', 'phone' => '696111130', 'registration_number' => 'INF020', 'address' => 'Hôpital de District, Banyo', 'date_of_birth' => '1989-09-09', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Alain', 'last_name' => 'Mbouombouo', 'email' => 'a.mbouombouo@hopitalgaroua.com', 'phone' => '690111131', 'registration_number' => 'INF021', 'address' => 'Hôpital Régional, Garoua', 'date_of_birth' => '1973-07-19', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Joséphine', 'last_name' => 'Bikoi', 'email' => 'j.bikoi@hopitalyaounde.com', 'phone' => '691111132', 'registration_number' => 'INF022', 'address' => 'Hôpital Général, Yaoundé', 'date_of_birth' => '1982-11-23', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Cédric', 'last_name' => 'Ngassa', 'email' => 'c.ngassa@hopitalbafoussam.com', 'phone' => '692111133', 'registration_number' => 'INF023', 'address' => 'Hôpital Régional, Bafoussam', 'date_of_birth' => '1977-05-14', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Mireille', 'last_name' => 'Tchouamo', 'email' => 'm.tchouamo@hopitalkribi.com', 'phone' => '693111134', 'registration_number' => 'INF024', 'address' => 'Hôpital de District, Kribi', 'date_of_birth' => '1985-09-30', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Germain', 'last_name' => 'Nana', 'email' => 'g.nana@hopitalmaroua.com', 'phone' => '694111135', 'registration_number' => 'INF025', 'address' => 'Hôpital Régional, Maroua', 'date_of_birth' => '1974-02-17', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Carine', 'last_name' => 'Mbida', 'email' => 'c.mbida@hopitallimbe.com', 'phone' => '695111136', 'registration_number' => 'INF026', 'address' => 'Hôpital Régional, Limbe', 'date_of_birth' => '1986-06-12', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Benoît', 'last_name' => 'Ngou', 'email' => 'b.ngou@hopitaldschang.com', 'phone' => '696111137', 'registration_number' => 'INF027', 'address' => 'Hôpital de District, Dschang', 'date_of_birth' => '1979-03-08', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Viviane', 'last_name' => 'Tchatchoua', 'email' => 'v.tchatchoua@hopitalngoundere.com', 'phone' => '697111138', 'registration_number' => 'INF028', 'address' => 'Hôpital Régional, Ngaoundéré', 'date_of_birth' => '1983-12-21', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'François', 'last_name' => 'Biloa', 'email' => 'f.biloa@hopitaledea.com', 'phone' => '698111139', 'registration_number' => 'INF029', 'address' => 'Hôpital de District, Edéa', 'date_of_birth' => '1978-08-03', 'gender' => 'M', 'status' => 'active', 'notes' => null ],
            [ 'first_name' => 'Aline', 'last_name' => 'Nkou', 'email' => 'a.nkou@hopitalmbouda.com', 'phone' => '699111140', 'registration_number' => 'INF030', 'address' => 'Hôpital de District, Mbouda', 'date_of_birth' => '1987-10-27', 'gender' => 'F', 'status' => 'active', 'notes' => null ],
        ];

        foreach ($nurses as $nurse) {
            $user = User::firstOrCreate(
                ['email' => $nurse['email']],
                [
                    'name' => $nurse['first_name'] . ' ' . $nurse['last_name'],
                    'password' => Hash::make('password'),
                    'role' => 'infirmier',
                    'phone' => $nurse['phone'],
                    'is_active' => true,
                ]
            );

            Nurse::create([
                'user_id' => $user->id,
                'first_name' => $nurse['first_name'],
                'last_name' => $nurse['last_name'],
                'email' => $nurse['email'],
                'phone' => $nurse['phone'],
                'registration_number' => $nurse['registration_number'],
                'address' => $nurse['address'],
                'date_of_birth' => $nurse['date_of_birth'],
                'gender' => $nurse['gender'],
                'photo' => null,
                'notes' => $nurse['notes'],
            ]);
        }
    }
}
