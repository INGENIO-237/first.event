"use client";

import ExpandRadio from "@/components/custom/config-account/ExpandRadio";
import ProgressBar from "@/components/custom/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import image from "/public/assets/images/setup-account/third-step.png";

const ThirdStep = () => {
  const [targetYearlyEvents, setTargetYearlyEvents] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setTargetYearlyEvents(localStorage.getItem("targetYearlyEvents") || "");
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("targetYearlyEvents", targetYearlyEvents);
    toast.success("Nombre d'événements à organiser cette année enregistré");
    router.push("/become/organizer/fourth-step");
  };

  return (
    <div className="grow flex flex-col md:flex-row w-full h-screen">
      <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">
        <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-extrabold text-first_violet">
              Combien d&apos;événements organisez-vous cette année ?
            </h1>
            <div className="w-full">
              <ProgressBar limit={5} step={3} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <ExpandRadio
              id="one"
              label={"Juste un"}
              checked={targetYearlyEvents == "Juste un"}
              onClick={() => setTargetYearlyEvents("Juste un")}
            />
            <ExpandRadio
              id="two"
              label={"Quelques-uns (2-12)"}
              checked={targetYearlyEvents == "Quelques-uns (2-12)"}
              onClick={() => setTargetYearlyEvents("Quelques-uns (2-12)")}
            />
            <ExpandRadio
              id="three"
              label={"Beaucoup (12+)"}
              checked={targetYearlyEvents == "Beaucoup (12+)"}
              onClick={() => setTargetYearlyEvents("Beaucoup (12+)")}
            />
            <ExpandRadio
              id="four"
              label={"Je ne sais pas encore"}
              checked={targetYearlyEvents == "Je ne sais pas encore"}
              onClick={() => setTargetYearlyEvents("Je ne sais pas encore")}
            />
          </div>
          <div className="flex justify-around w-5/6">
            <Link
              href={"/become/organizer/second-step"}
              className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition text-center duration-300 w-2/6 "
            >
              Retour
            </Link>
            <button
              disabled={targetYearlyEvents == ""}
              onClick={() => handleSubmit()}
              className={cn(
                " rounded py-2 text-center text-white w-2/6 ",
                targetYearlyEvents == ""
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

export default ThirdStep;
