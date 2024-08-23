'use client';
import Image from "next/image"
import { useForm } from 'react-hook-form';
import logo from '/public/assets/logo.png';
import { cn } from "@/lib/utils";
import { resetPasswordSchema } from "@/schema/AuthValidation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type Schema = z.infer<typeof resetPasswordSchema>

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: Schema) => {
        toast.success('OK');
        //Envoi des infos au endpoint
    }
    return (
        <div className="h-screen flex flex-row md:overflow-x-hidden">
            <div className='w-full h-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center' >
                <div className="max-w-md my-auto mx-auto w-full">
                    <div className="flex justify-start items-center">
                        <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="mb-6 w-60" />
                    </div>
                    <h1 className='text-2xl md:text-3xl font-bold mb-6 text-first_violet'>Mot de passe oublié</h1>
                    <span className='text-[#484848] font-normal text-sm w-8/12 md:w-6/12'>
                        Pour des mesures de securité, pour réinitialiser votre mot de passe nous avons besoin de confirmer votre identité. Veuillez insérer votre adresse email et un code de validation à 5 chiffres vous sera envoyé par mail ou SMS.
                    </span>
                    <form className='space-y-4 mt-5' onSubmit={handleSubmit((d) => onSubmit(d))}>
                        <div className='flex flex-col items-center'>
                            <input type="email" id="email" {...register('email')} placeholder='Adresse Email' className={cn('w-full p-2 border rounded  border-first_gray', errors.email && 'border-red-500')} />
                            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
                        </div>
                        <div className='flex flex-col items-center my-12'>
                            <button type="submit" name="valider" id="" className='w-full p-2 border rounded  bg-first_orange text-white ' >Confirmer</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='w-1/2 h-full hidden md:flex'>
                <Image src="/assets/images/auth-image.png" alt="Next.js Logo" className='w-full flex object-cover justify-center h-auto' width={800} height={0} />
            </div>
        </div>
    )
}

export default ForgotPassword