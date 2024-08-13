'use client';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/assets/logo.png';
import React from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const schema = z.object({
  email: z.string({required_error: "Email requis"}).email({message: "Email invalide"}),
  password: z.string({required_error: "Mot de passe requis"}).min(6, {message: 'Mot de passe trop court'}),
})
type Schema = z.infer<typeof schema>
const Login = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<Schema>({
    resolver: zodResolver(schema),
  });

 
  return (
    <div className='w-screen h-screen md:flex flex-row lg:overflow-x-hidden'>
      <div className='w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-start items-center">
            <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" />
          </div>
          <h1 className='text-2xl lg:text-3xl font-bold mb-6 text-[#270B87]'>Se connecter</h1>
          <form className='space-y-4' onSubmit={handleSubmit((d) => console.log(d))}>
            <div className='flex flex-col items-center'>
              <input  />
              <input type="email" id="email" {...register('email')} placeholder='Adresse Email' className='w-full p-2 border rounded  border-[#9f9d9d]' />
              {errors.email && <p className="text-red-700">{errors.email.message}</p>}
            </div>
            <div className='flex flex-col items-center'>
              <input type="password" id="password" {...register('password')} placeholder='Mot de passe' className='w-full p-2 border rounded  border-[#9f9d9d]' />
              {errors.password && <p className="text-red-700">{errors.password.message}</p>}
            </div>
            <div className='flex flex-col items-center'>
              <input type="submit" name="valider" id="" value={"Continuer"} className='w-full p-2 border rounded  bg-[#E35E07] text-white ' />
            </div>
          </form>
          <div className='flex flex-col justify-center items-center mt-4 gap-4 '>
            <span className='rounded-full border-[1px] text-center border-[#9F9D9D] p-2 text-[#9F9D9D]'>
              ou
            </span>
            <button name="oAuthGoogle" id="oAuthGoogle" className='w-full p-2 border rounded  border-[#9f9d9d] text-[#4F4B4B] flex flex-row justify-center items-center gap-4'>
              <FcGoogle className='h-7 w-6' />
              Continuer avec Google
            </button>
            <span className='block text-[#9F9D9E]'>
              Autres Methodes de connexion
            </span>
            <div className='flex flex-row gap-4'>
              <button>
                <FaFacebook className='text-[#314698] h-7 w-6 ' />
              </button>
              <button>
                <FaApple className=' text-[#484848] rounded-md h-7 w-6 ' />
              </button>
            </div>
            <Link href={'/register'} className='font-medium items-start text-[#270B87]'>Creez un compte</Link>
          </div>
        </div>
      </div>
      <div className='bg-white w-1/2 h-full hidden lg:flex'>
        <Image src="/assets/images/auth-image.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto ' width={800} height={0} />
      </div>

    </div>
  )
}

export default Login;