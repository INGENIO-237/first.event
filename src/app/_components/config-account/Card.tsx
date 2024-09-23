'use client';
import Image, { StaticImageData } from "next/image"
import Link from "next/link";

const Card = (
    { image, illustrationText, textButton, link }: 
    { image: StaticImageData, illustrationText: string, textButton: string, link: string }) => {
    return (
        <div className="border-first_gray  border rounded w-full md:w-[35%] mb-5 flex flex-col justify-center items-center text-center mx-auto p-5">
            <div className="flex flex-col items-center justify-center p-8 mx-auto  ">
                <Image src={image} alt={'Image 1'} width={200} height={250} className="w-1/2 " priority />
                <div className="flex flex-col items-center mx-auto gap-4 w-full">
                    <span className='font-semibold text-2xl text-wrap text-center w-full text-first_violet'>{illustrationText}</span>
                    <Link href={link} className="text-first_gray border  border-first_gray  p-3 hover:bg-first_orange rounded hover:text-white  transition duration-300 text-wrap ">
                        {textButton}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card
