'use client';

import {
    Droplets,
    Users,
    Calendar,
    AlertTriangle,
    Search,
    Plus,
    ArrowRight,
    History,
    Activity,
    ShieldCheck
} from 'lucide-react';

interface BloodUnit {
    group: string;
    units: number;
    status: 'OPTIMAL' | 'LOW' | 'CRITICAL';
    color: string;
}

const bloodInventory: BloodUnit[] = [
    { group: 'A+', units: 24, status: 'OPTIMAL', color: 'bg-rose-500' },
    { group: 'A-', units: 5, status: 'LOW', color: 'bg-amber-500' },
    { group: 'B+', units: 18, status: 'OPTIMAL', color: 'bg-rose-500' },
    { group: 'B-', units: 2, status: 'CRITICAL', color: 'bg-rose-600' },
    { group: 'O+', units: 42, status: 'OPTIMAL', color: 'bg-rose-500' },
    { group: 'O-', units: 3, status: 'CRITICAL', color: 'bg-rose-600' },
    { group: 'AB+', units: 12, status: 'OPTIMAL', color: 'bg-rose-500' },
    { group: 'AB-', units: 4, status: 'LOW', color: 'bg-amber-500' },
];

export default function BloodBankPage() {
    return (
        <div className="space-y-8">
            {/* Premium Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tighter uppercase">
                        <div className="p-2.5 bg-rose-600 rounded-2xl shadow-lg shadow-rose-200">
                            <Droplets className="w-8 h-8 text-white" />
                        </div>
                        Blood Bank Inventory
                    </h1>
                    <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Real-time blood stock and donor management system</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                        <Users className="w-5 h-5" /> DONOR REGISTRATION
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-500/25 active:scale-95">
                        <Plus className="w-5 h-5" /> NEW DONATION
                    </button>
                </div>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {bloodInventory.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-50 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start relative z-10">
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{item.group}</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.status}</p>
                            </div>
                            <div className={`p-3 rounded-2xl ${item.status === 'CRITICAL' ? 'bg-rose-100 text-rose-600' : item.status === 'LOW' ? 'bg-amber-100 text-amber-600' : 'bg-rose-50 text-rose-500'}`}>
                                <Droplets className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-6 relative z-10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-2xl font-black text-gray-900">{item.units}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Units available</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${item.status === 'CRITICAL' ? 'bg-rose-600' :
                                            item.status === 'LOW' ? 'bg-amber-500' : 'bg-rose-500'
                                        }`}
                                    style={{ width: `${Math.min((item.units / 50) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className={`absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity -mr-8 -mb-8 translate-y-4 translate-x-4 rotate-12`}>
                            <Droplets className="w-full h-full text-rose-600" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Transactions & Donor Queue */}
                <div className="xl:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden font-inter">
                    <div className="p-8 border-b-2 border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50/20">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-rose-600 rounded-full"></div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Live Donor Queue</h2>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by donor or blood group..."
                                className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-50 rounded-2xl text-sm font-black focus:border-rose-500/20 outline-none transition-all uppercase placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left bg-gray-50/10 text-gray-400">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Donor Identity</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Blood Group</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Collection Time</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-gray-50">
                                {[
                                    { name: 'Rahul Khanna', id: 'D-9981', group: 'O+', status: 'SCREENING', time: '10:45 AM' },
                                    { name: 'Priya Sharma', id: 'D-9982', group: 'AB-', status: 'COLLECTING', time: '11:15 AM' },
                                    { name: 'Anil Gupta', id: 'D-9983', group: 'B+', status: 'RECOVERY', time: '10:15 AM' },
                                    { name: 'Sara Ali', id: 'D-9984', group: 'A-', status: 'SCREENING', time: '11:30 AM' },
                                ].map((donor, i) => (
                                    <tr key={i} className="group hover:bg-rose-50/5 transition-all">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 font-black border border-gray-200 group-hover:scale-110 transition-transform">
                                                    {donor.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 uppercase text-xs">{donor.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{donor.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="inline-flex px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-black tracking-widest border border-rose-100">
                                                {donor.group}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${donor.status === 'COLLECTING' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'}`}></div>
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{donor.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase">
                                            {donor.time}
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button className="text-rose-600 hover:text-rose-700 text-xs font-black flex items-center gap-1 ml-auto">
                                                DETAILS <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side Statistics & Alerts */}
                <div className="space-y-8">
                    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3 mb-6">
                                <AlertTriangle className="w-6 h-6 text-amber-400" />
                                Critical Stock Alerts
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { group: 'O-', units: '3', urgency: 'CRITICAL' },
                                    { group: 'B-', units: '2', urgency: 'CRITICAL' },
                                    { group: 'A-', units: '5', urgency: 'LOW' },
                                ].map((alert, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-black">
                                                {alert.group}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-widest">{alert.urgency}</p>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold">{alert.units} units remaining</p>
                                            </div>
                                        </div>
                                        <button className="p-2 bg-rose-500 text-white rounded-lg">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[80px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                                <Activity className="w-6 h-6 text-rose-600" />
                                24h Activity
                            </h3>
                            <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">View History</button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: 'Emergency Dispatch', desc: '4 Units O+ to ER', time: '15m ago', icon: ShieldCheck, color: 'text-rose-500', bg: 'bg-rose-50' },
                                { title: 'Donation Success', desc: 'Donor D-9972 Completed', time: '42m ago', icon: History, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                                { title: 'Inventory Update', desc: 'Stock Count Verified', time: '3h ago', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className={`shrink-0 w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{item.title}</p>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">{item.time}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
