'use client'

interface OptionsProps {
    value: string,
    text: string,
};
interface SelectInputProps {
    label: string,
    options: Array<OptionsProps>,
    placeholder: string,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const Select = ({ label, options, placeholder, onChange }: SelectInputProps) => {
    return (
        <div className="w-full flex flex-col ">
            <label className="font-medium">{label}</label>
            <select className="border rounded p-2 focus:outline-none w-full" onChange={(e)=>{ onChange ? onChange(e) : ''}}>
                <option disabled >{placeholder}</option>
                {options.map((option, index)=>(
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>
        </div>
    )
}

export default Select