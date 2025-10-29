import React from "react";
import { FiBell } from "react-icons/fi";

import { Link } from "react-router-dom";

const HeaderAdmin: React.FC = () => {
  

  return (
    <header
      className={`fixed top-0  right-0 z-50 flex items-center justify-between px-6 h-20 w-[1025px] bg-white shadow-neutral-50`}
    >

      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-primaryColor-500">Admin Dashboard</h1>
      </div>
     
 
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <Link to={"/notifications"} className="relative mr-4">
          <FiBell
            size={22} className="text-gray-600 hover:text-primaryColor-600 transition-colors duration-200"
          />
          {/* Notification badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            4
          </span>
        </Link>

        
      </div>
    </header>
  );
};

export default HeaderAdmin;