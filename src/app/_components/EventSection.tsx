import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { topTendanceInterface, HandleLike } from "@/utils/topTendances";
import Heading from "./HeadingCarousel";
import { TendanceCard } from "./TendanceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

type CarouselSectionProps = {
  topTendances: topTendanceInterface[] | null;
  handleLike: HandleLike;
  likedEvents: Set<number>;
  headingTitle: string;
  moreLink: string;
};

export const EventSection: React.FC<
  React.HTMLAttributes<HTMLDivElement> & CarouselSectionProps
> = ({
  topTendances,
  handleLike,
  likedEvents,
  headingTitle,
  moreLink,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topTendances !== null) {
      setLoading(false);
    }
  }, [topTendances]);
  return (
    <div className="w-full" {...props}>
      <Carousel className="w-full">
        <Heading title={headingTitle} moreLink={moreLink} />
        <CarouselContent className="-ml-1">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-0 shrink-0 grow-0 pl-1 md:basis-1/3 lg:basis-1/5 basis-1/1"
                >
                  <Skeleton className="h-64 min-w-[250px] max-w-[320px] flex-shrink-0 rounded-lg" />
                </div>
              ))
            : topTendances?.map((topTendance, index) => (
                <TendanceCard
                  key={index}
                  topTendance={topTendance}
                  handleLike={handleLike}
                  likedEvents={likedEvents}
                />
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
