import { 
    ShoppingBag, 
    Clock, 
    DollarSign, 
    User, 
    Hash, 
    CheckCircle2, 
    Timer, 
    PackageCheck,
    AlertCircle
} from "lucide-react";

const Orders = () => {
    // Dummy Data for User's Orders
    const orders = [
        {
            id: 1,
            foodName: "Spicy Ramen Bowl",
            foodImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
            price: 12.50,
            quantity: 2,
            status: "preparing", // pending, preparing, delivered, cancelled
            deliveryTime: "30 mins",
            chefName: "Chef Rakib",
            chefId: "CH-9921",
            paymentStatus: "Paid"
        },
        {
            id: 2,
            foodName: "Margherita Pizza",
            foodImage: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500",
            price: 15.50,
            quantity: 1,
            status: "delivered",
            deliveryTime: "Completed",
            chefName: "Chef Mitu",
            chefId: "CH-4402",
            paymentStatus: "Paid"
        },
        {
            id: 3,
            foodName: "Classic Beef Burger",
            foodImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
            price: 9.99,
            quantity: 1,
            status: "pending",
            deliveryTime: "45 mins",
            chefName: "Chef Arif",
            chefId: "CH-1029",
            paymentStatus: "Pending"
        }
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-600 border-green-200';
            case 'preparing': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'pending': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
            case 'cancelled': return 'bg-red-100 text-red-600 border-red-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        <ShoppingBag className="text-orange-500" /> My Order History
                    </h2>
                    <p className="text-sm text-gray-500">Track and manage your recent food journeys</p>
                </div>
                <div className="hidden md:block">
                    <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold text-sm">
                        Total Orders: {orders.length}
                    </span>
                </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-100/20 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row">
                            {/* Image Section */}
                            <div className="sm:w-40 h-40 relative shrink-0">
                                <img 
                                    src={order.foodImage} 
                                    className="w-full h-full object-cover"
                                    alt={order.foodName}
                                />
                                <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border shadow-sm ${getStatusStyles(order.status)}`}>
                                    {order.status}
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-black text-gray-800 text-lg leading-tight">{order.foodName}</h3>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 py-2">
                                        <div className="flex items-center gap-1 text-orange-600 font-bold">
                                            <DollarSign size={14} />
                                            <span>{(order.price * order.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 font-medium">
                                            Qty: <span className="text-gray-700">{order.quantity}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chef & Time Footer */}
                                <div className="pt-3 border-t border-gray-50 flex flex-wrap gap-y-2 justify-between items-center">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-1 text-xs text-gray-600 font-semibold">
                                            <User size={12} className="text-blue-500" />
                                            <span>{order.chefName}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                                            <Hash size={10} />
                                            <span>{order.chefId}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl">
                                        <Clock size={14} className="text-orange-500" />
                                        <span className="text-xs font-bold text-gray-600">{order.deliveryTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {orders.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="text-gray-300" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No Orders Yet!</h3>
                    <p className="text-gray-500">Hungry? Order some delicious meals now.</p>
                </div>
            )}
        </div>
    );
};

export default Orders;