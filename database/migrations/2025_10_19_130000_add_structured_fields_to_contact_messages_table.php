<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            if (!Schema::hasColumn('contact_messages', 'phone')) {
                $table->string('phone', 30)->nullable()->after('email');
            }
            if (!Schema::hasColumn('contact_messages', 'ownership')) {
                $table->enum('ownership', ['proprietaire', 'locataire'])->nullable()->after('subject');
            }
            if (!Schema::hasColumn('contact_messages', 'site_address')) {
                $table->string('site_address', 255)->nullable()->after('ownership');
            }
            if (!Schema::hasColumn('contact_messages', 'works_json')) {
                $table->json('works_json')->nullable()->after('site_address');
            }
            if (!Schema::hasColumn('contact_messages', 'rgpd')) {
                $table->boolean('rgpd')->default(false)->after('message');
            }
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            if (Schema::hasColumn('contact_messages', 'works_json')) {
                $table->dropColumn('works_json');
            }
            if (Schema::hasColumn('contact_messages', 'site_address')) {
                $table->dropColumn('site_address');
            }
            if (Schema::hasColumn('contact_messages', 'ownership')) {
                $table->dropColumn('ownership');
            }
            if (Schema::hasColumn('contact_messages', 'phone')) {
                $table->dropColumn('phone');
            }
            if (Schema::hasColumn('contact_messages', 'rgpd')) {
                $table->dropColumn('rgpd');
            }
        });
    }
};
