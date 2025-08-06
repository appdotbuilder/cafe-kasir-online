<?php

namespace Database\Seeders;

use App\Models\Table;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = [
            ['number' => '01', 'seats' => 2, 'status' => 'available'],
            ['number' => '02', 'seats' => 2, 'status' => 'available'],
            ['number' => '03', 'seats' => 4, 'status' => 'available'],
            ['number' => '04', 'seats' => 4, 'status' => 'available'],
            ['number' => '05', 'seats' => 6, 'status' => 'available'],
            ['number' => '06', 'seats' => 6, 'status' => 'available'],
            ['number' => '07', 'seats' => 8, 'status' => 'available'],
            ['number' => '08', 'seats' => 8, 'status' => 'available'],
            ['number' => '09', 'seats' => 4, 'status' => 'available'],
            ['number' => '10', 'seats' => 2, 'status' => 'available'],
        ];

        foreach ($tables as $tableData) {
            Table::updateOrCreate(
                ['number' => $tableData['number']],
                $tableData
            );
        }
    }
}