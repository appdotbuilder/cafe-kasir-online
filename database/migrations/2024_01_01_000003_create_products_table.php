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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->string('slug')->unique()->comment('URL-friendly product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->string('image')->nullable()->comment('Product image path');
            $table->boolean('is_available')->default(true)->comment('Product availability');
            $table->boolean('requires_stock')->default(false)->comment('Whether product requires stock tracking');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->integer('minimum_stock')->default(0)->comment('Minimum stock alert threshold');
            $table->timestamps();
            
            $table->index('name');
            $table->index('slug');
            $table->index('category_id');
            $table->index('is_available');
            $table->index(['is_available', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};