import { useContext } from "react";
import {
    User,
    Mail,
    MapPin,
    ShieldCheck,
    BadgeCheck,
    AlertOctagon,
    Hash,
    ChefHat,
    Shield
} from "lucide-react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Profile = ({ requestRole}) => {
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
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
            {status === 'active' ? <BadgeCheck size={14} /> : <AlertOctagon size={14} />}
            {status}
        </div>
    );

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            {/* Main Profile Card */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-orange-100/50 border border-gray-100 overflow-hidden">

                {/* Header/Cover Gradient */}
                <div className="h-32 bg-gradient-to-r from-orange-400 to-rose-400 opacity-80" />

                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row items-end md:items-center gap-6 -mt-16 mb-8">
                        {/* Profile Image */}
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-32 h-32 rounded-3xl border-4 border-white object-cover shadow-lg"
                            />
                            <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-md">
                                <ShieldCheck className="text-orange-500" size={20} />
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div className="flex-1 space-y-1">
                            <h2 className="text-3xl font-black text-gray-800">{matchedUser?.name}</h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">{matchedUser?.role}</span>
                                <StatusBadge status={matchedUser?.status} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Info Fields */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-semibold text-gray-700">{matchedUser?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                                    <p className="text-sm font-semibold text-gray-700">{matchedUser?.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Chef ID + Actions */}
                        <div className="space-y-4">
                            {/* Chef ID Display */}
                            {matchedUser?.role === "chef" && matchedUser?.chefId && (
                                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                    <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm">
                                        <Hash size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                                            Chef Identifier
                                        </p>
                                        <p className="text-sm font-black text-orange-600">{matchedUser.chefId}</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons Section */}
                            <div className="p-4 rounded-2xl border-2 border-dashed border-gray-100 space-y-3">
                                <p className="text-xs font-bold text-gray-400 text-center uppercase tracking-tighter">Account Upgrades</p>
                                <div className="flex gap-3">
                                    {matchedUser?.role !== 'chef' && matchedUser?.role !== 'admin' && (
                                        <button
                                            onClick={() => requestRole('chef')}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-100"
                                        >
                                            <ChefHat size={16} /> Be a Chef
                                        </button>
                                    )}
                                    {matchedUser?.role !== 'admin' && (
                                        <button
                                            onClick={() => requestRole('admin')}
                                            // disabled={matchedUser?.role === 'admin' || isRolePending('admin')}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Shield size={16} /> Be an Admin
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
