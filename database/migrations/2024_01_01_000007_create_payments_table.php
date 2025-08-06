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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->enum('method', ['cash', 'card', 'digital_wallet', 'bank_transfer'])->comment('Payment method');
            $table->decimal('amount', 12, 2)->comment('Payment amount');
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])->default('pending')->comment('Payment status');
            $table->string('reference_number')->nullable()->comment('Payment reference number');
            $table->text('notes')->nullable()->comment('Payment notes');
            $table->timestamp('paid_at')->nullable()->comment('When payment was completed');
            $table->timestamps();
            
            $table->index('order_id');
            $table->index('method');
            $table->index('status');
            $table->index('reference_number');
            $table->index(['status', 'paid_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};