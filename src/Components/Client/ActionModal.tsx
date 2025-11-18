import React, { useState } from "react";
import {
  useDepositMutation,
  useWithdrawMutation,
} from "../../app/api/account";

interface ModalProps {
  type: "Deposit" | "Withdraw";
  onClose: () => void;
}

const ActionModal: React.FC<ModalProps> = ({ type, onClose }) => {
  const [amount, setAmount] = useState("");
  const [deposit, { isLoading: depositing }] = useDepositMutation();
  const [withdraw, { isLoading: withdrawing }] = useWithdrawMutation();

  const loading = depositing || withdrawing;

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) return alert("Enter a valid amount");

    try {
      if (type === "Deposit") {
        await deposit({ amount: Number(amount) }).unwrap();
      } else {
        await withdraw({ amount: Number(amount) }).unwrap();
      }

      onClose(); 
    } catch (err) {
      console.error(err);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{type}</h2>

        <input
          type="number"
          className="w-full border p-2 rounded mb-4 outline-none"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-primaryColor-500 text-white rounded hover:bg-primaryColor-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : type}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
