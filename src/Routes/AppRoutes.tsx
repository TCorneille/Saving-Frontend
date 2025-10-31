import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import AdminHome from "../pages/AdminHome";
import Customer from "../pages/Customer";
import Device from "../pages/Devices";
import Transaction from "../pages/Transactions";
import Login from "../pages/Login";
import ClientDashboard from "../pages/ClientDashboard";
  import RegistrationForm from "../pages/RegistrationForm";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegistrationForm/>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="dashboard" element={<AdminHome />} />
        <Route path="customers" element={<Customer />} />
        <Route path="devices" element={<Device />} />
        <Route path="transactions" element={<Transaction />} />
      </Route>

      {/* Client Route */}
      <Route path="/client" element={<ClientDashboard />} />
    </Routes>
  );
};

export default AppRoute;
