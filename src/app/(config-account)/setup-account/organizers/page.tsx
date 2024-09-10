'use client'
import Checkbox from '@/app/components/Checkbox'
import CategorizedList, { CategorizedListProps } from '@/app/(config-account)/setup-account/organizers/_components/CategorizedList'
import ProgressBar from '@/app/components/config-account/ProgressBar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBriefcase, FaMusic } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface SelectedOrganizers {
    organizer: string,
    organizerId: number,
    organizerType: string
}

const ThirdStep = () => {
    const [organizers, setOrganizers] = useState<SelectedOrganizers[]>([])
    const [isChecked, setIsChecked] = useState(false);
    const isButtonDisabled = () => {
        if (organizers.length == 0) {
            return true;
        }
        return false;
    }
    const categories = [
        {
          name: 'Affaires',
          icon: <FaBriefcase/>,
          items: [
            {
              title: 'Simplykart Inc',
              subtitle: 'Site informatique et outils',
              imageUrl: '/assets/images/auth-event.png',
            },
          ],
        },
        {
          name: 'Musique',
          icon: <FaMusic/>,
          items: [
            {
              title: 'Simplykart Inc',
              subtitle: 'Site informatique et outils',
              imageUrl: '/assets/images/auth-event.png',
            },
          ],
        }
      ];
    const handleSubmit = () => {
        //store interests
        localStorage.setItem('interests', JSON.stringify(organizers))
        console.log("Selected interests:", organizers);
        toast.success('OK', {
            className: 'bg-first_violet'
        })
        // TODO: Add the API logic here
    };
    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 space-y-5 flex-col justify-center md:items-center">
                <div className="md:w-4/6 flex flex-col justify-between py-9 h-full space-y-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-4xl font-extrabold text-first_violet mb-6">Suivre <br />les organisateurs <br /><span className='text-[#E35E07]'>à Montreal</span></h1>
                        <span className="text-sm text-balance mb-2">Nous pensons que vous allez adorez ces organisateurs. Suivez-les pour être averti lorsqu&apos;ils ajoutent un nouvel événement</span>
                        <div className="w-full" >
                            <span className='font-medium'>Étape 3 sur 3</span>
                            <ProgressBar limit={3} step={3} />
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <Checkbox
                                id="email-send"
                                checked={isChecked}
                                onChange={setIsChecked}
                                primaryColor="text-first_orange"
                                inputBorderColor="border-first_orange"
                            />
                            <label className="ml-2 text-sm text-gray-400 w-full" htmlFor="email-send">Envoyez-moi des e-mails sur les meilleurs événements qui se déroulent à proximité ou en ligne</label>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-row justify-between w-full">
                        <Link href={'/setup-account/interests'}
                            className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition duration-300">
                            Précedent
                        </Link>
                        <button
                            onClick={() => handleSubmit()}
                            className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition duration-300">
                            Continuer
                        </button>
                    </div>
                </div>
            </div>
            {/* second side */}
            <div className="md:w-1/2 grow mx-auto md:mt-0 md:bg-[#D9D9D9] overflow-y-scroll space-y-10 md:h-screen md:py-14 pb-16 md:pb-0 no-scrollbar">
                <div className="space-y-4 w-full flex flex-col mb-5 items-center justify-center ">
                    <CategorizedList categories={categories} />
                </div>
                <div className="md:hidden flex  justify-center">
                    <div className="flex flex-row items-center justify-between w-2/3">
                        <Link href={'/setup-account'} className=" rg border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white">
                            Précedent
                        </Link>
                        <button
                            onClick={() => handleSubmit()}
                            className={cn(isButtonDisabled() ? 'cursor-not-allowed' : 'hover:bg-first_orange hover:text-white', "border border-first_orange bg-white  p-2 rounded text-first_orange  ")}>
                            Continuer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ThirdStep