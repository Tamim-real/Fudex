import {
  ShoppingBag,
  Clock,
  DollarSign,
  User,
  Hash,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Orders = () => {
  const { user, loading } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;

    fetch(`http://localhost:3000/customer-orders?email=${user.email}`)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, [user?.email, loading]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-600 border-green-200";
      case "preparing":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "placed":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600";
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
          <p className="text-sm text-gray-500">
            Track and manage your recent food journeys
          </p>
        </div>
        <div className="hidden md:block">
          <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold text-sm">
            Total Orders: {data.length}
          </span>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="sm:w-40 h-40 relative shrink-0">
                <img
                  src={order.foodImage}
                  className="w-full h-full object-cover"
                  alt={order.foodName}
                />
                <div
                  className={`absolute top-2 left-2 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyles(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-gray-800 text-lg">
                      {order.foodName}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        order.paymentStatus === "paid"
                          ? "bg-green-50 text-green-500"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-2">
                    <div className="flex items-center gap-1 text-orange-600 font-bold">
                      <DollarSign size={14} />
                      <span>{order.price.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                      Qty: <span className="text-gray-700">1</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                  <div>
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
                    <span className="text-xs font-bold text-gray-600">
                      {order.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <ShoppingBag className="mx-auto text-gray-300" size={48} />
          <h3 className="text-xl font-bold text-gray-800 mt-4">
            No Orders Yet!
          </h3>
          <p className="text-gray-500">
            Hungry? Order some delicious meals now.
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
