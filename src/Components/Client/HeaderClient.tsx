import React from "react";
import { FaDice } from "react-icons/fa";
import { FaDiceD6 } from "react-icons/fa6";
import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";

interface HeaderProps {
    onMenuClick?: () => void;
}

const HeaderClient: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 flex items-center  justify-between px-6 h-20 border-b bg-white border-gray-200"
        >
            {/* Logo + Title + Mobile Menu Button */}
            <div className="flex flex-col items-center ">
                {/* Mobile Menu Button (hidden on md+) */}
                {onMenuClick && (
                    <button
                        className="md:hidden p-2 text-gray-700"
                        onClick={onMenuClick}
                    >
                        <FiMenu size={24} />
                    </button>
                )}
                <div className="flex gap-1">
                    <FaDiceD6 size={40} className="text-primaryColor-800" />
                    <h1 className="font-bold text-2xl text-primaryColor-800">
                        Saving APP
                    </h1>
                </div>
                <p className="ml-10 text-gray-700">Welcome back, User</p>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <Link to="" className="relative mr-4">
                    <FiBell size={22} className="text-gray-700" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        4
                    </span>
                </Link>
                <Link to="">
                    <LuLogOut size={22} className="text-gray-700" />
                </Link>


            </div>
        </header>
    );
};

export default HeaderClient;
