import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"


interface InterestCardProps {
    category: string;
    tags: string[];
    icon: JSX.Element;
    selectedInterests: string[];
    onInterestToggle: (interest: string) => void;
  }



const InterestCard = ({ category, tags, icon, selectedInterests, onInterestToggle }: InterestCardProps) => {
  return (
    <Card className="mb-4">
    <CardContent>
      <h3 className="font-bold mb-2 flex items-center gap-2">
        {icon}
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox
              id={tag}
              checked={selectedInterests.includes(tag)}
              onCheckedChange={() => onInterestToggle(tag)}
            />
            <label
              htmlFor={tag}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {tag}
            </label>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}

export default InterestCard