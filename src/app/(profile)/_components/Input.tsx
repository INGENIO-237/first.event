'use client'

interface TextInputProps{
    label: string,
    type: string,
    placeholder: string | undefined,
}

const Input = ({ label, type, placeholder=''}: TextInputProps) => {
    return (
        <div className="w-full flex flex-col ">
            <label className="font-medium">{label}</label>
            <input type={type} placeholder={placeholder} className="border p-2 focus-outline rounded"/>
        </div>
    )
}

export default Input