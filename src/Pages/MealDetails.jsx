import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

const MealDetails = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const {user} = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3000/all-meals/${id}`)
            .then(res => res.json())
            .then(data => setMeal(data))
            .catch(err => console.error(err));
    }, [id]);

    const handlePayment=async()=>{

        const paymentInfo={
            cost: meal.price,
            foodName: meal.foodName,
            foodId: meal._id,
            customer_email: user.email,
            chefName: meal.chefName,
            chefId : meal.chefId,
            foodImage: meal.foodImage,
            deliveryTime: meal.deliveryTime



        }
        const res = await axios.post('http://localhost:3000/create-checkout-session', paymentInfo)
        window.location.href = res.data.url
        
    }

    if (!meal) {
        return <div className="min-h-screen flex justify-center items-center font-bold text-2xl animate-pulse">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20 font-sans">
            {/* Standard Header Section */}
            <div className="bg-white border-b pt-10 pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        
                        {/* Food Image: Standard Size for Large Screens */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                                    <img 
                                        src={meal.foodImage} 
                                        alt={meal.foodName} 
                                        className="w-full h-[300px] md:h-[400px] object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                                        <span className="text-orange-500 font-black text-xl">★ {meal.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Title & Key Info */}
                        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                            <div>
                                <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold uppercase tracking-widest mb-4">
                                    Premium Selection
                                </span>
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                    {meal.foodName}
                                </h1>
                            </div>
                            
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                                    <span className="text-gray-500 text-sm italic font-medium">Delivery:</span>
                                    <span className="text-gray-900 font-bold">{meal.deliveryArea}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                                    <span className="text-gray-500 text-sm italic font-medium">Time:</span>
                                    <span className="text-gray-900 font-bold">{meal.estimatedDeliveryTime || "30m"}</span>
                                </div>
                            </div>

                            <div className="text-4xl font-black text-orange-600">
                                ${meal.price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    <div className="lg:col-span-2 space-y-10">
                        {/* Ingredients */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-black text-gray-800 mb-6 border-b pb-4 border-orange-100">
                                What's Inside?
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {meal.ingredients || "Hand-picked organic ingredients blended with our chef's special seasoning to bring you an authentic taste."}
                            </p>
                        </div>

                        {/* Chef Detail Card */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full opacity-50"></div>
                            <h3 className="text-2xl font-black text-gray-800 mb-8 italic">The Artist Behind the Dish</h3>
                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="w-28 h-28 rounded-full border-4 border-orange-200 p-1">
                                    <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                                        {meal.chefName?.charAt(0)}
                                    </div>
                                </div>
                                <div className="space-y-4 text-center md:text-left">
                                    <div>
                                        <h4 className="text-2xl font-black text-gray-800">{meal.chefName}</h4>
                                        <p className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">Certified Professional Chef (ID: {meal.chefId})</p>
                                    </div>
                                    <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 gap-4">
                                        <div className="text-center">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Experience</p>
                                            <p className="font-black text-gray-700">{meal.chefExperience || "8+ Yrs"}</p>
                                        </div>
                                        <div className="w-[1px] h-8 bg-gray-200"></div>
                                        <div className="text-center">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Style</p>
                                            <p className="font-black text-gray-700">Artisanal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Now Sticky Section */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-10 bg-gray-900 p-8 rounded-[40px] shadow-2xl text-white">
                            <div className="text-center mb-8">
                                <p className="text-gray-400 font-medium mb-1">Ready to taste?</p>
                                <h2 className="text-3xl font-black">Secure Checkout</h2>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="text-gray-400">Meal Price</span>
                                    <span className="font-bold">${meal.price}</span>
                                </div>
                                <div className="flex justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="text-gray-400">Service Fee</span>
                                    <span className="font-bold">$0.00</span>
                                </div>
                                <div className="flex justify-between p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-400 font-black text-xl">
                                    <span>Total</span>
                                    <span>${meal.price}</span>
                                </div>
                            </div>

                            {/* MODERN ORDER BUTTON */}
                            <button onClick={handlePayment} className="group w-full h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-orange-500/40">
                                ORDER NOW
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            
                            <div className="mt-8 flex items-center justify-center gap-2 opacity-50 grayscale">
                                <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                                <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                                <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;