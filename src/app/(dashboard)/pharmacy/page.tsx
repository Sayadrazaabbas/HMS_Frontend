'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search, Plus, Pill, Package, AlertTriangle,
    ChevronLeft, ChevronRight, Clock, TrendingDown
} from 'lucide-react';
import { pharmacyApi } from '@/lib/modules-api';

interface Medicine {
    id: string;
    name: string;
    genericName: string | null;
    code: string;
    category: string;
    unit: string;
    stockQuantity: number;
    isLowStock: boolean;
    reorderLevel: number;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

interface StockOverview {
    totalItems: number;
    lowStockItems: number;
    outOfStockItems: number;
    expiringItems: number;
}

export default function PharmacyPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [overview, setOverview] = useState<StockOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [showLowStock, setShowLowStock] = useState(false);

    const fetchMedicines = async (page = 1, searchTerm = '') => {
        setLoading(true);
        try {
            const [medsResponse, overviewResponse] = await Promise.all([
                pharmacyApi.getMedicines(page, 10, searchTerm),
                pharmacyApi.getStock(),
            ]);
            setMedicines(medsResponse.data.data);
            setPagination(medsResponse.data.pagination);
            setOverview(overviewResponse.data.data);
        } catch (error) {
            console.error('Failed to fetch medicines:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLowStock = async () => {
        setLoading(true);
        try {
            const response = await pharmacyApi.getLowStock();
            setMedicines(response.data.data);
            setPagination(null);
        } catch (error) {
            console.error('Failed to fetch low stock:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showLowStock) {
            fetchLowStock();
        } else {
            fetchMedicines(currentPage, search);
        }
    }, [currentPage, showLowStock]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchMedicines(1, search);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pharmacy</h1>
                    <p className="text-gray-500 mt-1">Manage medicine inventory and dispensing</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/pharmacy/dispense"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25"
                    >
                        <Pill className="w-5 h-5" />
                        Dispense Medicine
                    </Link>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Medicines</p>
                            <p className="text-xl font-bold text-gray-900">{overview?.totalItems || 0}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowLowStock(!showLowStock)}
                    className={`bg-white rounded-xl p-4 border text-left transition-all ${showLowStock ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-gray-100 hover:border-gray-200'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Low Stock</p>
                            <p className="text-xl font-bold text-orange-600">{overview?.lowStockItems || 0}</p>
                        </div>
                    </div>
                </button>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Out of Stock</p>
                            <p className="text-xl font-bold text-red-600">{overview?.outOfStockItems || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Expiring Soon</p>
                            <p className="text-xl font-bold text-yellow-600">{overview?.expiringItems || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by medicine name or code..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Search
                    </button>
                    {showLowStock && (
                        <button
                            type="button"
                            onClick={() => setShowLowStock(false)}
                            className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Show All
                        </button>
                    )}
                </form>
            </div>

            {/* Medicines Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Medicine</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Unit</th>
                                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
                                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {medicines.length > 0 ? (
                                        medicines.map((medicine) => (
                                            <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-teal-600">{medicine.code}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{medicine.name}</p>
                                                        {medicine.genericName && (
                                                            <p className="text-sm text-gray-500">{medicine.genericName}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                                                        {medicine.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {medicine.unit}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`text-lg font-bold ${medicine.stockQuantity === 0
                                                            ? 'text-red-600'
                                                            : medicine.isLowStock
                                                                ? 'text-orange-600'
                                                                : 'text-gray-900'
                                                        }`}>
                                                        {medicine.stockQuantity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {medicine.stockQuantity === 0 ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                                                            <AlertTriangle className="w-3 h-3" />
                                                            Out of Stock
                                                        </span>
                                                    ) : medicine.isLowStock ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                                                            <TrendingDown className="w-3 h-3" />
                                                            Low Stock
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                                            In Stock
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                <Pill className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                                <p className="font-medium">No medicines found</p>
                                                <p className="text-sm mt-1">Add medicines to inventory</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.pages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                                    {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="text-sm font-medium text-gray-700">
                                        Page {pagination.page} of {pagination.pages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                        disabled={currentPage >= pagination.pages}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
