<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        $categories = Category::active()->with('products')->get();
        $tables = Table::with('currentOrder')->get();
        $pendingOrders = Order::with(['items.product', 'table'])
            ->pending()
            ->latest()
            ->get();

        return Inertia::render('pos', [
            'categories' => $categories,
            'tables' => $tables,
            'pendingOrders' => $pendingOrders,
        ]);
    }

    /**
     * Create a new order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'table_id' => 'nullable|exists:tables,id',
            'customer_name' => 'nullable|string|max:255',
            'type' => 'required|in:dine_in,takeaway',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $subtotal = 0;
        $orderItems = [];

        // Calculate subtotal and prepare order items
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            $itemTotal = $product->price * $item['quantity'];
            $subtotal += $itemTotal;

            $orderItems[] = [
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'unit_price' => $product->price,
                'total_price' => $itemTotal,
                'notes' => $item['notes'] ?? null,
            ];
        }

        $taxRate = 0.10; // 10% tax
        $taxAmount = $subtotal * $taxRate;
        $totalAmount = $subtotal + $taxAmount;

        // Create order
        $order = Order::create([
            'table_id' => $request->table_id,
            'user_id' => auth()->id(),
            'customer_name' => $request->customer_name,
            'type' => $request->type,
            'status' => 'pending',
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'discount_amount' => 0,
            'total_amount' => $totalAmount,
            'notes' => $request->notes,
        ]);

        // Create order items
        foreach ($orderItems as $itemData) {
            $order->items()->create($itemData);
        }

        // Update table status if dine-in
        if ($request->table_id) {
            Table::where('id', $request->table_id)->update(['status' => 'occupied']);
        }

        return redirect()->back()->with('success', 'Pesanan berhasil dibuat!');
    }

    /**
     * Update order status.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,preparing,ready,served,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
            'served_at' => $request->status === 'served' ? now() : null,
        ]);

        // Update table status when order is completed
        if ($order->table_id && in_array($request->status, ['served', 'cancelled'])) {
            Table::where('id', $order->table_id)->update(['status' => 'available']);
        }

        return redirect()->back()->with('success', 'Status pesanan berhasil diperbarui!');
    }
}