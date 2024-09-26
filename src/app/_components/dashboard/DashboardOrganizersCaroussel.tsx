import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn, generateKey } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrganizersProps {
    id: number;
    name: string;
    liked: boolean;
    image: string;
    eventsCount: number;
    askLink: string,
}

interface CarousselProps {
    title: string;
    organizers: OrganizersProps[];
}


const DashboardOrganizersCaroussel = ({ title, organizers }: CarousselProps) => {
    return (
        <div className="flex flex-col gap-y-4 w-full bg-white p-5 rounded">
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
                <CarouselContent className="-ml-1 space-x-4 ">
                    {organizers.map((organizer, index) => {
                        return (
                            <CarouselItem
                                key={generateKey()}
                                className="pl-1 md:basis-1/3 lg:basis-1/4  basis-11/12 flex flex-col justify-center   "
                            >
                                <Card className="w-full rounded-lg py-4">
                                    <div className="rounded-full flex justify-center ">
                                        <Image
                                            src={organizer.image}
                                            width="400"
                                            height="250"
                                            alt={organizer.name}
                                            priority
                                            className="w-1/4 h-1/4" />

                                    </div>
                                    <CardHeader className="">
                                        <CardTitle className="text-lg text-center text-[#6C6B6B]">
                                            {organizer.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-col flex justify-center space-y-4">
                                        <div className="flex gap-x-4">
                                            <button className={cn("p-3 rounded", organizer.liked ? "bg-first_violet text-white" : "border border-first_violet text-first_violet hover:bg-first_violet hover:text-white")}>{organizer.liked ? "Suivi(e)" : "Suivre"}</button>
                                            <Link href={'#'} className="border border-first_violet text-first_violet hover:bg-first_violet hover:text-white p-3 rounded ">Contact</Link>
                                        </div>
                                        <div className="text-center ">
                                            <p>
                                                {organizer.eventsCount}
                                            </p>
                                            <p>
                                                événement{organizer.eventsCount > 1 ? "s" : ""} en cours
                                            </p>
                                        </div>
                                        <div className="" >
                                            <Link href={organizer.askLink} className=" underline underline-offset-2 decoration-first_gray hover:decoration-first_violet hover:text-first_violet  ">Envoyer une demande</Link> 
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        );
                    })}

                </CarouselContent>
            </Carousel>
            <Link href={"#"} className="text-[#00BBFC]/90 hover:text-[#00BBFC] self-end ">Voir les organisateurs</Link>
        </div>
    )
}

export default DashboardOrganizersCaroussel