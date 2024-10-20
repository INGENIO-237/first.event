'use client'

import ExpandRadio from "@/app/_components/config-account/ExpandRadio";
import ProgressBar from "@/app/_components/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import image from "/public/assets/images/setup-account/first-step.png";

const FirstStep = () => {
    const [experience, setExperience] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        setExperience(localStorage.getItem("experience") ?? "");
    }, []);

    //TODO : verify the user have already set-up his account 
    let condition = false;
    if (condition) {
        localStorage.setItem('redirect-after-setup-account', '/become/influencer/step-1')
        router.push('/setup-account')
    }


    const handleSubmit = () => {
        localStorage.setItem("experience", experience);
        toast.success("Experience enregistrée");
        router.push("/become/influencer/second-step");
    }

    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">

                <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-3xl font-extrabold text-first_violet">
                            Avez-vous déjà communiqué sur des événements ?
                        </h1>
                        <div className="w-full">
                            <ProgressBar limit={5} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                    </div>
                    <ExpandRadio id="one" label={"Non c'est ma première experience"} checked={experience == "Non c'est ma première experience"} onClick={() => setExperience("Non c'est ma première experience")} />
                    <ExpandRadio id="two" label={"J'ai un peu d'éxpérience en communication d'événements"} checked={experience == "J'ai un peu d'éxpérience en communication d'événements"} onClick={() => setExperience("J'ai un peu d'éxpérience en communication d'événements")} />
                    <ExpandRadio id="three" label={"J'ai beaucoup d'experience en communication d'événements"} checked={experience == "J'ai beaucoup d'experience en communication d'événements"} onClick={() => setExperience("J'ai beaucoup d'experience en communication d'événements")} />
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
                    priority
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



export default FirstStep