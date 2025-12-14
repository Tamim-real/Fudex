import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkStyle = ({ isActive }) =>
    `relative font-medium transition ${
      isActive
        ? "text-orange-500 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-orange-500"
        : "text-gray-700 hover:text-orange-500"
    }`;

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdown(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
        >
          Fudex
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/meals" className={navLinkStyle}>
            Meals
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={navLinkStyle}>
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 font-medium hover:text-orange-500"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-full text-white font-semibold
                bg-gradient-to-r from-orange-500 to-pink-500"
              >
                Sign up
              </Link>
            </>
          ) : (
            /* Profile Dropdown */
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-orange-400 object-cover"
                />
                <ChevronDown size={18} />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-orange-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mx-4 mb-4 rounded-2xl bg-white shadow-xl p-6 space-y-4">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/meals" onClick={() => setOpen(false)}>
            Meals
          </NavLink>

          {user && (
            <NavLink to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
          )}

          {!user ? (
            <>
              <Link to="/login">Log in</Link>
              <Link
                to="/register"
                className="block text-center py-2 rounded-full text-white
                bg-gradient-to-r from-orange-500 to-pink-500"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 font-medium"
            >
              Log out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
