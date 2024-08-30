'use client';
import Image, { StaticImageData } from "next/image"
import image1 from '/public/assets/images/auth-experience.png';
import Link from "next/link";

const Card = (
    { image, illustrationText, textButton }: 
    { image: StaticImageData, illustrationText: string, textButton: string }) => {
    return (
        <div className="border-first_gray border rounded w-full md:w-[35%] h-full mb-5 flex flex-col items-center text-center mx-auto py-5">
            <div className="flex flex-col items-center mx-auto ">
                <Image src={image} alt={'Image 1'} width={200} height={250} className="w-1/2 md:w-full " priority />
                <div className="flex flex-col items-center mx-auto gap-4">
                    <span className='font-semibold text-2xl text-wrap text-center w-full text-first_violet'>{illustrationText}</span>
                    <Link href={'#'} className="text-first_gray border border-first_gray  p-3 hover:bg-first_orange rounded hover:text-white  transition duration-300 ">
                        {textButton}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card
