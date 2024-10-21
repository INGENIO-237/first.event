import { Heart, Share2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface EventBannerProps {
  image: string | StaticImageData;
  title: string;
  place: string;
  date: string;
  time: string;
  category: string;
}

const EventBanner = ({
  image,
  title,
  place,
  date,
  time,
  category,
}: EventBannerProps) => {
  return (
    <div className="rounded-lg  flex items-center flex-row w-full p-4 bg-white gap-2 duration-500 h-24  hover:scale-[1.01] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,25,0.15)] transition-all">
      <div className="w-1/4 h-full">
        {/* Image */}
        <Image
          src={image}
          priority
          alt={title}
          width={200}
          height={90}
          className="rounded-lg h-16 w-auto object-cover "
        />
      </div>
      <div className="flex flex-col  w-2/4">
        {/* Infos */}
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-gray-500 text-sm">
          {date} {time}
        </p>
        <p className="text-gray-500 text-sm">{place}</p>
        <p className="text-gray-500 text-sm">{category}</p>
      </div>
      <div className="w-1/4">
        {/* Actions */}
        <div className="flex gap-2">
          <button className="shadow-card hover:text-red-500 p-2 rounded-full">
            <Heart className="" />
          </button>
          <button className="shadow-card  p-2 rounded-full">
            <Share2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
