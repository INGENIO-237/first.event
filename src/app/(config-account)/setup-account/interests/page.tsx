
"use client";
import InterestCard from "@/app/_components/config-account/InterestCard";
import ProgressBar from "@/app/_components/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import { interests as interestsData } from "@/utils/interests";
import { SelectedInterest, SetupInterests } from "@/utils/types/setup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {toast} from "sonner";



const FirstStep = () => {
  const [interests, setInterests] = useState<SelectedInterest[]>([]);
  const handleInterestToggle = (interestName: string, tag: string) => {
    setInterests((prevSelected) => {
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


  const isButtonDisabled = () => {
    if (interests.length == 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setInterests(JSON.parse(localStorage.getItem("interests") || "[]"));
  }, [])

  console.log(isButtonDisabled());

  const handleSubmit = () => {
    if (isButtonDisabled()) {

      toast.warning("Veillez selectionner au moins un centre d'intérêts");
    }
    else {
      //store interests
      localStorage.setItem("interests", JSON.stringify(interests));
      console.log("Selected interests:", interests);
      //Select only the interests name and place them in the payload
      const interestsName: Array<string> = [];
      interests.forEach((interest, index) => {
        interestsName.push(interest.interest);
      });
      const payload: SetupInterests = {
        interests: interestsName 
      }

      // TODO: Add the API logic here

    }
  };

  return (
    <div className="grow flex flex-col md:flex-row w-full h-screen">
      <div className="grow md:w-1/2 px-5 flex pt-20 space-y-5 flex-col justify-center md:items-center">
        <div className="md:w-4/6 flex flex-col justify-between py-9 h-full space-y-5">
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-bold text-first_violet">
              Dites nous ce que vous aimez.
            </h1>
            <span>
              Personnalisez vos recommandations d&apos;évenements en fonction de
              vos interêts.
            </span>
            <div className="w-full">
              <ProgressBar limit={2} />
            </div>
          </div>
          <div className="hidden md:flex flex-row justify-between w-full">
            <button
              onClick={() => handleSubmit()}
              className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white "
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
      {/* second side */}
      <div className="md:w-1/2 grow mx-auto md:mt-0 md:bg-[#D9D9D9] overflow-y-scroll space-y-10 md:h-screen md:py-14 pb-16 md:pb-0 no-scrollbar">
        <div className="space-y-4 w-full flex flex-col mb-5 items-center justify-center ">
          {interestsData.map((interest, index: React.Key) => (
            <InterestCard
              key={index}
              category={interest.name}
              tags={interest.tags}
              icon={interest.icon}
              selectedInterests={
                interests.find((item) => item.interest === interest.name)
                  ?.tags || []
              }
              onInterestToggle={(tag) =>
                handleInterestToggle(interest.name, tag)
              }
            />
          ))}
        </div>
        <div className="md:hidden flex  justify-center">
          <div className="flex flex-row items-center justify-between w-2/3">
            <Link
              href={"/setup-account"}
              className="rg border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white"
            >
              Précedent
            </Link>
            <button
              disabled={isButtonDisabled()}
              onClick={() => handleSubmit()}
              className={cn(
                "border border-first_orange bg-white  p-2 rounded text-first_orange  ",
                isButtonDisabled()
                  ? "cursor-not-allowed "
                  : "hover:bg-first_orange hover:text-white",
              )}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstStep;
