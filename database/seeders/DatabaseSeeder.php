<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            TableSeeder::class,
            ProductSeeder::class,
        ]);

        // Create default admin user
        $adminRole = \App\Models\Role::where('name', 'manajer')->first();
        $kasirRole = \App\Models\Role::where('name', 'kasir')->first();

        \App\Models\User::factory()->create([
            'name' => 'Admin Manager',
            'email' => 'admin@example.com',
            'role_id' => $adminRole->id,
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Kasir Demo',
            'email' => 'kasir@example.com',
            'role_id' => $kasirRole->id,
        ]);
    }
}
