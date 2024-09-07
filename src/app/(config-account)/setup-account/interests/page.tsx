'use client';
import InterestCard from "@/app/components/config-account/InterestCard";
import ProgressBar from "@/app/components/config-account/ProgressBar";
import { interests } from "@/utils/interests";
import { useState } from "react";


interface Interest {
    name: string,
    icon: JSX.Element,
    tags: Array<string>
}
const SecondStep = () => {

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const handleInterestToggle = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = () => {
        console.log("Selected interests:", selectedInterests);
        //TODO Add your API call or state management logic here
    };

    return (
        <div className="grow flex flex-col md:flex-row w-full">
            <div className="grow md:w-1/2 flex pt-10 md:pt-0 px-5 space-y-5 flex-col justify-center md:items-center md:m-auto ">
                <div className="md:w-3/6 space-y-5">
                    <h1 className="text-3xl font-bold text-first_violet">Dites nous ce que vous aimez</h1>
                    <span>Personnalisez vos recommandations d&apos;évenements en fonction de vos interêts.</span>
                </div>
                <div className="w-full md:w-3/6" >
                    <span className='text-lg font-medium'>Étape 2 sur 3</span>
                    <ProgressBar limit={3} step={2} />
                </div>
            </div>
            <div className="grow md:w-1/2 ">
                {interests.map((interest: Interest) => (
                    <InterestCard
                        key={interest.name}
                        category={interest.name}
                        tags={interest.tags}
                        icon={interest.icon}
                        selectedInterests={selectedInterests}
                        onInterestToggle={handleInterestToggle}
                    />
                ))}
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-first_violet text-white rounded hover:bg-opacity-90 transition-colors"
                >
                    Continuer
                </button>
            </div>
        </div>
    );
}

export default SecondStep