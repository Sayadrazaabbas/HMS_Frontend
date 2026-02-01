'use client';

import {
    Settings,
    Building2,
    User,
    Shield,
    Bell,
    Database,
    Globe,
    Smartphone,
    Save,
    Trash2,
    Lock
} from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 flex items-center gap-4 tracking-tighter">
                    <div className="p-3 bg-gray-900 rounded-2xl shadow-xl shadow-gray-900/10">
                        <Settings className="w-8 h-8 text-teal-400" />
                    </div>
                    System Configuration
                </h1>
                <p className="text-gray-500 font-bold mt-3 uppercase tracking-widest text-[10px]">Manage hospital profile, users, and security protocols</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Lateral Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { label: 'Hospital Profile', icon: Building2, active: true },
                        { label: 'User Management', icon: User, active: false },
                        { label: 'Roles & Security', icon: Shield, active: false },
                        { label: 'Notifications', icon: Bell, active: false },
                        { label: 'System & Backup', icon: Database, active: false },
                        { label: 'Localization', icon: Globe, active: false },
                        { label: 'Mobile App', icon: Smartphone, active: false },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${item.active
                                    ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/10'
                                    : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Settings Form */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border-2 border-gray-50 p-10 shadow-sm space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-1 h-8 bg-teal-400 rounded-full"></div>
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Hospital Identity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hospital Name</label>
                                <input
                                    type="text"
                                    defaultValue="BN Hospital"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-black focus:bg-white focus:border-teal-500/20 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Registration No</label>
                                <input
                                    type="text"
                                    defaultValue="HMS-2026-INDIA-001"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-black focus:bg-white focus:border-teal-500/20 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Administrator Email</label>
                                <input
                                    type="email"
                                    defaultValue="admin@bnhospital.com"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-black focus:bg-white focus:border-teal-500/20 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Emergency Hotline</label>
                                <input
                                    type="text"
                                    defaultValue="+91 1800-HMS-999"
                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-black focus:bg-white focus:border-teal-500/20 outline-none transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Address</label>
                            <textarea
                                rows={3}
                                defaultValue="123 Health City, Sector 44, Gurgaon, Haryana - 122003, India"
                                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-black focus:bg-white focus:border-teal-500/20 outline-none transition-all shadow-inner resize-none"
                            />
                        </div>

                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                            <button className="flex items-center gap-2 px-6 py-3 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-all">
                                <Trash2 className="w-4 h-4" /> Reset Profile
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs">
                                <Save className="w-4 h-4 text-teal-400" /> Save Configuration
                            </button>
                        </div>
                    </div>

                    {/* Security Preview Card */}
                    <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-500/30">
                                    <Shield className="w-3 h-3" /> Security Hardened
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">Login Policy & Sessions</h3>
                                <p className="text-gray-400 text-sm font-medium">Automatic logout after 30 minutes of inactivity. Multi-factor authentication is currently <span className="text-teal-400">active</span> for all administrative accounts.</p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]">
                                <Lock className="w-4 h-4 text-teal-400" /> UPDATE POLICY
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/5 blur-[80px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
