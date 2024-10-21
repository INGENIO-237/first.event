"use client";

import ExpandRadio from "@/components/custom/config-account/ExpandRadio";
import ProgressBar from "@/components/custom/config-account/ProgressBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import image from "/public/assets/images/setup-account/second-step-influencer.png";

const SecondStep = () => {
  const [approximatePeople, setApproximatePeople] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setApproximatePeople(localStorage.getItem("approximatePeople") ?? "");
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("approximatePeople", approximatePeople);
    toast.success("Taille de votre équipe enregistrée");
    router.push("/become/influencer/third-step");
  };

  return (
    <div className="grow flex flex-col md:flex-row w-full h-screen">
      <div className="grow md:w-1/2 px-5 flex pt-20 pb-5 space-y-5 flex-col justify-around md:items-center">
        <div className="md:w-5/6 flex flex-col justify- py-9 h-full space-y-5">
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-extrabold text-first_violet">
              Combien de personnes vous pouvez touché par événenements ?
            </h1>
            <div className="w-full">
              <ProgressBar limit={4} step={2} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <ExpandRadio
              id="one"
              label={"+ ou - 1000"}
              checked={approximatePeople == "+ ou - 1000"}
              onClick={() => setApproximatePeople("+ ou - 1000")}
            />
            <ExpandRadio
              id="three"
              label={"+ ou -  de 10000"}
              checked={approximatePeople == "+ ou -  de 10000"}
              onClick={() => setApproximatePeople("+ ou -  de 10000")}
            />
            <ExpandRadio
              id="four"
              label={"Plus de 10000"}
              checked={approximatePeople == "Plus de 10000"}
              onClick={() => setApproximatePeople("Plus de 10000")}
            />
          </div>
          <div className="flex justify-around w-5/6">
            <Link
              href={"/become/influencer/first-step"}
              className="border border-first_orange bg-white hover:bg-first_orange p-2 rounded text-first_orange hover:text-white transition text-center duration-300 w-2/6 "
            >
              Retour
            </Link>
            <button
              disabled={approximatePeople == ""}
              onClick={() => handleSubmit()}
              className={cn(
                " rounded py-2 text-center text-white w-2/6 ",
                approximatePeople == ""
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

export default SecondStep;
