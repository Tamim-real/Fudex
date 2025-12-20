import React, { useEffect, useState } from 'react';
import Slider from '../Components/Slder';
import { useNavigate } from 'react-router';

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/all-meals`)
            .then(res => res.json())
            .then(result => setData(result))
            .catch(err => console.error(err));
    }, []);

    const handleDetail =(id)=>{
        navigate(`/meal-details/${id}`);
    }
    return (
        <div className="bg-gray-50 min-h-screen">
            <Slider />

            <section className='container mx-auto px-4 py-12'>
                <div className="text-center mb-12">
                    <h1 className='text-4xl font-extrabold text-gray-800 tracking-wide'>
                        Daily <span className="text-orange-500">Delights</span>
                    </h1>
                    <p className="text-gray-500 mt-2">Discover the best meals curated by top chefs</p>
                    <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {
                        data.map(meal => (
                            <div key={meal._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between">

                                {/* Image Wrapper */}
                                <div className='relative h-64 overflow-hidden'>
                                    <img
                                        src={meal.foodImage}
                                        alt={meal.foodName}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Price Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm font-bold text-orange-600 text-lg">
                                        ${meal.price}
                                    </div>

                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>
                                        {meal.rating}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex flex-col flex-grow">

                                    {/* MEAL NAME (New Addition) */}
                                    {/* Note: Check if your API key is 'title', 'name', or 'mealName' */}
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1" title={meal.title}>
                                        {meal.foodName}
                                    </h2>

                                    {/* Chef Info */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            C
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">
                                                {meal.chefName}
                                            </p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                                                ID: {meal.chefId}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Delivery Area Section */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 text-sm bg-orange-50 p-2 rounded-lg border border-orange-100">
                                            {/* Location Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>

                                           
                                            <span className='font-bold text-gray-800 uppercase text-[12px] tracking-tight'>
                                                Delivery: {meal.deliveryArea }
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-auto">
                                        <button onClick={()=>handleDetail(meal._id)} className="w-full relative overflow-hidden bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group/btn">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                See Details
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                                </svg>
                                            </span>
                                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default Home;