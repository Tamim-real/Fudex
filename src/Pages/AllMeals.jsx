import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Search, UtensilsCrossed } from 'lucide-react';

const AllMeals = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const res = await axios.get('https://fudex-sever.vercel.app/all-meals');
                setData(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching meals:", error);
                setLoading(false);
            }
        };
        fetchMeals();
    }, []);

    const handleDetail = (id) => {
        navigate(`/meal-details/${id}`);
    }

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                    <UtensilsCrossed className="w-5 h-5 text-orange-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-slate-500 font-medium animate-pulse">Cooking up the menu...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#F8FAFC] min-h-screen pb-20">
            {/* Header Section with Decorative Elements */}
            <div className="bg-white border-b border-slate-100 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
                
                <div className="container mx-auto px-6 py-16 relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                            Our Full Menu
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                            Savor Every <span className="text-orange-500">Moment</span>
                        </h1>
                        <p className="text-slate-500 text-lg">
                            Explore our diverse collection of artisan meals, prepared daily with fresh ingredients and professional expertise.
                        </p>
                    </div>
                </div>
            </div>

            <section className='container mx-auto px-6'>
                {/* Grid Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {data.map(meal => (
                        <div key={meal._id} className="group bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:-translate-y-3 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(255,107,0,0.15)] flex flex-col">
                            
                            {/* Image Wrapper */}
                            <div className='relative h-64 w-full rounded-[2rem] overflow-hidden group-hover:shadow-2xl transition-all duration-500'>
                                <img
                                    src={meal.foodImage}
                                    alt={meal.foodName}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                
                                {/* Status Overlays */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-sm font-black text-slate-900 text-sm">
                                        ${meal.price}
                                    </span>
                                </div>

                                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold border border-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    {meal.rating || "5.0"}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                                    {meal.foodName}
                                </h2>

                                {/* Chef Info Bar */}
                                <div className="flex items-center justify-between mb-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="h-9 w-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-orange-200">
                                            {meal.chefName?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">Chef</p>
                                            <p className="text-xs font-extrabold text-slate-700 leading-none">{meal.chefName}</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                                    <div className="flex items-center gap-1.5 pr-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{meal.deliveryArea}</span>
                                    </div>
                                </div>

                                {/* Modern Action Button */}
                                <button
                                    onClick={() => handleDetail(meal._id)}
                                    className="w-full mt-auto group/btn relative bg-slate-900 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-[1.5rem] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-slate-200 hover:shadow-orange-200"
                                >
                                    <span className="relative z-10">See Meal Details</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {data.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="bg-orange-50 p-6 rounded-full mb-6">
                            <UtensilsCrossed className="w-16 h-16 text-orange-200" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">No Meals Found</h3>
                        <p className="text-slate-400 max-w-xs mx-auto italic">
                            We're currently updating our kitchen. Please check back in a few moments!
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AllMeals;