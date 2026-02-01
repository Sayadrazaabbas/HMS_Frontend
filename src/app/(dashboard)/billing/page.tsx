'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search, Plus, Receipt, ChevronLeft, ChevronRight,
    DollarSign, Clock, CheckCircle2, Eye, Printer
} from 'lucide-react';
import { billingApi } from '@/lib/modules-api';

interface Invoice {
    id: string;
    invoiceNo: string;
    totalAmount: number;
    dueAmount: number;
    status: 'PENDING' | 'PARTIAL' | 'PAID' | 'CANCELLED';
    createdAt: string;
    patient: {
        id: string;
        patientId: string;
        name: string;
        phone: string;
    };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    PARTIAL: 'bg-orange-100 text-orange-700',
    PAID: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-gray-100 text-gray-500',
};

const statusIcons: Record<string, React.ReactNode> = {
    PENDING: <Clock className="w-4 h-4" />,
    PARTIAL: <DollarSign className="w-4 h-4" />,
    PAID: <CheckCircle2 className="w-4 h-4" />,
    CANCELLED: <Receipt className="w-4 h-4" />,
};

export default function BillingPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>('');

    const fetchInvoices = async (page = 1, status?: string) => {
        setLoading(true);
        try {
            const response = await billingApi.getAll(page, 10, { status });
            setInvoices(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Failed to fetch invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices(currentPage, statusFilter || undefined);
    }, [currentPage, statusFilter]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Calculate totals
    const totalPending = invoices.filter(i => i.status === 'PENDING' || i.status === 'PARTIAL')
        .reduce((sum, i) => sum + i.dueAmount, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
                    <p className="text-gray-500 mt-1">Manage patient bills and payments</p>
                </div>
                <Link
                    href="/billing/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25"
                >
                    <Plus className="w-5 h-5" />
                    New Invoice
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(totalPending)}</p>
                        </div>
                    </div>
                </div>
                {['PENDING', 'PARTIAL', 'PAID'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(statusFilter === status ? '' : status)}
                        className={`bg-white rounded-xl p-4 border text-left transition-all ${statusFilter === status ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-gray-100 hover:border-gray-200'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusColors[status]}`}>
                                {statusIcons[status]}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{status}</p>
                                <p className="text-lg font-bold text-gray-900">
                                    {invoices.filter(i => i.status === status).length}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Invoices Table */}
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
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Invoice #</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Due</th>
                                        <th className="text-center px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {invoices.length > 0 ? (
                                        invoices.map((invoice) => (
                                            <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-teal-600">{invoice.invoiceNo}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{invoice.patient.name}</p>
                                                        <p className="text-sm text-gray-500">{invoice.patient.patientId}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {formatDate(invoice.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 text-right font-medium text-gray-900">
                                                    {formatCurrency(invoice.totalAmount)}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={invoice.dueAmount > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                                                        {formatCurrency(invoice.dueAmount)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusColors[invoice.status]}`}>
                                                        {statusIcons[invoice.status]}
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/billing/${invoice.id}`}
                                                            className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Print"
                                                        >
                                                            <Printer className="w-4 h-4" />
                                                        </button>
                                                        {(invoice.status === 'PENDING' || invoice.status === 'PARTIAL') && (
                                                            <Link
                                                                href={`/billing/${invoice.id}/payment`}
                                                                className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors"
                                                            >
                                                                Pay
                                                            </Link>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                <Receipt className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                                <p className="font-medium">No invoices found</p>
                                                <p className="text-sm mt-1">Create a new invoice to get started</p>
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
