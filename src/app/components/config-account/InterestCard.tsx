import { Card, CardContent } from "@/components/ui/card"; 

interface InterestCardProps {
  category: string;
  tags: string[];
  icon: JSX.Element;
  selectedInterests: string[];
  onInterestToggle: (interest: string) => void;
}

const InterestCard = ({
  category,
  tags,
  icon,
  selectedInterests,
  onInterestToggle,
}: InterestCardProps) => {
  return (
    <Card className="mb-4 w-11/12 py-3 md:bg-white">
      <CardContent>
        <h1 className="font-bold text-3xl text-center justify-center md:justify-normal mb-2 flex items-center gap-2">
          {icon}
          {category}
        </h1>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedInterests.includes(tag);
            return (
              <div
                key={tag}
                className={`flex  px-3 py-1 rounded cursor-pointer ${isSelected
                    ? "bg-first_orange text-white border-first_orange"
                    : "bg-white text-first_gray border-first_gray"
                  }`}
                onClick={() => onInterestToggle(tag)}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestCard;
