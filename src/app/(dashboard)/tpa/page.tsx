'use client';

import { useState } from 'react';
import {
    ShieldCheck,
    FileCheck,
    ClipboardCheck,
    CheckCircle2,
    AlertCircle,
    Clock,
    Search,
    Plus,
    Building2,
    ArrowUpRight,
    Wallet,
    FileText
} from 'lucide-react';

interface TPAClaim {
    id: string;
    patientName: string;
    patientId: string;
    tpaName: string;
    policyNumber: string;
    claimAmount: number;
    status: 'PENDING' | 'VERIFIED' | 'APPROVED' | 'REJECTED';
    requestDate: string;
}

const mockClaims: TPAClaim[] = [
    { id: 'c1', patientName: 'John Doe', patientId: 'PT-1001', tpaName: 'Star Health Insurance', policyNumber: 'SH-99283-B', claimAmount: 45000, status: 'VERIFIED', requestDate: 'Feb 01, 2026' },
    { id: 'c2', patientName: 'Alice Smith', patientId: 'PT-1082', tpaName: 'HDFC Ergo', policyNumber: 'HE-12093-X', claimAmount: 85000, status: 'APPROVED', requestDate: 'Jan 30, 2026' },
    { id: 'c3', patientName: 'Bob Johnson', patientId: 'PT-2033', tpaName: 'ICICI Lombard', policyNumber: 'IL-29384-Z', claimAmount: 12000, status: 'PENDING', requestDate: 'Feb 02, 2026' },
    { id: 'c4', patientName: 'Jane Smith', patientId: 'PT-1002', tpaName: 'Niva Bupa', policyNumber: 'NB-00213-Y', claimAmount: 32000, status: 'REJECTED', requestDate: 'Jan 28, 2026' },
    { id: 'c5', patientName: 'Charlie Brown', patientId: 'PT-3094', tpaName: 'Star Health Insurance', policyNumber: 'SH-11029-A', claimAmount: 15000, status: 'VERIFIED', requestDate: 'Feb 02, 2026' },
];

const statusStyles = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    VERIFIED: 'bg-blue-100 text-blue-700 border-blue-200',
    APPROVED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    REJECTED: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function TPAPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-indigo-600" />
                        TPA & Insurance Management
                    </h1>
                    <p className="text-gray-500 mt-1">Manage insurance claims, TPA settlement, and policy verifications</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25">
                        <Plus className="w-5 h-5" />
                        New Claim
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Claims', value: 12, icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Verified Policies', value: 145, icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Settlement Ratio', value: '94%', icon: ClipboardCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Pending Approval', value: 8, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
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
                        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === tab
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
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
                            placeholder="Search by TPA or Patient..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">TPA & Policy</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Patient Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Claim Amount</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockClaims.map((claim) => (
                                <tr key={claim.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                                                <Building2 className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase text-sm tracking-tight">{claim.tpaName}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">Policy: {claim.policyNumber}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-gray-900 text-xs">{claim.patientName}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">{claim.patientId}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-black text-gray-900 text-sm">₹{claim.claimAmount.toLocaleString()}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Req: {claim.requestDate}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[claim.status]}`}>
                                            {claim.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-600 hover:text-white transition-all uppercase">
                                            <FileText className="w-3.5 h-3.5" /> DETAILS
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
