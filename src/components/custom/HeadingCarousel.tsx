import { CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Link from "next/link";

const Heading = ({ title, moreLink }: { title: string; moreLink?: string }) => {
  return (
    <div className="flex md:flex-row flex-col gap-x-2 md:gap-x-0 justify-between mb-4">
      <h2 className="font-bold text-xl text-start mb-2">{title}</h2>
      {moreLink && (
        <div className="flex gap-x-2 justify-between md:justify-normal">
          <Link
            href={moreLink}
            className="text-[#00BBFC]/90 hover:text-[#00BBFC] "
          >
            Tout voir
          </Link>
          <div className="flex gap-2">
            <CarouselPrevious className="text-[#00BBFC]/90 hover:text-[#00BBFC] size-[24px]" />
            <CarouselNext className="text-[#00BBFC]/90 hover:text-[#00BBFC] size-[24px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Heading;
