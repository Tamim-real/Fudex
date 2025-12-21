
import toast from "react-hot-toast";
import MealCard from "../../Components/MealCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const MyMeals = () => {

    const {user, loading} = useContext(AuthContext);
    const [data, setData] = useState([]);

    console.log(data);
    



    useEffect(() => {
        
        if (loading) return;

  
        if (!user?.email) return;

        fetch(`https://fudex-sever.vercel.app/my-meals?email=${user.email}`)
            .then(res => res.json())
            .then(result => {
                setData(result);
            })
            .catch(err => console.error(err));

    }, [user?.email, loading]);
    
   

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
                    Total: {data.length} Meals
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map(meal => (
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