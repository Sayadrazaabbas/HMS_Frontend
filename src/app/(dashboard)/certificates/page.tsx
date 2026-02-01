'use client';

import { useState } from 'react';
import {
    Award,
    FileCheck,
    Download,
    Printer,
    Search,
    Plus,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    User
} from 'lucide-react';

interface Certificate {
    id: string;
    type: 'BIRTH' | 'DEATH' | 'MEDICAL_FITNESS' | 'DISCHARGE' | 'DISABILITY';
    patientName: string;
    patientId: string;
    issuedBy: string;
    status: 'ISSUED' | 'PENDING' | 'REVOKED';
    requestDate: string;
    issueDate?: string;
}

const mockCertificates: Certificate[] = [
    { id: 'cert1', type: 'BIRTH', patientName: 'Baby of Sarah Jenkins', patientId: 'PT-3001', issuedBy: 'Dr. Emily Brown', status: 'ISSUED', requestDate: 'Feb 01, 2026', issueDate: 'Feb 02, 2026' },
    { id: 'cert2', type: 'MEDICAL_FITNESS', patientName: 'John Doe', patientId: 'PT-1001', issuedBy: 'Dr. Michael Chen', status: 'PENDING', requestDate: 'Feb 02, 2026' },
    { id: 'cert3', type: 'DISCHARGE', patientName: 'Alice Smith', patientId: 'PT-1082', issuedBy: 'Dr. Sarah Wilson', status: 'ISSUED', requestDate: 'Jan 31, 2026', issueDate: 'Feb 01, 2026' },
    { id: 'cert4', type: 'DEATH', patientName: 'James Older', patientId: 'PT-2001', issuedBy: 'Dr. Robert Vance', status: 'ISSUED', requestDate: 'Feb 01, 2026', issueDate: 'Feb 01, 2026' },
    { id: 'cert5', type: 'DISABILITY', patientName: 'Bob Johnson', patientId: 'PT-2033', issuedBy: 'Dr. Emily Brown', status: 'PENDING', requestDate: 'Feb 02, 2026' },
];

const typeStyles = {
    BIRTH: { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Birth Certificate' },
    DEATH: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Death Certificate' },
    MEDICAL_FITNESS: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Medical Fitness' },
    DISCHARGE: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Discharge Summary' },
    DISABILITY: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Disability Certificate' },
};

const statusStyles = {
    ISSUED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
    REVOKED: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function CertificatesPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Award className="w-8 h-8 text-amber-600" />
                        Certificate Management
                    </h1>
                    <p className="text-gray-500 mt-1">Issue and manage medical certificates and verifications</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white font-black rounded-xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-500/25">
                        <Plus className="w-5 h-5" />
                        Issue Certificate
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Issued', value: 342, icon: FileCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Pending Requests', value: 12, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Birth Certificates', value: 98, icon: Award, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'This Month', value: 45, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
                        {['ALL', 'ISSUED', 'PENDING'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === tab
                                    ? 'bg-amber-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-amber-600 hover:bg-amber-50'
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
                            placeholder="Search certificates..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-amber-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Certificate Type</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Patient</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Issued By</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockCertificates.map((cert) => (
                                <tr key={cert.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${typeStyles[cert.type].bg} ${typeStyles[cert.type].text} rounded-lg flex items-center justify-center group-hover:bg-amber-600 transition-all`}>
                                                <Award className="w-5 h-5 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors text-sm">{typeStyles[cert.type].label}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase mt-1">ID: {cert.id.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <p className="font-bold text-gray-900 text-xs">{cert.patientName}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase">{cert.patientId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-gray-900 text-xs">{cert.issuedBy}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">
                                            {cert.issueDate ? `Issued: ${cert.issueDate}` : `Req: ${cert.requestDate}`}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[cert.status]}`}>
                                            {cert.status === 'ISSUED' && <CheckCircle2 className="w-3 h-3" />}
                                            {cert.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {cert.status === 'ISSUED' ? (
                                                <>
                                                    <button className="p-2 text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-600 hover:text-white transition-all" title="Download">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-900 hover:text-white transition-all" title="Print">
                                                        <Printer className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-600 hover:text-white transition-all uppercase">
                                                    <FileText className="w-3.5 h-3.5" /> PROCESS
                                                </button>
                                            )}
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
