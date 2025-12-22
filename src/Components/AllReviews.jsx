import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/reviews')
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from API:", data); // Browser Console (F12) e eita check koren
        // Jodi data ekta object er bhitor thake (e.g. { data: [...] }), tobe setReviews(data.data) hobe
        setReviews(Array.isArray(data) ? data : data.reviews || []); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading Reviews...</div>;

  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              {/* Profile and Name */}
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={review.reviewerImage || 'https://via.placeholder.com/150'} 
                  alt="user" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                 
                  <h4 className="font-bold text-gray-900">{review.reviewerName || "Anonymous User"}</h4>
                  <p className="text-xs text-gray-500">{review.role || "Customer"}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < (review.rating || 5) ? '★' : '☆'}</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 italic text-sm italic">
                "{review.review || review.comment || "No review text provided."}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllReviews;