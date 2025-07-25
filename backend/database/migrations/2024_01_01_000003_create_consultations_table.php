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
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('consultation_date');
            $table->text('symptoms');
            $table->text('diagnosis');
            $table->text('treatment');
            $table->text('recommendations')->nullable();
            $table->text('prescription')->nullable();
            $table->text('follow_up')->nullable();
            $table->json('documents')->nullable(); // IDs des documents associés
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};