import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';



export default function Welcome() {
    const handleLogin = () => {
        router.visit(route('login'));
    };

    const handleRegister = () => {
        router.visit(route('register'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            {/* Navigation */}
            <nav className="px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">🍽️</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">CafePos</h1>
                    </div>
                    <div className="space-x-3">
                        <Button 
                            variant="outline" 
                            onClick={handleLogin}
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                            Masuk
                        </Button>
                        <Button 
                            onClick={handleRegister}
                            className="bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:from-blue-700 hover:to-orange-600"
                        >
                            Daftar
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="px-6 py-16">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-8">
                        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                            🚀 Sistem Kasir Modern
                        </h2>
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 mb-6">
                            untuk Kafe & Restoran
                        </h3>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Kelola pesanan, meja, pembayaran, dan laporan penjualan dalam satu sistem yang mudah dan efisien
                        </p>
                    </div>

                    <Button 
                        onClick={handleLogin}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-orange-500 text-white text-lg px-8 py-4 rounded-xl hover:from-blue-700 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        🎯 Mulai Sekarang
                    </Button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="px-6 py-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        ✨ Fitur Unggulan
                    </h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📱</div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">POS Modern</h4>
                            <p className="text-gray-600">Interface yang intuitif untuk mencatat pesanan dengan cepat</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">🪑</div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Manajemen Meja</h4>
                            <p className="text-gray-600">Kelola status meja dan pesanan secara real-time</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">💳</div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Multi Payment</h4>
                            <p className="text-gray-600">Terima pembayaran tunai, kartu, dan digital wallet</p>
                        </div>
                        
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Laporan Real-time</h4>
                            <p className="text-gray-600">Dashboard analitik dan laporan penjualan lengkap</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Role-based Features */}
            <div className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        👥 Multi-Role System
                    </h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-3">👨‍💼</div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Manajer</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Akses penuh ke semua fitur</li>
                                <li>• Manajemen stok & inventory</li>
                                <li>• Laporan & analitik</li>
                                <li>• Kelola pengguna</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-3">💰</div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Kasir</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Catat pesanan pelanggan</li>
                                <li>• Kelola status meja</li>
                                <li>• Proses pembayaran</li>
                                <li>• Cetak struk</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-3">👨‍🍳</div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Staf Dapur</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Lihat pesanan masuk</li>
                                <li>• Update status pesanan</li>
                                <li>• Notifikasi real-time</li>
                                <li>• Antrian dapur</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="text-3xl mb-3">📈</div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Investor</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Laporan penjualan</li>
                                <li>• Analitik performa</li>
                                <li>• ROI dashboard</li>
                                <li>• Trend analysis</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="px-6 py-16 bg-gradient-to-r from-blue-600 to-orange-500">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        🎯 Siap Meningkatkan Bisnis Anda?
                    </h3>
                    <p className="text-xl text-blue-100 mb-8">
                        Bergabung dengan ribuan bisnis yang sudah menggunakan sistem POS modern kami
                    </p>
                    <div className="space-x-4">
                        <Button 
                            onClick={handleLogin}
                            size="lg"
                            variant="secondary"
                            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl"
                        >
                            🚀 Login Sekarang
                        </Button>
                        <Button 
                            onClick={handleRegister}
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 rounded-xl"
                        >
                            📝 Daftar Gratis
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="px-6 py-8 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">🍽️</span>
                        </div>
                        <span className="text-xl font-bold">CafePos</span>
                    </div>
                    <p className="text-gray-400">
                        Sistem Kasir Modern untuk Kafe & Restoran © 2024
                    </p>
                </div>
            </footer>
        </div>
    );
}