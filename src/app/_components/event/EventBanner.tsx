import { Heart, Share2 } from "lucide-react"
import Image, { StaticImageData } from "next/image"

interface EventBannerProps {
    image: string|StaticImageData,
    title: string,
    place: string,
    date: string,
    time: string,
    category: string,
}


const EventBanner = ({ image, title, place, date, time, category }: EventBannerProps) => {
    return (
        <div className="rounded-lg  flex items-center flex-row w-full p-4 bg-white gap-2 duration-500 h-fit  hover:scale-[1.01] hover:drop-shadow-xl hover:shadow-xl transition-all">
            <div className="w-1/4">
                {/* Image */}
                <Image src={image} alt={title} width={200} height={80} />
            </div>
            <div className="flex flex-col  w-2/4">
                {/* Infos */}
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-gray-500 text-sm">{date} {time}</p>
                <p className="text-gray-500 text-sm">{place}</p>
                <p className="text-gray-500 text-sm">{category}</p>
            </div>
            <div className="w-1/4">
                {/* Actions */}
                <div className="flex gap-2">
                    <button className=" shadow-card hover:text-red-500 p-2 rounded-full">
                    <Heart />
                    </button>
                    <button className=" shadow-card  p-2 rounded-full">
                    <Share2 />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default EventBanner