'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, Receipt, Bed, TrendingUp, Clock, UserPlus, Activity } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { dashboardApi } from '@/lib/api';
import { authService } from '@/lib/auth';

interface Stats {
    todayPatients: number;
    todayAppointments: number;
    pendingBills: number;
    todayRevenue: number;
    totalPatients: number;
    totalDoctors: number;
    availableBeds: number;
    occupiedBeds: number;
}

interface RecentPatient {
    id: string;
    patientId: string;
    name: string;
    phone: string;
    gender: string;
    age: number;
    createdAt: string;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentPatients, setRecentPatients] = useState<RecentPatient[]>([]);
    const [loading, setLoading] = useState(true);
    const user = authService.getUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, patientsRes] = await Promise.all([
                    dashboardApi.getStats(),
                    dashboardApi.getRecentPatients(5),
                ]);
                setStats(statsRes.data.data);
                setRecentPatients(patientsRes.data.data);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg shadow-teal-500/20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
                        <p className="text-teal-100 mt-1">Here&apos;s what&apos;s happening at BN Hospital today.</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-sm text-teal-100">Today</p>
                        <p className="text-lg font-semibold">
                            {new Date().toLocaleDateString('en-IN', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Today's Patients"
                    value={stats?.todayPatients || 0}
                    icon={<UserPlus className="w-6 h-6" />}
                    color="teal"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Appointments"
                    value={stats?.todayAppointments || 0}
                    icon={<Calendar className="w-6 h-6" />}
                    color="blue"
                />
                <StatsCard
                    title="Pending Bills"
                    value={stats?.pendingBills || 0}
                    icon={<Receipt className="w-6 h-6" />}
                    color="orange"
                />
                <StatsCard
                    title="Today's Revenue"
                    value={formatCurrency(stats?.todayRevenue || 0)}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="green"
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Patients</p>
                            <p className="text-xl font-bold text-gray-900">{stats?.totalPatients || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Activity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Doctors</p>
                            <p className="text-xl font-bold text-gray-900">{stats?.totalDoctors || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Bed className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Available Beds</p>
                            <p className="text-xl font-bold text-gray-900">
                                {stats?.availableBeds || 0}/{(stats?.availableBeds || 0) + (stats?.occupiedBeds || 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Patients Table */}
            <div className="bg-white rounded-2xl border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
                        <a href="/patients" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                            View All →
                        </a>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient ID</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Gender</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Age</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Registered</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentPatients.length > 0 ? (
                                recentPatients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-teal-600">{patient.patientId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${patient.gender === 'MALE'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-pink-100 text-pink-700'
                                                }`}>
                                                {patient.gender}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{patient.age} yrs</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(patient.createdAt)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No patients registered yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'New Patient', href: '/patients/new', icon: UserPlus, color: 'bg-teal-500' },
                    { label: 'New Appointment', href: '/appointments/new', icon: Calendar, color: 'bg-blue-500' },
                    { label: 'Generate Bill', href: '/billing/new', icon: Receipt, color: 'bg-orange-500' },
                    { label: 'Admit Patient', href: '/ipd/admit', icon: Bed, color: 'bg-purple-500' },
                ].map((action) => (
                    <a
                        key={action.label}
                        href={action.href}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                    >
                        <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                            <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
