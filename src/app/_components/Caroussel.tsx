import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Heart, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function CarrousselData(topTendances: { id: number; title: string; day: string; hour: string; price: "Gratuit" | number; ort: string; image: string; isLiked?: boolean; }[], handleLike: (id: number) => void) {
    return (<div className="bg-white w-full lg:mt-48 mt-16 px-4 py-3">
        <Carousel className="w-full">
            <div className="flex md:flex-row flex-col gap-x-2 md:gap-x-0 justify-between mb-4">
                <h2 className="font-bold text-xl text-start">
                    Top de tendance à Montréal
                </h2>
                <div className="flex gap-x-2  justify-between md:justify-normal">
                    <Link
                        href={"/"}
                        className="text-[#00BBFC]/90 hover:text-[#00BBFC] "
                    >
                        Tout voir
                    </Link>
                    <div className="flex gap-2">
                        <CarouselPrevious className="text-[#00BBFC]/90 hover:text-[#00BBFC] size-[24px]" />
                        <CarouselNext className="text-[#00BBFC]/90 hover:text-[#00BBFC] size-[24px]" />
                    </div>
                </div>
            </div>

            <CarouselContent className="-ml-1">
                {topTendances.map((topTendance, index) => (
                    <CarouselItem
                        key={index}
                        className="pl-1 md:basis-1/3 lg:basis-1/5 basis-1/2   "
                    >
                        <div className="p-1">
                            <Card className="w-full max-w-xs">
                                <div className="relative group">
                                    <Image
                                        src={topTendance.image}
                                        width="400"
                                        height="250"
                                        alt={topTendance.title}
                                        priority
                                        className="aspect-[1.6] rounded-t-lg" />
                                    <div className="absolute right-2 bottom-2 flex gap-x-2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                                        <button title="aimer le top tendance">
                                            <Heart
                                                className={cn(topTendance.isLiked ? "text-first_orange" : "hover:text-first_orange")}
                                                onClick={() => handleLike(topTendance.id)} />
                                        </button>
                                        <button title="partager le top tendance">
                                            <Share2
                                                className="hover:text-[#00BBFC]"
                                                onClick={() => console.log("share")} />
                                        </button>
                                    </div>
                                </div>
                                <CardHeader className="">
                                    <CardTitle className="text-base text-[#6C6B6B] font-bold">
                                        {topTendance.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-4">
                                    <div>
                                        <span className="text-[#9F9D9D]">
                                            {topTendance.day}: {topTendance.hour}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[#006FFC]">
                                            {topTendance.price == "Gratuit"
                                                ? "Gratuit"
                                                : topTendance.price + "$"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[#9F9D9D] flex gap-x-2">
                                            <MapPin size={24} />
                                            {topTendance.ort}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </div>);
}