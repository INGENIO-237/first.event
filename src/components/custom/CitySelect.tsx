"use client";

import { CitySelect } from "react-country-state-city";
import { cn } from "@/lib/utils";
import InputError from "./auth/InputError";

interface SelectInputProps {
  label: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  countryid?: number | string;
  stateid?: number | string;
  error?: string;
}

const CitySelectInput = ({
  label,
  placeholder,
  onChange,
  countryid,
  stateid,
  error,
}: SelectInputProps) => {
  return (
    <div className="grow md:w-1/2 flex flex-col ">
      <label className="font-medium">{label}</label>
      <CitySelect
        label={label}
        countryid={countryid}
        stateid={stateid}
        onChange={(e: any) => {
          onChange ? onChange(e) : "";
        }}
        placeholder={placeholder}
        containerClassName="border-none "
        inputClassName={cn(
          "border rounded p-2 focus:outline-none w-full md:w-auto",
          error &&
            "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
        )}
      />
      {error && <InputError message={error} />}
    </div>
  );
};

export default CitySelectInput;
