import { useState } from "react";
import { 
    Package, 
    Clock, 
    MapPin, 
    Mail, 
    CheckCircle2, 
    XCircle, 
    Truck, 
    CreditCard 
} from "lucide-react";
import toast from "react-hot-toast";

const OrderManagement = () => {
    // Dummy Data for Orders
    const initialOrders = [
        {
            id: "ORD-5501",
            foodName: "Spicy Ramen Bowl",
            price: 12.50,
            quantity: 2,
            status: "pending",
            userEmail: "customer1@gmail.com",
            orderTime: "2025-12-17 08:30 PM",
            userAddress: "House 12, Road 5, Dhanmondi, Dhaka",
            paymentStatus: "Paid"
        },
        {
            id: "ORD-5502",
            foodName: "Classic Beef Burger",
            price: 9.99,
            quantity: 1,
            status: "accepted",
            userEmail: "alex.chef@yahoo.com",
            orderTime: "2025-12-17 09:15 PM",
            userAddress: "Flat 4B, Banani Tower, Dhaka",
            paymentStatus: "Pending"
        }
    ];

    const [orders, setOrders] = useState(initialOrders);

    const updateStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        toast.success(`Order ${newStatus} successfully!`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Package className="text-orange-500" /> Incoming Orders
                    </h2>
                    <p className="text-sm text-gray-500">Manage your active and past food orders</p>
                </div>
                <div className="px-4 py-2 bg-white border border-orange-200 rounded-xl text-orange-600 font-bold shadow-sm">
                    Active: {orders.filter(o => o.status !== "delivered").length}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        {/* Header: ID & Status */}
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                                <p className="text-sm font-mono font-bold text-gray-700">{order.id}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter 
                                ${order.status === 'pending' ? 'bg-blue-100 text-blue-600' : 
                                  order.status === 'accepted' ? 'bg-orange-100 text-orange-600' : 
                                  order.status === 'delivered' ? 'bg-green-100 text-green-600' : 
                                  'bg-red-100 text-red-600'}`}>
                                {order.status}
                            </div>
                        </div>

                        {/* Body: Details */}
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{order.foodName}</h3>
                                    <p className="text-orange-500 font-bold text-lg">${(order.price * order.quantity).toFixed(2)} 
                                        <span className="text-xs text-gray-400 font-normal ml-2">({order.quantity} x ${order.price})</span>
                                    </p>
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                                    <CreditCard size={14}/> {order.paymentStatus}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="truncate">{order.userEmail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{order.orderTime}</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-600 md:col-span-2">
                                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                    <span>{order.userAddress}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <button 
                                    disabled={order.status !== 'pending'}
                                    onClick={() => updateStatus(order.id, 'accepted')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition
                                    ${order.status === 'pending' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                >
                                    <CheckCircle2 size={18} /> Accept
                                </button>

                                <button 
                                    disabled={order.status !== 'accepted'}
                                    onClick={() => updateStatus(order.id, 'delivered')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition
                                    ${order.status === 'accepted' ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                >
                                    <Truck size={18} /> Deliver
                                </button>

                                <button 
                                    disabled={order.status === 'delivered' || order.status === 'cancelled'}
                                    onClick={() => updateStatus(order.id, 'cancelled')}
                                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold border-2 transition
                                    ${order.status === 'delivered' || order.status === 'cancelled' ? 'border-gray-100 text-gray-300 cursor-not-allowed' : 'border-red-100 text-red-500 hover:bg-red-50'}`}
                                >
                                    <XCircle size={18} /> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderManagement;