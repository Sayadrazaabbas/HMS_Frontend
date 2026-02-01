'use client';

import { useState } from 'react';
import {
    FlaskConical,
    Beaker,
    ClipboardList,
    CheckCircle2,
    AlertCircle,
    Clock,
    Search,
    Plus,
    FileText,
    ArrowUpRight
} from 'lucide-react';

interface LabTest {
    id: string;
    testName: string;
    patientName: string;
    patientId: string;
    category: 'HEMATOLOGY' | 'BIOCHEMISTRY' | 'MICROBIOLOGY' | 'SEROLOGY';
    status: 'PENDING' | 'COLLECTED' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'NORMAL' | 'URGENT' | 'STAT';
    requestTime: string;
}

const mockTests: LabTest[] = [
    { id: 'l1', testName: 'Complete Blood Count (CBC)', patientName: 'John Doe', patientId: 'PT-1001', category: 'HEMATOLOGY', status: 'IN_PROGRESS', priority: 'NORMAL', requestTime: '10:30 AM' },
    { id: 'l2', testName: 'Liver Function Test (LFT)', patientName: 'Alice Smith', patientId: 'PT-1082', category: 'BIOCHEMISTRY', status: 'COMPLETED', priority: 'URGENT', requestTime: '09:15 AM' },
    { id: 'l3', testName: 'Urine Analysis', patientName: 'Bob Johnson', patientId: 'PT-2033', category: 'BIOCHEMISTRY', status: 'PENDING', priority: 'NORMAL', requestTime: '11:45 AM' },
    { id: 'l4', testName: 'Blood Sugar (Fasting)', patientName: 'Jane Smith', patientId: 'PT-1002', category: 'BIOCHEMISTRY', status: 'COLLECTED', priority: 'STAT', requestTime: '08:00 AM' },
    { id: 'l5', testName: 'Thyroid Profile', patientName: 'Charlie Brown', patientId: 'PT-3094', category: 'SEROLOGY', status: 'IN_PROGRESS', priority: 'NORMAL', requestTime: '10:00 AM' },
];

const statusStyles = {
    PENDING: 'bg-gray-100 text-gray-700 border-gray-200',
    COLLECTED: 'bg-blue-100 text-blue-700 border-blue-200',
    IN_PROGRESS: 'bg-purple-100 text-purple-700 border-purple-200',
    COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const priorityStyles = {
    NORMAL: 'text-gray-400',
    URGENT: 'text-amber-500 font-black',
    STAT: 'text-rose-600 font-black animate-pulse',
};

export default function LaboratoryPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <FlaskConical className="w-8 h-8 text-indigo-600" />
                        Laboratory Management
                    </h1>
                    <p className="text-gray-500 mt-1">Track pathology tests, samples, and results</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25">
                        <Plus className="w-5 h-5" />
                        New Test Request
                    </button>
                </div>
            </div>

            {/* Integration Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Pending Samples', value: 12, icon: Beaker, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'In Testing', value: 8, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Completed Today', value: 45, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Critical Results', value: 3, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
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
                        {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === tab
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
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
                            placeholder="Search by test or patient..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Test Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Patient</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Priority</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockTests.map((test) => (
                                <tr key={test.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase text-sm tracking-tight">{test.testName}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase mt-1">{test.category} • Req: {test.requestTime}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-gray-900">{test.patientName}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">{test.patientId}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${test.priority === 'STAT' ? 'bg-rose-500' : test.priority === 'URGENT' ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                                            <span className={`text-[10px] uppercase font-black tracking-widest ${priorityStyles[test.priority]}`}>
                                                {test.priority}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[test.status]}`}>
                                            {test.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {test.status === 'COMPLETED' ? (
                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all">
                                                <FileText className="w-3.5 h-3.5" /> REPORT
                                            </button>
                                        ) : (
                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                                                UPDATE <ArrowUpRight className="w-3.5 h-3.5" />
                                            </button>
                                        )}
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
