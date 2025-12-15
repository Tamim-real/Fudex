import { useState, useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    User,
    ShoppingBag,
    Star,
    Heart,
    Menu,
    X,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

/* =========================
   NAV CONFIG (Scalable)
========================= */
const navLinks = [
    { to: "profile", label: "My Profile", icon: User },
    { to: "orders", label: "My Orders", icon: ShoppingBag },
    { to: "reviews", label: "My Reviews", icon: Star },
    { to: "favorites", label: "Favorite Meals", icon: Heart },
];

/* =========================
   NAV ITEM
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
        {/* Active glow */}
        <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-orange-500/10 transition" />

        {/* Icon */}
        <Icon size={20} className="shrink-0" />

        {/* Label */}
        {!collapsed && <span className="font-medium">{label}</span>}

        {/* Arrow */}
        {!collapsed && (
            <ChevronRight
                size={16}
                className="ml-auto opacity-0 group-hover:opacity-100 transition"
            />
        )}
    </NavLink>
);

/* =========================
   DASHBOARD
========================= */
const Dashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useContext(AuthContext)
    console.log(user.displayName);

    // ESC key closes mobile menu
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && setMobileOpen(false);
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);


    const requestRole = async (role) => {
        if (!user) {
            toast.error("You must be logged in to request a role!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/role-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid,
                    name: user?.displayName || "Guest",
                    email: user?.email || "",
                    requestedRole: role,
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success(`Role request for "${role}" sent successfully!`);
        } catch (err) {
            toast.error(err.message);
        }
    };


    /* =========================
       SIDEBAR CONTENT
    ========================= */
    const SidebarContent = ({ onNavClick }) => (
        <>
            {/* Brand + Collapse */}
            <div className="flex items-center justify-between p-6">
                {!collapsed && <h2 className="text-2xl font-bold text-orange-500">Fudex</h2>}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden md:block p-2 rounded-lg hover:bg-orange-100"
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>

                <button onClick={() => setMobileOpen(false)} className="md:hidden">
                    <X />
                </button>
            </div>

            {/* User Card */}
            {!collapsed && (
                <div className="mx-4 mb-6 p-4 rounded-xl bg-orange-50">
                    <div className="flex items-center gap-3">
                        <img src="https://i.pravatar.cc/100" className="w-10 h-10 rounded-full" alt="User" />
                        <div>
                            <p className="font-semibold">Fahim Islam</p>
                            <span className="text-xs text-green-600">Active User</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="px-3 space-y-1">
                {navLinks.map(({ to, label, icon }) => (
                    <NavItem key={to} to={to} label={label} Icon={icon} collapsed={collapsed} onClick={onNavClick} />
                ))}
            </nav>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-lg shadow-lg"
            >
                <Menu size={22} />
            </button>

            {/* ================= MOBILE OVERLAY ================= */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        onClick={() => setMobileOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* ================= MOBILE SIDEBAR ================= */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.aside
                        initial={{ x: -260 }}
                        animate={{ x: 0 }}
                        exit={{ x: -260 }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="fixed z-50 top-0 left-0 h-full w-64 backdrop-blur-xl bg-white/80 shadow-xl border-r"
                    >
                        <SidebarContent onNavClick={() => setMobileOpen(false)} />
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside
                className={`hidden md:block h-screen backdrop-blur-xl bg-white/80 shadow-xl border-r transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                    }`}
            >
                <SidebarContent />
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className="flex-1 p-4 md:p-8 mt-12 md:mt-0 space-y-6">
                {/* Top Action Bar */}
                <div className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 shadow-sm rounded-2xl p-5">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Upgrade Your Role</h3>
                            <p className="text-sm text-gray-500">Apply to become a Chef or request Admin access</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition shadow-md"
                                onClick={() => requestRole("chef")}
                            >
                                🍳 Be a Chef
                            </button>

                            <button
                                className="px-6 py-2.5 rounded-xl border-2 border-orange-500 text-orange-500 font-medium hover:bg-orange-50 transition"
                                onClick={() => requestRole("admin")}
                            >
                                🛡️ Be an Admin
                            </button>

                        </div>
                    </div>
                </div>

                {/* Outlet */}
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
