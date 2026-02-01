'use client';

import { useState } from 'react';
import {
    Baby,
    History,
    FileSignature,
    CheckCircle2,
    AlertCircle,
    Clock,
    Search,
    Plus,
    Calendar,
    ArrowUpRight,
    Heart,
    ShieldCheck
} from 'lucide-react';

interface BMDRecord {
    id: string;
    type: 'BIRTH' | 'DEATH';
    personName: string;
    parentOrRelativeName: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    date: string;
    time: string;
    status: 'PENDING' | 'REPORTED' | 'CERTIFIED';
}

const mockRecords: BMDRecord[] = [
    { id: 'b1', type: 'BIRTH', personName: 'Baby of Sarah', parentOrRelativeName: 'Sarah Jenkins', gender: 'FEMALE', date: 'Feb 02, 2026', time: '04:30 AM', status: 'REPORTED' },
    { id: 'd2', type: 'DEATH', personName: 'James Older', parentOrRelativeName: 'Mary Older', gender: 'MALE', date: 'Feb 01, 2026', time: '11:15 PM', status: 'CERTIFIED' },
    { id: 'b3', type: 'BIRTH', personName: 'Baby of Anita', parentOrRelativeName: 'Anita Roy', gender: 'MALE', date: 'Feb 02, 2026', time: '01:20 AM', status: 'PENDING' },
    { id: 'b4', type: 'BIRTH', personName: 'Baby of Priya', parentOrRelativeName: 'Priya Sharma', gender: 'FEMALE', date: 'Jan 31, 2026', time: '10:45 PM', status: 'CERTIFIED' },
    { id: 'd5', type: 'DEATH', personName: 'Unknown Male', parentOrRelativeName: 'N/A', gender: 'MALE', date: 'Feb 02, 2026', time: '02:00 AM', status: 'REPORTED' },
];

const statusStyles = {
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    REPORTED: 'bg-blue-100 text-blue-700 border-blue-200',
    CERTIFIED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

export default function BirthDeathPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Baby className="w-8 h-8 text-rose-500" />
                        Birth & Death Records
                    </h1>
                    <p className="text-gray-500 mt-1">Register vital events and manage certifications</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-500 text-white font-black rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/25">
                        <Plus className="w-5 h-5" />
                        Register Event
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Births (Month)', value: 142, icon: Baby, color: 'text-rose-500', bg: 'bg-rose-50' },
                    { label: 'Deaths (Month)', value: 28, icon: Heart, color: 'text-gray-600', bg: 'bg-gray-100' },
                    { label: 'Pending Certificates', value: 12, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Verified Today', value: 15, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
                        {['ALL', 'BIRTH', 'DEATH'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === tab
                                    ? 'bg-rose-500 text-white shadow-md'
                                    : 'text-gray-500 hover:text-rose-500 hover:bg-rose-50'
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
                            placeholder="Search records..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-rose-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Record Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Parent/Relative</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date & Time</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockRecords.map((record) => (
                                <tr key={record.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${record.type === 'BIRTH' ? 'bg-rose-50 border-rose-100' : 'bg-gray-50 border-gray-200'} rounded-lg flex items-center justify-center border group-hover:bg-gray-900 group-hover:border-gray-900 transition-all`}>
                                                {record.type === 'BIRTH' ? (
                                                    <Baby className="w-5 h-5 text-rose-500 group-hover:text-white transition-colors" />
                                                ) : (
                                                    <Heart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 group-hover:text-gray-900 transition-colors uppercase text-sm tracking-tight">{record.personName}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">{record.type} • {record.gender}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-gray-900 text-xs">{record.parentOrRelativeName}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">ID: {record.id}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase">
                                            <Calendar className="w-3 h-3 text-rose-400" />
                                            {record.date}
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase mt-1">at {record.time}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[record.status]}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {record.status === 'CERTIFIED' ? (
                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100 transition-all uppercase">
                                                <FileSignature className="w-3.5 h-3.5" /> CERTIFICATE
                                            </button>
                                        ) : (
                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all uppercase">
                                                PROCESS <ArrowUpRight className="w-3.5 h-3.5" />
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
