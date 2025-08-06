<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('name');

        $products = [
            // Minuman
            [
                'name' => 'Kopi Espresso',
                'description' => 'Kopi espresso premium dengan biji pilihan',
                'category' => 'Minuman',
                'price' => 15000,
                'is_available' => true,
                'requires_stock' => false,
            ],
            [
                'name' => 'Cappuccino',
                'description' => 'Espresso dengan steamed milk dan foam',
                'category' => 'Minuman',
                'price' => 25000,
                'is_available' => true,
                'requires_stock' => false,
            ],
            [
                'name' => 'Teh Tarik',
                'description' => 'Teh susu tradisional yang ditarik',
                'category' => 'Minuman',
                'price' => 12000,
                'is_available' => true,
                'requires_stock' => false,
            ],
            [
                'name' => 'Jus Jeruk Fresh',
                'description' => 'Jus jeruk segar tanpa pengawet',
                'category' => 'Minuman',
                'price' => 20000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 15,
                'minimum_stock' => 5,
            ],

            // Makanan Utama
            [
                'name' => 'Nasi Goreng Special',
                'description' => 'Nasi goreng dengan telur, ayam, dan sayuran',
                'category' => 'Makanan Utama',
                'price' => 35000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 20,
                'minimum_stock' => 5,
            ],
            [
                'name' => 'Mie Ayam',
                'description' => 'Mie dengan potongan ayam dan bakso',
                'category' => 'Makanan Utama',
                'price' => 30000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 25,
                'minimum_stock' => 5,
            ],
            [
                'name' => 'Ayam Bakar',
                'description' => 'Ayam bakar dengan bumbu khas',
                'category' => 'Makanan Utama',
                'price' => 45000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 10,
                'minimum_stock' => 3,
            ],

            // Cemilan
            [
                'name' => 'French Fries',
                'description' => 'Kentang goreng crispy dengan saus',
                'category' => 'Cemilan',
                'price' => 18000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 30,
                'minimum_stock' => 10,
            ],
            [
                'name' => 'Pisang Goreng',
                'description' => 'Pisang goreng dengan tepung crispy',
                'category' => 'Cemilan',
                'price' => 15000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 20,
                'minimum_stock' => 5,
            ],

            // Dessert
            [
                'name' => 'Es Krim Vanilla',
                'description' => 'Es krim vanilla premium',
                'category' => 'Dessert',
                'price' => 20000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 15,
                'minimum_stock' => 5,
            ],
            [
                'name' => 'Puding Coklat',
                'description' => 'Puding coklat lembut dengan topping',
                'category' => 'Dessert',
                'price' => 18000,
                'is_available' => true,
                'requires_stock' => true,
                'stock_quantity' => 12,
                'minimum_stock' => 3,
            ],
        ];

        foreach ($products as $productData) {
            $category = $categories[$productData['category']];
            unset($productData['category']);
            
            Product::updateOrCreate(
                ['name' => $productData['name']],
                array_merge($productData, ['category_id' => $category->id])
            );
        }
    }
}