const Orders = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-orange-500 mb-4">
        My Orders
      </h2>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 flex justify-between">
          <div>
            <h3 className="font-medium">Burger Combo</h3>
            <p className="text-sm text-gray-500">
              Order ID: #FDX123
            </p>
          </div>
          <span className="text-green-600 font-semibold">
            Delivered
          </span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
