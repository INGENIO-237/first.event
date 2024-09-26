"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import { StateSelect } from "react-country-state-city";
import { cn } from "@/lib/utils";
import InputError from "./auth/InputError";


interface SelectInputProps {
  label: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  countryid?: number|string;
  error?: string;
}

const StateSelectInput = ({ label, placeholder, onChange, countryid, error }: SelectInputProps) => {
  return (
    <div className="grow md:w-1/2 flex flex-col ">
      <label className="font-medium">{label}</label>
      <StateSelect
        label={label}
        countryid={countryid}
        onChange={(e: any) => {
          onChange ? onChange(e) : "";
        }}
        placeholder={placeholder}
        containerClassName="border-none"
        inputClassName={cn("border rounded p-2 focus:outline-none w-full md:w-auto", error && "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600")}
      />
      {error && <InputError message={error} />}
    </div>
  );
};

export default StateSelectInput;
