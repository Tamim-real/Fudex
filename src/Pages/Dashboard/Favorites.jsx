import { useState, useEffect } from "react";
import { 
    Heart, 
    Trash2, 
    ChefHat, 
    Calendar, 
    DollarSign,
    Utensils,
    ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";

const Favorites = () => {
    // Dummy Data (Real app-e eita fetch(`api/favorites/${user.email}`) theke ashbe)
    const [favorites, setFavorites] = useState([
        {
            _id: "fav_101",
            mealName: "Spicy Ramen Bowl",
            chefName: "Chef Rakib",
            price: 12.50,
            dateAdded: "2025-12-15"
        },
        {
            _id: "fav_102",
            mealName: "Classic Beef Burger",
            chefName: "Chef Arif",
            price: 9.99,
            dateAdded: "2025-12-16"
        },
        {
            _id: "fav_103",
            mealName: "Margherita Pizza",
            chefName: "Chef Mitu",
            price: 15.00,
            dateAdded: "2025-12-17"
        }
    ]);

    const handleDeleteFavorite = (id) => {
        // Optimistic UI update
        const updatedFavs = favorites.filter(item => item._id !== id);
        setFavorites(updatedFavs);
        toast.success("Removed from favorites!");
        
        // Backend Logic ekhane hobe:
        // fetch(`http://localhost:3000/api/favorites/${id}`, { method: 'DELETE' })
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        <Heart className="text-rose-500 fill-rose-500" /> My Favorites
                    </h2>
                    <p className="text-sm text-gray-500">Quickly access the meals you love the most</p>
                </div>
                <div className="px-5 py-2 bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm border border-rose-100">
                    Saved Items: {favorites.length}
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Meal Name</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Chef</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date Added</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {favorites.map((meal) => (
                                <tr key={meal._id} className="hover:bg-rose-50/20 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                                                <Utensils size={20} />
                                            </div>
                                            <span className="font-bold text-gray-700">{meal.mealName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <ChefHat size={16} className="text-blue-400" />
                                            <span>{meal.chefName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-orange-600 font-bold">
                                            <DollarSign size={14} />
                                            <span>{meal.price.toFixed(2)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Calendar size={14} />
                                            <span>{meal.dateAdded}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-3">
                                            <button 
                                                onClick={() => handleDeleteFavorite(meal._id)}
                                                className="p-2.5 text-rose-500 hover:bg-rose-100 rounded-xl transition-all"
                                                title="Remove from favorites"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-2.5 text-gray-300 group-hover:text-orange-500 transition-all">
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {favorites.length === 0 && (
                    <div className="text-center py-24 bg-gray-50/50">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Heart size={40} className="text-gray-200" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Your heart is empty!</h3>
                        <p className="text-gray-500 mt-1 mb-6">You haven't added any meals to your favorites yet.</p>
                        <button className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-100">
                            Browse Meals
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;