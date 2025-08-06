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
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique()->comment('Table number');
            $table->integer('seats')->comment('Number of seats');
            $table->enum('status', ['available', 'occupied', 'reserved', 'maintenance'])->default('available')->comment('Table status');
            $table->text('notes')->nullable()->comment('Additional notes about the table');
            $table->timestamps();
            
            $table->index('number');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tables');
    }
};