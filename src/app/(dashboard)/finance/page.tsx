'use client';

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    DollarSign,
    FilePieChart,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Download,
    Calendar,
    Filter,
    Plus,
    Activity
} from 'lucide-react';

export default function FinancePage() {
    const transactions = [
        { id: 'T-9921', date: '2023-11-01', patient: 'John Doe', type: 'INCOME', category: 'Consultation', amount: '₹1,500', status: 'COMPLETED' },
        { id: 'T-9922', date: '2023-11-01', patient: 'Med Supplies Ltd', type: 'EXPENSE', category: 'Pharmacy Stock', amount: '₹12,400', status: 'COMPLETED' },
        { id: 'T-9923', date: '2023-11-02', patient: 'Jane Smith', type: 'INCOME', category: 'Blood Test', amount: '₹2,500', status: 'PENDING' },
        { id: 'T-9924', date: '2023-11-02', patient: 'Universal TPA', type: 'INCOME', category: 'Insurance Claim', amount: '₹45,000', status: 'COMPLETED' },
        { id: 'T-9925', date: '2023-11-02', patient: 'Reliance Energy', type: 'EXPENSE', category: 'Electricity', amount: '₹8,900', status: 'COMPLETED' },
    ];

    return (
        <div className="space-y-8">
            {/* Elegant Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 tracking-tighter uppercase">
                        <div className="p-2.5 bg-gray-900 rounded-2xl">
                            <Wallet className="w-8 h-8 text-emerald-400" />
                        </div>
                        Finance & Accounts
                    </h1>
                    <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Financial health and transaction monitoring</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-95">
                        <Download className="w-5 h-5" /> EXPORT REPORT
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                        <Plus className="w-5 h-5" /> NEW EXPENSE
                    </button>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "₹24.8L", change: "+12.5%", up: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Total Expenses", value: "₹8.2L", change: "-2.4%", up: false, icon: TrendingDown, color: "text-rose-500", bg: "bg-rose-50" },
                    { label: "Net Profit", value: "₹16.6L", change: "+18.2%", up: true, icon: FilePieChart, color: "text-indigo-500", bg: "bg-indigo-50" },
                    { label: "Unpaid Dues", value: "₹2.4L", change: "Alert", up: false, icon: Activity, color: "text-amber-500", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-7 rounded-[2rem] border-2 border-gray-50 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-3xl group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <span className={`flex items-center gap-1 text-[10px] font-black tracking-widest uppercase ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Transaction Ledger Table */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden font-inter">
                <div className="p-8 border-b-2 border-gray-50 flex flex-col lg:flex-row items-center justify-between gap-6 bg-gray-50/20">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-12 bg-gray-900 rounded-full"></div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Transaction Ledger</h2>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mt-1">Real-time incoming and outgoing funds</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Filter transactions..."
                                className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-gray-50 rounded-3xl text-sm font-black focus:border-emerald-500/20 outline-none transition-all shadow-inner uppercase placeholder:text-gray-300"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-4 bg-white border-2 border-gray-50 rounded-3xl text-gray-500 hover:text-emerald-600 shadow-sm hover:shadow-md transition-all">
                                <Calendar className="w-5 h-5" />
                            </button>
                            <button className="p-4 bg-white border-2 border-gray-50 rounded-3xl text-gray-500 hover:text-emerald-600 shadow-sm hover:shadow-md transition-all">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/5 text-gray-400">
                                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.3em]">Transaction ID</th>
                                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.3em]">Entity / Date</th>
                                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.3em]">Category</th>
                                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.3em]">Amount</th>
                                <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.3em] text-right">Ledger</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-gray-50">
                            {transactions.map((t) => (
                                <tr key={t.id} className="group hover:bg-emerald-50/5 transition-all">
                                    <td className="px-10 py-7">
                                        <p className="font-black text-gray-900 uppercase text-sm tracking-tight">{t.id}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Ref 2038481</p>
                                    </td>
                                    <td className="px-10 py-7">
                                        <p className="font-black text-gray-900 uppercase text-sm">{t.patient}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{t.date}</p>
                                    </td>
                                    <td className="px-10 py-7">
                                        <span className={`inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${t.type === 'INCOME' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                                            }`}>
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="px-10 py-7">
                                        <p className={`text-lg font-black tracking-tighter ${t.type === 'INCOME' ? 'text-gray-900' : 'text-rose-600'}`}>
                                            {t.type === 'INCOME' ? '+' : '-'}{t.amount}
                                        </p>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <span className={`inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase ${t.status === 'COMPLETED' ? 'text-emerald-500' : 'text-amber-500'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'COMPLETED' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`}></div>
                                            {t.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-gray-900 mt-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-emerald-400">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Summary for November 2023</p>
                            <p className="text-white font-bold text-sm">Monthly projection indicates <span className="text-emerald-400">+14.2%</span> growth compared to October.</p>
                        </div>
                    </div>
                    <button className="px-8 py-3.5 bg-emerald-500 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-xs">
                        Audit Logs
                    </button>
                </div>
            </div>
        </div>
    );
}
