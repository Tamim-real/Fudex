import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { Star, Heart, MessageSquare, Send, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const MealDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(5);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch Meal Details
        fetch(`https://fudex-sever.vercel.app/all-meals/${id}`)
            .then(res => res.json())
            .then(data => setMeal(data))
            .catch(err => console.error(err));

        // Fetch Reviews for this meal
        fetch(`https://fudex-sever.vercel.app/reviews/${id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err));
    }, [id]);

    const handlePayment = async () => {
        const paymentInfo = {
            cost: meal.price,
            foodName: meal.foodName,
            foodId: meal._id,
            customer_email: user.email,
            chefName: meal.chefName,
            chefId: meal.chefId,
            foodImage: meal.foodImage,
            deliveryTime: meal.deliveryTime,
            chefEmail: meal.userEmail,
        }
        const res = await axios.post('https://fudex-sever.vercel.app/create-checkout-session', paymentInfo)
        window.location.href = res.data.url
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!newReview) return toast.error("Please write something!");

        const reviewData = {
            mealId: id,
            reviewerName: user?.displayName,
            reviewerEmail: user?.email,
            reviewerImage: user?.photoURL,
            rating,
            comment: newReview,
            date: new Date().toLocaleDateString()
        };

        try {
            const res = await axios.post('https://fudex-sever.vercel.app/add-review', reviewData);
            if (res.data.insertedId) {
                setReviews([reviewData, ...reviews]);
                setNewReview("");
                toast.success("Review added!");
            }
        } catch (err) {
            toast.error("Failed to add review");
        }
    };

    const handleFavorite = async() => {

        const favData ={
            userEmail: user?.email,
            mealName: meal.foodName,
            chefName: meal.chefName,
            price: meal.price,
            date: new Date().toLocaleDateString()
        }

        try {
            const res = await axios.post('https://fudex-sever.vercel.app/favorites', favData);

            if(res.data.insertedId){
                toast.success("Added to Favorites!");
            }
            
        } catch (err) {
            toast.error("Failed to add review");
        }
        

    };

    if (!meal) {
        return <div className="min-h-screen flex justify-center items-center font-bold text-2xl animate-pulse">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20 font-sans">
            <title>Meal Details</title>
            {/* Header Section (Existing) */}
            <div className="bg-white border-b pt-10 pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                                    <img src={meal.foodImage} alt={meal.foodName} className="w-full h-[300px] md:h-[400px] object-cover" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                                        <Star className="text-orange-500 fill-orange-500" size={20} />
                                        <span className="text-gray-900 font-black text-xl">{meal.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-center lg:justify-start">
                                <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold uppercase tracking-widest">Premium Selection</span>
                                <button onClick={handleFavorite} className="flex items-center gap-2 text-rose-500 font-bold hover:bg-rose-50 px-4 py-1 rounded-full transition-all">
                                    <Heart size={18} /> Add to Favorite
                                </button>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{meal.foodName}</h1>
                            <div className="text-4xl font-black text-orange-600">${meal.price}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-10">
                        {/* Ingredients Card */}
                        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-2 h-8 bg-orange-500 rounded-full"></span> What's Inside?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{meal.ingredients || "Hand-picked organic ingredients..."}</p>
                        </div>

                        {/* --- REVIEW SECTION START --- */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                                <MessageSquare className="text-orange-500" /> Customer Reviews ({reviews.length})
                            </h3>

                            {/* Give Review Input */}
                            <div className="bg-white p-6 rounded-[30px] border-2 border-orange-50 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={user?.photoURL} className="w-10 h-10 rounded-full ring-2 ring-orange-100" alt="" />
                                    <div className="flex gap-1 text-amber-400">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <Star
                                                key={num}
                                                size={18}
                                                className={`cursor-pointer ${num <= rating ? 'fill-amber-400' : 'text-gray-300'}`}
                                                onClick={() => setRating(num)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <form onSubmit={handleAddReview} className="relative">
                                    <textarea
                                        value={newReview}
                                        onChange={(e) => setNewReview(e.target.value)}
                                        placeholder="Share your experience with this meal..."
                                        className="w-full bg-gray-50 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none border-none min-h-[100px]"
                                    />
                                    <button className="absolute bottom-3 right-3 bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>

                            {/* Review List */}
                            <div className="space-y-4">
                                {reviews.map((rev, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-[25px] border border-gray-100 flex gap-4 hover:border-orange-200 transition-colors">
                                        <img src={rev.reviewerImage} className="w-12 h-12 rounded-2xl object-cover" alt="" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{rev.reviewerName}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <Calendar size={12} /> {rev.date}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                                    <span className="text-xs font-bold text-amber-700">{rev.rating}</span>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">{rev.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* --- REVIEW SECTION END --- */}
                    </div>

                    {/* Order Now Sticky Section (Same as before) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-10 bg-gray-900 p-8 rounded-[40px] shadow-2xl text-white">
                            <div className="text-center mb-8">
                                <p className="text-gray-400 font-medium mb-1">Ready to taste?</p>
                                <h2 className="text-3xl font-black">Secure Checkout</h2>
                            </div>
                            <button onClick={handlePayment} className="w-full h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xl transition-all shadow-lg shadow-orange-500/40">
                                ORDER NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;