<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'category_id' => Category::factory(),
            'price' => fake()->randomFloat(2, 10000, 100000),
            'is_available' => fake()->boolean(90),
            'requires_stock' => fake()->boolean(50),
            'stock_quantity' => fake()->numberBetween(0, 50),
            'minimum_stock' => fake()->numberBetween(1, 10),
        ];
    }
}