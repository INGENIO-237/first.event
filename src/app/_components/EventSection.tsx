import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { topTendanceInterface, HandleLike } from "@/utils/topTendances";
import Heading from "./HeadingCarousel";
import { TendanceCard } from "./TendanceCard";

type CarouselSectionProps = {
  topTendances: topTendanceInterface[];
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
}) => (
  <div className="w-full" {...props}>
    <Carousel className="w-full">
      <Heading title={headingTitle} moreLink={moreLink} />
      <CarouselContent className="-ml-1">
        {topTendances.map((topTendance, index) => (
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
