'use client'

import ExpandRadio from "@/app/_components/config-account/ExpandRadio";
import ProgressBar from "@/app/_components/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import image from "/public/assets/images/setup-account/first-step.png";

const FirstStep = () => {
    const [experience, setExperience] = useState<string>(localStorage.getItem("experience") ?? "");
    const router = useRouter();

    let condition = false;
    if(condition){
        localStorage.setItem('redirect-after-setup-account', '/become/organizer/step-1' )
        router.push('/setup-account')
    }

    const handleSubmit = () => {
        localStorage.setItem("experience", experience);
        toast.success("Experience enregistrée");
        router.push("/become/organizer/second-step");
    }
    
    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">

                <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-3xl font-extrabold text-first_violet">
                            Avez-vous déjà organisé un événement ?
                        </h1>
                        <div className="w-full">
                            <ProgressBar limit={5} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <ExpandRadio id="first-time" label={"Je n'ai pas encore organisé d'événement"} checked={experience == "Je n'ai pas encore organisé d'événement"} onClick={() => setExperience("Je n'ai pas encore organisé d'événement")} />
                        <ExpandRadio id="little-exp" label={"J'ai déjà organisé un événement"} checked={experience == "J'ai déjà organisé un événement"} onClick={() => setExperience("J'ai déjà organisé un événement")} />
                        <ExpandRadio id="big-exp" label={"J'ai beaucoup d'expérience en organisation d'événements"} checked={experience == "J'ai beaucoup d'expérience en organisation d'événements"} onClick={() => setExperience("J'ai beaucoup d'expérience en organisation d'événements")} />
                    </div>
                    <div>
                        <button
                            disabled={experience == ''}
                            onClick={() => handleSubmit()}
                            className={cn(" rounded py-2 text-center text-white w-2/6 ", experience == '' ? "cursor-not-allowed bg-gray-400 " : "bg-first_orange hover:bg-orange-600 transition duration-300")} >
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



export default FirstStep