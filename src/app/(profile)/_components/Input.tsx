'use client'

interface TextInputProps{
    label: string,
    type: string,
    placeholder: string | undefined,
}

const Input = ({ label, type, placeholder=''}: TextInputProps) => {
    return (
        <div className="md:w-1/2 w-full flex flex-col ">
            <label className="font-medium">{label}</label>
            <input type={type} placeholder={placeholder} className="border p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded w-full"/>
        </div>
    )
}

export default Input