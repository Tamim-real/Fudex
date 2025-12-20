import { useContext } from "react";
import {
    Mail,
    MapPin,
    ShieldCheck,
    BadgeCheck,
    AlertOctagon,
    Hash,
    ChefHat,
    Shield,
    Camera,
    CheckCircle2
} from "lucide-react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Profile = ({ requestRole }) => {
    const { user } = useContext(AuthContext);

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:3000/all-users");
        return res.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["allUsers"],
        queryFn: fetchUsers,
    });

    const loggedMail = user?.email;
    const matchedUser = data?.find(u => u.email === loggedMail);

    const StatusBadge = ({ status }) => (
        <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${status === 'active'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-rose-50 text-rose-600 border border-rose-100'
            }`}>
            {status === 'active' ? <CheckCircle2 size={12} /> : <AlertOctagon size={12} />}
            {status || 'Unknown'}
        </div>
    );

    if (isLoading) return (
        <div className="min-h-[400px] flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 font-sans">
            <div className="relative group">
               
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

               
                <div className="relative bg-white rounded-[3rem] shadow-2xl border border-gray-50 overflow-hidden">

                    {/* Cover Section */}
                    <div className="h-48 bg-gradient-to-br from-gray-900 via-orange-900 to-rose-900 relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                    </div>

                    <div className="px-8 md:px-12 pb-12">
                        {/* Profile Identity Section */}
                        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8 -mt-20 mb-12">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-white rounded-[2.5rem] shadow-xl"></div>
                                <img
                                    src={user?.photoURL || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="relative w-40 h-40 rounded-[2.2rem] object-cover border-4 border-white shadow-inner"
                                />
                                <button className="absolute bottom-2 right-2 p-2.5 bg-orange-500 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform border-4 border-white">
                                    <Camera size={18} />
                                </button>
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-3 pb-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                                        {matchedUser?.name || user?.displayName}
                                    </h2>
                                    <StatusBadge status={matchedUser?.status} />
                                </div>
                                <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">
                                    Official {matchedUser?.role || 'Member'}
                                </p>
                            </div>
                        </div>

                        {/* Info Cards Grid */}
                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Card 1: Email  */}
                            <div className="group/card p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm mb-4 group-hover/card:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                <p className="text-sm font-bold text-gray-700 truncate">{matchedUser?.email}</p>
                            </div>

                            {/* Card 2: Location */}
                            <div className="group/card p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm mb-4 group-hover/card:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                <p className="text-sm font-bold text-gray-700">{matchedUser?.address || "Location Not Set"}</p>
                            </div>

                            {/* Card 3: Conditional Chef ID or User Badge */}
                            {matchedUser?.role === "chef" ? (
                                
                                <div className="group/card p-6 bg-orange-50 rounded-[2rem] border border-orange-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm mb-4 group-hover/card:scale-110 transition-transform">
                                        <Hash size={24} />
                                    </div>
                                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 italic">Chef Identifier</p>
                                    <p className="text-lg font-black text-orange-600 tracking-tighter">
                                        {matchedUser?.chefId}
                                    </p>
                                </div>
                            ) : (
                               
                                <div className="group/card p-6 bg-blue-50 rounded-[2rem] border border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-4 group-hover/card:scale-110 transition-transform">
                                        <BadgeCheck size={24} />
                                    </div>
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Account Tier</p>
                                    <p className="text-lg font-black text-blue-700 capitalize">
                                        {matchedUser?.role || "Verified User"}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Account Management / Actions */}
                        <div className="mt-10 p-8 rounded-[2.5rem] bg-gray-900 relative overflow-hidden">
                            {/* Decorative background circle */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32"></div>

                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <h3 className="text-white text-xl font-bold mb-1 italic">Want to upgrade your account?</h3>
                                    <p className="text-gray-400 text-sm">Join our elite team of chefs or administrators.</p>
                                </div>

                                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                                    {matchedUser?.role !== 'chef' && matchedUser?.role !== 'admin' && (
                                        <button
                                            onClick={() => requestRole('chef')}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 hover:-translate-y-1 transition-all shadow-lg shadow-orange-500/25"
                                        >
                                            <ChefHat size={18} /> Be a Chef
                                        </button>
                                    )}

                                    {matchedUser?.role !== 'admin' && (
                                        <button
                                            onClick={() => requestRole('admin')}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all"
                                        >
                                            <Shield size={18} /> Be an Admin
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;