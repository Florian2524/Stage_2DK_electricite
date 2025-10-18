<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // content_heading
            if (!Schema::hasColumn('services', 'content_heading')) {
                $col = $table->string('content_heading', 180)->nullable();
                if (Schema::hasColumn('services', 'excerpt')) {
                    // si 'excerpt' existe, on positionne après
                    $col->after('excerpt');
                }
            }

            // content_md
            if (!Schema::hasColumn('services', 'content_md')) {
                $col = $table->longText('content_md')->nullable();
                if (Schema::hasColumn('services', 'content_heading')) {
                    $col->after('content_heading');
                }
            }

            // bottom_note
            if (!Schema::hasColumn('services', 'bottom_note')) {
                $col = $table->string('bottom_note', 220)->nullable();
                if (Schema::hasColumn('services', 'content_md')) {
                    $col->after('content_md');
                }
            }
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'bottom_note')) {
                $table->dropColumn('bottom_note');
            }
            if (Schema::hasColumn('services', 'content_md')) {
                $table->dropColumn('content_md');
            }
            if (Schema::hasColumn('services', 'content_heading')) {
                $table->dropColumn('content_heading');
            }
        });
    }
};
