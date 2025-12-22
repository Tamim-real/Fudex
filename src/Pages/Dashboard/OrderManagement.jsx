import { useContext, useEffect, useState } from "react";
import {
  Package,
  Clock,
  Mail,
  CheckCircle2,
  XCircle,
  Truck,
  CreditCard,
  ChefHat,
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

const OrderManagement = () => {
  const { user, loading } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;

    fetch(`https://fudex-sever.vercel.app/chef-orders?email=${user.email}`)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, [user?.email, loading]);

 const updateStatus = async (id, status) => {
  try {
    const res = await fetch(`https://fudex-sever.vercel.app/chef-orders/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }), 
    });

    if (res.ok) {
      toast.success(`Order ${status} successfully!`);
      setData(prev =>
        prev.map(o => (o._id === id ? { ...o, orderStatus: status } : o))
      );
    }
  } catch (err) {
    toast.error("Status update failed");
  }
};


  const activeCount = data.filter(o => o.orderStatus !== "delivered" && o.orderStatus !== "cancelled").length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-[#F9FAFB] min-h-screen">
      <title>OrderMgt</title>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ChefHat className="text-orange-600" size={28} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Order Dashboard
            </h2>
          </div>
          <p className="text-gray-500 font-medium ml-12">
            Real-time update for your kitchen pipeline
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 pr-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {activeCount}
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Active Orders</p>
            <p className="text-sm font-bold text-gray-700">Needs Attention</p>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.map(order => (
          <div
            key={order._id}
            className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 overflow-hidden"
          >
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono font-bold text-gray-500">ID: {order._id.slice(-8).toUpperCase()}</span>
              </div>
              <div
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm
                  ${order.orderStatus === "placed" ? "bg-amber-100 text-amber-700" :
                    order.orderStatus === "accepted" ? "bg-blue-100 text-blue-700" :
                      order.orderStatus === "delivered" ? "bg-emerald-100 text-emerald-700" :
                        "bg-rose-100 text-rose-700"
                  }`}
              >
                {order.orderStatus}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-gray-800 group-hover:text-orange-600 transition-colors">
                    {order.foodName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black text-gray-900">${order.price}</span>
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      <CreditCard size={12} /> {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <Clock className="text-gray-400 mb-1" size={18} />
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Prepare By</p>
                  <p className="text-xs font-bold text-gray-700">{order.deliveryTime}</p>
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-2 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={16} className="text-orange-400" />
                  <span className="text-sm font-medium">{order.customerEmail}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Accept Button:*/}
                <button
                  disabled={order.orderStatus !== "placed" && order.orderStatus !== "pending"}
                  onClick={() => updateStatus(order._id, "accepted")}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all
      ${(order.orderStatus === "placed" || order.orderStatus === "pending")
                      ? "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-100"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"}`}
                >
                  <CheckCircle2 size={18} /> Accept
                </button>

                {/* Deliver Button */}
                <button
                  disabled={order.orderStatus !== "accepted"}
                  onClick={() => updateStatus(order._id, "delivered")}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all
      ${order.orderStatus === "accepted"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"}`}
                >
                  <Truck size={18} /> Deliver
                </button>

                {/* Cancel Button */}
                <button
                  disabled={order.orderStatus === "delivered" || order.orderStatus === "cancelled"}
                  onClick={() => updateStatus(order._id, "cancelled")}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold border-2 transition-all
      ${order.orderStatus === "delivered" || order.orderStatus === "cancelled"
                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-rose-100 text-rose-500 hover:bg-rose-50 hover:border-rose-200"}`}
                >
                  <XCircle size={18} /> Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
          <Package size={64} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-400">No orders found at the moment</h3>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;