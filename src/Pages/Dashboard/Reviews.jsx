import { useState } from "react";
import { 
    Star, 
    MessageSquare, 
    Calendar, 
    Trash2, 
    Edit3, 
    Utensils,
    MoreVertical
} from "lucide-react";
import toast from "react-hot-toast";

const Reviews = () => {
    // Dummy Data for User's Reviews
    const initialReviews = [
        {
            id: 1,
            mealName: "Spicy Ramen Bowl",
            rating: 5,
            comment: "The broth was incredibly flavorful and the spice level was just perfect! Highly recommended.",
            date: "2025-12-10"
        },
        {
            id: 2,
            mealName: "Classic Beef Burger",
            rating: 4,
            comment: "Very juicy patty, but the bun could have been a bit fresher. Overall a great meal.",
            date: "2025-12-12"
        },
        {
            id: 3,
            mealName: "Margherita Pizza",
            rating: 3,
            comment: "It was okay, but I've had better. The cheese was a bit too salty for my taste.",
            date: "2025-12-15"
        }
    ];

    const [reviews, setReviews] = useState(initialReviews);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            setReviews(reviews.filter(review => review.id !== id));
            toast.success("Review deleted successfully");
        }
    };

    const handleUpdate = (id) => {
        toast.loading("Opening edit mode...", { duration: 1500 });
        // Logic for opening update modal or navigation
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star 
                key={index} 
                size={14} 
                className={index < rating ? "fill-orange-500 text-orange-500" : "text-gray-300"} 
            />
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        <Star className="text-orange-500 fill-orange-500" /> My Reviews
                    </h2>
                    <p className="text-sm text-gray-500">Manage your feedback and ratings for meals</p>
                </div>
                <div className="px-4 py-2 bg-orange-50 rounded-2xl text-orange-600 font-bold text-sm border border-orange-100">
                    Total: {reviews.length}
                </div>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            
                            <div className="flex gap-4 flex-1">
                                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                                    <Utensils size={24} />
                                </div>
                                
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="font-bold text-gray-800 text-lg">{review.mealName}</h3>
                                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    
                                    <div className="relative">
                                        <MessageSquare size={16} className="absolute left-0 top-1 text-gray-300" />
                                        <p className="pl-6 text-gray-600 text-sm leading-relaxed italic">
                                            "{review.comment}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium pt-1">
                                        <Calendar size={14} />
                                        <span>Submitted on {review.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-gray-50 pt-3 md:pt-0 md:pl-4">
                                <button 
                                    onClick={() => handleUpdate(review.id)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                                >
                                    <Edit3 size={14} /> Update
                                </button>
                                <button 
                                    onClick={() => handleDelete(review.id)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-bold text-lg">You haven't reviewed any meals yet.</p>
                    <button className="mt-4 text-orange-500 font-bold hover:underline">Explore Meals</button>
                </div>
            )}
        </div>
    );
};

export default Reviews;