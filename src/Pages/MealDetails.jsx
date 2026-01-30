import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { Star, Heart, MessageSquare, Send, Calendar, Clock, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const MealDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(5);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`https://fudex-sever.vercel.app/all-meals/${id}`)
            .then(res => res.json())
            .then(data => setMeal(data))
            .catch(err => console.error(err));

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
            if(res.data.insertedId) toast.success("Added to Favorites!");
        } catch (err) {
            toast.error("Already in Favorites or Server Error");
        }
    };

    if (!meal) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-4">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold animate-pulse">Preparing Meal Details...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFBFC] min-h-screen pb-20">
            {/* --- HERO SECTION --- */}
            <div className="bg-white border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 skew-x-12 translate-x-20"></div>
                
                <div className="container mx-auto px-6 py-12 lg:py-20 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500 to-red-600 rounded-[3rem] blur-2xl opacity-15 group-hover:opacity-25 transition duration-700"></div>
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                                    <img src={meal.foodImage} alt={meal.foodName} className="w-full h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute bottom-6 left-6 flex gap-3">
                                        <div className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                                            <Star className="text-orange-500 fill-orange-500" size={18} />
                                            <span className="text-slate-900 font-black text-lg">{meal.rating || "5.0"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Side */}
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-4 py-1.5 bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest rounded-full">Chef Recommended</span>
                                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                                        <Clock size={14} /> {meal.deliveryTime || "30-40"} Min
                                    </span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                                    {meal.foodName}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="text-5xl font-black text-orange-600 flex items-start">
                                        <span className="text-2xl mt-1">$</span>{meal.price}
                                    </div>
                                    <button onClick={handleFavorite} className="group flex items-center gap-2 bg-rose-50 text-rose-500 font-bold py-3 px-6 rounded-2xl hover:bg-rose-500 hover:text-white transition-all duration-300">
                                        <Heart size={20} className="group-hover:fill-current" />
                                        Save to Wishlist
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white font-black text-xl shadow-lg">
                                    {meal.chefName?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Master Chef</p>
                                    <h4 className="text-lg font-black text-slate-800">{meal.chefName}</h4>
                                    <div className="flex items-center gap-1 text-green-600 font-bold text-xs uppercase tracking-tighter">
                                        <CheckCircle2 size={14} /> Verified Professional
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="container mx-auto px-6 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Column (Ingredients & Reviews) */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Ingredients */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <UtensilsIcon size={120} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-3 h-10 bg-orange-500 rounded-full"></span>
                                Ingredients & Details
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {meal.ingredients || "Crafted with premium organic ingredients, sourced directly from local farms. Our chefs ensure the perfect balance of nutrition and taste in every bite."}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                                {['Organic', 'Fresh', 'Healthy', 'Homemade'].map((tag) => (
                                    <div key={tag} className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl text-slate-700 font-bold text-sm">
                                        <CheckCircle2 className="text-orange-500" size={16} /> {tag}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="space-y-8">
                            <div className="flex justify-between items-end">
                                <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                    <MessageSquare className="text-orange-500" size={32} /> 
                                    Feedback <span className="text-orange-500/30">/</span> {reviews.length}
                                </h3>
                            </div>

                            {/* Review Form */}
                            <div className="bg-orange-500 p-[2px] rounded-[2.5rem] shadow-xl shadow-orange-200">
                                <div className="bg-white p-8 rounded-[2.4rem] space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={user?.photoURL} className="w-12 h-12 rounded-2xl border-2 border-orange-100" alt="" />
                                            <span className="font-black text-slate-800">Share your thoughts</span>
                                        </div>
                                        <div className="flex gap-1 bg-slate-50 px-4 py-2 rounded-2xl">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <Star
                                                    key={num}
                                                    size={22}
                                                    className={`cursor-pointer transition-all ${num <= rating ? 'fill-orange-400 text-orange-400 scale-110' : 'text-slate-300 hover:text-orange-200'}`}
                                                    onClick={() => setRating(num)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <form onSubmit={handleAddReview} className="relative">
                                        <textarea
                                            value={newReview}
                                            onChange={(e) => setNewReview(e.target.value)}
                                            placeholder="How was the meal? The world is listening..."
                                            className="w-full bg-slate-50 rounded-3xl p-6 text-slate-700 font-medium focus:ring-2 focus:ring-orange-500 outline-none border-none min-h-[120px] transition-all"
                                        />
                                        <button className="absolute bottom-4 right-4 bg-slate-900 text-white p-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg flex items-center gap-2 group">
                                            <span className="font-bold">Post Review</span>
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Individual Reviews */}
                            <div className="grid gap-6">
                                {reviews.map((rev, idx) => (
                                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group">
                                        <div className="flex flex-row md:flex-col items-center gap-4">
                                            <img src={rev.reviewerImage} className="w-16 h-16 rounded-[1.25rem] object-cover ring-4 ring-slate-50" alt="" />
                                            <div className="bg-orange-50 px-3 py-1 rounded-xl flex items-center gap-1">
                                                <Star size={14} className="fill-orange-500 text-orange-500" />
                                                <span className="text-sm font-black text-orange-700">{rev.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-xl font-black text-slate-800">{rev.reviewerName}</h4>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                    <Calendar size={14} /> {rev.date}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed font-medium">"{rev.comment}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sticky Checkout) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-10 space-y-6">
                            <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl shadow-slate-300 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                
                                <div className="relative z-10 space-y-8">
                                    <div className="flex justify-between items-center">
                                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                                            <ShoppingBag className="text-orange-500" size={28} />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Delivery To</p>
                                            <p className="text-white font-bold flex items-center justify-end gap-1">
                                                <MapPin size={14} className="text-orange-500" /> {meal.deliveryArea}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-tighter">
                                            <span>Subtotal</span>
                                            <span className="text-white">${meal.price}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-tighter">
                                            <span>Service Fee</span>
                                            <span className="text-white">$0.00</span>
                                        </div>
                                        <div className="h-[1px] bg-white/10 w-full"></div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-slate-400 font-black uppercase text-sm">Total Pay</span>
                                            <span className="text-4xl font-black text-white">${meal.price}</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handlePayment} 
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white h-20 rounded-[2rem] font-black text-2xl transition-all duration-300 shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        PURCHASE NOW
                                    </button>
                                    
                                    <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        ⚡ Secure Payment powered by Stripe
                                    </p>
                                </div>
                            </div>

                            {/* Additional Trust Badge */}
                            <div className="bg-white border border-slate-100 p-6 rounded-[2.5rem] flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-slate-800 text-sm">Quality Guaranteed</p>
                                    <p className="text-xs text-slate-400 font-medium">100% Fresh & Healthy Meals</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Helper component for decoration
const UtensilsIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
);

export default MealDetails;