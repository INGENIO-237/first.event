"use client";
import InputError from "@/app/_components/auth/InputError";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import PhoneInput, { CountryData } from "react-phone-input-2";

interface TextInputProps {
  label?: string;
  type: string;
  placeholder?: string | undefined;
  value?: string;
  setPhoneState?: (
    phone: string,
    data: CountryData | {},
    formattedValue: string
  ) => void;
  register?: UseFormRegisterReturn;
  setState?: (e: React.ChangeEvent) => void;
  error?: string;
}

const Input = ({
  label,
  type,
  placeholder = "",
  value,
  setPhoneState,
  register,
  setState,
  error,
}: TextInputProps) => {
  const changePhoneValue = (
    e: React.ChangeEvent,
    phone: string,
    data: CountryData | {},
    formattedValue: string
  ) => {
    if (setPhoneState) {
      setPhoneState(phone, data, formattedValue);
    }
  };

  if (type == "tel") {
    return (
      <div className="md:w-1/2 w-full flex flex-col  ">
        <>
          {/* {console.log(register)} */}
          <label className="font-medium">{label}</label>
          <PhoneInput
            inputProps={{
              required: true,
              // ...register
            }}
            inputStyle={{
              width: "100%",
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
            }}
            inputClass={cn(
              "border p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded w-full transition duration-300",
              error
                ? "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                : "focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            )}
            country={"ca"}
            onChange={(phone, data, e, formattedValue) => {
              // changePhoneValue(e, phone, data, formattedValue )
              setPhoneState ? setPhoneState(phone, data, formattedValue) : "";
            }}
            containerClass=""
            buttonClass=" "
            value={value}
          />
        </>
        {error && <InputError message={error} />}
      </div>
    );
  } else if (type == "search") {
    return (
      <div className="flex items-center w-full border flex-grow space-x-2 p-2">
        <Search size={20} />
        <input
          type="search"
          placeholder={placeholder}
          className=" p-1 focus:outline-none   rounded w-full transition duration-300"
          aria-label="Rechercher"
          value={value}
          onChange={(e) => setState ? setState(e) : ''}
        />
      </div>
    );

  } else {
    return (
      <div className="md:w-1/2 w-full flex flex-col  ">
        <>
          <label className="font-medium">{label}</label>
          <input
            type={type}
            {...register}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent) => (setState ? setState(e) : "")}
            value={value}
            className={cn(
              "border p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded w-full transition duration-300",
              error
                ? "focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                : "focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            )}
          />
        </>

        {error && <InputError message={error} />}
      </div>
    );
  }
};

export default Input;
