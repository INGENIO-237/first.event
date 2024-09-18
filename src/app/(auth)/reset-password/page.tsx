'use client';
import { resetPasswordSchema } from '@/schema/AuthValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import logo from '/public/assets/logo.png';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import InputError from '@/app/_components/auth/InputError';
import { Dot, EyeIcon, EyeOffIcon } from 'lucide-react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

type Schema = z.infer<typeof resetPasswordSchema>

const ResetPassword = () => {
    const otpLength = 5;
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState<string>('');
    const [timer, setTimer] = useState<number>(59); // Initialisation à 60 secondes
    const [disabled, setDisabled] = useState<boolean>(true); // Bouton désactivé au départ
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(resetPasswordSchema),
    });
    //TODO: initialize the State and add the otp input and also ad the validation 

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    const isButtonDisabled = (): boolean => {
        if (errors.password !== undefined || password == '' || otp.length < 5 || errors?.otp !== undefined || password.length <=6) {
            return true;
        }
        return false;
    }
    useEffect((): (() => void) => {
        let countdown: NodeJS.Timeout | undefined;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setDisabled(false);
        }

        // Nettoyage de l'intervalle lors du démontage du composant ou lors du changement de timer
        return () => clearInterval(countdown);
    }, [timer]);

    const resendCode = (): void => {
        setTimer(59); // Réinitialisation à 60 secondes
        setDisabled(true); // Désactiver à nouveau le bouton
        // Logique supplémentaire pour renvoyer le code OTP (à implémenter)
    };
    const onSubmit = (data: Schema) => {
        toast.success('OK');
        //TODO: Send data to backend and wait for the response
    }
    return (
        <div className="min-h-screen flex flex-row md:overflow-x-hidden">
            <div className='w-full h-fit md:min-h-screen md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
                <div className="max-w-md my-auto mx-auto w-full">
                    <div className="flex justify-start items-center">
                        <Link href="/" className="mb-4 md:mb-0">
                            <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" />
                        </Link>
                    </div>
                    <h1 className='text-2xl md:text-3xl font-bold mb-6 text-first_violet'>Réinitialisation de mot de passe</h1>
                    <span className='text-[#484848] font-normal text-lg w-8/12 md:w-6/12'>
                        Pour réinitialiser votre mot de passe,
                    </span>
                    <form className='space-y-4 mt-5' onSubmit={handleSubmit((d) => onSubmit(d))}>
                        <div className='w-full'>
                            <InputOTP
                                maxLength={otpLength}
                                pattern={REGEXP_ONLY_DIGITS}
                                value={otp}
                                {...register('otp')}
                                onChange={setOtp}
                            >
                                {[...Array(otpLength)].map((q, index) => {
                                    return (
                                        <>
                                            <InputOTPGroup
                                                key={index}
                                            >
                                                <InputOTPSlot
                                                    index={index}
                                                    className={cn(errors.otp && 'border-red-500 focus:border-blue-500 ')}
                                                />
                                            </InputOTPGroup>
                                            {index !== otpLength - 1 && <Dot />}
                                        </>
                                    )
                                })}
                            </InputOTP>
                            {errors?.otp && (<p className="text-red-500">{errors?.otp?.message}</p>)}
                        </div>
                        <div className='relative'>
                            <input
                                {...register('password')}
                                onChange={handlePasswordChange}
                                type={showPassword ? "text" : "password"}
                                placeholder='Nouveau mot de passe'
                                className={cn('w-full p-2 border rounded pe-10 border-first_gray', errors.password && 'border-red-500 focus:border-red-500')}
                            />
                            <span onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-auto text-gray-500 cursor-pointer">
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </span>
                        </div>
                        <div className="flex justify-end text-[#484848]">
                            {`00:${timer < 10 ? `0${timer}` : timer}`}
                        </div>

                        <div className='flex items-start md:items-center justify-between'>
                            <span className='font-bold text-lg text-[#484848] '>Je n&apos;ai pas reçu de code</span>
                            <button style={{ opacity: disabled ? 0.5 : 1 }} onClick={resendCode} disabled={disabled} className='rounded bg-first_violet text-white p-2 mt-2' >Renvoyer le code</button>
                        </div>
                        
                        {errors?.password && (<InputError message={errors?.password?.message} />)}
                        <div className=''>
                            <button type="submit"
                                disabled={isButtonDisabled()}
                                className={cn(isButtonDisabled() ? 'cursor-not-allowed bg-gray-400' : 'bg-first_orange hover:bg-orange-600 transition duration-300', 'w-full p-2 border rounded text-white ')}
                            >Confirmer</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-1/2 h-full hidden md:flex'>
                <Image src="/assets/images/auth-image2.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-screen' width={800} height={0} />
            </div>
        </div>
    )
}

export default ResetPassword