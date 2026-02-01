'use client';

import { useState } from 'react';
import {
    Scissors,
    ShieldCheck,
    Clock,
    Search,
    Plus,
    Activity,
    ArrowUpRight,
    Users,
    Thermometer,
    HeartPulse,
    Eye
} from 'lucide-react';

interface SurgeryRecord {
    id: string;
    surgeryName: string;
    patientName: string;
    patientId: string;
    otRoom: 'OT-01' | 'OT-02' | 'OT-03' | 'ICU-OT';
    surgeon: string;
    startTime: string;
    endTime?: string;
    status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    priority: 'NORMAL' | 'URGENT' | 'EMERGENCY';
}

const mockSurgeries: SurgeryRecord[] = [
    { id: 's1', surgeryName: 'Appendectomy', patientName: 'John Doe', patientId: 'PT-1001', otRoom: 'OT-01', surgeon: 'Dr. Sarah Wilson', startTime: '10:30 AM', status: 'IN_PROGRESS', priority: 'NORMAL' },
    { id: 's2', surgeryName: 'Cardiac Bypass', patientName: 'Alice Smith', patientId: 'PT-1082', otRoom: 'OT-02', surgeon: 'Dr. Michael Chen', startTime: '08:15 AM', status: 'COMPLETED', priority: 'EMERGENCY' },
    { id: 's3', surgeryName: 'Knee Replacement', patientName: 'Bob Johnson', patientId: 'PT-2033', otRoom: 'OT-01', surgeon: 'Dr. Emily Brown', startTime: '12:45 PM', status: 'SCHEDULED', priority: 'NORMAL' },
    { id: 's4', surgeryName: 'Laparoscopy', patientName: 'Jane Smith', patientId: 'PT-1002', otRoom: 'ICU-OT', surgeon: 'Dr. Robert Vance', startTime: '09:00 AM', status: 'IN_PROGRESS', priority: 'URGENT' },
    { id: 's5', surgeryName: 'Hernia Repair', patientName: 'Charlie Brown', patientId: 'PT-3094', otRoom: 'OT-03', surgeon: 'Dr. Sarah Wilson', startTime: '02:00 PM', status: 'SCHEDULED', priority: 'NORMAL' },
];

const statusStyles = {
    SCHEDULED: 'bg-blue-50 text-blue-700 border-blue-100',
    IN_PROGRESS: 'bg-purple-100 text-purple-700 border-purple-200',
    COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    CANCELLED: 'bg-rose-100 text-rose-700 border-rose-200',
};

const priorityStyles = {
    NORMAL: 'text-gray-400',
    URGENT: 'text-amber-500 font-black',
    EMERGENCY: 'text-rose-600 font-black animate-pulse',
};

export default function OTPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Scissors className="w-8 h-8 text-rose-600" />
                        Operation Theatre (OT)
                    </h1>
                    <p className="text-gray-500 mt-1">Schedule surgeries and monitor theatre occupancy</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/25">
                        <Plus className="w-5 h-5" />
                        Schedule Surgery
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Surgeries', value: 4, icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Occupied OTs', value: '3/4', icon: Thermometer, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Surgeons on Duty', value: 6, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Emergency Ops', value: 2, icon: HeartPulse, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
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
                        {['ALL', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-rose-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-rose-600 hover:bg-rose-50'
                                    }`}
                            >
                                {tab.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search surgeries..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-rose-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Surgery</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Patient / Surgeon</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Room / Time</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockSurgeries.map((surgery) => (
                                <tr key={surgery.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-100 group-hover:bg-rose-600 group-hover:border-rose-600 transition-all">
                                                <Scissors className="w-5 h-5 text-rose-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 group-hover:text-rose-600 transition-colors uppercase text-sm tracking-tight">{surgery.surgeryName}</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${surgery.priority === 'EMERGENCY' ? 'bg-rose-500' : 'bg-gray-300'}`}></div>
                                                    <span className={`text-[10px] uppercase font-black tracking-widest ${priorityStyles[surgery.priority]}`}>
                                                        {surgery.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-gray-900 text-xs">{surgery.patientName}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Surgeon: {surgery.surgeon}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase">
                                            <ShieldCheck className="w-3 h-3 text-rose-500" />
                                            {surgery.otRoom}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase mt-1">
                                            <Clock className="w-3 h-3" />
                                            Starts: {surgery.startTime}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[surgery.status]}`}>
                                            {surgery.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-600 hover:text-white transition-all uppercase">
                                            Manage <Eye className="w-3.5 h-3.5" />
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
