'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Receipt,
    Pill,
    FlaskConical,
    Bed,
    Settings,
    ChevronLeft,
    ChevronRight,
    Building2,
    Stethoscope,
    HeartPulse,
    Ambulance,
    UserCircle,
    Wallet,
    Headset,
    Baby,
    Scan,
    Scissors,
    ShieldCheck,
    UserPlus,
    Boxes,
    MessageSquare,
    Award
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'OPD', href: '/opd', icon: Stethoscope },
    { name: 'IPD', href: '/ipd', icon: Bed },
    { name: 'Pharmacy', href: '/pharmacy', icon: Pill },
    { name: 'Laboratory', href: '/laboratory', icon: FlaskConical },
    { name: 'Radiology', href: '/radiology', icon: Scan },
    { name: 'Blood Bank', href: '/blood-bank', icon: HeartPulse },
    { name: 'Ambulance', href: '/ambulance', icon: Ambulance },
    { name: 'Front Office', href: '/front-office', icon: Headset },
    { name: 'Birth & Death Record', href: '/birth-death', icon: Baby },
    { name: 'Operation Theatre', href: '/ot', icon: Scissors },
    { name: 'TPA Management', href: '/tpa', icon: ShieldCheck },
    { name: 'Referral', href: '/referral', icon: UserPlus },
    { name: 'Billing', href: '/billing', icon: Receipt },
    { name: 'Finance', href: '/finance', icon: Wallet },
    { name: 'Inventory', href: '/inventory', icon: Boxes },
    { name: 'Messaging', href: '/messaging', icon: MessageSquare },
    { name: 'Certificates', href: '/certificates', icon: Award },
    { name: 'HR & Payroll', href: '/hr', icon: UserCircle },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const categories = [
        {
            title: 'Main',
            items: [
                { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
                { name: 'Patients', href: '/patients', icon: Users },
                { name: 'Appointments', href: '/appointments', icon: Calendar },
                { name: 'Messaging', href: '/messaging', icon: MessageSquare },
            ]
        },
        {
            title: 'Clinical',
            items: [
                { name: 'OPD', href: '/opd', icon: Stethoscope },
                { name: 'IPD', href: '/ipd', icon: Bed },
                { name: 'Operation Theatre', href: '/ot', icon: Scissors },
                { name: 'Radiology', href: '/radiology', icon: Scan },
                { name: 'Laboratory', href: '/laboratory', icon: FlaskConical },
                { name: 'Blood Bank', href: '/blood-bank', icon: HeartPulse },
            ]
        },
        {
            title: 'Support',
            items: [
                { name: 'Pharmacy', href: '/pharmacy', icon: Pill },
                { name: 'Ambulance', href: '/ambulance', icon: Ambulance },
                { name: 'Front Office', href: '/front-office', icon: Headset },
                { name: 'Inventory', href: '/inventory', icon: Boxes },
            ]
        },
        {
            title: 'Management',
            items: [
                { name: 'Billing', href: '/billing', icon: Receipt },
                { name: 'Finance', href: '/finance', icon: Wallet },
                { name: 'TPA Management', href: '/tpa', icon: ShieldCheck },
                { name: 'Referral', href: '/referral', icon: UserPlus },
                { name: 'HR & Payroll', href: '/hr', icon: UserCircle },
            ]
        },
        {
            title: 'Other',
            items: [
                { name: 'Birth & Death', href: '/birth-death', icon: Baby },
                { name: 'Certificates', href: '/certificates', icon: Award },
                { name: 'Settings', href: '/settings', icon: Settings },
            ]
        }
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-40 flex flex-col ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Logo */}
            <div className={`h-20 flex-shrink-0 flex items-center border-b border-gray-700/50 transition-all duration-300 ${collapsed ? 'justify-center px-0' : 'px-6'}`}>
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className={`relative transition-all duration-300 ${collapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
                        <img
                            src={collapsed ? "/logo-icon.png" : "/logo-white.png"}
                            alt="BN Hospital"
                            className="w-full h-full object-contain filter brightness-110 group-hover:scale-105 transition-transform"
                        />
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden whitespace-nowrap">
                            <h1 className="font-black text-lg tracking-tighter leading-none group-hover:text-teal-400 transition-colors">BN HOSPITAL</h1>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Health Care Service</p>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
                {categories.map((category) => (
                    <div key={category.title} className="space-y-2">
                        {!collapsed && (
                            <h3 className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                {category.title}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {category.items.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all group ${isActive
                                            ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-400 border border-teal-500/20'
                                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <item.icon
                                            className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-teal-400' : 'text-gray-400 group-hover:text-white'
                                                }`}
                                        />
                                        {!collapsed && (
                                            <span className="flex-1 text-xs font-semibold tracking-tight uppercase">{item.name}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Collapse Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 hover:text-white transition-colors shadow-lg z-50"
            >
                {collapsed ? (
                    <ChevronRight className="w-4 h-4" />
                ) : (
                    <ChevronLeft className="w-4 h-4" />
                )}
            </button>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(20, 184, 166, 0.4);
                }
            `}</style>
        </aside>
    );
}
