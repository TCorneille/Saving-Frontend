import  { useState, useEffect } from "react";
import { LuUser } from "react-icons/lu";
import FilterSearch from "../FilterSearch";
import { useGetCustomersQuery } from "../../app/api/admin";

interface Customer {
  _id: string;
  name: string;
  email: string;
  balance: number;
  deviceId: string | null;
}

export default function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading, isError } = useGetCustomersQuery();

  useEffect(() => {
    console.log("Fetched customers:", data);
  }, [data]);

  // ✅ Correct extraction based on your API
  const customers: Customer[] = data?.data?.users ?? [];

  // For now: assume active if has a deviceId
  const filtered = customers.filter((customer) => {
    const isActive = customer.deviceId !== null && customer.deviceId.trim() !== "";

    const text = searchTerm.trim().toLowerCase();
    const matchesSearch =
      customer.name.toLowerCase().includes(text) ||
      customer.email.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
        ? isActive
        : !isActive;

    return matchesSearch && matchesStatus;
  });

  if (isLoading)
    return <p className="text-center text-gray-500">Loading customers...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load customers.</p>
    );

  return (
    <div>
      <div className="mb-6 ml-4">
        <h2 className="text-2xl text-gray-700 font-bold">Customers</h2>
        <p className="text-gray-500 mt-1">Manage and view all customer accounts</p>
      </div>

      <div className="bg-white text-gray-700 p-10 rounded-lg shadow-sm space-y-6">
        <h1 className="text-2xl text-primaryColor-500 font-bold">Customer List</h1>

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

        <div className="max-sm:overflow-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Balance ($)</th>
                <th className="px-4 py-2 text-left">Device</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => {
                const isActive = c.deviceId !== null && c.deviceId.trim() !== "";

                return (
                  <tr
                    key={c._id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 font-semibold">{c._id}</td>

                    <td className="px-4 py-2 flex items-center gap-3 font-bold">
                      <LuUser
                        size={40}
                        className="border bg-gray-200 text-gray-600 rounded-full p-2"
                      />
                      <div>
                        {c.name}
                        <br />
                        <span className="font-normal text-sm text-gray-500">
                          {c.email}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-2">${Number(c.balance).toFixed(2)}</td>

                    <td className="px-4 py-2">{c.deviceId ?? "-"}</td>

                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-md text-sm font-medium ${
                          isActive
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                        }`}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <button className="text-blue-500 pr-3 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
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
