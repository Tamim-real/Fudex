import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : data.reviews || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 font-semibold">
        Loading Reviews...
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ===== Section Heading ===== */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Real feedback from food lovers who enjoyed meals prepared by our
            talented chefs at Fudex.
          </p>
        </div>

        {/* ===== Reviews Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.reviewerImage || "https://via.placeholder.com/150"}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-gray-900">
                    {review.reviewerName || "Anonymous User"}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {review.role || "Customer"}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-3 text-yellow-400 text-lg">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < (review.rating || 5) ? "★" : "☆"}
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm italic leading-relaxed">
                “{review.review || review.comment || "No review text provided."}”
              </p>
            </motion.div>
          ))}
        </div>

        {/* ===== Empty State ===== */}
        {reviews.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            No reviews available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllReviews;
