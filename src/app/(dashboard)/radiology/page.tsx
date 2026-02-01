'use client';

import { useState } from 'react';
import {
    Scan,
    History,
    FileText,
    CheckCircle2,
    AlertCircle,
    Clock,
    Search,
    Plus,
    Activity,
    ArrowUpRight,
    Cpu,
    Eye
} from 'lucide-react';

interface RadiologyScan {
    id: string;
    scanType: string;
    patientName: string;
    patientId: string;
    modality: 'X-RAY' | 'MRI' | 'CT' | 'ULTRASOUND' | 'ECG';
    status: 'PENDING' | 'SCANNING' | 'DRAFTING' | 'COMPLETED';
    priority: 'NORMAL' | 'URGENT' | 'STAT';
    requestTime: string;
}

const mockScans: RadiologyScan[] = [
    { id: 'rad1', scanType: 'Chest PA View', patientName: 'John Doe', patientId: 'PT-1001', modality: 'X-RAY', status: 'SCANNING', priority: 'NORMAL', requestTime: '10:30 AM' },
    { id: 'rad2', scanType: 'Brain contrast', patientName: 'Alice Smith', patientId: 'PT-1082', modality: 'MRI', status: 'COMPLETED', priority: 'URGENT', requestTime: '09:15 AM' },
    { id: 'rad3', scanType: 'Abdomen & Pelvis', patientName: 'Bob Johnson', patientId: 'PT-2033', modality: 'CT', status: 'PENDING', priority: 'NORMAL', requestTime: '11:45 AM' },
    { id: 'rad4', scanType: 'Whole Abdomen', patientName: 'Jane Smith', patientId: 'PT-1002', modality: 'ULTRASOUND', status: 'DRAFTING', priority: 'STAT', requestTime: '08:00 AM' },
    { id: 'rad5', scanType: '12 Lead ECG', patientName: 'Charlie Brown', patientId: 'PT-3094', modality: 'ECG', status: 'SCANNING', priority: 'NORMAL', requestTime: '10:00 AM' },
];

const statusStyles = {
    PENDING: 'bg-gray-100 text-gray-700 border-gray-200',
    SCANNING: 'bg-blue-100 text-blue-700 border-blue-200',
    DRAFTING: 'bg-purple-100 text-purple-700 border-purple-200',
    COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const priorityStyles = {
    NORMAL: 'text-gray-400',
    URGENT: 'text-amber-500 font-black',
    STAT: 'text-rose-600 font-black animate-pulse',
};

export default function RadiologyPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Scan className="w-8 h-8 text-teal-600" />
                        Radiology & Imaging
                    </h1>
                    <p className="text-gray-500 mt-1">Manage diagnostic scans and radiological reports</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white font-black rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/25">
                        <Plus className="w-5 h-5" />
                        New Scan Requisition
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Scans Today', value: 24, icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50' },
                    { label: 'Pending Reports', value: 9, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Radiologists', value: 3, icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Urgent Scans', value: 5, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
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
                        {['ALL', 'PENDING', 'SCANNING', 'DRAFTING', 'COMPLETED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-teal-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-teal-600 hover:bg-teal-50'
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
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-teal-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Scan Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Patient</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Priority</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockScans.map((scan) => (
                                <tr key={scan.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center border border-teal-100 group-hover:bg-teal-600 group-hover:border-teal-600 transition-all">
                                                <History className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 group-hover:text-teal-600 transition-colors uppercase text-sm tracking-tight">{scan.scanType}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">{scan.modality} • Req: {scan.requestTime}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-gray-900 text-xs">{scan.patientName}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">{scan.patientId}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${scan.priority === 'STAT' ? 'bg-rose-500' : scan.priority === 'URGENT' ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                                            <span className={`text-[10px] uppercase font-black tracking-widest ${priorityStyles[scan.priority]}`}>
                                                {scan.priority}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[scan.status]}`}>
                                            {scan.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {scan.status === 'COMPLETED' ? (
                                                <button className="p-2 text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-600 hover:text-white transition-all" title="View Report">
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-teal-600 hover:text-white transition-all" title="Add Results">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-cyan-600 hover:text-white transition-all" title="View Images">
                                                <Eye className="w-4 h-4" />
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
