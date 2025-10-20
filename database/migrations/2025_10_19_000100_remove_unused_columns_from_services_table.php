<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration {
public function up(): void
{
if (Schema::hasColumn('services','duration_minutes')) {
Schema::table('services', fn(Blueprint $t) => $t->dropColumn('duration_minutes'));
}
if (Schema::hasColumn('services','base_price')) {
Schema::table('services', fn(Blueprint $t) => $t->dropColumn('base_price'));
}
if (Schema::hasColumn('services','excerpt')) {
Schema::table('services', fn(Blueprint $t) => $t->dropColumn('excerpt'));
}
}
public function down(): void
{
Schema::table('services', function (Blueprint $t) {
if (!Schema::hasColumn('services','duration_minutes')) $t->unsignedInteger('duration_minutes')->nullable();
if (!Schema::hasColumn('services','base_price')) $t->decimal('base_price',8,2)->nullable();
if (!Schema::hasColumn('services','excerpt')) $t->string('excerpt', 255)->nullable();
});
}
};