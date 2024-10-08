import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HandleLike, topTendanceInterface } from "@/utils/topTendances";
import { Heart, MapPin, Share2 } from "lucide-react";
import Image from "next/image";

export const TendanceCard = ({
  topTendance,
  handleLike,
  likedEvents,
  isGrid = false,
}: {
  topTendance: topTendanceInterface;
  handleLike: HandleLike;
  likedEvents: Set<number>;
  isGrid?: boolean;
}) => {
  return (
    <div className={cn(
      "p-2",
      isGrid ? "w-full" : "min-w-[250px] max-w-[320px] flex-shrink-0"
    )}>
      <Card className="flex flex-col h-full overflow-hidden">
        <div className={cn(
          "relative overflow-hidden",
          isGrid ? "pt-[56.25%]" : "h-48 min-w-[250px] max-w-[320px]" // 16:9 pour grid, hauteur fixe pour non-grid
        )}>
          <Image
            src={topTendance.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={topTendance.title}
            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> */}
          <div className="absolute top-2 right-2 flex gap-x-2">
            <button
              title="Aimer l'événement"
              className="bg-white/80 p-1.5 rounded-full transition-colors duration-200 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
              onClick={() => handleLike(topTendance.id)}
            >
              <Heart
                size={16}
                className={cn(
                  "transition duration-500 ease-in-out transform",
                  likedEvents.has(topTendance.id)
                    ? "fill-first_orange text-first_orange scale-125"
                    : "text-gray-600 hover:text-first_orange hover:scale-110"
                )}
              />
            </button>
            <button
              title="Partager l'événement"
              className="bg-white/80 p-1.5 rounded-full transition-colors duration-200 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
              onClick={() => console.log("share")}
            >
              <Share2 size={16} className="text-gray-600 hover:text-blue-500" />
            </button>
          </div>
        </div>
        <div className="flex-grow flex flex-col p-3">
          <CardTitle
            className="text-base font-bold text-gray-800 mb-1 line-clamp-2"
            title={topTendance.title}
          >
            {topTendance.title}
          </CardTitle>
          <CardContent className="p-0 flex-grow flex flex-col justify-between">
            <div className="space-y-1 text-sm">
              <p className="text-gray-600">
                {topTendance.day}: {topTendance.hour}
              </p>
              <p className="font-semibold text-blue-600">
                {topTendance.price === "Gratuit"
                  ? "Gratuit"
                  : `${topTendance.price}$`}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{topTendance.ort}</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};