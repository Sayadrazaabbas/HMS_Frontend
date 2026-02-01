'use client';

import { useState } from 'react';
import {
    Boxes,
    Package,
    AlertTriangle,
    TrendingUp,
    Clock,
    Search,
    Plus,
    ArrowUpRight,
    BarChart3,
    ShoppingCart,
    Truck
} from 'lucide-react';

interface InventoryItem {
    id: string;
    itemName: string;
    category: 'MEDICINE' | 'SURGICAL' | 'CONSUMABLE' | 'EQUIPMENT';
    sku: string;
    stock: number;
    minStock: number;
    unit: string;
    status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
    lastRestocked: string;
}

const mockItems: InventoryItem[] = [
    { id: 'i1', itemName: 'Paracetamol 500mg', category: 'MEDICINE', sku: 'MED-PCM-500', stock: 2500, minStock: 500, unit: 'Tablets', status: 'IN_STOCK', lastRestocked: 'Feb 01, 2026' },
    { id: 'i2', itemName: 'Surgical Gloves (L)', category: 'SURGICAL', sku: 'SRG-GLV-L', stock: 120, minStock: 200, unit: 'Pairs', status: 'LOW_STOCK', lastRestocked: 'Jan 28, 2026' },
    { id: 'i3', itemName: 'IV Cannula 22G', category: 'CONSUMABLE', sku: 'CON-IVC-22', stock: 0, minStock: 100, unit: 'Pieces', status: 'OUT_OF_STOCK', lastRestocked: 'Jan 15, 2026' },
    { id: 'i4', itemName: 'Syringe 5ml', category: 'CONSUMABLE', sku: 'CON-SYR-5', stock: 1800, minStock: 300, unit: 'Pieces', status: 'IN_STOCK', lastRestocked: 'Feb 02, 2026' },
    { id: 'i5', itemName: 'BP Monitor Digital', category: 'EQUIPMENT', sku: 'EQP-BPM-01', stock: 15, minStock: 5, unit: 'Units', status: 'IN_STOCK', lastRestocked: 'Jan 20, 2026' },
];

const statusStyles = {
    IN_STOCK: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    LOW_STOCK: 'bg-amber-100 text-amber-700 border-amber-200',
    OUT_OF_STOCK: 'bg-rose-100 text-rose-700 border-rose-200',
};

const categoryStyles = {
    MEDICINE: 'bg-blue-50 text-blue-600',
    SURGICAL: 'bg-purple-50 text-purple-600',
    CONSUMABLE: 'bg-teal-50 text-teal-600',
    EQUIPMENT: 'bg-gray-100 text-gray-600',
};

export default function InventoryPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Boxes className="w-8 h-8 text-orange-600" />
                        Inventory Management
                    </h1>
                    <p className="text-gray-500 mt-1">Track stock levels, procurement, and item issuance</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white font-black rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/25">
                        <Plus className="w-5 h-5" />
                        Add Item
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-all">
                        <Truck className="w-5 h-5 text-orange-600" />
                        New Order
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Items', value: '1,245', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Low Stock Alerts', value: 28, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Pending Orders', value: 12, icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'This Month Value', value: '₹4.2L', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden font-inter">
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
                    <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto max-w-full">
                        {['ALL', 'LOW_STOCK', 'OUT_OF_STOCK'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-orange-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-orange-600 hover:bg-orange-50'
                                    }`}
                            >
                                {tab.replace(/_/g, ' ')}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by SKU or name..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Stock Level</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockItems.map((item) => (
                                <tr key={item.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all">
                                                <Package className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase text-sm tracking-tight">{item.itemName}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">SKU: {item.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${categoryStyles[item.category]}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-black text-gray-900 text-sm">{item.stock.toLocaleString()} <span className="text-gray-400 text-xs font-bold">{item.unit}</span></p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Min: {item.minStock}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[item.status]}`}>
                                            {item.status.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-600 hover:text-white transition-all uppercase">
                                            <BarChart3 className="w-3.5 h-3.5" /> VIEW
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
