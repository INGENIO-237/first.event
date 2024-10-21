"use client";
import Image from "next/image";
import Link from "next/link";
import image1 from "/public/assets/images/auth-experience.png";

const Welcome = () => {
  return (
    <div className="mx-auto my-auto p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="">
          <Image
            src={image1}
            alt={"Image 1"}
            width={200}
            height={250}
            className=""
            priority
          />
        </div>

        <div className="p-4 md:p-8 flex items-center text-center justify-start mb-2 flex-col">
          <h1 className="text-3xl font md:text-6xl font-bold text-first_violet">
            Bienvenue sur FirstEvent!
          </h1>
          <span className="font-medium text-first_violet">
            Nous sommes heureux que vous soyez ici!{" "}
          </span>
        </div>
        <div className="flex justify-end items-end w-full">
          <Link
            href={"/setup-account/interests"}
            className="text-first_gray border  border-first_gray  p-3 hover:bg-first_orange rounded hover:text-white  transition duration-300 text-wrap "
          >
            Dites nous en plus sur vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
