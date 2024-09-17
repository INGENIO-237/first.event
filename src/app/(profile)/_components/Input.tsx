'use client'
import { UseFormRegisterReturn } from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2'

interface TextInputProps {
    label: string,
    type: string,
    placeholder?: string | undefined,
    value?: string,
    setPhoneState?: (e: React.ChangeEvent, phone: string, data: CountryData | {}) => void,
    register?: UseFormRegisterReturn,
    setState?: (e: React.ChangeEvent) => void
}

const Input = ({ label, type, placeholder = '', value, setPhoneState, register, setState }: TextInputProps) => {
    return (
        <div className="md:w-1/2 w-full flex flex-col  ">
            {type == 'tel' ? (
                <>
                    <label className="font-medium">{label}</label>
                    <PhoneInput
                        {...register}
                        inputStyle={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                        inputClass='border p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded w-full grow'
                        country={'ca'}
                        onChange={(phone, data, e) => setPhoneState ? setPhoneState(e, phone, data) : ''}
                        containerClass=''
                        buttonClass=' '
                        value={value}

                    />
                </>
            ) : (
                <>
                    <label className="font-medium">{label}</label>
                    <input type={type} {...register} 
                    placeholder={placeholder}
                    onChange={(e: React.ChangeEvent) => setState ? setState(e) : ''} 
                    value={value} className="border p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded w-full" />
                </>
            )

            }
        </div>
    )
}

export default Input