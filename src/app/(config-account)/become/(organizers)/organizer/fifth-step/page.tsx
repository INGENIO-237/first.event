"use client";

import ExpandCheckBox from "@/app/_components/config-account/ExpandCheckbox";
import ProgressBar from "@/app/_components/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import image from "/public/assets/images/setup-account/fourth-step.png";



const FifthStep = () => {
    const [goals, setGoals] = useState<string[]>(JSON.parse(localStorage.getItem("goals") ?? "[]"));
    const router = useRouter();

    const handleSubmit = () => {
        localStorage.setItem("goals", JSON.stringify(goals));
        toast.success("Vos centres d'intérêts enregistrés");
        router.push("#");
    }

    const addOrRemoveGoal = (goal: string) => {
        if (goals.includes(goal)) {
            setGoals((prevGoals) => [...prevGoals.filter(item => item !== goal)]);
        } else {
            setGoals((prevGoals) => [...prevGoals, goal]);
        }
    }

    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">
                <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-3xl font-extrabold text-first_violet">
                            Quels sont vos centres d'intérêts ? Sélectionnez tout ce qui s&apos;applique.
                        </h1>
                        <div className="w-full">
                            <ProgressBar limit={5} step={5} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <ExpandCheckBox
                            label={"Vendre plus de billets"}
                            onClick={() => addOrRemoveGoal('Vendre plus de billets')}
                            selectedElts={goals} id="1" />
                        <ExpandCheckBox
                            label={"Promouvoir sur plusieurs plateformes"}
                            onClick={() => addOrRemoveGoal('Promouvoir sur plusieurs plateformes')}
                            selectedElts={goals} id="2" />
                        <ExpandCheckBox
                            label={"Developper ma marque"}
                            onClick={() => addOrRemoveGoal('Developper ma marque')}
                            selectedElts={goals} id="3" />
                        <ExpandCheckBox
                            label={"Atteindre mon public cible avec les données de FirstEvent"}
                            onClick={() => addOrRemoveGoal('Atteindre mon public cible avec les données de FirstEvent')}
                            selectedElts={goals} id="4" />
                        <ExpandCheckBox
                            label={"Faire des gains de temps sur les taches marketing"}
                            onClick={() => addOrRemoveGoal('Faire des gains de temps sur les taches marketing')}
                            selectedElts={goals} id="5" />
                    </div>
                    <div className="flex justify-around w-5/6">
                        <Link href={"/become/organizer/second-step"} className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition text-center duration-300 w-2/6 ">Retour</Link>
                        <button
                            disabled={goals.length == 0}
                            onClick={() => handleSubmit()}
                            className={cn(" rounded py-2 text-center text-white w-2/6 ", goals.length == 0 ? "cursor-not-allowed bg-gray-400 " : "bg-first_orange hover:bg-orange-600 transition duration-300")} >
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

export default FifthStep;