import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    image: "https://images.deliveryhero.io/image/fd-bd/campaign-assets/719ffff2-aa85-11f0-84d1-1654293acb4f/desktop_landing_EnBphI.png",
    title: "Fresh & Fast Delivery",
    sub: "Get the best meals from your favorite restaurants."
  },
  {
    image: "https://images.deliveryhero.io/image/fd-bd/campaign-assets/d1441225-6e37-11f0-ac5a-12c143ec9607/desktop_landing_EnAPnV.png",
    title: "Exclusive Flash Deals",
    sub: "Save big on your first 5 orders this week!"
  },
  {
    image: "https://images.deliveryhero.io/image/fd-bd/campaign-assets/a6883932-831d-11f0-8f61-4eff3c7f1616/desktop_landing_EnxMzP.png",
    title: "Satisfy Your Cravings",
    sub: "Deliciousness delivered right to your doorstep."
  },
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* 1. Image Area */}
        <div className="relative w-full h-[180px] sm:h-[300px] md:h-[400px] overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={slides[index].image}
              alt="Fudex Banner"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </AnimatePresence>

          {/* Indicators (Overlaying the image slightly) */}
          <div className="absolute bottom-4 left-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === i ? "w-8 bg-orange-500" : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2. Text Content Area (Below Image) */}
        <div className="p-6 md:p-8 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                {slides[index].title}
              </h2>
              <p className="text-sm md:text-lg text-gray-500 font-medium">
                {slides[index].sub}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Optional: Add a Button below the subtitle */}
          <div className="mt-6">
            <Link to='/meals' className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100">
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;