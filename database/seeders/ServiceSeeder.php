<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['name'=>'Dépannage électrique','description'=>'Interventions urgentes (pannes, disjoncteurs, court-circuits).','duration_minutes'=>60,'base_price'=>80.00],
            ['name'=>'Installation prise & interrupteur','description'=>'Ajout/remplacement de prises, interrupteurs, va-et-vient.','duration_minutes'=>45,'base_price'=>60.00],
            ['name'=>'Mise aux normes','description'=>'Mise en conformité tableau et circuits.','duration_minutes'=>120,'base_price'=>250.00],
            ['name'=>'Éclairage intérieur/extérieur','description'=>'Pose de luminaires, spots, détecteurs.','duration_minutes'=>90,'base_price'=>120.00],
            ['name'=>'Domotique (base)','description'=>'Installation box + modules simples.','duration_minutes'=>90,'base_price'=>180.00],
        ];

        foreach ($data as $row) {
            Service::updateOrCreate(
                ['name' => $row['name']],
                $row + ['is_active' => true]
            );
        }
    }
}
