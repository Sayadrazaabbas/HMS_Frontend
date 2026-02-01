'use client';

import {
    UserCircle,
    Users,
    CalendarCheck,
    Briefcase,
    Clock,
    Search,
    Filter,
    Plus,
    CreditCard,
    TrendingUp,
    MoreVertical
} from 'lucide-react';

export default function HRPage() {
    const employees = [
        { name: 'Dr. Sarah Smith', role: 'Senior Cardiologist', dept: 'Cardiology', status: 'Present', attendance: '98%', id: 'E-001' },
        { name: 'James Wilson', role: 'Staff Nurse', dept: 'Emergency', status: 'On Leave', attendance: '92%', id: 'E-012' },
        { name: 'Emily Chen', role: 'Lab Technician', dept: 'Pathology', status: 'Present', attendance: '95%', id: 'E-045' },
        { name: 'Michael Ross', role: 'Accountant', dept: 'Finance', status: 'Present', attendance: '99%', id: 'E-003' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2 tracking-tight">
                        <UserCircle className="w-8 h-8 text-blue-600" />
                        HR & Payroll
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">Manage hospital staff, attendance, and payroll</p>
                </div>
                <div className="flex gap-2">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                        <Plus className="w-5 h-5" />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* HR Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Staff', value: 142, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Today Present', value: 128, icon: CalendarCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Pending Payroll', value: '₹4.2L', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Retention Rate', value: '94%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 leading-tight">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Employee Directory */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden font-inter">
                <div className="p-8 border-b border-gray-50 bg-gray-50/20 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Employee Directory</h2>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100 uppercase tracking-widest">
                            {employees.length} Members
                        </span>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, dept, or ID..."
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-inner"
                            />
                        </div>
                        <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-500 hover:text-blue-600 shadow-sm transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50/10">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Employee Info</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Department</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Attendance</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employees.map((emp) => (
                                <tr key={emp.id} className="group hover:bg-blue-50/10 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-400 font-black border border-gray-200 shadow-sm uppercase group-hover:scale-110 transition-transform">
                                                {emp.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 uppercase text-sm tracking-tight">{emp.name}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{emp.id} • {emp.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{emp.dept}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1.5 w-32">
                                            <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                <span>Monthly</span>
                                                <span className="text-blue-600 font-black">{emp.attendance}</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full" style={{ width: emp.attendance }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${emp.status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                            <MoreVertical className="w-5 h-5" />
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
