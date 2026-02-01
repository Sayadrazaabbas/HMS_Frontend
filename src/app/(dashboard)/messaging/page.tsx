'use client';

import { useState } from 'react';
import {
    MessageSquare,
    Bell,
    Users,
    Send,
    Search,
    Plus,
    Calendar,
    Star,
    Megaphone,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';

interface Message {
    id: string;
    type: 'ANNOUNCEMENT' | 'ALERT' | 'REMINDER' | 'GENERAL';
    subject: string;
    sender: string;
    recipients: string;
    priority: 'LOW' | 'NORMAL' | 'HIGH';
    status: 'SENT' | 'SCHEDULED' | 'DRAFT';
    sentAt: string;
}

const mockMessages: Message[] = [
    { id: 'm1', type: 'ANNOUNCEMENT', subject: 'Hospital Accreditation Visit Next Week', sender: 'Admin Office', recipients: 'All Staff', priority: 'HIGH', status: 'SENT', sentAt: 'Feb 02, 10:30 AM' },
    { id: 'm2', type: 'ALERT', subject: 'Blood Bank Stock Critical - O-ve', sender: 'Blood Bank', recipients: 'All Doctors', priority: 'HIGH', status: 'SENT', sentAt: 'Feb 02, 09:15 AM' },
    { id: 'm3', type: 'REMINDER', subject: 'Monthly Safety Training - Feb 5th', sender: 'HR Department', recipients: 'Nursing Staff', priority: 'NORMAL', status: 'SCHEDULED', sentAt: 'Feb 05, 09:00 AM' },
    { id: 'm4', type: 'GENERAL', subject: 'New Cafeteria Menu Available', sender: 'Facility Management', recipients: 'All Staff', priority: 'LOW', status: 'SENT', sentAt: 'Feb 01, 02:00 PM' },
    { id: 'm5', type: 'ANNOUNCEMENT', subject: 'System Maintenance - Feb 8th Night', sender: 'IT Department', recipients: 'All Staff', priority: 'NORMAL', status: 'DRAFT', sentAt: 'N/A' },
];

const typeStyles = {
    ANNOUNCEMENT: { bg: 'bg-indigo-50', text: 'text-indigo-600', icon: Megaphone },
    ALERT: { bg: 'bg-rose-50', text: 'text-rose-600', icon: AlertCircle },
    REMINDER: { bg: 'bg-amber-50', text: 'text-amber-600', icon: Clock },
    GENERAL: { bg: 'bg-gray-100', text: 'text-gray-600', icon: MessageSquare },
};

const statusStyles = {
    SENT: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    SCHEDULED: 'bg-blue-100 text-blue-700 border-blue-200',
    DRAFT: 'bg-gray-100 text-gray-500 border-gray-200',
};

export default function MessagingPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="w-8 h-8 text-violet-600" />
                        Internal Messaging
                    </h1>
                    <p className="text-gray-500 mt-1">Broadcast announcements and manage internal communication</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white font-black rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/25">
                        <Plus className="w-5 h-5" />
                        New Message
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Messages Sent', value: 142, icon: Send, color: 'text-violet-600', bg: 'bg-violet-50' },
                    { label: 'Announcements', value: 18, icon: Megaphone, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Scheduled', value: 8, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Active Alerts', value: 3, icon: Bell, color: 'text-rose-600', bg: 'bg-rose-50' },
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
                        {['ALL', 'ANNOUNCEMENTS', 'ALERTS', 'SCHEDULED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === tab
                                    ? 'bg-violet-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-violet-600 hover:bg-violet-50'
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
                            placeholder="Search messages..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs focus:ring-2 focus:ring-violet-500/20 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Message</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">From / To</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Priority</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockMessages.map((msg) => {
                                const TypeIcon = typeStyles[msg.type].icon;
                                return (
                                    <tr key={msg.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 ${typeStyles[msg.type].bg} ${typeStyles[msg.type].text} rounded-lg flex items-center justify-center group-hover:bg-violet-600 transition-all`}>
                                                    <TypeIcon className="w-5 h-5 group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 group-hover:text-violet-600 transition-colors text-sm">{msg.subject}</p>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase mt-1">{msg.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-bold text-gray-900 text-xs">{msg.sender}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">To: {msg.recipients}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-1.5">
                                                {msg.priority === 'HIGH' && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                                                <span className={`text-[10px] uppercase font-black tracking-widest ${msg.priority === 'HIGH' ? 'text-amber-600' : msg.priority === 'NORMAL' ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {msg.priority}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[msg.status]}`}>
                                                {msg.status === 'SENT' && <CheckCircle2 className="w-3 h-3" />}
                                                {msg.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <p className="text-[10px] font-black text-gray-500 uppercase">{msg.sentAt}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
