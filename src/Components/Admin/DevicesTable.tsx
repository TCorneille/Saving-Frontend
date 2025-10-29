import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import FilterSearch from "../FilterSearch"; // 👈 Reusable filter component

interface Device {
  deviceId: number;
  customerId: string;
  deviceType: string;
  isVerified: boolean;
  lastlogin: string;
}

export default function DeviceTable(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const devices: Device[] = [
    {
      deviceId: 1,
      customerId: "CUST-001",
      deviceType: "Mobile",
      isVerified: true,
      lastlogin: "2025-10-28",
    },
    {
      deviceId: 2,
      customerId: "CUST-002",
      deviceType: "Laptop",
      isVerified: false,
      lastlogin: "2025-10-27",
    },
    {
      deviceId: 3,
      customerId: "CUST-003",
      deviceType: "Tablet",
      isVerified: true,
      lastlogin: "2025-10-25",
    },
  ];

  // 🔍 Filter logic
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "verified"
        ? device.isVerified
        : !device.isVerified;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6 ml-4">
        <h2 className="text-2xl text-gray-700 font-bold">Customer Devices</h2>
        <p className="text-gray-500 mt-1">
          Manage and verify customer device information
        </p>
      </div>

      <div className="bg-white text-gray-700 p-10 rounded-lg shadow-sm space-y-6">
        <h1 className="text-2xl text-primaryColor-500 font-bold">Device List</h1>

        {/* 🔍 Filter + Search Bar */}
        <FilterSearch
          placeholder="Search by customer ID or device type..."
          onSearch={setSearchTerm}
          filters={[
            {
              label: "Verification Status",
              options: [
                { value: "verified", label: "Verified" },
                { value: "unverified", label: "Unverified" },
              ],
              onChange: setStatusFilter,
            },
          ]}
        />

        {/* 📋 Devices Table */}
        <div className="max-sm:overflow-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Device ID</th>
                <th className="px-4 py-2 text-left">Customer ID</th>
                <th className="px-4 py-2 text-left">Device Type</th>
                <th className="px-4 py-2 text-left">Verification</th>
                <th className="px-4 py-2 text-left">Last Login</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDevices.map((device) => (
                <tr
                  key={device.deviceId}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 font-semibold">{device.deviceId}</td>
                  <td className="px-4 py-2 flex items-center gap-3 font-bold">
                    <LuUser
                      size={36}
                      className="border bg-gray-200 text-gray-600 rounded-full p-2"
                    />
                    <span>{device.customerId}</span>
                  </td>
                  <td className="px-4 py-2">{device.deviceType}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        device.isVerified
                          ? "text-green-700 bg-green-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {device.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{device.lastlogin}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 pr-3 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDevices.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No matching devices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
