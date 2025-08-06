<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'manajer',
                'display_name' => 'Manajer',
                'description' => 'Memiliki akses penuh ke semua fitur sistem termasuk manajemen stok, laporan penjualan, dan pengelolaan pengguna.',
                'permissions' => [
                    'view_dashboard',
                    'manage_orders',
                    'manage_tables',
                    'process_payments',
                    'manage_stock',
                    'view_reports',
                    'manage_users',
                    'manage_products',
                    'manage_categories',
                ],
            ],
            [
                'name' => 'kasir',
                'display_name' => 'Kasir',
                'description' => 'Dapat mencatat pesanan, mengelola meja, dan memproses pembayaran.',
                'permissions' => [
                    'view_dashboard',
                    'manage_orders',
                    'manage_tables',
                    'process_payments',
                    'view_products',
                ],
            ],
            [
                'name' => 'staf_dapur',
                'display_name' => 'Staf Dapur',
                'description' => 'Dapat melihat pesanan yang masuk dan memperbarui status pesanan.',
                'permissions' => [
                    'view_dashboard',
                    'view_orders',
                    'update_order_status',
                ],
            ],
            [
                'name' => 'klien_investor',
                'display_name' => 'Klien Investor',
                'description' => 'Dapat melihat laporan penjualan dan ringkasan kinerja bisnis.',
                'permissions' => [
                    'view_dashboard',
                    'view_reports',
                    'view_analytics',
                ],
            ],
        ];

        foreach ($roles as $roleData) {
            Role::updateOrCreate(
                ['name' => $roleData['name']],
                $roleData
            );
        }
    }
}