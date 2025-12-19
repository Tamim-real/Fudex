import { Clock, Star, Trash2, Edit, User, Hash } from "lucide-react";

const MealCard = ({ meal, onDelete, onUpdate }) => {
    return (
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden">
                <img 
                    src={meal.foodImage} 
                    alt={meal.foodName} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <p className="text-orange-600 font-bold">${meal.price}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight">{meal.foodName}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-lg">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold">{meal.rating}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {meal.ingredients.slice(0, 3).map((ing, idx) => (
                        <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                            {ing}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 py-2 border-y border-gray-50">
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-orange-500" />
                        <span>{meal.deliveryTime}</span>
                    </div>
                </div>

                {/* Chef Info */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <User size={12} className="text-blue-500"/>
                        <span className="font-medium">Chef: {meal.chefName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                        <Hash size={12}/>
                        <span>ID: {meal.chefId}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button 
                        onClick={() => onUpdate(meal.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-50 text-orange-600 rounded-xl font-semibold hover:bg-orange-100 transition"
                    >
                        <Edit size={16} /> Update
                    </button>
                    <button 
                        onClick={() => onDelete(meal.id)}
                        className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MealCard;