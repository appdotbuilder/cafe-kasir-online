import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderItem {
    id: number;
    product: {
        name: string;
    };
    quantity: number;
    unit_price: number;
    total_price: number;
    notes?: string;
}

interface Table {
    id: number;
    number: string;
    seats: number;
}

interface Payment {
    id: number;
    method: string;
    amount: number;
    status: string;
    reference_number?: string;
    paid_at?: string;
}

interface Order {
    id: number;
    order_number: string;
    table?: Table;
    customer_name?: string;
    type: string;
    status: string;
    subtotal: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
    notes?: string;
    items: OrderItem[];
    payment?: Payment;
    created_at: string;
}

interface Props {
    order: Order;
    [key: string]: unknown;
}

export default function Payment({ order }: Props) {
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');
    const [paymentAmount, setPaymentAmount] = useState<number>(order.total_amount);
    const [referenceNumber, setReferenceNumber] = useState<string>('');
    const [paymentNotes, setPaymentNotes] = useState<string>('');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handlePayment = () => {
        const paymentData = {
            order_id: order.id,
            method: paymentMethod,
            amount: paymentAmount,
            reference_number: referenceNumber || null,
            notes: paymentNotes || null,
        };

        router.post(route('payment.store'), paymentData, {
            onSuccess: () => {
                router.visit('/');
            },
        });
    };

    const getChangeAmount = () => {
        return Math.max(0, paymentAmount - order.total_amount);
    };

    const paymentMethods = [
        { value: 'cash', label: '💵 Tunai' },
        { value: 'card', label: '💳 Kartu Kredit/Debit' },
        { value: 'digital_wallet', label: '📱 Dompet Digital' },
        { value: 'bank_transfer', label: '🏦 Transfer Bank' },
    ];

    return (
        <AppShell>
            <Head title={`Pembayaran - ${order.order_number}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            💳 Proses Pembayaran
                        </h1>
                        <p className="text-gray-600">Pesanan {order.order_number}</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.visit('/')}
                    >
                        ← Kembali ke POS
                    </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Order Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📋 Detail Pesanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Nomor Pesanan:</span>
                                    <p className="text-gray-600">{order.order_number}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Jenis:</span>
                                    <p className="text-gray-600">
                                        {order.type === 'dine_in' ? 'Dine In' : 'Take Away'}
                                    </p>
                                </div>
                                {order.table && (
                                    <div>
                                        <span className="font-medium">Meja:</span>
                                        <p className="text-gray-600">Meja {order.table.number}</p>
                                    </div>
                                )}
                                {order.customer_name && (
                                    <div>
                                        <span className="font-medium">Pelanggan:</span>
                                        <p className="text-gray-600">{order.customer_name}</p>
                                    </div>
                                )}
                            </div>

                            {/* Order Items */}
                            <div>
                                <h4 className="font-medium mb-3">Item Pesanan:</h4>
                                <div className="space-y-2">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <p className="font-medium">{item.product.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {formatPrice(item.unit_price)} × {item.quantity}
                                                </p>
                                                {item.notes && (
                                                    <p className="text-xs text-blue-600 mt-1">
                                                        📝 {item.notes}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{formatPrice(item.total_price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Notes */}
                            {order.notes && (
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm font-medium text-blue-800 mb-1">Catatan Pesanan:</p>
                                    <p className="text-sm text-blue-700">{order.notes}</p>
                                </div>
                            )}

                            {/* Order Summary */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal:</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Pajak (10%):</span>
                                    <span>{formatPrice(order.tax_amount)}</span>
                                </div>
                                {order.discount_amount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Diskon:</span>
                                        <span>-{formatPrice(order.discount_amount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span className="text-blue-600">{formatPrice(order.total_amount)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                💰 Form Pembayaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Payment Method */}
                            <div>
                                <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
                                <Select
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentMethods.map((method) => (
                                            <SelectItem key={method.value} value={method.value}>
                                                {method.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Payment Amount */}
                            <div>
                                <Label htmlFor="paymentAmount">Jumlah Pembayaran</Label>
                                <Input
                                    id="paymentAmount"
                                    type="number"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                                    min={order.total_amount}
                                />
                                {paymentMethod === 'cash' && paymentAmount > order.total_amount && (
                                    <p className="text-sm text-green-600 mt-1">
                                        💸 Kembalian: {formatPrice(getChangeAmount())}
                                    </p>
                                )}
                            </div>

                            {/* Reference Number */}
                            {paymentMethod !== 'cash' && (
                                <div>
                                    <Label htmlFor="referenceNumber">Nomor Referensi</Label>
                                    <Input
                                        id="referenceNumber"
                                        value={referenceNumber}
                                        onChange={(e) => setReferenceNumber(e.target.value)}
                                        placeholder="Nomor transaksi/referensi"
                                    />
                                </div>
                            )}

                            {/* Payment Notes */}
                            <div>
                                <Label htmlFor="paymentNotes">Catatan Pembayaran</Label>
                                <Textarea
                                    id="paymentNotes"
                                    value={paymentNotes}
                                    onChange={(e) => setPaymentNotes(e.target.value)}
                                    placeholder="Catatan tambahan untuk pembayaran"
                                    rows={3}
                                />
                            </div>

                            {/* Quick Amount Buttons for Cash */}
                            {paymentMethod === 'cash' && (
                                <div>
                                    <Label>Nominal Pas:</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setPaymentAmount(order.total_amount)}
                                            size="sm"
                                        >
                                            Pas ({formatPrice(order.total_amount)})
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setPaymentAmount(Math.ceil(order.total_amount / 50000) * 50000)}
                                            size="sm"
                                        >
                                            50k ({formatPrice(Math.ceil(order.total_amount / 50000) * 50000)})
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setPaymentAmount(Math.ceil(order.total_amount / 100000) * 100000)}
                                            size="sm"
                                        >
                                            100k ({formatPrice(Math.ceil(order.total_amount / 100000) * 100000)})
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setPaymentAmount(Math.ceil(order.total_amount / 200000) * 200000)}
                                            size="sm"
                                        >
                                            200k ({formatPrice(Math.ceil(order.total_amount / 200000) * 200000)})
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Payment Summary */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between font-medium">
                                    <span>Total Tagihan:</span>
                                    <span>{formatPrice(order.total_amount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Dibayar:</span>
                                    <span>{formatPrice(paymentAmount)}</span>
                                </div>
                                {paymentMethod === 'cash' && paymentAmount > order.total_amount && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Kembalian:</span>
                                        <span>{formatPrice(getChangeAmount())}</span>
                                    </div>
                                )}
                            </div>

                            {/* Process Payment Button */}
                            <Button
                                onClick={handlePayment}
                                disabled={paymentAmount < order.total_amount}
                                className="w-full"
                                size="lg"
                            >
                                🎯 Proses Pembayaran ({formatPrice(paymentAmount)})
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}