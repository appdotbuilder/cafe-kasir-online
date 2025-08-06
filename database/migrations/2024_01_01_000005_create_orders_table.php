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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Unique order number');
            $table->foreignId('table_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('customer_name')->nullable()->comment('Customer name');
            $table->enum('type', ['dine_in', 'takeaway'])->default('dine_in')->comment('Order type');
            $table->enum('status', ['pending', 'preparing', 'ready', 'served', 'cancelled'])->default('pending')->comment('Order status');
            $table->decimal('subtotal', 12, 2)->comment('Subtotal before tax and discount');
            $table->decimal('tax_amount', 12, 2)->default(0)->comment('Tax amount');
            $table->decimal('discount_amount', 12, 2)->default(0)->comment('Discount amount');
            $table->decimal('total_amount', 12, 2)->comment('Final total amount');
            $table->text('notes')->nullable()->comment('Order notes');
            $table->timestamp('served_at')->nullable()->comment('When order was served');
            $table->timestamps();
            
            $table->index('order_number');
            $table->index('table_id');
            $table->index('user_id');
            $table->index('status');
            $table->index('type');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};