import React, { useState } from "react";

import AdminSidebar from "../Components/Admin/AdminSidebar";

import { Outlet } from "react-router-dom";
import HeaderAdmin from "../Components/Admin/Header";




const AdminDashboard: React.FC = () => {


    return (
        <>
            <div className="flex ">
                <div>
                <AdminSidebar />
                </div>
                <div className="flex-1  pt-20 px-6">
                <HeaderAdmin />
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;