import Image from 'next/image'
import React from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const AuthPageFS = () => {
  return (
    <div className='w-screen h-screen md:flex flex-row bg-white'>
      <div className='flex lg:w-1/2 gap-6 w-full flex-col justify-center items-center ' >
        <div className='flex justify-center  max-sm:relative  max-sm:top-10'>
          <Image src="/assets/logo.png" alt="Next.js Logo" className='w-3/4' width={350} height={99} />
        </div>
        <h1 className='text-3xl font-bold text-[#270B87] mt-9 lg:mt-10'  >Créer un compte</h1>
        <form className='flex flex-col gap-6 lg:gap-8 justify-center items-center '>
          <div className='flex flex-col items-center'>
            <input type="email" name="email" id="" placeholder='Adresse Email' className='lg:w-96 min-w-52 h-12 border-[1px] border-[#9f9d9d] rounded-3xl px-3 ' />
          </div>
          <div className='flex flex-col items-center'>
            <input type="button" name="valider" id="" value={"Continuer"} className='lg:w-96 min-w-52 h-12 border-[1px] border-[#9f9d9d] rounded-3xl px-3 bg-[#E35E07] text-white ' />
          </div>

        </form>
        <div className='flex flex-col items-center gap-4 '>
          <span className='rounded-full border-[1px] border-[#9F9D9D] px-2 text-[#9F9D9D]'>
            ou
          </span>
          <button name="oauthGoogle" id="oauthGoogle" className='lg:w-96 min-w-52 py-3 last:h-12 border-[1px] border-[#9f9d9d] rounded-3xl px-3 text-[#4F4B4B] flex flex-row justify-center items-center gap-4'>
            <FcGoogle className='h-7 w-6' />
            Continuer avec Google
          </button>
          <span className='block text-[#9F9D9E]'>
            Autres Methodes d&apos;inscription
          </span>
          <div className='flex flex-row gap-4'>
            <button>
              <FaFacebook className='text-[#314698] h-7 w-6 ' />
            </button>
            <button>
              <FaApple className=' text-[#484848] rounded-md h-7 w-6 ' />
            </button>
          </div>
        </div>
      </div>
      <div className='bg-white w-1/2 h-full hidden lg:flex'>
        <Image src="/assets/images/auth-image.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto ' width={800} height={0} />
      </div>

    </div>
  )
}

export default AuthPageFS