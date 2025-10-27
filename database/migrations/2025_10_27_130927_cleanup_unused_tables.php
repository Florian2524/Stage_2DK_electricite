<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // 🗑️ Tables métiers inutilisées
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('site_settings');

        // 🗑️ Tables techniques non utilisées
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
        Schema::dropIfExists('sessions');
    }

    public function down(): void
    {
        // Pas de recréation (non nécessaire)
    }
};
