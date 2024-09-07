'use client';
import InterestCard from "@/app/components/config-account/InterestCard";
import ProgressBar from "@/app/components/config-account/ProgressBar";
import { interests } from "@/utils/interests";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface SelectedInterest {
    interest: string,
    tags: Array<string>
}
const SecondStep = () => {

    const [selectedInterests, setSelectedInterests] = useState<SelectedInterest[]>([]);
    const handleInterestToggle = (interestName: string, tag: string) => {
        setSelectedInterests((prevSelected) => {
            // Find the interest category
            const existingInterest = prevSelected.find(
                (item) => item.interest === interestName
            );

            if (existingInterest) {
                const isTagSelected = existingInterest.tags.includes(tag);
                const updatedTags = isTagSelected
                    ? existingInterest.tags.filter((t) => t !== tag)
                    : [...existingInterest.tags, tag];

                // Update the interest object or remove it if no tags are left
                const updatedInterests = updatedTags.length
                    ? prevSelected.map((item) =>
                        item.interest === interestName
                            ? { ...item, tags: updatedTags }
                            : item
                    )
                    : prevSelected.filter((item) => item.interest !== interestName);

                return updatedInterests;
            } else {
                // If the category does not exist, add it with the selected tag
                return [...prevSelected, { interest: interestName, tags: [tag] }];
            }
        });
    };

    useEffect(() => {
        console.log({ selectedInterests });
    }, [selectedInterests])

    const handleSubmit = () => {
        console.log("Selected interests:", selectedInterests);
        toast.success('OK')
        // TODO: Add the API logic here
    };

    return (
        <div className="grow flex flex-col md:flex-row w-full h-screen">
            <div className="grow md:w-1/2 px-5 flex pt-20 space-y-5 flex-col justify-center md:items-center">
                <div className="md:w-3/6 flex flex-col justify-between py-9 h-full space-y-5">
                    <div className="w-full space-y-4">
                        <h1 className="text-3xl font-bold text-first_violet">Dites nous ce que vous aimez.</h1>
                        <span>Personnalisez vos recommandations d&apos;évenements en fonction de vos interêts.</span>
                        <div className="w-full" >
                            <span className='text-lg font-medium'>Étape 2 sur 3</span>
                            <ProgressBar limit={3} step={2} />
                        </div>
                    </div>
                    <div className="hidden md:flex flex-row justify-between w-full">
                        <Link href={'/setup-account'} className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white">
                            Précedent
                        </Link>
                        <button
                            onClick={() => handleSubmit()}
                            className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white ">
                            Continuer
                        </button>
                    </div>
                </div>
            </div>
            {/* second side */}
            <div className="md:w-1/2 grow mx-auto mt-8 md:mt-0 md:bg-[#D9D9D9] overflow-y-scroll md:h-screen md:py-20 no-scrollbar">
                <div className="space-y-4 w-full flex flex-col items-center justify-center ">
                    {interests.map((interest) => (
                        <InterestCard
                            key={interest.name}
                            category={interest.name}
                            tags={interest.tags}
                            icon={interest.icon}
                            selectedInterests={
                                selectedInterests.find(
                                    (item) => item.interest === interest.name
                                )?.tags || []
                            }
                            onInterestToggle={(tag) => handleInterestToggle(interest.name, tag)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SecondStep