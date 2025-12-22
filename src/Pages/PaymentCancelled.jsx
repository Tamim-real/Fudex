import React from 'react';
import { XCircle, AlertCircle, RefreshCw, CreditCard, ChevronLeft } from 'lucide-react';

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <title>Payment Cancel</title>
      {/* Main Error Card */}
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 text-center border border-red-50 relative">
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-red-50 rounded-full blur-2xl opacity-60"></div>

        {/* Cancel Icon with Ripple Effect */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute animate-ping w-20 h-20 bg-red-100 rounded-full opacity-75"></div>
          <div className="relative w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
            <XCircle size={48} color="white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Text Section */}
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Payment Failed!</h2>
        <p className="text-gray-500 text-sm px-4 mb-8">
          We couldn't process your payment. Don't worry, your money hasn't been deducted.
        </p>

        {/* Error Detail Box */}
        <div className="bg-red-50 rounded-2xl p-4 flex items-start gap-3 mb-8 text-left border border-red-100">
          <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-tight">Reason</p>
            <p className="text-sm text-red-800 font-medium">Transaction declined by the bank or timeout.</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-3">
          {/* Try Again Button */}
          <button className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-lg shadow-red-100 active:scale-95">
            <RefreshCw size={18} /> Try Again
          </button>
          
          {/* Change Method Button */}
          <button className="w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-95">
            <CreditCard size={18} /> Use Other Method
          </button>
        </div>

        {/* Back to Home Link */}
        <button className="mt-6 flex items-center justify-center gap-1 text-gray-400 font-semibold text-sm mx-auto hover:text-gray-600 transition-colors">
          <ChevronLeft size={16} /> Back to Cart
        </button>
      </div>

      {/* Support Footer */}
      <div className="mt-8 flex items-center gap-2 text-gray-400 text-xs">
         <p>Having trouble?</p>
         <a href="#" className="underline font-bold text-gray-500">Talk to Support</a>
      </div>
    </div>
  );
};

export default PaymentCancelled;