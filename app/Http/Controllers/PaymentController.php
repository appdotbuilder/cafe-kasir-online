<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Process payment for an order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'method' => 'required|in:cash,card,digital_wallet,bank_transfer',
            'amount' => 'required|numeric|min:0',
            'reference_number' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $order = Order::findOrFail($request->order_id);

        // Check if payment amount matches order total
        if ($request->amount < $order->total_amount) {
            return redirect()->back()->withErrors([
                'amount' => 'Jumlah pembayaran tidak mencukupi.'
            ]);
        }

        // Create payment
        $payment = Payment::create([
            'order_id' => $order->id,
            'method' => $request->method,
            'amount' => $request->amount,
            'status' => 'completed',
            'reference_number' => $request->reference_number,
            'notes' => $request->notes,
            'paid_at' => now(),
        ]);

        // Update order status
        $order->update([
            'status' => 'served',
            'served_at' => now(),
        ]);

        // Free up table
        if ($order->table_id) {
            Table::where('id', $order->table_id)->update(['status' => 'available']);
        }

        return redirect()->back()->with('success', 'Pembayaran berhasil diproses!');
    }

    /**
     * Show payment form for an order.
     */
    public function show(Order $order)
    {
        $order->load(['items.product', 'table', 'payment']);

        return Inertia::render('payment', [
            'order' => $order,
        ]);
    }
}