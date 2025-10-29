import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaDiceD6, FaUserFriends } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { LuBadgeDollarSign, LuSmartphone } from "react-icons/lu";

export default function AdminSidebar() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", icon: <MdComputer size={22} />, path: "Dashboard" },
    { name: "Customers", icon: <FaUserFriends size={22} />, path: "Customers" },
    { name: "Devices", icon: <LuSmartphone size={22} />, path: "devices" },
    { name: "Transactions", icon: <LuBadgeDollarSign size={22} />, path: "transactions" },
    
  ];

  return (
    <aside className="flex flex-col  h-screen max-sm:absolute max-sm:top-[70px] max-sm:w-[80%] max-sm:left-0 max-sm:h-[70vh] shadow-2xl w-64 bg-white ">
      {/* Brand */}
      <div className="px-4 py-4 flex items-center gap-3 bg-primaryColor-600 text-white">
        <div className="bg-white text-primaryColor-600 rounded-lg p-2">
          <FaDiceD6 size={40} className="text-primaryColor-800" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-primaryColor-500">Saving APP</h1>
          <p className="text-xs opacity-90">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col mt-4">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-primaryColor-50 text-primaryColor-600 border-l-4 border-primaryColor-600"
                  : "text-gray-700 hover:bg-primaryColor-50 hover:text-primaryColor-600"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto border-t border-gray-100">
        <Link
          to="/"
          className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <MdLogout size={22} />
          Log out
        </Link>
      </div>
    </aside>
  );
}
