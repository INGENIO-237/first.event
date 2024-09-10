'use client';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ProgressBar from '@/app/components/config-account/ProgressBar';
import { FaSearchLocation } from "react-icons/fa";
import { cn } from "@/lib/utils";
import * as z from "zod"
import { FirstStepSchema } from '@/schema/ConfigAccountValidation';
import { useEffect, useState } from 'react';
import InputError from "@/app/components/auth/InputError";
import { toast } from "react-toastify";

type Schema = z.infer<typeof FirstStepSchema>
const SetupAccount = () => {
    const [location, setLocation] = useState<string>('');
    
    useEffect(()=>{
        let storedLocation = localStorage.getItem('location');
        if(storedLocation){
            setLocation(storedLocation)
        }
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(FirstStepSchema),
    });

    const isButtonDisabled = (): boolean => {
        
        if (errors.location || location == '') {
            return true;
        }
        return false;
    }


    const onSubmit = (data: Schema) => {
        //Add the location in the localStorage
        localStorage.setItem('location', data.location)

        // TODO: Envoyer au backend 
        toast.success('Localisation enregisté!', );
        setTimeout(() => {
            window.location.href = '/setup-account/interests'
        }, 2000)
    }

    return (
        <div className='grow flex flex-col md:flex-row w-full'>
            <div className="grow md:w-1/2 flex pt-10 md:pt-0 px-5 space-y-5 flex-col justify-center md:items-center md:m-auto ">
                <div className="md:w-3/6 space-y-5">
                    <h1 className="text-3xl font-bold text-first_violet">Définir votre position</h1>
                    <span>Nous vous  suggérons des activités uniques à faire près de chez vous et les meilleurs organisateurs de votre région.</span>
                </div>
                <div className="w-full md:w-3/6" >
                    <span className='text-lg font-medium'>Étape 1 sur 3</span>
                    <ProgressBar limit={3} />
                </div>
            </div>
            <div className="md:w-1/2 grow mx-auto flex md:pt-20 md:place-content-center md:bg-[#D9D9D9] ">
                <div className='space-y-5'>
                    <div className='text-center'>
                        <span>
                            Vous recherchez des événements dans:
                        </span>
                    </div>
                    <form className="space-y-5 mx-auto" onSubmit={handleSubmit((d) => {onSubmit(d)})}>
                        <div className='relative'>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <FaSearchLocation />
                            </div>
                            {/*  
                            TODO: Make the search of city  
                             */}
                            <input type="search"
                                value={location}
                                {...register('location')}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                                className={cn(errors?.location ? 'focus:border-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300' : 'focus:border-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition duration-300 hover:border-gray-300', "w-full p-4 border rounded focus:outline-none text-[#4F4B4B] ps-10 block placeholder:text-[#9F9D9D]")}
                                // className="border focus:ring-2 focus:ring-offset-2 rounded w-full focus:outline-none border-first_gray block p-4 ps-10 text-sm" 
                                placeholder="Montréal" />
                            {errors?.location && (<InputError message={errors?.location?.message} />)}
                        </div>
                        <div className="flex justify-end items-end w-full">
                            <button type='submit'
                                disabled={isButtonDisabled()}
                                name="Continuer"
                                className={cn(isButtonDisabled() ? 'cursor-not-allowed  text-white bg-orange-400' : 'md:text-first_orange border border-first_orange md:bg-white hover:bg-first_orange rounded hover:text-white text-white   transition duration-300', 'p-3 border rounded  bg-first_orange ')}
                            >
                                Continuer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SetupAccount;