'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Search, Plus, Calendar, Clock, User, ChevronLeft, ChevronRight,
    CheckCircle2, XCircle, AlertCircle, MoreVertical
} from 'lucide-react';
import { appointmentsApi } from '@/lib/modules-api';

interface Appointment {
    id: string;
    appointmentNo: string;
    date: string;
    startTime: string;
    tokenNo: number;
    type: 'NEW' | 'FOLLOWUP' | 'EMERGENCY';
    status: 'SCHEDULED' | 'CHECKED_IN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
    reason?: string;
    patient: {
        id: string;
        patientId: string;
        name: string;
        phone: string;
        gender: string;
    };
    doctor: {
        user: { name: string };
        department: { name: string };
    };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

const statusColors: Record<string, string> = {
    SCHEDULED: 'bg-blue-100 text-blue-700',
    CHECKED_IN: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    NO_SHOW: 'bg-gray-100 text-gray-700',
};

const typeColors: Record<string, string> = {
    NEW: 'bg-teal-100 text-teal-700',
    FOLLOWUP: 'bg-indigo-100 text-indigo-700',
    EMERGENCY: 'bg-red-100 text-red-700',
};

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const fetchAppointments = async (page = 1, date?: string) => {
        setLoading(true);
        try {
            const response = await appointmentsApi.getAll(page, 10, { date });
            setAppointments(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments(currentPage, selectedDate);
    }, [currentPage, selectedDate]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await appointmentsApi.updateStatus(id, status);
            fetchAppointments(currentPage, selectedDate);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                    <p className="text-gray-500 mt-1">Manage patient appointments and schedules</p>
                </div>
                <Link
                    href="/appointments/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg shadow-teal-500/25"
                >
                    <Plus className="w-5 h-5" />
                    New Appointment
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                const prev = new Date(selectedDate);
                                prev.setDate(prev.getDate() - 1);
                                setSelectedDate(prev.toISOString().split('T')[0]);
                            }}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                            className="px-3 py-2 bg-teal-50 text-teal-700 font-medium rounded-lg hover:bg-teal-100 transition-colors"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => {
                                const next = new Date(selectedDate);
                                next.setDate(next.getDate() + 1);
                                setSelectedDate(next.toISOString().split('T')[0]);
                            }}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>

            {/* Appointments Table */}
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
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Token</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Doctor</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {appointments.length > 0 ? (
                                        appointments.map((apt) => (
                                            <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                                        <span className="text-teal-700 font-bold">{apt.tokenNo}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="font-medium">{formatTime(apt.startTime)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{apt.patient.name}</p>
                                                        <p className="text-sm text-gray-500">{apt.patient.patientId}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{apt.doctor.user.name}</p>
                                                        <p className="text-sm text-gray-500">{apt.doctor.department.name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${typeColors[apt.type]}`}>
                                                        {apt.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[apt.status]}`}>
                                                        {apt.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {apt.status === 'SCHEDULED' && (
                                                            <button
                                                                onClick={() => handleStatusChange(apt.id, 'CHECKED_IN')}
                                                                className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-lg hover:bg-yellow-200 transition-colors"
                                                            >
                                                                Check In
                                                            </button>
                                                        )}
                                                        {apt.status === 'CHECKED_IN' && (
                                                            <button
                                                                onClick={() => handleStatusChange(apt.id, 'IN_PROGRESS')}
                                                                className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors"
                                                            >
                                                                Start
                                                            </button>
                                                        )}
                                                        {apt.status === 'IN_PROGRESS' && (
                                                            <button
                                                                onClick={() => handleStatusChange(apt.id, 'COMPLETED')}
                                                                className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors"
                                                            >
                                                                Complete
                                                            </button>
                                                        )}
                                                        {['SCHEDULED', 'CHECKED_IN'].includes(apt.status) && (
                                                            <button
                                                                onClick={() => handleStatusChange(apt.id, 'CANCELLED')}
                                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Cancel"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                                <p className="font-medium">No appointments for {formatDate(selectedDate)}</p>
                                                <p className="text-sm mt-1">Create a new appointment to get started</p>
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
                                    {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} appointments
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
