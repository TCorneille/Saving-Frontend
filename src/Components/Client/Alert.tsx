import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface AlertCardProps {
  title?: string;
  message?: string;
  type?: "warning" | "error" | "info";
}

const AlertCard: React.FC<AlertCardProps> = ({
  title = "Low Balance Alert",
  message = "Your account balance is below $100.00. Consider adding funds.",
  type = "warning",
}) => {
  // Define color styles by alert type
  const typeColors = {
    warning: "bg-yellow-50 text-yellow-700 border-yellow-300",
    error: "bg-red-50 text-red-700 border-red-300",
    info: "bg-blue-50 text-blue-700 border-blue-300",
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border  w-[1220px] max-sm:w-[350px] rounded-lg shadow-sm ${typeColors[type]}`}
    >
      {/* Left side - icon and text */}
      <div className="flex items-center space-x-3">
        <FiAlertTriangle className="w-6 h-6" />
        <div>
          <h2 className="font-semibold text-sm">{title}</h2>
          <p className="text-xs">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
