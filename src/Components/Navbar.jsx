"use client";

import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, Home, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Scroll detection for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdown(false);
      setOpen(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Meals", path: "/meals", icon: <Utensils size={18} /> },
    ...(user ? [{ name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> }] : []),
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/70 backdrop-blur-md py-3 shadow-lg" : "bg-white py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo with Motion */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="text-3xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 bg-clip-text text-transparent italic">
            Fudex
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-500"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-orange-500 transition">Log in</Link>
              <Link to="/register" className="px-6 py-2.5 rounded-full text-white font-bold bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-orange-200 shadow-lg transition-all active:scale-95">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full bg-gray-50 border hover:bg-gray-100 transition"
              >
                <img src={user.photoURL || "/avatar.png"} alt="user" className="w-9 h-9 rounded-full object-cover border-2 border-orange-400" />
                <ChevronDown size={16} className={`transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {dropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border p-2 overflow-hidden"
                  >
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition">
                      <LogOut size={16} /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-700 active:scale-90 transition">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Advanced Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-4 p-4 rounded-2xl text-lg font-semibold transition-all ${
                      isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-100" : "text-gray-700 bg-gray-50"
                    }`
                  }
                >
                  {link.icon} {link.name}
                </NavLink>
              ))}

              {!user ? (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Link to="/login" onClick={() => setOpen(false)} className="flex items-center justify-center p-4 rounded-2xl border font-bold text-gray-700 bg-white">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold">
                    Join Now
                  </Link>
                </div>
              ) : (
                <button onClick={handleLogout} className="flex items-center gap-4 p-4 rounded-2xl text-red-500 font-bold bg-red-50 border border-red-100">
                  <LogOut size={20} /> Log out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;