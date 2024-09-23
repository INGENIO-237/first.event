'use client';

import ExpandRadio from "@/app/_components/config-account/ExpandRadio";
import ProgressBar from "@/app/_components/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import image from "/public/assets/images/setup-account/third-step-influencer.png";



const ThirdStep = () => {
    const [pastEvent, setPastEvent] = useState<string>("");
    const router = useRouter();

    const handleSubmit = () => {
        localStorage.setItem("pastEvent", pastEvent);
        toast.success("Nombre d'événements organisés enregistré");
        router.push("/become/influencer/fourth-step");
    }

    useEffect(() => {
        setPastEvent(localStorage.getItem("pastEvent") ?? "");
    }, []);

    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">

                <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-3xl font-extrabold text-first_violet">
                            Combien d&apos;événements avez-vous déjà organisez ?
                        </h1>
                        <div className="w-full">
                            <ProgressBar limit={4} step={3} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <ExpandRadio id="one" label={"Juste un"} checked={pastEvent == 'Juste un'} onClick={() => setPastEvent('Juste un')} />
                        <ExpandRadio id="two" label={"Quelques-uns (2-12)"} checked={pastEvent == 'Quelques-uns (2-12)'} onClick={() => setPastEvent('Quelques-uns (2-12)')} />
                        <ExpandRadio id="three" label={"Beaucoup (12+)"} checked={pastEvent == 'Beaucoup (12+)'} onClick={() => setPastEvent('Beaucoup (12+)')} />
                        <ExpandRadio id="four" label={"Aucun"} checked={pastEvent == 'Aucun'} onClick={() => setPastEvent('Aucun')} />
                    </div>
                    <div className="flex justify-around w-5/6">
                        <Link href={'/become/influencer/second-step'} className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition text-center duration-300 w-2/6 ">Retour</Link>
                        <button
                            disabled={pastEvent == ''}
                            onClick={() => handleSubmit()}
                            className={cn(" rounded py-2 text-center text-white w-2/6 ", pastEvent == '' ? "cursor-not-allowed bg-gray-400 " : "bg-first_orange hover:bg-orange-600 transition duration-300")} >
                            Suivant</button>
                    </div>
                </div>
            </div>
            <div className="bg-white w-1/2 h-screen min-h-screen hidden md:flex">
                <Image
                    src={image}
                    alt="image"
                    className="w-full flex object-cover justify-center h-auto"
                    width={800}
                    height={0}
                />
            </div>
        </div>
    )
}

export default ThirdStep;