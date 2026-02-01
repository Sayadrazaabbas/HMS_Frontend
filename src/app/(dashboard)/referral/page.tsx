'use client';

import { useState } from 'react';
import {
    UserPlus,
    Building2,
    ArrowRightLeft,
    CheckCircle2,
    AlertCircle,
    Clock,
    Search,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Phone,
    FileText
} from 'lucide-react';

interface ReferralRecord {
    id: string;
    patientName: string;
    patientId: string;
    type: 'INWARD' | 'OUTWARD';
    referredFrom?: string;
    referredTo?: string;
    reason: string;
    status: 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED';
    date: string;
}

const mockReferrals: ReferralRecord[] = [
    { id: 'r1', patientName: 'John Doe', patientId: 'PT-1001', type: 'INWARD', referredFrom: 'City Hospital', reason: 'Cardiac Care', status: 'ACCEPTED', date: 'Feb 02, 2026' },
    { id: 'r2', patientName: 'Alice Smith', patientId: 'PT-1082', type: 'OUTWARD', referredTo: 'Apollo Specialty', reason: 'Oncology Consult', status: 'PENDING', date: 'Feb 02, 2026' },
    { id: 'r3', patientName: 'Bob Johnson', patientId: 'PT-2033', type: 'INWARD', referredFrom: 'Regional Clinic', reason: 'Orthopedic Surgery', status: 'COMPLETED', date: 'Jan 31, 2026' },
    { id: 'r4', patientName: 'Jane Smith', patientId: 'PT-1002', type: 'OUTWARD', referredTo: 'Max Healthcare', reason: 'Neurology Evaluation', status: 'ACCEPTED', date: 'Feb 01, 2026' },
    { id: 'r5', patientName: 'Charlie Brown', patientId: 'PT-3094', type: 'INWARD', referredFrom: 'Primary Care Center', reason: 'General Surgery', status: 'PENDING', date: 'Feb 02, 2026' },
];

const statusStyles = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    ACCEPTED: 'bg-blue-100 text-blue-700 border-blue-200',
    COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    CANCELLED: 'bg-gray-100 text-gray-500 border-gray-200',
};

export default function ReferralPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <UserPlus className="w-8 h-8 text-cyan-600" />
                        Referral Management
                    </h1>
                    <p className="text-gray-500 mt-1">Track inward and outward patient referrals</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 text-white font-black rounded-xl hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-500/25">
                        <Plus className="w-5 h-5" />
                        New Referral
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Inward Referrals', value: 24, icon: ArrowDownLeft, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                    { label: 'Outward Referrals', value: 18, icon: ArrowUpRight, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Pending Actions', value: 8, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Completed', value: 145, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
                    <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200 shadow-sm">
                        {['ALL', 'INWARD', 'OUTWARD'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === tab
                                    ? 'bg-cyan-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-cyan-600 hover:bg-cyan-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search referrals..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Patient</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Type / Direction</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Reason</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockReferrals.map((referral) => (
                                <tr key={referral.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${referral.type === 'INWARD' ? 'bg-cyan-50 border-cyan-100' : 'bg-purple-50 border-purple-100'} rounded-lg flex items-center justify-center border group-hover:bg-gray-900 group-hover:border-gray-900 transition-all`}>
                                                {referral.type === 'INWARD' ? (
                                                    <ArrowDownLeft className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" />
                                                ) : (
                                                    <ArrowUpRight className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors uppercase text-sm tracking-tight">{referral.patientName}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">{referral.patientId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase ${referral.type === 'INWARD' ? 'bg-cyan-100 text-cyan-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {referral.type}
                                        </span>
                                        <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">
                                            {referral.type === 'INWARD' ? `From: ${referral.referredFrom}` : `To: ${referral.referredTo}`}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-gray-900 text-xs">{referral.reason}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">{referral.date}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[referral.status]}`}>
                                            {referral.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-600 hover:text-white transition-all" title="Call">
                                                <Phone className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-900 hover:text-white transition-all" title="Details">
                                                <FileText className="w-4 h-4" />
                                            </button>
                                        </div>
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
