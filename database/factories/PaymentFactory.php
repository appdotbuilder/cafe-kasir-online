<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'method' => fake()->randomElement(['cash', 'card', 'digital_wallet', 'bank_transfer']),
            'amount' => fake()->randomFloat(2, 20000, 500000),
            'status' => fake()->randomElement(['pending', 'completed', 'failed', 'refunded']),
            'reference_number' => fake()->boolean(70) ? fake()->uuid() : null,
            'notes' => fake()->boolean(30) ? fake()->sentence() : null,
            'paid_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ];
    }
}