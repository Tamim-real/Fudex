import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Utensils, Clock, Star, Mail, BadgeCheck, Link as LinkIcon, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CreateMeal = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // ইউজারের তথ্য নিয়ে আসা যাতে Chef ID এবং অন্যান্য তথ্য পাওয়া যায়
    const { data: allUsers = [], isLoading } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axios.get("https://fudex-sever.vercel.app/all-users");
            return res.data;
        },
    });

    const matchedUser = allUsers?.find(u => u.email === user?.email);

    const onSubmit = async (formData) => {
        
        if (!matchedUser) {
            return toast.error("User data not found. Please wait.");
        }

        try {
            const mealData = {
                foodName: formData.foodName,
                chefName: formData.chefName, 
                foodImage: formData.foodImage,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating),
                ingredients: formData.ingredients.split(",").map(i => i.trim()),
                deliveryTime: formData.deliveryTime,
                chefExperience: formData.chefExperience,
                chefId: matchedUser.chefId || formData.chefId, 
                userEmail: user?.email,
                status: "pending", 
                createdAt: new Date(),
            };

            const response = await axios.post("https://fudex-sever.vercel.app/create-meal", mealData);

            if (response.data.insertedId) {
                toast.success("Meal details submitted successfully!");
                reset();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit meal details.");
        }
    };

    if (isLoading) return <div className="text-center mt-20">Loading User Data...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-orange-100 mt-10 mb-10">
            <div className="flex items-center gap-3 mb-8 border-b pb-4">
                <Utensils className="text-orange-500" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Create New Meal</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Food Name */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">Food Name</label>
                    <input 
                        {...register("foodName", { required: "Food name is required" })}
                        placeholder="e.g. Grilled Chicken"
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none transition"
                    />
                </div>

                {/* Chef Name Field */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700 flex items-center gap-2">
                        <UserIcon size={18} className="text-orange-500"/> Chef Name
                    </label>
                    <input 
                        {...register("chefName", { required: "Chef name is required" })}
                        defaultValue={user?.displayName}
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none transition"
                        placeholder="Chef Name"
                    />
                </div>

                {/* Chef ID (Read Only from matched user) */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700 flex items-center gap-2">
                        <BadgeCheck size={18} className="text-blue-500"/> Chef ID
                    </label>
                    <input 
                        {...register("chefId")}
                        defaultValue={matchedUser?.chefId || "N/A"}
                        readOnly
                        className="p-3 rounded-xl border bg-gray-50 font-mono text-blue-600 outline-none cursor-not-allowed"
                    />
                </div>

                {/* Food Image URL (Link Paste) */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700 flex items-center gap-2">
                        <LinkIcon size={18}/> Food Image URL
                    </label>
                    <input 
                        type="url"
                        {...register("foodImage", { required: "Image URL is required" })}
                        placeholder="https://image-link.com/photo.jpg"
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700">Price ($)</label>
                    <input 
                        type="number"
                        step="0.01"
                        {...register("price", { required: "Price is required" })}
                        placeholder="12.99"
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>

                {/* Rating Dropdown */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700 flex items-center gap-2">
                        <Star size={18} className="text-yellow-500"/> Rating
                    </label>
                    <select 
                        {...register("rating", { required: true })}
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none bg-white transition cursor-pointer"
                    >
                        <option value="5">5 Stars (Excellent)</option>
                        <option value="4">4 Stars (Good)</option>
                        <option value="3">3 Stars (Average)</option>
                        <option value="2">2 Stars (Fair)</option>
                        <option value="1">1 Star (Poor)</option>
                    </select>
                </div>

                {/* Delivery Time Dropdown */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700 flex items-center gap-2">
                        <Clock size={18}/> Delivery Time
                    </label>
                    <select 
                        {...register("deliveryTime", { required: true })}
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none bg-white transition cursor-pointer"
                    >
                        <option value="20-30 mins">20-30 mins</option>
                        <option value="30-45 mins">30-45 mins</option>
                        <option value="45-60 mins">45-60 mins</option>
                        <option value="1-2 hours">1-2 hours</option>
                    </select>
                </div>

                {/* Contact Email (Read Only) */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-gray-700 flex items-center gap-2">
                        <Mail size={16}/> User Email
                    </label>
                    <input 
                        value={user?.email || ""}
                        readOnly
                        className="p-3 rounded-xl border bg-gray-50 outline-none cursor-not-allowed text-gray-500"
                    />
                </div>

                {/* Ingredients */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-semibold text-gray-700">Ingredients (comma separated)</label>
                    <textarea 
                        {...register("ingredients", { required: true })}
                        placeholder="Salt, Pepper, Chicken, Olive Oil..."
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none h-20"
                    />
                </div>

                {/* Chef's Experience */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-semibold text-gray-700">Chef's Experience</label>
                    <textarea 
                        {...register("chefExperience", { required: true })}
                        placeholder="Tell us about your culinary background..."
                        className="p-3 rounded-xl border focus:ring-2 focus:ring-orange-500 outline-none h-20"
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button 
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-100"
                    >
                        Publish Meal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMeal;