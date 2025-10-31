import React, { useState } from "react";
import Input from "../Input"; // assuming this is your custom input component

interface ActionModalProps {
  onClose: () => void;
  type: "Deposit" | "Withdraw";
}

const ActionModal: React.FC<ActionModalProps> = ({ onClose, type }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-gray-700/70 flex items-center justify-center z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {type === "Deposit" ? "Make a Deposit" : "Make a Withdrawal"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primaryColor-500 focus:outline-none"
            />
            {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primaryColor-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                type === "Deposit" ? "bg-primaryColor-500 hover:bg-primaryColor-700" : "bg-success-500 hover:bg-success-700"
              } transition`}
            >
              {type}
            </button>
          </div>
        </form>

        {success && (
          <p className="text-green-600 text-sm mt-3 text-center">
            {type} successful!
          </p>
        )}
      </div>
    </div>
  );
};

export default ActionModal;
