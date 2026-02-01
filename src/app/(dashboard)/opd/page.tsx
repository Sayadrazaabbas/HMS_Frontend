'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Users,
    Calendar,
    Clock,
    Stethoscope,
    Plus,
    ArrowRight,
    Search,
    UserPlus,
    CalendarPlus,
    Activity
} from 'lucide-react';
import { appointmentsApi } from '@/lib/modules-api';

interface SimpleAppointment {
    id: string;
    tokenNo: number;
    startTime: string;
    patient: {
        name: string;
        patientId: string;
    };
    doctor: {
        user: { name: string };
        department: { name: string };
    };
    status: string;
}

export default function OPDPage() {
    const [queue, setQueue] = useState<SimpleAppointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        completed: 0,
        emergency: 0
    });

    useEffect(() => {
        const fetchOPDData = async () => {
            setLoading(true);
            try {
                const response = await appointmentsApi.getAll(1, 100);
                const allApts = response.data.data;

                // Filter today's appointments for the queue
                setQueue(allApts);

                // Mock stats based on data
                setStats({
                    total: allApts.length,
                    pending: allApts.filter((a: any) => a.status === 'SCHEDULED' || a.status === 'CHECKED_IN').length,
                    completed: allApts.filter((a: any) => a.status === 'COMPLETED').length,
                    emergency: 2 // Mock emergency count
                });
            } catch (error) {
                console.error('Failed to fetch OPD data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOPDData();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Stethoscope className="w-8 h-8 text-teal-600" />
                        OPD Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1">Outpatient Department real-time management</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/patients/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <UserPlus className="w-4 h-4" />
                        Walk-in
                    </Link>
                    <Link
                        href="/appointments/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-all shadow-md shadow-teal-500/20"
                    >
                        <CalendarPlus className="w-4 h-4" />
                        Book Appointment
                    </Link>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Today's Total", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Waiting", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Completed", value: stats.completed, icon: Stethoscope, color: "text-teal-600", bg: "bg-teal-50" },
                    { label: "Emergency", value: stats.emergency, icon: Activity, color: "text-red-600", bg: "bg-red-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Real-time Queue */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-inter">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-teal-600" />
                            <h2 className="font-bold text-gray-900">Live Consultation Queue</h2>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search queue..."
                                className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left bg-gray-50/30">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Token</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Doctor / Dept</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        </td>
                                    </tr>
                                ) : queue.length > 0 ? (
                                    queue.map((apt) => (
                                        <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center border border-teal-100">
                                                    {apt.tokenNo}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">{apt.patient.name}</p>
                                                <p className="text-xs text-gray-500">{apt.patient.patientId}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium text-gray-900">{apt.doctor.user.name}</p>
                                                <p className="text-xs text-gray-500">{apt.doctor.department.name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                                {apt.startTime}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${apt.status === 'CHECKED_IN' ? 'bg-amber-100 text-amber-700' :
                                                        apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {apt.status === 'CHECKED_IN' ? 'WAITING' : apt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm flex items-center gap-1 ml-auto">
                                                    Handle <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No patients in queue
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Panel: Vital Info / Announcements */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <Calendar className="w-5 h-5 text-teal-400" />
                            Doctor Availability
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Dr. Sarah Smith', status: 'Available', color: 'bg-emerald-400' },
                                { name: 'Dr. James Wilson', status: 'In Surgery', color: 'bg-red-400' },
                                { name: 'Dr. Emily Chen', status: 'Available', color: 'bg-emerald-400' },
                            ].map((doc, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                                    <span className="text-sm font-medium text-gray-300">{doc.name}</span>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className={`w-2 h-2 rounded-full ${doc.color}`}></div>
                                        {doc.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <Plus className="w-5 h-5 text-teal-600" />
                            Recent Walk-ins
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Rahul Sharma', time: '10 mins ago', id: 'PT-9982' },
                                { name: 'Priya Gupta', time: '25 mins ago', id: 'PT-9981' },
                            ].map((p, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                                        {p.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                                        <p className="text-xs text-gray-500">{p.id} • {p.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
