import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={props.name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryColor-500"
      />
    </div>
  );
};

export default Input;
