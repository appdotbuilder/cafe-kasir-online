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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Category name');
            $table->string('slug')->unique()->comment('URL-friendly category name');
            $table->text('description')->nullable()->comment('Category description');
            $table->string('color', 7)->default('#3B82F6')->comment('Category color hex code');
            $table->string('icon')->nullable()->comment('Category icon name');
            $table->boolean('is_active')->default(true)->comment('Category status');
            $table->timestamps();
            
            $table->index('name');
            $table->index('slug');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};