'use client';

import { Rocket, Clock, ArrowLeft, LayoutDashboard, Construction } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ComingSoonContent() {
    const searchParams = useSearchParams();
    const moduleName = searchParams.get('module') || 'this area';

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full animate-pulse delay-700"></div>

            <div className="relative z-10 text-center max-w-2xl">
                {/* Construction Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl shadow-teal-500/10 border border-gray-50 mb-8 relative group">
                    <Construction className="w-12 h-12 text-teal-500 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-amber-500/20">
                        <Clock className="w-4 h-4 text-white animate-spin-slow" />
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-4">
                    {moduleName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Coming Soon</span>
                </h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-12">Building a premium hospital experience</p>

                <p className="text-gray-500 text-lg font-medium leading-relaxed mb-12 px-8">
                    We are building a world-class experience for the <span className="text-teal-600 font-black tracking-tight">{moduleName}</span> module. Our team is working hard to bring you advanced tools that will revolutionize your operations.
                </p>

                {/* Progress Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: 'Design Status', val: 'Completed', color: 'text-emerald-500' },
                        { label: 'Development', val: 'In Progress', color: 'text-amber-500' },
                        { label: 'Estimated', val: 'Q3 2026', color: 'text-teal-500' },
                    ].map((step, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{step.label}</p>
                            <p className={`text-sm font-black uppercase ${step.color}`}>{step.val}</p>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20 active:scale-95 group"
                    >
                        <LayoutDashboard className="w-5 h-5 text-teal-400" />
                        BACK TO DASHBOARD
                    </Link>
                    <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
                        <Construction className="w-5 h-5 text-amber-500" />
                        REQUEST PRIORITY
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ComingSoonPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black animate-pulse uppercase tracking-[0.5em] text-gray-300">Loading Module...</div>}>
            <ComingSoonContent />
        </Suspense>
    );
}
