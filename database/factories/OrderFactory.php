<?php

namespace Database\Factories;

use App\Models\Table;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 20000, 500000);
        $taxAmount = $subtotal * 0.10;
        $discountAmount = 0;
        $totalAmount = $subtotal + $taxAmount - $discountAmount;

        return [
            'table_id' => fake()->boolean(70) ? Table::factory() : null,
            'user_id' => User::factory(),
            'customer_name' => fake()->boolean(60) ? fake()->name() : null,
            'type' => fake()->randomElement(['dine_in', 'takeaway']),
            'status' => fake()->randomElement(['pending', 'preparing', 'ready', 'served', 'cancelled']),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'notes' => fake()->boolean(30) ? fake()->sentence() : null,
            'served_at' => fake()->boolean(50) ? fake()->dateTimeBetween('-1 week', 'now') : null,
        ];
    }
}