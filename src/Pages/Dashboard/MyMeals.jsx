
import toast from "react-hot-toast";
import MealCard from "../../Components/MealCard";

const MyMeals = () => {
    // 6 Dummy Cards Data
    const dummyMeals = [
        {
            id: 1,
            foodName: "Spicy Ramen Bowl",
            foodImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
            price: 12.50,
            rating: 4.8,
            ingredients: ["Noodles", "Boiled Egg", "Chili Oil", "Pork"],
            deliveryTime: "20-30 mins",
            chefName: "Chef Rakib",
            chefId: "CH-9921"
        },
        {
            id: 2,
            foodName: "Grilled Salmon Steak",
            foodImage: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
            price: 18.00,
            rating: 4.9,
            ingredients: ["Salmon", "Lemon", "Asparagus", "Herbs"],
            deliveryTime: "35-45 mins",
            chefName: "Chef Rakib",
            chefId: "CH-9921"
        },
        {
            id: 3,
            foodName: "Classic Beef Burger",
            foodImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
            price: 9.99,
            rating: 4.5,
            ingredients: ["Beef Patty", "Cheese", "Lettuce", "Bun"],
            deliveryTime: "15-20 mins",
            chefName: "Chef Rakib",
            chefId: "CH-9921"
        },
        {
            id: 4,
            foodName: "Italian Pasta Carbonara",
            foodImage: "https://images.unsplash.com/photo-1612459284970-e8f027596582?w=500",
            price: 14.20,
            rating: 4.7,
            ingredients: ["Spaghetti", "Bacon", "Parmesan", "Egg"],
            deliveryTime: "25-30 mins",
            chefName: "Chef Rakib",
            chefId: "CH-9921"
        },
        {
            id: 5,
            foodName: "Chicken Avocado Salad",
            foodImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
            price: 11.00,
            rating: 4.6,
            ingredients: ["Chicken", "Avocado", "Greens", "Tomato"],
            deliveryTime: "10-15 mins",
            chefName: "Chef Rakib",
            chefId: "CH-9921"
        },
        {
            id: 6,
            foodName: "Margherita Pizza",
            foodImage: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500",
            price: 15.50,
            rating: 4.4,
            ingredients: ["Dough", "Basil", "Mozzarella", "Tomato Sauce"],
            deliveryTime: "30-40 mins",
            chefName: "Chef Rakib",
            chefId: "CH-9921"
        }
    ];

    const handleDelete = (id) => {
        toast.error(`Meal ${id} deleted!`);
        // Real delete API call will go here
    };

    const handleUpdate = (id) => {
        toast.success(`Opening update modal for meal ${id}`);
        // Real update logic will go here
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Special Meals</h2>
                    <p className="text-gray-500 text-sm">Manage and monitor all your culinary creations</p>
                </div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-100">
                    Total: {dummyMeals.length} Meals
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyMeals.map(meal => (
                    <MealCard 
                        key={meal.id} 
                        meal={meal} 
                        onDelete={handleDelete} 
                        onUpdate={handleUpdate} 
                    />
                ))}
            </div>
        </div>
    );
};

export default MyMeals;