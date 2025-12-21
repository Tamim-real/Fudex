import { useContext, useEffect, useState } from "react";
import { 
    Star, 
    MessageSquare, 
    Calendar, 
    Trash2, 
    Edit3, 
    Utensils,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const Reviews = () => {
    const { user, loading } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]); 
    const [isFetching, setIsFetching] = useState(true);

   
    useEffect(() => {
        if (loading || !user?.email) return;

        axios.get(`https://fudex-sever.vercel.app/my-review/${user.email}`)
            .then(res => {
                setReviews(res.data);
                setIsFetching(false);
            })
            .catch(err => {
                console.error(err);
                setIsFetching(false);
            });
    }, [user?.email, loading]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                const res = await axios.delete(`https://fudex-sever.vercel.app/reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    setReviews(reviews.filter(review => review._id !== id));
                    toast.success("Review deleted successfully");
                }
            } catch (err) {
                toast.error("Failed to delete review");
            }
        }
    };

    const handleUpdate = (review) => {
        toast.success(`Opening edit for: ${review.foodName || 'Meal'}`);
        // Ekhane apni chaile modal open korar logic add korte paren
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

    if (isFetching) {
        return <div className="p-10 text-center animate-pulse font-bold text-gray-400">Loading your feedback...</div>;
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        <Star className="text-orange-500 fill-orange-500" /> My Reviews
                    </h2>
                    <p className="text-sm text-gray-500">Manage your feedback and ratings for meals</p>
                </div>
                <div className="px-5 py-2 bg-orange-50 rounded-2xl text-orange-600 font-bold text-sm border border-orange-100">
                    Total: {reviews.length}
                </div>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            
                            <div className="flex gap-4 flex-1">
                                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 overflow-hidden">
                                    {review.foodImage ? (
                                        <img src={review.foodImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <Utensils size={24} />
                                    )}
                                </div>
                                
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="font-bold text-gray-800 text-lg">{review.foodName || "Delicious Meal"}</h3>
                                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    
                                    <div className="relative">
                                        <MessageSquare size={16} className="absolute left-0 top-1 text-orange-200" />
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
                                    onClick={() => handleUpdate(review)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm shadow-blue-100"
                                >
                                    <Edit3 size={14} /> Update
                                </button>
                                <button 
                                    onClick={() => handleDelete(review._id)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && !isFetching && (
                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-bold text-lg">You haven't reviewed any meals yet.</p>
                    <button className="mt-4 text-orange-500 font-bold hover:underline transition-all">Explore Meals & Give Feedback</button>
                </div>
            )}
        </div>
    );
};

export default Reviews;