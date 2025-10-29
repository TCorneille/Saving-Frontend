
import React from 'react';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaDollarSign, FaUsers } from 'react-icons/fa';
import { LuSmartphone } from 'react-icons/lu';
import { MdOutlinePendingActions, MdOutlineBusiness } from "react-icons/md";
interface AdminStatsProps {
    totalCustomers: number;
    activeDevices: number;
    totalBalance: number;
    monthlyGrowth: number;
}


const Stats: React.FC<AdminStatsProps> = ({
    totalCustomers,
    activeDevices,
    totalBalance,
    monthlyGrowth,
}) => {
    return (
        <div>
            <div className="mb-6 ml-6">
            <h2 className="text-3xl font-semibold text-gray-700 ">
                Overview
            </h2>
            <p className="text-gray-600">Monitor your platform's key metrics and performance</p>
            </div>
        <div className="grid  grid-cols-2  gap-5 md:space-y-0 md:space-x-4 p-4">
            {/* Total Registered Customers Card */}
            <div className="p-6 bg-white   rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Total Customers
                    </p>
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <FaUsers size={24} className="text-gray-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-gray-600">
                        {totalCustomers}
                    </h3>
                    <p className="text-sm text-gray-500">+12% from last month</p>
                </div>
            </div>

            {/* Active devices Card */}
            <div className="p-6 bg-white  rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Active Devices
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        < LuSmartphone size={24} className="text-gray-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-gray-600">{activeDevices}</h3>
                    <p className="text-sm text-gray-500">+20% from last month</p>
                </div>
            </div>
            {/* Total Balance */}
            <div className="p-6 bg-white  rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Total <span className="block">Balance</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <FaDollarSign size={24} className="text-gray-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-gray-600">{totalBalance}</h3>
                    <p className="text-sm text-gray-500">+20% from last month</p>
                </div>
            </div>
            {/* monthly growth */}
            <div className="p-6 bg-white  rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Monthly <span className="block"> Growth</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <BsGraphUpArrow size={24} className="text-gray-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-gray-600">{monthlyGrowth}</h3>
                    <p className="text-sm text-gray-500">+19 from last month</p>
                </div>
            </div>
            
            
        </div>
        </div>
    );
};

export default Stats;
