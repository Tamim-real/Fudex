import React from 'react';
import { CheckCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Main Card */}
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 text-center relative">
        
        {/* Animated Background Blob */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50"></div>
        
        {/* Success Icon Section */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-green-200 animate-bounce">
            <CheckCircle size={48} color="white" strokeWidth={3} />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-6">Your payment was successful and your food is being prepared.</p>

        {/* Delivery Info Box */}
        <div className="bg-orange-50 rounded-2xl p-4 flex items-center justify-between mb-6 border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-xl text-white">
              <Clock size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">Estimated Delivery</p>
              <p className="text-lg font-extrabold text-orange-900">25 - 30 Mins</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-orange-200"></div>
          <div className="text-right">
             <p className="text-[10px] text-orange-600 font-bold uppercase">Order ID</p>
             <p className="font-bold text-gray-800">#FDX-9921</p>
          </div>
        </div>

        {/* Tiny Tracker Component */}
        <div className="flex justify-between items-center mb-8 px-2">
          <div className="flex flex-col items-center gap-1">
             <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-100"></div>
             <span className="text-[10px] font-medium">Paid</span>
          </div>
          <div className="flex-1 h-[2px] bg-green-200 mx-2"></div>
          <div className="flex flex-col items-center gap-1">
             <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
             <span className="text-[10px] text-gray-400">Kitchen</span>
          </div>
          <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
          <div className="flex flex-col items-center gap-1">
             <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
             <span className="text-[10px] text-gray-400">On Way</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to='/dashboard/orders' className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95">
            View Orders <ArrowRight size={18} />
          </Link>
          <button className="w-full text-gray-500 font-semibold py-2 hover:text-orange-500 transition-colors">
            View Receipt
          </button>
        </div>
      </div>
      
      {/* Bottom Floating Note */}
      <p className="mt-8 text-gray-400 text-sm">Need help? <span className="text-orange-500 font-bold">Contact Support</span></p>
    </div>
  );
};

export default PaymentSuccess ;