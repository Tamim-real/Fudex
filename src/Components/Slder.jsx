import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const slides = [
  {
    image: "https://www.foodandwine.com/thmb/jldKZBYIoXJWXodRE9ut87K8Mag=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
    title: "Fresh & Fast",
    highlight: "Delivery",
    sub: "Get the best meals from your favorite restaurants with zero delay.",
    badge: "Free Delivery",
    color: "from-orange-500/20"
  },
  {
    image: "https://www.allrecipes.com/thmb/kgZB2WpV5NUBsd0XPOkcOOV9SEY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/23290-pizza-dough-iii-VAT-Beauty-4x3-06192801c8fa48fe8afaadfea28f532b.jpg",
    title: "Exclusive",
    highlight: "Flash Deals",
    sub: "Save big on your first 5 orders this week! Only for new users.",
    badge: "50% Discount",
    color: "from-pink-500/20"
  },
  {
    image: "https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1.jpg",
    title: "Satisfy Your",
    highlight: "Cravings",
    sub: "Deliciousness delivered right to your doorstep, anytime, anywhere.",
    badge: "Top Rated",
    color: "from-blue-500/20"
  },
];

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Speed baranor jonno interval 3000ms (3 seconds) kora hoyeche
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 md:py-10 relative group">
      <div className="relative min-h-[580px] md:h-[480px] w-full rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] shadow-2xl border border-white/5">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} // Background change fast hobe
            className={`absolute inset-0 bg-gradient-to-br ${slides[index].color} via-transparent to-transparent`}
          />
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col md:flex-row items-center z-10">
          
          {/* IMAGE AREA */}
          <div className="w-full md:flex-1 h-[240px] md:h-full relative flex items-center justify-center p-6 order-1 md:order-2">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.4, ease: "easeOut" }} // Image motion fast
                className="relative w-full max-w-[260px] md:max-w-[360px] aspect-square"
              >
                <div className="absolute -inset-10 bg-orange-500/10 rounded-full blur-[60px]" />
                <div className="relative z-10 w-full h-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border-4 border-white/5">
                  <img src={slides[index].image} alt="Promo" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* TEXT AREA */}
          <div className="w-full md:flex-1 p-6 md:p-16 text-center md:text-left order-2 md:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.3 }} // Text swap fast hobe
              >
                <span className="inline-block px-3 py-1 mb-4 text-[10px] font-black tracking-widest uppercase bg-orange-500/20 text-orange-500 rounded-md">
                  {slides[index].badge}
                </span>
                
                <h2 className="text-3xl md:text-6xl font-black text-white leading-tight mb-4">
                  {slides[index].title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                     {slides[index].highlight}
                  </span>
                </h2>

                <p className="text-gray-400 text-sm md:text-lg max-w-md mb-8 mx-auto md:mx-0 px-4 md:px-0">
                  {slides[index].sub}
                </p>

                <Link to="/meals" className="px-8 py-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                  Order Now
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === i ? "w-10 bg-orange-500" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;