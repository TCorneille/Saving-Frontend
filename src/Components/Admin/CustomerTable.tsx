import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import FilterSearch from "../FilterSearch"; // 👈 Import the reusable filter component

interface User {
    id: number;
    name: string;
    email: string;
    balance?: number;
    devices?: number;
    isActive: boolean;
    lastlogin: string;
}

export default function CustomerTable(): React.JSX.Element 
 {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");

    const Users: User[] = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            balance: 425,
            devices: 2,
            isActive: true,
            lastlogin: "2025-10-28",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            balance: 310,
            devices: 1,
            isActive: false,
            lastlogin: "2025-10-25",
        },
        {
            id: 3,
            name: "Alex Brown",
            email: "alex.brown@example.com",
            balance: 720,
            devices: 3,
            isActive: true,
            lastlogin: "2025-10-20",
        },
    ];

    // Filter logic
    const filteredUsers = Users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === ""
                ? true
                : statusFilter === "active"
                    ? user.isActive
                    : !user.isActive;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <div className="mb-6 ml-4">
                <h2 className="text-2xl text-gray-700 font-bold">Customers</h2>
                <p className="text-gray-500 mt-1">Manage and view all customer accounts</p>
            </div>
            <div className="bg-white text-gray-700 p-10 rounded-lg shadow-sm space-y-6">
                <h1 className="text-2xl  text-primaryColor-500 font-bold">Customer List</h1>
                {/* Filter + Search Bar */}
                <FilterSearch
                    placeholder="Search customers..."
                    onSearch={setSearchTerm}
                    filters={[
                        {
                            label: "All Status",
                            options: [
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ],
                            onChange: setStatusFilter,
                        },
                    ]}
                />

                {/* 🧾 Customer Table */}
                <div className="max-sm:overflow-auto">
                    <table className="min-w-full table-auto border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className="px-4 py-2 text-left">Balance ($)</th>
                                <th className="px-4 py-2 text-left">Devices</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Last Login</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 font-semibold">{user.id}</td>

                                    <td className="px-4 py-2 flex items-center gap-3 font-bold">
                                        <LuUser
                                            size={40}
                                            className="border bg-gray-200 text-gray-600 rounded-full p-2"
                                        />
                                        <div>
                                            {user.name}
                                            <br />
                                            <span className="font-normal text-sm text-gray-500">
                                                {user.email}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-2">${user.balance?.toFixed(2)}</td>
                                    <td className="px-4 py-2">{user.devices ?? "-"}</td>

                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-md text-sm font-medium ${user.isActive
                                                ? "text-green-700 bg-green-100"
                                                : "text-red-700 bg-red-100"
                                                }`}
                                        >
                                            {user.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2">{user.lastlogin}</td>

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

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        No matching customers found.
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
