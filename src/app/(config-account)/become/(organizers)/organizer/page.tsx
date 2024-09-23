'use client'

import { Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import image from "/public/assets/images/setup-account/organizer-welcome.png";

const BecomeOrganizer = () => {

    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 space-y-5 flex-col justify-around md:items-center">
                <div className="md:w-5/6 flex flex-col justify-between py-9 h-1/2 space-y-5">
                    <h1 className="text-first_violet text-3xl font-bold">Bienvenue dans notre communauté d'organisateurs !</h1>
                    <span className="text-sm text-[#484848]">Voici quelques questions qui peuvent nous aider à comprendre comment nous pouvons promouvoir vos evenements.</span>

                    <Link href={'/become/organizer/first-step'} className="bg-first_orange text-white rounded py-2 text-center w-2/6 ">Commencer</Link>
                </div>
                <div className="flex flex-col w-full h-2/6 space-y-4">
                    <div className="w-full flex gap-4 flex-row" >
                        <span className="rounded-full w-fit p-3 my-auto bg-[#F6C8A9] "><Ticket /></span>
                        <span className="rounded-full my-auto text-lg text-[#484848] ">Créez et vendez des billets et soyez payés</span>
                    </div>
                    <div className="flex flex-col w-full gap-2" >
                        <div className="w-full h-full flex gap-4 flex-row" >
                            <span className="rounded-full w-fit p-3 my-auto bg-[#F6C8A9] "><Ticket /></span>
                            <span className="rounded-full my-auto text-lg text-[#484848] ">Vendez des billets sans avoir à payer de frais. Vos participants ne paient que des frais simples.</span>
                        </div>
                        <div className="mx-auto ps-16 flex gap-4 flex-row" >
                            <span className="rounded-full my-auto text-xs text-[#484848] "><sup>*</sup>Les participants paient 5,5% + 0,99$ pour chaque billet payant. Vous pouvez choisir d'absorber les frais de billet lorsque vous créez un événement.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white w-1/2 h-screen min-h-screen hidden md:flex">
                <Image src={image} alt="image" className="w-full flex object-cover justify-center h-auto"
                    width={800} height={0}
                />
            </div>
        </div>
    )
}

export default BecomeOrganizer;