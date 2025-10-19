<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Ajoute image_path (nullable, index) sans dépendre d'un ordre précis de colonnes
    public function up(): void
    {
        if (!Schema::hasColumn('services', 'image_path')) {
            Schema::table('services', function (Blueprint $table) {
                $table->string('image_path', 255)->nullable()->index();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('services', 'image_path')) {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('image_path');
            });
        }
    }
};
