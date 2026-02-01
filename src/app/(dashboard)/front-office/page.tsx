'use client';

import { useState } from 'react';
import {
    Headset,
    Users,
    PhoneCall,
    MessageSquare,
    Mail,
    Clock,
    Search,
    Plus,
    Calendar,
    ArrowUpRight,
    LogOut,
    CheckCircle2
} from 'lucide-react';

interface VisitorRecord {
    id: string;
    visitorName: string;
    patientName?: string;
    purpose: 'PATIENT_VISIT' | 'BUSINESS' | 'INQUIRY' | 'OTHER';
    inTime: string;
    outTime?: string;
    status: 'IN' | 'OUT';
}

const mockVisitors: VisitorRecord[] = [
    { id: 'v1', visitorName: 'Mark Wilson', patientName: 'John Doe', purpose: 'PATIENT_VISIT', inTime: '10:15 AM', status: 'IN' },
    { id: 'v2', visitorName: 'Sarah Jenkins', purpose: 'BUSINESS', inTime: '09:30 AM', outTime: '11:00 AM', status: 'OUT' },
    { id: 'v3', visitorName: 'David Miller', purpose: 'INQUIRY', inTime: '11:00 AM', status: 'IN' },
    { id: 'v4', visitorName: 'Linda Gale', patientName: 'Jane Smith', purpose: 'PATIENT_VISIT', inTime: '08:45 AM', outTime: '10:15 AM', status: 'OUT' },
    { id: 'v5', visitorName: 'Robert Vance', purpose: 'OTHER', inTime: '11:30 AM', status: 'IN' },
];

const purposeStyles = {
    PATIENT_VISIT: 'bg-teal-50 text-teal-700 border-teal-100',
    BUSINESS: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    INQUIRY: 'bg-amber-50 text-amber-700 border-amber-100',
    OTHER: 'bg-gray-50 text-gray-700 border-gray-100',
};

export default function FrontOfficePage() {
    const [activeTab, setActiveTab] = useState('VISITORS');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Headset className="w-8 h-8 text-emerald-600" />
                        Front Office Management
                    </h1>
                    <p className="text-gray-500 mt-1">Manage visitors, inquiries, and communication logs</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/25">
                        <Plus className="w-5 h-5" />
                        New Visitor Entry
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-all">
                        <PhoneCall className="w-5 h-5 text-emerald-600" />
                        Log Call
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Visitors In', value: 18, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Active Inquiries', value: 12, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Calls Logged', value: 45, icon: PhoneCall, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Dispatches', value: 8, icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50' },
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
                        {['VISITORS', 'PHONE_CALLS', 'INQUIRIES', 'DISPATCH'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
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
                            placeholder="Search records..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Visitor Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Purpose</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Check In/Out</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockVisitors.map((visitor) => (
                                <tr key={visitor.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                                                <Users className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors uppercase text-sm tracking-tight">{visitor.visitorName}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">ID: {visitor.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${purposeStyles[visitor.purpose]}`}>
                                            {visitor.purpose.replace('_', ' ')}
                                        </span>
                                        {visitor.patientName && (
                                            <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Visiting: {visitor.patientName}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase">
                                                <Clock className="w-3 h-3 text-emerald-500" />
                                                In: {visitor.inTime}
                                            </div>
                                            {visitor.outTime && (
                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase">
                                                    <LogOut className="w-3 h-3 text-rose-400" />
                                                    Out: {visitor.outTime}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${visitor.status === 'IN'
                                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${visitor.status === 'IN' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                            {visitor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all uppercase">
                                            Details <ArrowUpRight className="w-3.5 h-3.5" />
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
