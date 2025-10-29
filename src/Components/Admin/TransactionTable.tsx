import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import FilterSearch from "../FilterSearch"; // Reusable filter component

interface Transaction {
  transactionId: number;
  customerId: string;
  transactionType: string;
  amount: number;
  date: string;
  isCompleted: boolean;
}

export default function TransactionTable(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const transactions: Transaction[] = [
    {
      transactionId: 1,
      customerId: "CUST-001",
      transactionType: "Deposit",
      amount: 250,
      date: "2025-10-27",
      isCompleted: true,
    },
    {
      transactionId: 2,
      customerId: "CUST-002",
      transactionType: "Withdrawal",
      amount: 100,
      date: "2025-10-26",
      isCompleted: false,
    },
    {
      transactionId: 3,
      customerId: "CUST-003",
      transactionType: "Deposit",
      amount: 150,
      date: "2025-10-25",
      isCompleted: true,
    },
  ];

  // 🔍 Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.transactionType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "completed"
        ? tx.isCompleted
        : !tx.isCompleted;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 ml-4">
        <h2 className="text-2xl text-gray-700 font-bold">Customer Transactions</h2>
        <p className="text-gray-500 mt-1">
          Manage and view customer transaction history
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white text-gray-700 p-10 rounded-lg shadow-sm space-y-6">
        <h1 className="text-2xl text-primaryColor-500 font-bold">
          Transaction List
        </h1>

        {/* 🔍 Filter + Search Bar */}
        <FilterSearch
          placeholder="Search by customer ID or transaction type..."
          onSearch={setSearchTerm}
          filters={[
            {
              label: "Transaction Status",
              options: [
                { value: "completed", label: "Completed" },
                { value: "pending", label: "Pending" },
              ],
              onChange: setStatusFilter,
            },
          ]}
        />

        {/* 📋 Transactions Table */}
        <div className="max-sm:overflow-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Customer ID</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Amount ($)</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.transactionId}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 font-semibold">{tx.transactionId}</td>
                  <td className="px-4 py-2 flex items-center gap-3 font-bold">
                    <LuUser
                      size={36}
                      className="border bg-gray-200 text-gray-600 rounded-full p-2"
                    />
                    <span>{tx.customerId}</span>
                  </td>
                  <td className="px-4 py-2">{tx.transactionType}</td>
                  <td className="px-4 py-2 font-medium">${tx.amount}</td>
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        tx.isCompleted
                          ? "text-green-700 bg-green-100"
                          : "text-yellow-700 bg-yellow-100"
                      }`}
                    >
                      {tx.isCompleted ? "Completed" : "Pending"}
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
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No matching transactions found.
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
