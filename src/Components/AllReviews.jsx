import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Food Enthusiast",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review: "The Biryani was steaming hot when it arrived! Fudex is officially my go-to app for Friday lunches.",
    rating: 5,
    tag: "Fast Delivery"
  },
  {
    id: 2,
    name: "Rahat Karim",
    role: "Office Professional",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review: "Impressive packaging. No spills, and the rider was very polite. Highly recommended for office lunch.",
    rating: 4,
    tag: "Great Service"
  },
  {
    id: 3,
    name: "Anika Tabassum",
    role: "Home Maker",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review: "I love the flash deals! I saved 40% on my favorite pizza yesterday. Fudex is a lifesaver.",
    rating: 5,
    tag: "Flash Deals"
  }
];

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative"
  >
    <div className="flex items-center gap-4 mb-4">
      <img 
        src={review.image} 
        alt={review.name} 
        className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
      />
      <div>
        <h4 className="font-bold text-gray-900">{review.name}</h4>
        <p className="text-xs text-gray-500">{review.role}</p>
      </div>
    </div>

    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>
          ★
        </span>
      ))}
    </div>

    <p className="text-gray-600 italic text-sm leading-relaxed">
      "{review.review}"
    </p>

    <div className="mt-4">
      <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 px-2 py-1 rounded-md">
        {review.tag}
      </span>
    </div>
  </motion.div>
);

const AllReviews = () => {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 font-bold tracking-widest uppercase text-xs"
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            What our foodies are saying
          </h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Are you happy with our service?</p>
          <button className="text-orange-500 font-bold hover:underline decoration-2 underline-offset-4">
            Write a Review →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllReviews;