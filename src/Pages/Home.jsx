import React, { useEffect, useState } from 'react';
import Slider from '../Components/Slder';
import { useNavigate } from 'react-router';
import AllReviews from '../Components/AllReviews';
import AppCTA from '../Components/AppCTA';

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://fudex-sever.vercel.app/all-meals`)
            .then(res => res.json())
            .then(result => setData(result))
            .catch(err => console.error(err));
    }, []);

    const handleDetail = (id) => {
        navigate(`/meal-details/${id}`);
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            <Slider />

            <section className='container mx-auto px-6 py-20'>
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="px-4 py-1.5 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                        Explore Recipes
                    </span>
                    <h1 className='text-4xl md:text-5xl font-black text-slate-900 leading-tight'>
                        Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Delights</span>
                    </h1>
                    <p className="text-slate-500 mt-4 max-w-lg text-lg">
                        Discover the best meals curated by world-class chefs, delivered fresh to your doorstep.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {data.map(meal => (
                        <div key={meal._id} className="group relative bg-white rounded-[2rem] p-4 transition-all duration-500 hover:-translate-y-2 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(255,115,0,0.2)]">
                            
                            {/* Image Container */}
                            <div className='relative h-64 w-full rounded-[1.5rem] overflow-hidden shadow-inner'>
                                <img
                                    src={meal.foodImage}
                                    alt={meal.foodName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Top Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm font-black text-slate-900 text-sm">
                                        ${meal.price}
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-300">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    {meal.rating}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-6 pb-2 px-2">
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-xl font-extrabold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                                        {meal.foodName}
                                    </h2>
                                </div>

                                {/* Chef & Info Wrapper */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
                                            {meal.chefName?.charAt(0) || 'C'}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700">{meal.chefName}</span>
                                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Master Chef</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-widest">Region</span>
                                        <span className="text-xs font-black text-orange-600 italic">{meal.deliveryArea}</span>
                                    </div>
                                </div>

                                {/* Modern Action Button */}
                                <button 
                                    onClick={() => handleDetail(meal._id)} 
                                    className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-xl shadow-slate-200 hover:shadow-orange-200"
                                >
                                    View Details
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews Section */}
            <section className='pb-20'>
                <AllReviews />
            </section>
            
            <AppCTA />
        </div>
    );
};

export default Home;