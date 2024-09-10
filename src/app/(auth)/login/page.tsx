'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { loginSchema } from "@/schema/AuthValidation";
import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/assets/logo.png';
import React, { Suspense, useState } from 'react'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";
import InputError from "@/app/components/auth/InputError";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type Schema = z.infer<typeof loginSchema>
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const isButtonDisabled = (): boolean => {
    if (errors.password || errors.email || email === '' || password === '' || password.length <= 6) {
      return true;
    }
    return false;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = (data: Schema) => {
    console.log(data);

    // TODO: send to backend and wait for the response to verify if it's the first login like that we know where we should redirect

    //case if it's the first login
    setTimeout(() => {
      window.location.href = '/welcome'
    }, 2000);
    //case if it's not the first login
    // setTimeout(() => {
    //   window.location.href = '/home'
    // }, 2000);

  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='md:h-screen md:flex flex-row md:overflow-x-hidden'>
        <div className='w-full h-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-start items-center">
              <Link href="/" className="mb-4 md:mb-0">
                <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" priority />
              </Link> 
            </div>
            <h1 className='text-2xl md:text-3xl font-bold mb-6 text-first_violet'>Se connecter</h1>
            <form className='space-y-4' onSubmit={handleSubmit((d) => onSubmit(d))}>
              <div className=''>
                <input type="email"
                  id="email"
                  {...register('email')}
                  placeholder='Adresse Email'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className={cn(errors.email ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")} />
                {errors.email && <InputError message={errors?.email?.message} />}
              </div>
              <div className='relative'>
                <input type={showPassword ? "text" : "password"}
                  id="password"
                  {...register('password')}
                  placeholder='Mot de passe'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className={cn(errors.password ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full p-2 border rounded focus:outline-none text-[#4F4B4B] placeholder:text-[#9F9D9D]")} />
                <span onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </span>
              </div>
                {errors?.password && (<InputError message={errors?.password?.message} />)}
              <div className=''>
                <button
                  type="submit"
                  disabled={isButtonDisabled()}
                  className={cn(isButtonDisabled() ? 'cursor-not-allowed bg-gray-400' : 'bg-first_orange hover:bg-orange-600 transition duration-300', 'w-full p-2 border rounded text-white ')} >
                  Valider
                </button>
              </div>
            </form>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Ou
            </div>
            <div className='flex flex-col justify-center items-center mt-4 gap-4 '>

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
    </Suspense>
  )
}

export default Login;