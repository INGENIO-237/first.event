'use client';
import { resetPasswordSchema } from '@/schema/AuthValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import logo from '/public/assets/logo.png';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import InputError from '@/app/components/auth/InputError';

type Schema = z.infer<typeof resetPasswordSchema>

const ResetPassword = () => {
    const [password, setPassword] = useState<string>('');

    const isButtonDisabled = (): boolean => {
        if (errors.password || password == '') {
            return true;
        }
        return false;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: Schema) => {
        toast.success('OK');
        //Envoi des infos au endpoint
    }
    return (
        <div className="h-screen flex flex-row md:overflow-x-hidden">
            <div className='w-full h-fit md:h-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
                <div className="max-w-md my-auto mx-auto w-full">
                    <div className="flex justify-start items-center">
                        <Link href="/" className="mb-4 md:mb-0">
                            <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" />
                        </Link>
                    </div>
                    <h1 className='text-2xl md:text-3xl font-bold mb-6 text-first_violet'>Réinitialisation de mot de passe</h1>
                    <span className='text-[#484848] font-normal text-sm w-8/12 md:w-6/12'>
                        Pour réinitialiser votre mot de passe,
                    </span>
                    <form className='space-y-4 mt-5' onSubmit={handleSubmit((d) => onSubmit(d))}>
                        <div className=''>
                            <input type="password" 
                            id="password" 
                            {...register('password')} 
                            placeholder='Nouveau mot de passe' 
                            className={cn('w-full p-2 border rounded  border-first_gray', errors.password && 'border-red-500 focus:border-red-500')} />
                            {errors?.password && (<InputError message={errors?.password?.message} />)}
                        </div>
                        <div className=' my-12'>
                            <button type="submit" name="valider" id="" className='w-full p-2 border rounded  bg-first_orange text-white ' >Confirmer</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-1/2 h-full hidden md:flex'>
                <Image src="/assets/images/auth-image2.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto' width={800} height={0} />
            </div>
        </div>
    )
}

export default ResetPassword