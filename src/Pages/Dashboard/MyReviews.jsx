import { useContext, useEffect, useState } from "react";
import { Star, MessageSquare, Calendar, Trash2, Edit3, Utensils, X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";

const MyReviews = () => {
    const { user, loading } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");

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

    // Update handler to open modal
    const openUpdateModal = (review) => {
        setSelectedReview(review);
        setNewRating(review.rating);
        setNewComment(review.comment);
        setIsModalOpen(true);
    };

    // Save Update to DB
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:3000/reviews/${selectedReview._id}`, {
                rating: newRating,
                comment: newComment
            });

            if (res.data.modifiedCount > 0) {
                // UI update locally
                setReviews(reviews.map(r => r._id === selectedReview._id ? { ...r, rating: newRating, comment: newComment } : r));
                toast.success("Review updated!");
                setIsModalOpen(false);
            }
        } catch (err) {
            toast.error("Update failed!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                
                const res = await axios.delete(`http://localhost:3000/reviews/${id}`);
                if (res.data.deletedCount > 0) {
                    setReviews(reviews.filter(review => review._id !== id));
                    toast.success("Deleted successfully");
                }
            } catch (err) {
                toast.error("Failed to delete");
            }
        }
    };

    const renderStars = (rating, clickable = false) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={clickable ? 24 : 14}
                onClick={() => clickable && setNewRating(index + 1)}
                className={`${index < rating ? "fill-orange-500 text-orange-500" : "text-gray-300"} ${clickable ? "cursor-pointer transition-transform hover:scale-110" : ""}`}
            />
        ));
    };

    if (isFetching) return <div className="p-10 text-center animate-pulse font-bold text-gray-400">Loading your feedback...</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto relative px-4">
            {/* Header Content remains same... */}
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
                                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 overflow-hidden italic">
                                    {review.foodImage ? <img src={review.foodImage} alt="" className="w-full h-full object-cover" /> : <Utensils size={24} />}
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="font-bold text-gray-800 text-lg">{review.foodName || "Delicious Meal"}</h3>
                                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <Calendar size={14} /> Submitted on {review.date}
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-gray-50 pt-3 md:pt-0 md:pl-4">
                                <button onClick={() => openUpdateModal(review)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                                    <Edit3 size={14} /> Update
                                </button>
                                <button onClick={() => handleDelete(review._id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Overlay */}
                    <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                    
                    {/* Modal Box */}
                    <div className="relative bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300">
                        <button onClick={() => setIsModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>

                        <h3 className="text-xl font-black text-gray-800 mb-6">Update Your Feedback</h3>
                        
                        <form onSubmit={handleUpdateSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Rating</label>
                                <div className="flex gap-2 bg-gray-50 p-4 rounded-2xl justify-center">
                                    {renderStars(newRating, true)}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Review</label>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-700 focus:ring-2 focus:ring-orange-500 min-h-[120px] outline-none"
                                    placeholder="Tell us what you think..."
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;