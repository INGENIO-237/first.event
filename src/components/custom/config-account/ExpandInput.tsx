"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { UseFormRegisterReturn } from "react-hook-form";
import InputError from "../auth/InputError";

interface Props {
  placeholder: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
  error?: string;
  type?: string;
}

const ExpandInput = ({
  placeholder,
  value,
  onChange,
  register,
  error,
  type,
}: Props) => {
  return (
    <motion.div className="flex w-full flex-col gap-2">
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        {...register}
        onChange={(e) => {
          if (onChange) onChange(e);
        }}
        className={cn(
          "w-full rounded border border-first_grey p-2 text-first_grey focus:outline-none border-first_violet focus:ring focus:ring-offset-2 focus:ring-first_violet",
          error &&
            "border-red-500 focus:ring focus:ring-offset-2 focus:ring-red-500"
        )}
      />
      {error && <InputError message={error} />}
    </motion.div>
  );
};

export default ExpandInput;
