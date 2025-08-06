import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    is_available: boolean;
}

interface Category {
    id: number;
    name: string;
    color: string;
    icon?: string;
    products: Product[];
}

interface Table {
    id: number;
    number: string;
    seats: number;
    status: string;
    current_order?: Order;
}

interface Order {
    id: number;
    order_number: string;
    table?: Table;
    customer_name?: string;
    status: string;
    total_amount: number;
    items: OrderItem[];
    type: string;
}

interface CartItem {
    product: Product;
    quantity: number;
    notes?: string;
}

interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    unit_price: number;
    total_price: number;
    notes?: string;
}

interface Props {
    categories: Category[];
    tables: Table[];
    pendingOrders: Order[];
    [key: string]: unknown;
}

export default function Pos({ categories, tables, pendingOrders }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        categories.length > 0 ? categories[0].id : null
    );
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [customerName, setCustomerName] = useState('');
    const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
    const [orderNotes, setOrderNotes] = useState('');

    const addToCart = (product: Product) => {
        if (!product.is_available) return;

        const existingItem = cart.find(item => item.product.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity === 0) {
            setCart(cart.filter(item => item.product.id !== productId));
        } else {
            setCart(cart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            ));
        }
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const getTaxAmount = () => {
        return getCartTotal() * 0.10; // 10% tax
    };

    const getFinalTotal = () => {
        return getCartTotal() + getTaxAmount();
    };

    const handleSubmitOrder = () => {
        if (cart.length === 0) return;

        const orderData = {
            table_id: orderType === 'dine_in' ? selectedTable : null,
            customer_name: customerName || null,
            type: orderType,
            items: cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                notes: item.notes || null,
            })),
            notes: orderNotes || null,
        };

        router.post(route('pos.store'), orderData, {
            onSuccess: () => {
                setCart([]);
                setCustomerName('');
                setSelectedTable(null);
                setOrderNotes('');
            },
        });
    };

    const updateOrderStatus = (orderId: number, status: string) => {
        router.patch(route('pos.update', orderId), { status }, {
            preserveScroll: true,
        });
    };

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            preparing: 'bg-blue-100 text-blue-800',
            ready: 'bg-green-100 text-green-800',
            served: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getTableStatusColor = (status: string) => {
        const colors = {
            available: 'bg-green-100 text-green-800',
            occupied: 'bg-red-100 text-red-800',
            reserved: 'bg-yellow-100 text-yellow-800',
            maintenance: 'bg-gray-100 text-gray-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AppShell>
            <Head title="Sistem POS - CafePos" />
            
            <div className="flex h-[calc(100vh-4rem)] gap-4">
                {/* Left Panel - Products & Categories */}
                <div className="flex-1 flex flex-col">
                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category.id)}
                                className="whitespace-nowrap"
                                style={{
                                    backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                                    borderColor: category.color,
                                }}
                            >
                                {category.icon && <span className="mr-2">{category.icon}</span>}
                                {category.name}
                            </Button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categories
                                .find(cat => cat.id === selectedCategory)
                                ?.products.map((product) => (
                                <Card
                                    key={product.id}
                                    className={`cursor-pointer transition-all hover:shadow-md ${
                                        !product.is_available ? 'opacity-50' : ''
                                    }`}
                                    onClick={() => addToCart(product)}
                                >
                                    <CardContent className="p-4">
                                        <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-blue-600">
                                                {formatPrice(product.price)}
                                            </span>
                                            {!product.is_available && (
                                                <Badge variant="destructive" className="text-xs">
                                                    Habis
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Cart & Order Form */}
                <div className="w-96 flex flex-col">
                    <Card className="flex-1 flex flex-col">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                🛒 Pesanan Baru
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            {/* Order Type & Table Selection */}
                            <div className="space-y-3 mb-4">
                                <div>
                                    <Label htmlFor="orderType">Jenis Pesanan</Label>
                                    <Select
                                        value={orderType}
                                        onValueChange={(value: 'dine_in' | 'takeaway') => setOrderType(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dine_in">Dine In</SelectItem>
                                            <SelectItem value="takeaway">Take Away</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {orderType === 'dine_in' && (
                                    <div>
                                        <Label htmlFor="table">Meja</Label>
                                        <Select
                                            value={selectedTable?.toString() || ""}
                                            onValueChange={(value) => setSelectedTable(Number(value))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih meja" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tables
                                                    .filter(table => table.status === 'available')
                                                    .map((table) => (
                                                    <SelectItem key={table.id} value={table.id.toString()}>
                                                        Meja {table.number} ({table.seats} kursi)
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="customerName">Nama Pelanggan (Opsional)</Label>
                                    <Input
                                        id="customerName"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Masukkan nama pelanggan"
                                    />
                                </div>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 mb-4">
                                <h4 className="font-medium mb-2">Item Pesanan:</h4>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {cart.map((item) => (
                                        <div key={item.product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{item.product.name}</p>
                                                <p className="text-xs text-gray-600">
                                                    {formatPrice(item.product.price)} x {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-6 h-6 p-0"
                                                >
                                                    -
                                                </Button>
                                                <span className="text-sm font-medium w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-6 h-6 p-0"
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Notes */}
                            <div className="mb-4">
                                <Label htmlFor="orderNotes">Catatan Pesanan</Label>
                                <Textarea
                                    id="orderNotes"
                                    value={orderNotes}
                                    onChange={(e) => setOrderNotes(e.target.value)}
                                    placeholder="Catatan khusus untuk pesanan ini"
                                    rows={2}
                                />
                            </div>

                            {/* Order Summary */}
                            <div className="border-t pt-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>{formatPrice(getCartTotal())}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pajak (10%):</span>
                                        <span>{formatPrice(getTaxAmount())}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base">
                                        <span>Total:</span>
                                        <span>{formatPrice(getFinalTotal())}</span>
                                    </div>
                                </div>
                                
                                <Button
                                    onClick={handleSubmitOrder}
                                    disabled={cart.length === 0 || (orderType === 'dine_in' && !selectedTable)}
                                    className="w-full mt-4"
                                >
                                    💳 Proses Pesanan ({cart.length} item)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Panel - Tables and Pending Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {/* Tables Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            🪑 Status Meja
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-5 gap-2">
                            {tables.map((table) => (
                                <div
                                    key={table.id}
                                    className={`p-3 rounded-lg text-center cursor-pointer border-2 transition-all ${
                                        selectedTable === table.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200'
                                    }`}
                                    onClick={() => {
                                        if (table.status === 'available' && orderType === 'dine_in') {
                                            setSelectedTable(table.id);
                                        }
                                    }}
                                >
                                    <div className="text-sm font-medium">Meja {table.number}</div>
                                    <div className="text-xs text-gray-600 mb-1">{table.seats} kursi</div>
                                    <Badge
                                        className={`text-xs ${getTableStatusColor(table.status)}`}
                                    >
                                        {table.status === 'available' ? 'Kosong' :
                                         table.status === 'occupied' ? 'Terisi' :
                                         table.status === 'reserved' ? 'Reserved' : 'Maintenance'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Orders */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            📋 Pesanan Aktif ({pendingOrders.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {pendingOrders.map((order) => (
                                <div key={order.id} className="p-3 border rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium text-sm">{order.order_number}</p>
                                            <p className="text-xs text-gray-600">
                                                {order.table ? `Meja ${order.table.number}` : 'Take Away'}
                                                {order.customer_name && ` - ${order.customer_name}`}
                                            </p>
                                        </div>
                                        <Badge className={getStatusColor(order.status)}>
                                            {order.status === 'pending' ? 'Menunggu' :
                                             order.status === 'preparing' ? 'Diproses' :
                                             order.status === 'ready' ? 'Siap' : order.status}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">
                                            {formatPrice(order.total_amount)}
                                        </span>
                                        <div className="flex gap-1">
                                            {order.status === 'pending' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                                                >
                                                    Proses
                                                </Button>
                                            )}
                                            {order.status === 'preparing' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => updateOrderStatus(order.id, 'ready')}
                                                >
                                                    Siap
                                                </Button>
                                            )}
                                            {order.status === 'ready' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => router.visit(route('payment.show', order.id))}
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    Bayar
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {pendingOrders.length === 0 && (
                                <p className="text-gray-500 text-center py-8">
                                    Tidak ada pesanan aktif
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}