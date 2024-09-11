import React from 'react';

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  primaryColor?: string;
  inputBorderColor?: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  primaryColor = 'text-blue-500',
  inputBorderColor = 'border-gray-300'
}) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <label
          htmlFor={id}
          className={`flex items-center justify-center w-6 h-6 border ${inputBorderColor} rounded cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 ${
            checked ? `${primaryColor} bg-current` : 'bg-white'
          }`}
        >
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 12 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          )}
        </label>
      </div>
      {label && (
        <label htmlFor={id} className={`ml-2 cursor-pointer ${primaryColor}`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;