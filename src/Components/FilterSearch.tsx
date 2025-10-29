import React from "react";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { FaD, FaS } from "react-icons/fa6";

// Type for dropdowns
interface DropdownOption {
  value: string;
  label: string;
}

// Type for each dropdown filter
interface FilterItem {
  label: string; // placeholder or first option text
  options: DropdownOption[]; // array of options
  onChange?: (value: string) => void; // callback on selection
}

// Props for the main component
interface FilterSearchProps {
  placeholder?: string; // placeholder for the search input
  onSearch?: (value: string) => void; // callback when typing in search
  filters?: FilterItem[]; // list of dropdown filters
}

// Reusable Dropdown component
const DropdownFilter: React.FC<FilterItem> = ({ label, options, onChange }) => (
  <div className="relative">
    <select
      className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg px-4 py-3 pr-8 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
      defaultValue=""
      onChange={(e) => onChange?.(e.target.value)}
    >
      <option value="" disabled hidden>
        {label}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {/* Dropdown arrow */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <FaAngleDown size={15} />
    </div>
  </div>
);

// Main reusable filter + search component
const FilterSearch: React.FC<FilterSearchProps> = ({
  placeholder = "Search...",
  onSearch,
  filters = [],
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full max-w-5xl mx-auto p-4 bg-white rounded-xl shadow-md">
      {/* Search input */}
      <div className="flex-1 flex items-center px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent ml-2 text-gray-700 placeholder-gray-500 focus:outline-none"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Dynamic dropdown filters */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter, index) => (
          <DropdownFilter key={index} {...filter} />
        ))}
      </div>
    </div>
  );
};

export default FilterSearch;
