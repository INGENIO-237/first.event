'use client';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const AuthPageTT = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState('');


  return (
    <div className='w-full h-screen md:flex flex-row bg-white'>
      <div className='flex lg:w-1/2 gap-6 w-full flex-col justify-center items-center ' >
        <div className='flex justify-center max-sm:relative  max-sm:top-10'>
          <Image src="/assets/logo.png" alt="Next.js Logo" className='w-3/4' width={350} height={99} />
        </div>
        <div className='flex flex-col items-center gap-6'>
          <h1 className='text-3xl font-bold text-[#270B87] mt-9 lg:mt-6' >Confirmation OTP</h1>
          <span className='text-[#484848] font-normal text-sm w-8/12 md:w-6/12'>
            Pour des mesures de securité, nous avons besoin de confirmer votre identite. Veiller inserer le code de validation à 6 chiffres que vous avez reçu par mail ou par SMS.
          </span>
        </div>
        <form className='flex flex-col gap-3 lg:gap-6  ' >
            <div className='font-bold text-2xl text-[#484848] pl-5 '>Saisir le Code OTP</div>
        <InputOTP
              className=''
              id='otp'
              maxLength={otpLength}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={setOtp}
            >
              {[...Array(otpLength)].map((_, index) => {
                return(
                <InputOTPGroup key={index}>
                  <InputOTPSlot
                    index={index}
                    
                  />
                </InputOTPGroup>
              )})}
            </InputOTP>
        </form>
        
      </div>
      <div className='bg-white w-1/2 h-full hidden lg:flex'>
        <Image src="/assets/images/auth-image2.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto ' width={800} height={0} />

      </div>

    </div>
  )
}

export default AuthPageTT