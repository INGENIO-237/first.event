'use client'
import PhoneInput, { CountryData } from 'react-phone-input-2'

interface TextInputProps {
    label: string,
    type: string,
    placeholder: string | undefined,
    value?: string,
    setState?: (phone:string, data: {} | CountryData ,e: React.ChangeEvent<HTMLInputElement>)=>void
}

const Input = ({ label, type, placeholder = '', value, setState }: TextInputProps) => {
    return (
        <>
            {type == 'tel' ? (
                <>
                    {/* <label className="font-medium">{label}</label> */}
                    <PhoneInput inputClass='border p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded w-full'
                        inputProps={{
                            required: true,
                        }}
                        specialLabel={label}
                        country={'ca'}
                        inputStyle={{}}
                        enableSearch={true}
                        onChange={(phone, data ,e: React.ChangeEvent<HTMLInputElement>) => setState ? setState(phone) : ''}
                        // onlyCountries={['ca', 'us', ]}
                        value={value}

                    />
                </>
            ) : (
                <div className="md:w-1/2 w-full flex flex-col ">
                    <label className="font-medium">{label}</label>
                    <input type={type} placeholder={placeholder} value={value} className="border p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded w-full" />
                </div>
            )

            }
        </>
    )
}

export default Input