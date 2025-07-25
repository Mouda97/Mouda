<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            if (!Schema::hasColumn('doctors', 'status')) {
                $table->string('status')->default('active')->after('notes');
            }
            if (!Schema::hasColumn('doctors', 'available')) {
                $table->boolean('available')->default(true)->after('status');
            }
            if (!Schema::hasColumn('doctors', 'patients_count')) {
                $table->integer('patients_count')->default(0)->after('available');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            if (Schema::hasColumn('doctors', 'patients_count')) {
                $table->dropColumn('patients_count');
            }
            if (Schema::hasColumn('doctors', 'available')) {
                $table->dropColumn('available');
            }
            if (Schema::hasColumn('doctors', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};
