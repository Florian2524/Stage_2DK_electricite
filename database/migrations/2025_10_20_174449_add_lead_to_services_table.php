<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ajoute des champs éditables pour les pages Services :
     * - lead             : sous-titre sous le H1
     * - content_heading  : titre de la colonne droite
     * - content_md       : contenu principal (Markdown)
     * - bottom_note      : petite note en bas de page
     *
     * ⚠️ La migration est idempotente : elle vérifie l'existence des colonnes.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // Sous-titre sous le H1
            if (!Schema::hasColumn('services', 'lead')) {
                // place-le après 'name' pour rester logique dans l'admin
                $table->string('lead', 255)->nullable()->after('name');
            }

            // Titre du bloc de droite
            if (!Schema::hasColumn('services', 'content_heading')) {
                // après 'excerpt' si présent, sinon après 'lead'
                $after = Schema::hasColumn('services', 'excerpt') ? 'excerpt' : 'lead';
                $table->string('content_heading', 255)->nullable()->after($after);
            }

            // Contenu principal (Markdown)
            if (!Schema::hasColumn('services', 'content_md')) {
                $table->longText('content_md')->nullable()->after('content_heading');
            }

            // Note de bas de page
            if (!Schema::hasColumn('services', 'bottom_note')) {
                $table->text('bottom_note')->nullable()->after('content_md');
            }
        });
    }

    /**
     * Supprime les colonnes ajoutées (si elles existent).
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // On vérifie avant de drop pour éviter les erreurs en rollback partiel
            if (Schema::hasColumn('services', 'bottom_note')) {
                $table->dropColumn('bottom_note');
            }
            if (Schema::hasColumn('services', 'content_md')) {
                $table->dropColumn('content_md');
            }
            if (Schema::hasColumn('services', 'content_heading')) {
                $table->dropColumn('content_heading');
            }
            if (Schema::hasColumn('services', 'lead')) {
                $table->dropColumn('lead');
            }
        });
    }
};
