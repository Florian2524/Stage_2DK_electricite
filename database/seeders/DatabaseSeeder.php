<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Ajoute ici tes autres seeders si besoin…
        $this->call([
            ServiceSeeder::class,
        ]);
    }
}
