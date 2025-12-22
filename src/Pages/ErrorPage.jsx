import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md text-center">
        {/* Animated Visual */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-extrabold text-orange-500 tracking-widest">404</h1>
          <div className="bg-orange-500 px-2 text-sm rounded rotate-12 absolute translate-x-[110%] -translate-y-[150%] sm:inline-block hidden text-white">
            Page Not Found
          </div>
        </motion.div>

        {/* Text Content */}
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl mb-4">
          Lost in the flavor?
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for might have been moved, deleted, or perhaps it never existed in our kitchen.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 hover:shadow-orange-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            Back to Home
          </Link>
          <Link
            to="/meals"
            className="w-full sm:w-auto px-8 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-all duration-300"
          >
            View Menu
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12">
          <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">Helpful Links</p>
          <div className="flex justify-center space-x-6 text-orange-500 font-semibold">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/support" className="hover:underline">Contact Support</Link>
            <Link to="/offers" className="hover:underline">Offers</Link>
          </div>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[10%] blur-3xl bg-orange-200 h-64 w-64 rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] blur-3xl bg-orange-100 h-96 w-96 rounded-full"></div>
      </div>
    </div>
  );
};

export default ErrorPage;