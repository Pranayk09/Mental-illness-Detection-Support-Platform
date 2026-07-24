import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, User, LogOut } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { user, token, setShowLogin, logOut } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const storedToken = localStorage.getItem("token") || token;
  const isAuthenticated = !!(user || storedToken);

  // Dynamic Navigation Array: Hide Dashboard when logged out
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Assessment", href: "/assessment" },
    ...(isAuthenticated ? [{ name: "Dashboard", href: "/dashboard" }] : []),
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20"
            >
              <Heart className="w-5 h-5 text-white fill-white/20" />
            </motion.div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-800 bg-clip-text text-transparent">
              Nirvanic
            </span>
          </Link>

          {/* Desktop Navigation with Animated Sliding Active Pill */}
          <div className="hidden md:flex items-center space-x-1.5">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative px-4 py-2 text-sm font-semibold transition-colors rounded-xl flex items-center justify-center cursor-pointer group"
                >
                  {/* Sliding Active Pill Highlight */}
                  {active && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200/70 shadow-2xs z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors ${
                      active
                        ? "text-emerald-700 font-extrabold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 ml-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-bold">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{user?.name || "Member"}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={logOut}
                  className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 px-3.5 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  Sign Up / Login
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-white rounded-2xl shadow-xl p-4 border border-slate-100 space-y-2 mb-3"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                    isActive(item.href)
                      ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-200"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-3 px-2 text-sm font-bold text-slate-700">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>{user?.name || "Member"}</span>
                  </div>
                  <button
                    onClick={() => {
                      logOut();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 hover:bg-red-100 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsOpen(false);
                  }}
                  className="block w-full text-center px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-500/20"
                >
                  Sign Up / Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;
