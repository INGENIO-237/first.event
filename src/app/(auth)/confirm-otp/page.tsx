'use client';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { otpConfirmSchema } from "@/schema/AuthValidation";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Dot } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import logo from '/public/assets/logo.png';
import Link from "next/link";

type Schema = z.infer<typeof otpConfirmSchema>


const OTPPage = () => {
  const otpLength = 5;
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(59); // Initialisation à 60 secondes
  const [disabled, setDisabled] = useState<boolean>(true); // Bouton désactivé au départ


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

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(otpConfirmSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onSubmit = (data: Schema) => {
    toast.success('OK')
    //Envoi des infos 
  }

  return (
    <div className='h-full md:h-screen md:flex flex-row overflow-x-hidden'>
      <div className='w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-start items-center">
            <Link href="/" className="mb-4 md:mb-0">
              <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" />
            </Link>
          </div>

          <h1 className='text-2xl md:text-3xl font-bold mb-6 text-first_violet' >Confirmation OTP</h1>
          <span className='text-[#484848] font-normal text-sm w-8/12 md:w-6/12'>
            Pour des mesures de securité, nous avons besoin de confirmer votre identité. Veuillez insérer le code de validation à 5 chiffres que vous avez reçu par mail ou par SMS.
          </span>
          <form className='flex flex-col gap-3 md:gap-6 my-4  ' onSubmit={handleSubmit((d) => onSubmit(d))} >
            <span className='font-bold text-2xl text-[#484848] '>Saisir le Code OTP</span>
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
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={index}
                          className={cn('', errors.otp && 'border-red-500 focus:border-blue-500 ')}
                        />
                      </InputOTPGroup>
                      {index !== otpLength - 1 && <Dot />}
                    </>
                  )
                })}
              </InputOTP>
              {errors?.otp && (<p className="text-red-500">{errors?.otp?.message}</p>)}
            </div>
            <div className="flex justify-end text-[#484848]">
              {`00:${timer < 10 ? `0${timer}` : timer}`} {/* Affichage formaté du timer */}
            </div>
            <div className='flex items-start md:items-center justify-between'>
              <span className='font-bold text-lg text-[#484848] '>Je n&apos;ai pas reçu de code</span>
              <button style={{ opacity: disabled ? 0.5 : 1 }} onClick={resendCode} disabled={disabled} className='rounded bg-first_violet text-white p-2 mt-2' >Renvoyer le code</button>
            </div>
            <div className='flex flex-col items-center my-12'>
              <button type="submit" name="valider" id="" className='w-full p-2 border rounded  bg-first_orange text-white ' >Confirmer</button>
            </div>
          </form>
        </div>
      </div>
      <div className='bg-white w-1/2 h-full min-h-md hidden md:flex'>
        <Image src="/assets/images/auth-image2.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto ' width={800} height={0} />

      </div>

    </div>
  )
}

export default OTPPage