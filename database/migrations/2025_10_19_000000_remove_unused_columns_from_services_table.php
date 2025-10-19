<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Supprime les anciennes colonnes inutilisées.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // Vérifie avant suppression pour éviter les erreurs
            if (Schema::hasColumn('services', 'duration_minutes')) {
                $table->dropColumn('duration_minutes');
            }
            if (Schema::hasColumn('services', 'base_price')) {
                $table->dropColumn('base_price');
            }
            if (Schema::hasColumn('services', 'excerpt')) {
                $table->dropColumn('excerpt');
            }
        });
    }

    /**
     * Restaure les colonnes si on rollback.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            if (!Schema::hasColumn('services', 'duration_minutes')) {
                $table->integer('duration_minutes')->default(0);
            }
            if (!Schema::hasColumn('services', 'base_price')) {
                $table->decimal('base_price', 8, 2)->default(0);
            }
            if (!Schema::hasColumn('services', 'excerpt')) {
                $table->string('excerpt', 500)->nullable();
            }
        });
    }
};
