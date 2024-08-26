'use client';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginSchema } from "@/schema/AuthValidation";
import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/assets/logo.png';
import React from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { cn } from "@/lib/utils";

type Schema = z.infer<typeof loginSchema>
const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = (data: Schema) => {
    //Envoi des infos au endpoint
  }

  return (
    <div className='md:h-screen md:flex flex-row md:overflow-x-hidden'>
      <div className='w-full h-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-start items-center">
            <Link href="/" className="mb-4 md:mb-0">
              <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" />
            </Link>
          </div>
          <h1 className='text-2xl md:text-3xl font-bold mb-6 text-first_violet'>Se connecter</h1>
          <form className='space-y-4' onSubmit={handleSubmit((d) => onSubmit(d))}>
            <div className='flex flex-col items-center'>
              <input type="email" id="email" {...register('email')} placeholder='Adresse Email' className={cn('w-full p-2 border rounded  border-first_gray', errors.email && 'border-red-500 focus:border-red-500')} />
              {errors?.email && (<p className="text-center text-red-500">{errors?.email?.message}</p>)}
            </div>
            <div className='flex flex-col items-center'>
              <input type="password" id="password" {...register('password')} placeholder='Mot de passe' className={cn('w-full p-2 border rounded  border-first_gray', errors.password && 'border-red-500 focus:border-red-500')} />
              {errors?.password && (<p className="text-red-500">{errors?.password?.message}</p>)}
            </div>
            <div className='flex flex-col items-center'>
              <button type="submit" name="valider" id="" className='w-full p-2 border rounded  bg-first_orange text-white ' >Valider</button>
            </div>
          </form>
          <div className='flex flex-col justify-center items-center mt-4 gap-4 '>
            <span className='rounded-full border-[1px] text-center border-first_gray p-2 text-first_gray'>
              ou
            </span>
            <button name="oAuthGoogle" id="oAuthGoogle" className='w-full p-2 border rounded  border-first_gray text-[#4F4B4B] flex flex-row justify-center items-center gap-4'>
              <FcGoogle className='h-7 w-6' />
              Continuer avec Google
            </button>
            <span className="w-full text-end underline text text-first_violet">
              <Link href='/forgot-password' >Mot de passe oublié?</Link>
            </span>
            <span className='block text-first_gray'>
              Autres méthodes de connexion
            </span>
            <div className='flex flex-row gap-4'>
              <button>
                <FaFacebook className='text-[#314698] h-7 w-6 ' />
              </button>
              <button>
                <FaApple className=' text-[#484848] rounded-md h-7 w-6 ' />
              </button>
            </div>
            <Link href={'/register'} className='font-medium items-start text-first_violet hover:underline'>Créer un compte</Link>
          </div>
        </div>
      </div>
      <div className='bg-white w-1/2 h-full min-h-md hidden md:flex'>
        <Image src="/assets/images/auth-image.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto ' width={800} height={0} />
      </div>

    </div>
  )
}

export default Login;