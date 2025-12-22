import { useState } from "react";
import {
    Users,
    Mail,
    ShieldCheck,
    UserCheck,
    AlertTriangle,
    Search,
    UserMinus,
    Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        const res = await axios.get("https://fudex-sever.vercel.app/all-users");
        return res.data;
    };

    const { data: users = [], isLoading, error, refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: fetchUsers,
    });

   
    const handleMakeFraud = async (email) => {
        try {
           
            const res = await axios.patch(`https://fudex-sever.vercel.app/users/fraud/${email}`);
            
            if (res.data.modifiedCount > 0) {
                toast.success("User marked as Fraud!");
                refetch(); 
            } else {
                toast.error("Already marked or failed to update.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update status");
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin text-orange-500" size={40} />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 p-10">Error loading users...</div>;
    }

    return (
        <div className="space-y-6">
            <title>ManageUsers</title>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Users className="text-orange-500" /> Platform Users
                    </h2>
                    <p className="text-sm text-gray-500">Manage roles and security status of all members</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-full md:w-80 transition"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold uppercase">
                                                {user.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold capitalize
                                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                                user.role === 'chef' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-gray-100 text-gray-600'}`}>
                                            {user.role === 'admin' && <ShieldCheck size={14} />}
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 text-xs font-bold
                                            ${user.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                                            {user.status === 'active' ? <UserCheck size={16} /> : <AlertTriangle size={16} />}
                                            <span className="uppercase tracking-tighter">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            disabled={user.status === "fraud" || user.role === "admin"}
                                          
                                            onClick={() => handleMakeFraud(user.email)} 
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-2 transition
                                            ${user.status === "fraud" || user.role === "admin"
                                                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                                                    : "border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 shadow-sm"}`}
                                        >
                                            <UserMinus size={14} /> Mark Fraud
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center">
                        <Users size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-medium">No users found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;