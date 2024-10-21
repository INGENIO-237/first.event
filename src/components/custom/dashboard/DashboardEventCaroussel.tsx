import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventProps {
  title: string;
  day: string;
  hour: string;
  price: string;
  place: string;
  image: string;
  organizer: string;
}

interface CarousselProps {
  title: string;
  events: EventProps[];
}

const DashboardEventCarous = ({ title, events }: CarousselProps) => {
  return (
    <div className="flex flex-col gap-y-4 w-full bg-[#CCCACA3D] p-5 rounded">
      <Carousel className="w-full">
        <div className="flex md:flex-row flex-col gap-x-2 md:gap-x-0 justify-between mb-4">
          <h2 className="font-bold text-xl text-start text-first_gray ">
            {title}
          </h2>
          <div className="flex gap-x-2  justify-between md:justify-normal">
            <Link
              href={"/"}
              className="text-[#00BBFC]/90 hover:text-[#00BBFC] "
            >
              Tout voir
            </Link>
            <div className="flex gap-2">
              <CarouselPrevious className="text-[#00BBFC]/90 bg-transparent hover:text-[#00BBFC] size-[24px]" />
              <CarouselNext className="text-[#00BBFC]/90 hover:text-[#00BBFC] size-[24px]" />
            </div>
          </div>
        </div>
        <CarouselContent className="-ml-1 space-x-4">
          {events.map((event, index) => {
            return (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/3 lg:basis-1/4  basis-11/12   "
              >
                <Card className="w-full max-w-xs">
                  <div className="relative group">
                    <Image
                      src={event.image}
                      width="400"
                      height="250"
                      alt={event.title}
                      priority
                      className="aspect-[1.6] rounded-t-lg"
                    />
                  </div>
                  <CardHeader className="">
                    <CardTitle className="text-base text-[#6C6B6B] font-bold">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4">
                    <div>
                      <span className="text-[#9F9D9D]">
                        {event.day}: {event.hour}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#006FFC]">
                        {event.price == "Gratuit"
                          ? "Gratuit"
                          : event.price + "$"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#9F9D9D] flex gap-x-2">
                        <MapPin size={24} />
                        {event.place}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <Link
        href={"#"}
        className="text-[#00BBFC]/90 hover:text-[#00BBFC] self-end "
      >
        Voir les événements
      </Link>
    </div>
  );
};

export default DashboardEventCarous;
