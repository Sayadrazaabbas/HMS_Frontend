'use client';

import {
    Ambulance,
    MapPin,
    Phone,
    Clock,
    CheckCircle2,
    AlertCircle,
    Navigation,
    User,
    Plus,
    Activity,
    Shield
} from 'lucide-react';

interface Vehicle {
    id: string;
    plateNo: string;
    driver: string;
    phone: string;
    status: 'AVAILABLE' | 'ON_TRIP' | 'MAINTENANCE';
    lastLocation: string;
    type: 'ALS' | 'BLS' | 'CARDIAC'; // Advanced Life Support, Basic Life Support
}

const vehicles: Vehicle[] = [
    { id: 'v1', plateNo: 'DL 01 AM 1234', driver: 'Rajesh Kumar', phone: '9876543210', status: 'AVAILABLE', lastLocation: 'Hospital Base', type: 'ALS' },
    { id: 'v2', plateNo: 'DL 01 AM 5678', driver: 'Suresh Singh', phone: '9876543211', status: 'ON_TRIP', lastLocation: 'Sector 4, Connaught Place', type: 'BLS' },
    { id: 'v3', plateNo: 'DL 01 AM 9012', driver: 'Amit Pal', phone: '9876543212', status: 'ON_TRIP', lastLocation: 'Metro Station, Rohini', type: 'CARDIAC' },
    { id: 'v4', plateNo: 'DL 01 AM 3456', driver: 'Vijay Das', phone: '9876543213', status: 'MAINTENANCE', lastLocation: 'Workshop', type: 'BLS' },
];

export default function AmbulancePage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Ambulance className="w-8 h-8 text-rose-600" />
                        Ambulance Fleet Management
                    </h1>
                    <p className="text-gray-500 mt-1">Real-time emergency dispatch and vehicle tracking</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20">
                        <Plus className="w-5 h-5" />
                        Dispatch Emergency
                    </button>
                </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Fleet', value: 8, icon: Ambulance, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Ready Dispatch', value: 3, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Active Trips', value: 4, icon: Navigation, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'High Priority', value: 1, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Vehicle Fleet Grid */}
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4" /> Live Fleet Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {vehicles.map((v) => (
                    <div key={v.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                        <div className={`h-2 w-full ${v.status === 'AVAILABLE' ? 'bg-emerald-500' :
                                v.status === 'ON_TRIP' ? 'bg-rose-500' : 'bg-gray-400'
                            }`} />
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-gray-900 leading-none">{v.plateNo}</h3>
                                    <span className="inline-block px-2 py-0.5 rounded-md bg-gray-900 text-[10px] text-white font-black tracking-widest uppercase">
                                        {v.type}
                                    </span>
                                </div>
                                <div className={`p-2 rounded-xl border ${v.status === 'AVAILABLE' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                        v.status === 'ON_TRIP' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-gray-50 border-gray-100 text-gray-500'
                                    }`}>
                                    <Ambulance className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">Driver</p>
                                        <p className="text-sm font-black text-gray-900 leading-none">{v.driver}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">Contact</p>
                                        <p className="text-sm font-black text-gray-900 leading-none">{v.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">Last Location</p>
                                        <p className="text-xs font-bold text-gray-600 line-clamp-1">{v.lastLocation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${v.status === 'AVAILABLE' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{v.status}</span>
                                </div>
                                <button className="text-rose-600 hover:text-rose-700 text-xs font-black flex items-center gap-1 transition-all group-hover:translate-x-1">
                                    DETAILS <Navigation className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fleet Quality Notice */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Shield className="w-3 h-3" /> System Certified
                        </div>
                        <h2 className="text-3xl font-black leading-tight">Emergency Response Unit - BN Hospital</h2>
                        <p className="text-gray-400 font-medium">All vehicles are equipped with real-time GPS tracking and 5G medical telemetry. Response time target is under 15 minutes within city limits.</p>
                    </div>
                    <button className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl whitespace-nowrap">
                        VIEW TRIP ANALYTICS
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
            </div>
        </div>
    );
}
