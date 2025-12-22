import { 
    DollarSign, 
    Users, 
    Clock, 
    Truck, 
    BarChart3, 
    TrendingUp 
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend
} from 'recharts';

const PlatformStatistics = () => {
    // Dummy Data for Metrics
    const stats = {
        totalPayment: 15420.50,
        totalUsers: 1250,
        ordersPending: 45,
        ordersDelivered: 890
    };

    // Data for Bar Chart (Payments vs Users)
    const barData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5500 },
        { name: 'Apr', revenue: 4500 },
        { name: 'May', revenue: stats.totalPayment },
    ];

    // Data for Pie Chart (Order Distribution)
    const pieData = [
        { name: 'Delivered', value: stats.ordersDelivered, color: '#10b981' }, // Green
        { name: 'Pending', value: stats.ordersPending, color: '#f59e0b' },    // Orange
    ];

    const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${colorClass}`}>
                    <Icon size={24} className="text-white" />
                </div>
                {trend && (
                    <span className="flex items-center gap-1 text-green-500 text-xs font-bold">
                        <TrendingUp size={12} /> +{trend}%
                    </span>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-black text-gray-800 mt-1">
                    {typeof value === 'number' && value > 1000 ? `$${value.toLocaleString()}` : value}
                </p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <title>Statistic</title>
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart3 className="text-orange-500" /> Platform Insights
                </h2>
                <p className="text-sm text-gray-500">Real-time overview of Fudex performance metrics</p>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Revenue" 
                    value={stats.totalPayment} 
                    icon={DollarSign} 
                    colorClass="bg-green-500" 
                    trend="12"
                />
                <StatCard 
                    title="Total Users" 
                    value={stats.totalUsers} 
                    icon={Users} 
                    colorClass="bg-blue-500" 
                    trend="5"
                />
                <StatCard 
                    title="Orders Pending" 
                    value={stats.ordersPending} 
                    icon={Clock} 
                    colorClass="bg-orange-500" 
                />
                <StatCard 
                    title="Orders Delivered" 
                    value={stats.ordersDelivered} 
                    icon={Truck} 
                    colorClass="bg-purple-500" 
                    trend="8"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Bar Chart - Revenue Overview */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Growth (Monthly)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart - Order Status */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Order Delivery Ratio</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Efficiency</p>
                        <p className="text-xl font-black text-green-500">95.2%</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlatformStatistics;