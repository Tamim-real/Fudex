import { useState, useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    User,
    ShoppingBag,
    Star,
    Heart,
    Menu,
    X,
    ChevronRight,
    ChevronLeft,
    Loader2,
    UtensilsCrossed,
    ChefHat,
    ClipboardList,
    Users,
    ShieldAlert,
    BarChart3,
    LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

/* =========================
   NAV ITEM COMPONENT
========================= */
const NavItem = ({ to, label, Icon, collapsed, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
      ${isActive ? "bg-orange-500/90 text-white shadow-lg" : "text-gray-600 hover:bg-orange-100"}`
        }
    >
        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-orange-500/10 transition" />
        <Icon size={20} className="shrink-0" />
        {!collapsed && <span className="font-medium text-sm">{label}</span>}
        {!collapsed && (
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition" />
        )}
    </NavLink>
);

const Dashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [role, setRole] = useState(null); // ডাটাবেজ থেকে আসা রোল
    const navigate = useNavigate();

    // ১. ইউজারের রোল ফেচ করা
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/users/role/${user.email}`)
                .then(res => res.json())
                .then(data => setRole(data.role))
                .catch(err => console.error("Error fetching role:", err));
        }
    }, [user?.email]);

    // ২. রোল রিকোয়েস্ট স্ট্যাটাস ফেচ করা
    useEffect(() => {
        if (user?.uid) {
            fetch(`http://localhost:3000/api/my-role-requests/${user.uid}`)
                .then(res => res.json())
                .then(data => setPendingRequests(data))
                .catch(err => console.error("Error fetching status:", err));
        }
    }, [user?.uid]);

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully!");
            navigate("/");
        } catch (err) {
            toast.error("Log out failed!");
        }
    };

    const isRolePending = (roleName) => {
        return pendingRequests.some(req => req.requestedRole === roleName && req.status === "pending");
    };

    const requestRole = async (roleName) => {
        try {
            const res = await fetch("http://localhost:3000/api/role-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid,
                    name: user?.displayName,
                    email: user?.email,
                    requestedRole: roleName,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return;
            }
            toast.success(`Request for ${roleName} sent successfully!`);
            setPendingRequests([...pendingRequests, { requestedRole: roleName, status: "pending" }]);
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    const SidebarContent = ({ onNavClick }) => (
    <div className="h-full flex flex-col justify-between">
        <div>
            {/* Header */}
            <div className="flex items-center justify-between p-6">
                {!collapsed && <h2 className="text-2xl font-bold text-orange-500 italic">Fudex</h2>}
                <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block p-2 rounded-lg hover:bg-orange-100 transition">
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
                <button onClick={() => setMobileOpen(false)} className="md:hidden">
                    <X />
                </button>
            </div>

            {/* Profile Section */}
            {!collapsed && (
                <div className="mx-4 mb-6 p-4 rounded-xl bg-orange-50 border border-orange-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <img src={user?.photoURL} className="w-10 h-10 rounded-full border-2 border-orange-400 object-cover" alt="User" />
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                            <p className="font-semibold text-gray-800 text-sm">{user?.displayName}</p>
                            <span className="text-[10px] text-orange-600 font-bold tracking-widest uppercase">
                                {role ? role : "Loading..."}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Links with Role Filtering */}
            <nav className="px-3 space-y-1">
                
                {/* 1. My Profile - ETA SOBAR JONNO (User, Chef, Admin) */}
                <NavItem to="profile" label="My Profile" Icon={User} collapsed={collapsed} onClick={onNavClick} />

                {/* 2. ONLY FOR REGULAR USER */}
                {role === "user" && (
                    <>
                        <NavItem to="orders" label="My Orders" Icon={ShoppingBag} collapsed={collapsed} onClick={onNavClick} />
                        <NavItem to="reviews" label="My Reviews" Icon={Star} collapsed={collapsed} onClick={onNavClick} />
                        <NavItem to="favorites" label="Favorite Meals" Icon={Heart} collapsed={collapsed} onClick={onNavClick} />
                    </>
                )}

                {/* 3. ONLY FOR CHEF (Chef ei 3 ta pabe kintu orders/reviews pabe na) */}
                {role === "chef" && (
                    <>
                        <div className="pt-4 pb-1 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest {!collapsed ? 'block' : 'hidden'}">Chef Dashboard</div>
                        <NavItem to="my-meals" label="My Meals" Icon={ChefHat} collapsed={collapsed} onClick={onNavClick} />
                        <NavItem to="create-meal" label="Add New Meal" Icon={UtensilsCrossed} collapsed={collapsed} onClick={onNavClick} />
                        <NavItem to="order-management" label="Order Management" Icon={ClipboardList} collapsed={collapsed} onClick={onNavClick} />
                    </>
                )}

                {/* 4. ONLY FOR ADMIN */}
                {role === "admin" && (
                    <>
                        <div className="pt-4 pb-1 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest {!collapsed ? 'block' : 'hidden'}">Admin Panel</div>
                        <NavItem to="manage-users" label="Manage Users" Icon={Users} collapsed={collapsed} onClick={onNavClick} />
                        <NavItem to="manage-requests" label="Manage Requests" Icon={ShieldAlert} collapsed={collapsed} onClick={onNavClick} />
                        <NavItem to="platform-statistics" label="Statistics" Icon={BarChart3} collapsed={collapsed} onClick={onNavClick} />
                    </>
                )}
            </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-100">
            <button
                onClick={handleLogOut}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group font-medium ${collapsed ? "justify-center" : ""}`}
            >
                <LogOut size={20} className="shrink-0" />
                {!collapsed && <span>Log Out</span>}
            </button>
        </div>
    </div>
);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Button */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-lg shadow-lg hover:bg-orange-600 transition">
                <Menu size={22} />
            </button>

            {/* Sidebars (Mobile & Desktop) */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div onClick={() => setMobileOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-40 md:hidden" />
                        <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: "spring", stiffness: 120 }} className="fixed z-50 top-0 left-0 h-full w-64 backdrop-blur-2xl bg-white/90 shadow-2xl border-r">
                            <SidebarContent onNavClick={() => setMobileOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <aside className={`hidden md:block h-screen sticky top-0 backdrop-blur-xl bg-white/80 shadow-xl border-r transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
                <SidebarContent />
            </aside>

            {/* Main View */}
            <main className="flex-1 p-4 md:p-8 mt-12 md:mt-0 max-h-screen overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Conditionally show Upgrade Bar only for regular users */}
                    {role === "user" && (
                        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl p-6 shadow-xl shadow-orange-100 mb-8 text-white">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold italic">Want to earn with Fudex?</h3>
                                    <p className="text-orange-50 opacity-90">Apply for a professional role and start your journey.</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        disabled={isRolePending("chef")}
                                        className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 
                                        ${isRolePending("chef") ? "bg-white/20 cursor-not-allowed" : "bg-white text-orange-500 hover:bg-orange-50 shadow-lg"}`}
                                        onClick={() => requestRole("chef")}
                                    >
                                        {isRolePending("chef") ? <><Loader2 size={16} className="animate-spin" /> Pending</> : "🍳 Be a Chef"}
                                    </button>
                                    <button
                                        disabled={isRolePending("admin")}
                                        className={`px-6 py-2.5 rounded-xl font-bold border-2 transition flex items-center gap-2
                                        ${isRolePending("admin") ? "border-white/20 text-white/50 cursor-not-allowed" : "border-white text-white hover:bg-white/10"}`}
                                        onClick={() => requestRole("admin")}
                                    >
                                        {isRolePending("admin") ? <><Loader2 size={16} className="animate-spin" /> Pending</> : "🛡️ Admin Access"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl p-2 md:p-6 shadow-sm border border-gray-100">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;