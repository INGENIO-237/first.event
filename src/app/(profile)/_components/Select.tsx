'use client'

import { UseFormRegisterReturn } from "react-hook-form"

interface OptionsProps {
    value: string,
    text: string,
};
interface SelectInputProps {
    label: string,
    options: Array<OptionsProps>,
    placeholder: string,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    register?: UseFormRegisterReturn,
}
const Select = ({ label, options, placeholder, onChange, register }: SelectInputProps) => {
    return (
        <div className="grow w-1/2 flex flex-col ">
            <label className="font-medium">{label}</label>
            <select className="border rounded p-2 focus:outline-none w-full md:w-auto" {...register} onChange={(e)=>{ onChange ? onChange(e) : ''}}>
                <option disabled selected >{placeholder}</option>
                {options.map((option, index)=>(
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>
        </div>
    )
}

export default Select