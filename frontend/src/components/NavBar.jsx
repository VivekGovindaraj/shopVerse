import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaShoppingCart,
  FaBoxOpen,
  FaUser,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

import useAuthContext from "../context/AuthContext";
import useCart from "../context/CartContext";

const NavBar = () => {
  const { user, logout } = useAuthContext();
  const { getTotalItems } = useCart();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <>
      {/* DESKTOP + MOBILE TOP NAVBAR */}

      <nav className="sticky top-0 z-50 bg-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16">

            {/* LOGO */}

            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl sm:text-2xl font-bold tracking-tight"
            >
              Shop<span className="text-amber-300">Verse</span>
            </Link>

            {/* DESKTOP NAV */}

            <div className="hidden md:flex items-center gap-8">

              <Link
                to="/"
                className="hover:text-indigo-200 transition font-medium"
              >
                Products
              </Link>

              <Link
                to="/cart"
                className="relative hover:text-indigo-200 transition font-medium"
              >
                Cart

                <span className="absolute -top-2 -right-4 bg-amber-400 text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </Link>

              {user && (
                <Link
                  to="/orders"
                  className="hover:text-indigo-200 transition font-medium"
                >
                  My Orders
                </Link>
              )}

              {user?.isAdmin && (
                <Link
                  to="/adminDashboard"
                  className="hover:text-indigo-200 transition font-medium"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* DESKTOP AUTH*/}

            <div className="hidden md:flex items-center gap-3">

              {user ? (
                <>
                  <span className="text-indigo-200 text-sm">
                    Hi, {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-white/10 rounded-xl text-sm font-medium transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl text-sm font-semibold transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <FaBars className="w-6 h-6" />
            </button>

          </div>
        </div>
      </nav>


      {/* MOBILE OVERLAY */}

      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
        />
      )}


      {/* ================= MOBILE OFF-CANVAS ================= */}

      <aside
        className={`
          fixed top-0 left-0 h-full w-72
          bg-white text-slate-800
          z-[70] md:hidden
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* OFF-CANVAS HEADER */}

        <div className="h-16 bg-indigo-700 text-white px-5 flex items-center justify-between">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-bold"
          >
            Shop<span className="text-amber-300">Verse</span>
          </Link>

          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <FaTimes className="w-5 h-5" />
          </button>

        </div>


        {/* USER SECTION */}

        {user && (
          <div className="px-5 py-5 bg-indigo-50 border-b border-indigo-100">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <FaUser />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Welcome
                </p>

                <p className="font-semibold text-slate-800">
                  {user.name}
                </p>
              </div>

            </div>

          </div>
        )}


        {/* MOBILE MENU LINKS */}

        <div className="p-4 space-y-2">

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition font-medium"
          >
            <FaHome className="w-5 h-5" />
            Products
          </Link>


          <Link
            to="/cart"
            onClick={closeMenu}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition font-medium"
          >

            <div className="flex items-center gap-4">
              <FaShoppingCart className="w-5 h-5" />
              Cart
            </div>

            <span className="bg-amber-400 text-slate-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {getTotalItems()}
            </span>

          </Link>


          {user && (
            <Link
              to="/orders"
              onClick={closeMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition font-medium"
            >
              <FaBoxOpen className="w-5 h-5" />
              My Orders
            </Link>
          )}


          {user?.isAdmin && (
            <Link
              to="/adminDashboard"
              onClick={closeMenu}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition font-medium"
            >
              <FaUserShield className="w-5 h-5" />
              Admin
            </Link>
          )}

        </div>


        {/* AUTH SECTION */}

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">

          {user ? (

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          ) : (

            <div className="space-y-2">

              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full flex items-center justify-center px-4 py-3 border border-indigo-200 text-indigo-700 rounded-xl font-medium hover:bg-indigo-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
              >
                Sign Up
              </Link>

            </div>

          )}

        </div>

      </aside>


      {/*MOBILE BOTTOM NAVBAR  */}

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_15px_rgba(0,0,0,0.08)]">

        <div className="grid grid-cols-4 h-16">

          {/* PRODUCTS */}

          <Link
            to="/"
            className="flex flex-col items-center justify-center text-slate-600 hover:text-indigo-600 transition"
          >
            <FaHome className="w-5 h-5 mb-1" />

            <span className="text-[11px] font-medium">
              Products
            </span>
          </Link>


          {/* CART */}

          <Link
            to="/cart"
            className="relative flex flex-col items-center justify-center text-slate-600 hover:text-indigo-600 transition"
          >

            <div className="relative">

              <FaShoppingCart className="w-5 h-5" />

              <span className="absolute -top-2 -right-3 bg-amber-400 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>

            </div>

            <span className="text-[11px] font-medium mt-1">
              Cart
            </span>

          </Link>

            {user?.isAdmin && (
              <Link
                to="/adminDashboard"
                className="flex flex-col items-center justify-center text-slate-600 hover:text-indigo-600 transition"
              >
                <FaUser className="w-5 h-5 mb-1" />

                <span className="text-[11px] font-medium">
                  Admin 
                </span>
              </Link>
              )}

          {/* ORDERS / ACCOUNT */}

          {user ? (

            <Link
              to="/orders"
              className="flex flex-col items-center justify-center text-slate-600 hover:text-indigo-600 transition"
            >
              <FaBoxOpen className="w-5 h-5 mb-1" />

              <span className="text-[11px] font-medium">
                Orders
              </span>
            </Link>

          ) : (

            <Link
              to="/login"
              className="flex flex-col items-center justify-center text-slate-600 hover:text-indigo-600 transition"
            >
              <FaUser className="w-5 h-5 mb-1" />

              <span className="text-[11px] font-medium">
                Login
              </span>
            </Link>

          )}

        </div>

      </div>


  

    </>
  );
};

export default NavBar;

