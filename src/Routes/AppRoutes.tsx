import React from 'react';
import {    Route,Routes } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AdminHome from '../pages/AdminHome';
import Customer from '../pages/Customer';
import Device from '../pages/Devices';
import Transaction from '../pages/Transactions';


const AppRoute = () => {
  return (
    <>

      <Routes>
        <Route path="/admin" element={<AdminDashboard />} >
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="customers" element={<Customer />} />
          <Route path="devices" element={<Device />} />
          <Route path="transactions" element={<Transaction />} />
        </Route>

      </Routes>
    </>
  );
};

export default AppRoute;