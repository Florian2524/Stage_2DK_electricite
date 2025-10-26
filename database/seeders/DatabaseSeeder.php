<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Appel des seeders individuels
        $this->call([
            ServiceSeeder::class,
        ]);
    }
}
