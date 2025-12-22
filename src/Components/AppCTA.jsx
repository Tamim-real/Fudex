import React from 'react';
import { motion } from 'framer-motion';

const AppCTA = () => {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto bg-orange-500 rounded-[2rem] relative overflow-hidden shadow-2xl shadow-orange-200">
        
        {/* Background Decorative Circles */}
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-orange-400 rounded-full opacity-50 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-orange-600 rounded-full opacity-30 blur-3xl" />

        <div className="flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-12 lg:py-0">
          
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10 lg:py-20">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-white leading-tight mb-6"
            >
              Feed your hunger <br /> with Fudex Mobile App
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-orange-50 text-lg mb-10 max-w-md mx-auto lg:mx-0"
            >
              Get the fastest delivery, exclusive flash deals, and real-time order tracking. Your next meal is just a tap away!
            </motion.p>

            {/* Store Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl border border-gray-800 transition-all shadow-lg"
              >
                <img src="https://i.ibb.co.com/35QLdMyj/app-Store.jpg" alt="Apple" className="w-6 " />
                <div className="text-left">
                  <p className="text-[10px] uppercase">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl border border-gray-800 transition-all shadow-lg"
              >
                <img src="https://i.ibb.co.com/b5kKJGyK/play-store.png" alt="Play Store" className="w-6" />
                <div className="text-left">
                  <p className="text-[10px] uppercase">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Right Side: Image/Mockup */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Using a placeholder for a mobile app mockup */}
              <img 
                src="https://foodibd.com/_next/static/media/mobile.73da0fee.svg" 
                alt="Fudex App" 
                className="w-[280px] md:w-[350px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
              />
              {/* Optional Floating Food Icon */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl hidden md:block"
              >
                <span className="text-4xl">🍔</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppCTA;