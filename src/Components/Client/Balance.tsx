import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import ActionModal from "./ActionModal"; // adjust path as needed

interface BalanceCardProps {
  title?: string;
  amount?: number;
  accountNumber?: string;
  icon?: React.ReactNode;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  title = "Total Balance",
  amount = 250.75,
  accountNumber = "**** **** **** 1234",
  icon = <FaCreditCard className="w-8 h-8 text-primaryColor-500" />,
}) => {
  const [modalType, setModalType] = useState<"Deposit" | "Withdraw" | null>(null);

  return (
    <div className="w-[1220px] max-sm:w-[350px] mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
        {/* Left side - Icon and Account Info */}
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
          <div>
            <h2 className="font-semibold text-gray-700 text-base">{title}</h2>
            <p className="text-xs text-gray-500">{accountNumber}</p>
          </div>
        </div>

        {/* Right side - Balance */}
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">${amount.toFixed(2)}</p>
          <span className="text-sm text-gray-500">Available</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-5">
        <button
          onClick={() => setModalType("Deposit")}
          className="flex items-center justify-center bg-primaryColor-500 text-white px-10 py-2 rounded-lg hover:bg-primaryColor-700 transition-colors w-full sm:w-auto"
        >
          <FiArrowDownRight size={18} className="mr-2" /> Deposit
        </button>
        <button
          onClick={() => setModalType("Withdraw")}
          className="flex items-center justify-center bg-success-500 text-white px-10 py-2 rounded-lg hover:bg-success-700 transition-colors w-full sm:w-auto"
        >
          <MdArrowOutward size={18} className="mr-2" /> Withdraw
        </button>
      </div>

      {/* Show modal conditionally */}
      {modalType && (
        <ActionModal
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
};

export default BalanceCard;
