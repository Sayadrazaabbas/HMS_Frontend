'use client';

import { useState } from 'react';
import {
    Bed,
    Users,
    UserPlus,
    LogOut,
    Search,
    Filter,
    LayoutGrid,
    List,
    AlertCircle,
    CheckCircle2,
    Clock
} from 'lucide-react';

interface IPDBed {
    id: string;
    bedNo: string;
    wardName: string;
    type: 'GENERAL' | 'ICU' | 'PRIVATE' | 'SEMI-PRIVATE';
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'CLEANING';
    patient?: {
        name: string;
        id: string;
        admittedDate: string;
        doctor: string;
    };
}

const mockBeds: IPDBed[] = [
    { id: 'b1', bedNo: 'G-101', wardName: 'General Ward A', type: 'GENERAL', status: 'OCCUPIED', patient: { name: 'Amit Kumar', id: 'PT-1088', admittedDate: '2023-10-20', doctor: 'Dr. Smith' } },
    { id: 'b2', bedNo: 'G-102', wardName: 'General Ward A', type: 'GENERAL', status: 'AVAILABLE' },
    { id: 'b3', bedNo: 'I-201', wardName: 'ICU Unit 1', type: 'ICU', status: 'OCCUPIED', patient: { name: 'Priya Verma', id: 'PT-2051', admittedDate: '2023-10-25', doctor: 'Dr. Wilson' } },
    { id: 'b4', bedNo: 'P-301', wardName: 'Private Wing', type: 'PRIVATE', status: 'AVAILABLE' },
    { id: 'b5', bedNo: 'S-401', wardName: 'Semi-Private B', type: 'SEMI-PRIVATE', status: 'AVAILABLE' },
    { id: 'b6', bedNo: 'G-103', wardName: 'General Ward A', type: 'GENERAL', status: 'CLEANING' },
    { id: 'b7', bedNo: 'I-202', wardName: 'ICU Unit 1', type: 'ICU', status: 'RESERVED' },
    { id: 'b8', bedNo: 'P-302', wardName: 'Private Wing', type: 'PRIVATE', status: 'OCCUPIED', patient: { name: 'Robert Fox', id: 'PT-3094', admittedDate: '2023-10-26', doctor: 'Dr. Sarah' } },
];

const statusColors = {
    AVAILABLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    OCCUPIED: 'bg-rose-100 text-rose-700 border-rose-200',
    RESERVED: 'bg-amber-100 text-amber-700 border-amber-200',
    CLEANING: 'bg-gray-100 text-gray-700 border-gray-200',
};

export default function IPDPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');

    const filteredBeds = mockBeds.filter(b =>
        b.bedNo.toLowerCase().includes(search.toLowerCase()) ||
        b.patient?.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Bed className="w-8 h-8 text-rose-600" />
                        IPD / Bed Management
                    </h1>
                    <p className="text-gray-500 mt-1">Manage ward occupancy and patient admissions</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white font-medium rounded-xl hover:bg-rose-700 transition-all shadow-md shadow-rose-500/20">
                        <UserPlus className="w-4 h-4" />
                        Admit Patient
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Beds', value: 200, icon: Bed, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Available', value: 45, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Occupied', value: 152, icon: Users, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Reserved', value: 3, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters & Actions */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Bed No or Patient Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200 w-full sm:w-auto">
                    <button
                        onClick={() => setView('grid')}
                        className={`flex-1 sm:flex-none flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'grid' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <LayoutGrid className="w-4 h-4" /> Grid
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`flex-1 sm:flex-none flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'list' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <List className="w-4 h-4" /> List
                    </button>
                </div>
            </div>

            {/* Bed Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBeds.map((bed) => (
                    <div
                        key={bed.id}
                        className={`group bg-white rounded-2xl border-2 p-5 transition-all hover:shadow-xl hover:-translate-y-1 ${bed.status === 'OCCUPIED' ? 'border-rose-100' :
                                bed.status === 'AVAILABLE' ? 'border-emerald-100' : 'border-gray-100'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner group-hover:scale-110 transition-transform">
                                <Bed className={`w-6 h-6 ${bed.status === 'OCCUPIED' ? 'text-rose-600' : 'text-emerald-600'}`} />
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[bed.status]}`}>
                                {bed.status}
                            </span>
                        </div>

                        <div className="space-y-1 mb-4">
                            <h3 className="text-lg font-black text-gray-900">{bed.bedNo}</h3>
                            <p className="text-xs font-bold text-gray-500">{bed.wardName} • {bed.type}</p>
                        </div>

                        {bed.patient ? (
                            <div className="p-3 bg-gray-50 rounded-xl space-y-2 border border-blue-50">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Current Patient</p>
                                    <p className="text-sm font-black text-gray-900">{bed.patient.name}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[10px] font-bold text-gray-500">Admitted: {bed.patient.admittedDate}</p>
                                    <button className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors">
                                        Discharge <LogOut className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className={`w-full py-3 rounded-xl border-2 border-dashed font-black text-sm transition-all ${bed.status === 'AVAILABLE'
                                    ? 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                }`}>
                                {bed.status === 'AVAILABLE' ? 'ASSIGN BED' : 'NOT READY'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
