import {
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
  ShieldAlert,
  Mail,
  Calendar,
  Filter
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUsers = async () => {
  const res = await axios.get("https://fudex-sever.vercel.app/manage-requests");
  return res.data;
};

const ManageRequests = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchUsers,
  });

 
  const updateRoleMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axios.put(
        "https://fudex-sever.vercel.app/manage-requests",
        { email }
      );
      return res.data;
    },
    onSuccess: (data) => {
     
      toast.success(data.message || "Request approved successfully!");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to process request");
    },
  });

  const handleRoleUpdate = (email) => {
    if (updateRoleMutation.isLoading) return;
    updateRoleMutation.mutate(email);
  };

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  if (isLoading) return <p className="p-10 text-center">Loading...</p>;
  if (isError)
    return (
      <p className="p-10 text-center text-red-500">
        Error occurred while fetching data.
      </p>
    );

  return (
    <div className="space-y-6 p-4">
      <title>ManageRequest</title>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldAlert className="text-orange-500" /> Role Requests
          </h2>
          <p className="text-sm text-gray-500">
            Review and verify user applications for Chef or Admin roles
          </p>
        </div>

        <div className="flex gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100">
          <button className="px-4 py-2 bg-white text-orange-500 font-bold rounded-xl shadow-sm text-xs flex items-center gap-2">
            <Filter size={14} /> Pending:{" "}
            {data?.filter((r) => r.status === "pending").length || 0}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Applicant
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Requested Time
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {data?.map((req) => (
                <tr
                  key={req._id || req.id}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-100 text-xs">
                        {getInitials(req.name)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {req.name}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Mail size={12} /> {req.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider
                      ${req.requestedRole === "admin"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                        }`}
                    >
                      <UserPlus size={12} /> {req.requestedRole}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={14} className="text-gray-400" />
                      <span>
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md
                      ${req.status === "pending"
                          ? "bg-yellow-50 text-yellow-600"
                          : req.status === "approved"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                    >
                      <Clock size={14} />
                      <span className="capitalize">{req.status}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        disabled={
                          req.status !== "pending" ||
                          updateRoleMutation.isLoading
                        }
                        onClick={() => handleRoleUpdate(req.email)}
                        className={`p-2 rounded-xl transition shadow-sm
                        ${req.status === "pending"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                          }`}
                        title="Accept Request"
                      >
                        <CheckCircle size={20} />
                      </button>


                      <button

                        className="p-2 rounded-xl bg-gray-100 text-gray-300 cursor-not-allowed shadow-sm"
                        title="Reject Request"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;
