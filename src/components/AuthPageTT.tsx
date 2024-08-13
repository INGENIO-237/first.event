'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const AuthPageTT = () => {
  const otpLength = 5;
  const [otp, setOtp] = useState('');


  return (
    <div className='w-screen h-screen md:flex flex-row overflow-x-hidden'>
      <div className='w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-start items-center">
            <Image src="/assets/logo.png" alt="Next.js Logo" className='w-3/4' width={350} height={99} />
          </div>

          <h1 className='text-2xl lg:text-3xl font-bold mb-6 text-[#270B87]' >Confirmation OTP</h1>
          <span className='text-[#484848] font-normal text-sm w-8/12 md:w-6/12'>
            Pour des mesures de securité, nous avons besoin de confirmer votre identité. Veuillez insérer le code de validation à 5 chiffres que vous avez reçu par mail ou par SMS.
          </span>
          <form className='flex flex-col gap-3 lg:gap-6 my-4  ' >
            <span className='font-bold text-2xl text-[#484848] '>Saisir le Code OTP</span>
            <div className='w-full'>
              <InputOTP
                className='flex justify-between'
                id='otp'
                maxLength={otpLength}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={setOtp}
              >
                {[...Array(otpLength)].map((_, index) => {
                  return (
                    <InputOTPGroup key={index}>
                      <InputOTPSlot
                        index={index}

                      />
                      {index !== otpLength - 1 && <InputOTPSeparator /> }
                    </InputOTPGroup>
                  )
                })}
              </InputOTP>
            </div>
          </form>
          <div className='flex items-center justify-between'>
            <span className='font-bold text-lg text-[#484848] '>Je n&apos;ai pas reçu de code</span>
            <button className='rounded bg-[#270B87] text-white p-2 mt-2' >Renvoyer le code</button>
          </div>
          <div className='flex flex-col items-center my-12'>
            <button name="valider" id="" className='w-full p-2 border rounded  bg-[#E35E07] text-white ' >Confirmer</button>
          </div>
        </div>
      </div>
      <div className='bg-white w-1/2 h-full hidden lg:flex'>
        <Image src="/assets/images/auth-image2.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto ' width={800} height={0} />

      </div>

    </div>
  )
}

export default AuthPageTT