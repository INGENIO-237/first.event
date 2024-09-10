import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

type Props = {
    limit: number,
    step?: number,
}


const ProgressBar = ({ limit, step = 1 }: Props) => {
    const previous = step > 0 ? ((step - 1) / limit) * 100 : 0;
    const progress = (step / limit) * 100;

    const [value, setValue] = useState(previous);

    useEffect(() => {
        const timer = setTimeout(() => setValue(progress), 900)
        return () => clearTimeout(timer)
    }, [progress])
    return (
        <Progress value={value} className="w-full" />
    )
}

export default ProgressBar