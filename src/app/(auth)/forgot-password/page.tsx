'use client';
import Image from "next/image"
import { useForm } from 'react-hook-form';
import logo from '/public/assets/logo.png';
import { cn } from "@/lib/utils";
import { forgotPasswordSchema } from "@/schema/AuthValidation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import InputError from "@/app/components/auth/InputError";

type Schema = z.infer<typeof forgotPasswordSchema>

const ForgotPassword = () => {
    const [email, setEmail] = useState<String>('');

    const isButtonDisabled = (): boolean => {
        if (errors.email || email == '') {
            return true;
        }
        return false;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: Schema) => {
        toast.success('OK');
        //Envoi des infos au endpoint
    }
    return (
        <div className="h-screen flex flex-row md:overflow-x-hidden">
            <div className='w-full h-fit md:h-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
                <div className="max-w-md my-auto mx-auto w-full">
                    <div className="flex d justify-start items-center">
                        <Link href="/" className="mb-4 md:mb-0">
                            <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" />
                        </Link>
                    </div>
                    <h1 className='text-2xl md:text-3xl font-bold mb-6 text-first_violet'>Mot de passe oublié</h1>
                    <span className='text-[#484848] font-normal text-sm w-8/12 md:w-6/12'>
                        Pour des mesures de securité, pour réinitialiser votre mot de passe nous avons besoin de confirmer votre identité. Veuillez insérer votre adresse email et un code de validation à 5 chiffres vous sera envoyé par mail ou SMS.
                    </span>
                    <form className='space-y-4 mt-5' onSubmit={handleSubmit((d) => onSubmit(d))}>
                        <div className=''>
                            <input type="email"
                                id="email"
                                {...register('email')}
                                placeholder='Adresse Email'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                className={cn(errors.email ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")} />
                            {errors?.email && (<InputError message={errors?.email?.message} />)}
                        </div>
                        <div className=' my-12'>
                            <button type="submit"
                                disabled={isButtonDisabled()}
                                className={cn(isButtonDisabled() ? 'cursor-not-allowed bg-orange-400' : 'bg-first_orange hover:bg-orange-600 transition duration-300', 'w-full p-2 border rounded  bg-first_orange text-white ')}>
                                Confirmer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-1/2 h-full hidden md:flex'>
                <Image src="/assets/images/auth-image.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto' width={800} height={0} />
            </div>
        </div>
    )
}

export default ForgotPassword