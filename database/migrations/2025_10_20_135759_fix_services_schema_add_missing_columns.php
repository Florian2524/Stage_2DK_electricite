<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        // 1) Ajouter les colonnes manquantes en "souple"
        Schema::table('services', function (Blueprint $table) {
            if (!Schema::hasColumn('services', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('name');
            }
            if (!Schema::hasColumn('services', 'position')) {
                $table->unsignedInteger('position')->nullable()->after('is_active');
            }
            if (!Schema::hasColumn('services', 'slug')) {
                $table->string('slug')->nullable()->after('name');
            }
            if (Schema::hasColumn('services', 'slug')) {
                // on posera l'unique plus tard (après backfill)
            }
        });

        // 2) Backfill: slug / is_active / position
        $rows = DB::table('services')->select('id', 'name', 'slug', 'position', 'is_active')->orderBy('name')->get();

        // a) Slugs uniques
        $existing = [];
        foreach ($rows as $r) {
            if (!Schema::hasColumn('services', 'slug')) break;
            $base = $r->slug ?: Str::slug($r->name ?? ('service-'.$r->id), '-');
            if ($base === '') $base = 'service-'.$r->id;
            $slug = $base;
            $i = 2;
            while (in_array($slug, $existing, true) || DB::table('services')->where('slug', $slug)->where('id', '!=', $r->id)->exists()) {
                $slug = $base . '-' . $i;
                $i++;
            }
            $existing[] = $slug;
            DB::table('services')->where('id', $r->id)->update(['slug' => $slug]);
        }

        // b) is_active = true par défaut si null
        foreach ($rows as $r) {
            if (!Schema::hasColumn('services', 'is_active')) break;
            if ($r->is_active === null) {
                DB::table('services')->where('id', $r->id)->update(['is_active' => true]);
            }
        }

        // c) position séquentielle si null (ordre alphabétique par name)
        $pos = 1;
        foreach ($rows as $r) {
            if (!Schema::hasColumn('services', 'position')) break;
            if ($r->position === null) {
                DB::table('services')->where('id', $r->id)->update(['position' => $pos]);
            }
            $pos++;
        }

        // 3) Contraintes finales
        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'slug')) {
                try {
                    $table->unique('slug');
                } catch (\Throwable $e) {
                    // si déjà unique ou conflit transitoire, on ignore
                }
            }
            if (Schema::hasColumn('services', 'position')) {
                // index (non unique) utile pour ORDER BY
                try {
                    $table->index('position');
                } catch (\Throwable $e) { /* ignore */ }
            }
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'slug')) {
                try { $table->dropUnique('services_slug_unique'); } catch (\Throwable $e) {}
            }
        });

        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'slug'))     $table->dropColumn('slug');
            if (Schema::hasColumn('services', 'position')) $table->dropColumn('position');
            if (Schema::hasColumn('services', 'is_active'))$table->dropColumn('is_active');
        });
    }
};
