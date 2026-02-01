interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color: 'teal' | 'blue' | 'purple' | 'orange' | 'pink' | 'green';
}

const colorClasses = {
    teal: 'from-teal-500 to-cyan-500 shadow-teal-500/25',
    blue: 'from-blue-500 to-indigo-500 shadow-blue-500/25',
    purple: 'from-purple-500 to-pink-500 shadow-purple-500/25',
    orange: 'from-orange-500 to-amber-500 shadow-orange-500/25',
    pink: 'from-pink-500 to-rose-500 shadow-pink-500/25',
    green: 'from-green-500 to-emerald-500 shadow-green-500/25',
};

export default function StatsCard({ title, value, icon, trend, color }: StatsCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-2 flex items-center gap-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            <span>{trend.isPositive ? '↑' : '↓'}</span>
                            <span>{Math.abs(trend.value)}% from yesterday</span>
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
