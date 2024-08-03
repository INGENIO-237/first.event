import Image from 'next/image'
import React from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const AuthPageTT = () => {
  return (
    <div className='w-screen h-screen lg:flex justify-center items-center mx-auto flex-row py-0 '>
    <div className='flex lg:w-1/2 gap-6 h-full flex-col justify-center  items-center text-center bg-white' >
      <Image src="/assets/logo.png" alt="Next.js Logo" className='w-72' width={427} height={99} />
      <h1 className='text-3xl font-bold text-[#270B87] mt-12' >Confirmation OTP</h1>
      <span className='text-[#484848] flex flex-col font-normal w-3/4 px-12 text-start'>Pour des mesures de securité, nous avons besoin de confirmer votre identite. Veiller inserer le code de validation à 6 chiffres que vous avez reçu par mail ou par SMS.</span>
      <form className='flex flex-col gap-8 justify-center items-center '>
      <div className="flex justify-center space-x-2">
      <input className="otp-input" />
      <input type="text"  className="otp-input" />
      <input type="text"  className="otp-input" />
      <input type="text"  className="otp-input" />
      <input type="text"  className="otp-input" />
      <input type="text"  className="otp-input" />
    </div>
      </form>
    </div>
    <div className='bg-white w-1/2 h-full hidden lg:flex'>
      <Image src="/assets/images/auth-image2.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto ' width={800} height={0} />

    </div>

  </div>
  )
}

export default AuthPageTT