import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSlider from '../assets/images/slider.png'
import HeroSlider2 from '../assets/images/slider-2.webp'
import HeroSlider3 from '../assets/images/slider-3.webp'

const images = [
  HeroSlider3,
  HeroSlider,
  HeroSlider2,
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[450px] overflow-hidden rounded-xl">
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="Fudex Slide"
          className="w-full h-full object-cover absolute"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default Slider;
