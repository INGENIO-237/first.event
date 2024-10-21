"use client";

import ExpandRadio from "@/components/custom/config-account/ExpandRadio";
import ProgressBar from "@/components/custom/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import image from "/public/assets/images/setup-account/fourth-step.png";

const FourthStep = () => {
  const [participationEvaluation, setParticipationEvaluation] =
    useState<string>(localStorage.getItem("participationEvaluation") ?? "");
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem("participationEvaluation", participationEvaluation);
    toast.success("L'évaluation de participation à l'événement enregistrée");
    router.push("/become/organizer/fifth-step");
  };

  return (
    <div className="grow flex flex-col md:flex-row w-full h-screen">
      <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">
        <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-extrabold text-first_violet">
              Comment évaluez-vous la participation à votre événement ?
            </h1>
            <div className="w-full">
              <ProgressBar limit={5} step={4} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <ExpandRadio
              id="one"
              label={"De petite ampleur et privés (1-20)"}
              checked={
                participationEvaluation == "De petite ampleur et privés (1-20)"
              }
              onClick={() =>
                setParticipationEvaluation("De petite ampleur et privés (1-20)")
              }
            />
            <ExpandRadio
              id="two"
              label={"D'ampleur moyenne et animés (20-100)"}
              checked={
                participationEvaluation ==
                "D'ampleur moyenne et animés (20-100)"
              }
              onClick={() =>
                setParticipationEvaluation(
                  "D'ampleur moyenne et animés (20-100)"
                )
              }
            />
            <ExpandRadio
              id="three"
              label={"De grande ampleur et festifs (100-500)"}
              checked={
                participationEvaluation ==
                "De grande ampleur et festifs (100-500)"
              }
              onClick={() =>
                setParticipationEvaluation(
                  "De grande ampleur et festifs (100-500)"
                )
              }
            />
            <ExpandRadio
              id="four"
              label={"De grande ampleur et attractifs (500+)"}
              checked={
                participationEvaluation ==
                "De grande ampleur et attractifs (500+)"
              }
              onClick={() =>
                setParticipationEvaluation(
                  "De grande ampleur et attractifs (500+)"
                )
              }
            />
            <ExpandRadio
              id="five"
              label={"Je ne sais pas encore"}
              checked={participationEvaluation == "Je ne sais pas encore"}
              onClick={() =>
                setParticipationEvaluation("Je ne sais pas encore")
              }
            />
          </div>
          <div className="flex justify-around w-5/6">
            <Link
              href={"/become/organizer/third-step"}
              className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition text-center duration-300 w-2/6 "
            >
              Retour
            </Link>
            <button
              disabled={participationEvaluation == ""}
              onClick={() => handleSubmit()}
              className={cn(
                " rounded py-2 text-center text-white w-2/6 ",
                participationEvaluation == ""
                  ? "cursor-not-allowed bg-gray-400 "
                  : "bg-first_orange hover:bg-orange-600 transition duration-300"
              )}
            >
              Suivant
            </button>
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
  );
};

export default FourthStep;
