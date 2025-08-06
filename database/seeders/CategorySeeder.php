<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Minuman',
                'description' => 'Berbagai jenis minuman dingin dan panas',
                'color' => '#3B82F6',
                'icon' => 'coffee',
            ],
            [
                'name' => 'Makanan Utama',
                'description' => 'Menu makanan utama dan hidangan berat',
                'color' => '#EF4444',
                'icon' => 'utensils',
            ],
            [
                'name' => 'Cemilan',
                'description' => 'Makanan ringan dan camilan',
                'color' => '#F59E0B',
                'icon' => 'cookie',
            ],
            [
                'name' => 'Dessert',
                'description' => 'Makanan penutup dan dessert',
                'color' => '#EC4899',
                'icon' => 'cake',
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['name' => $categoryData['name']],
                $categoryData
            );
        }
    }
}