'use client';

import ExpandRadio from "@/app/_components/config-account/ExpandRadio";
import ProgressBar from "@/app/_components/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import image from "/public/assets/images/setup-account/second-step.png";



const SecondStep = () => {
    const [pastTeam, setPastTeam] = useState<string>(localStorage.getItem("pastTeam") ?? "");
    const router = useRouter();

    const handleSubmit = () => {
        localStorage.setItem("pastTeam", pastTeam);
        toast.success("Taille de votre équipe enregistrée");
        router.push("/become/organizer/third-step");
    }

    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">
                <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-3xl font-extrabold text-first_violet">
                            Combien de personnes vont vous aider à planifier les événements ?
                        </h1>
                        <div className="w-full">
                            <ProgressBar limit={5} step={2} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <ExpandRadio id="one" label={"Juste moi"} checked={pastTeam == 'Juste moi'} onClick={() => setPastTeam('Juste moi')} />
                        <ExpandRadio id="three" label={"Quelques personnes (2-10)"} checked={pastTeam == 'Quelques personnes (2-10)'} onClick={() => setPastTeam('Quelques personnes (2-10)')} />
                        <ExpandRadio id="four" label={"Une équipe (10+)"} checked={pastTeam == 'Une équipe (10+)'} onClick={() => setPastTeam('Une équipe (10+)')} />
                    </div>
                    <div className="flex justify-around w-5/6">
                        <Link href={'/become/organizer/first-step'} className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition text-center duration-300 w-2/6 ">Retour</Link>
                        <button
                            disabled={pastTeam == ''}
                            onClick={() => handleSubmit()}
                            className={cn(" rounded py-2 text-center text-white w-2/6 ", pastTeam == '' ? "cursor-not-allowed bg-gray-400 " : "bg-first_orange hover:bg-orange-600 transition duration-300")} >
                            Suivant</button>
                    </div>
                </div>
            </div>
            <div className="bg-white w-1/2 h-screen min-h-screen hidden md:flex">
                <Image
                    src={image}
                    alt="image"
                    priority
                    className="w-full flex object-cover justify-center h-auto"
                    width={800}
                    height={0}
                />
            </div>
        </div>
    )
}

export default SecondStep;