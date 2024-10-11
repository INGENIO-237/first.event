import React, {forwardRef} from "react";
import {UseFormRegisterReturn} from 'react-hook-form';
import {cn} from "@/lib/utils";

type CheckboxProps = {
    id?: string;
    label?: string;
    primaryColor?: string;
    inputBorderColor?: string;
    bgColor?: string;
    className?: string;
    size?: number;
    register?: UseFormRegisterReturn;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
                                                                  id,
                                                                  label,
                                                                  className,
                                                                  primaryColor = "text-blue-500",
                                                                  inputBorderColor = "border-gray-300",
                                                                  size = 6,
                                                                  register,
                                                                  ...props
                                                              }, ref) => {
    const inputId = id || register?.name || 'checkbox';

    return (
        <div className="flex items-center">
            <div className="relative">
                <input
                    id={inputId}
                    type="checkbox"
                    className="peer sr-only"
                    ref={ref}
                    {...register}
                    {...props}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        className,
                        `flex items-center justify-center w-${size} h-${size} border ${inputBorderColor} rounded cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110`,
                        `peer-checked:text-current peer-checked:bg-indigo-500 bg-white`
                    )}
                >
                    <svg
                        className={`text-white w-${size - 2} h-${size - 2}`}
                        viewBox="0 0 12 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </label>
            </div>
            {label && (
                <label htmlFor={inputId} className={`ml-2 cursor-pointer ${primaryColor}`}>
                    {label}
                </label>
            )}
        </div>
    );
});
/*
* const Checkbox = ({
  id,
  checked,
  onChange,
  label,
  className,
  primaryColor = "text-blue-500",
  inputBorderColor = "border-gray-300",
  size = 6,
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          // {...register}
        />
        <label
          htmlFor={id}
          className={cn(
            className,
            `flex items-center justify-center w-${size} h-${size} border ${inputBorderColor} rounded cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 ${
              checked ? `${primaryColor} bg-current` : "bg-white"
            }`
          )}
        >
          {checked && (
            <svg
              className={`text-white w-${size - 2} h-${size - 2}`}
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
};*/

Checkbox.displayName = 'Checkbox';

export default Checkbox;