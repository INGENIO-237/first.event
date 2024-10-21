import { formatCardExpiryMonth } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";

export type PMCard = {
  brand: string;
  country: string;
  expMonth: number;
  expYear: number;
  last4: number;
};

const Card: React.FC<{ card: PMCard }> = ({ card }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
      className="w-full md:w-[45%] h-[200px] bg-first_violet rounded text-white p-2"
    >
      <div className="flex w-full justify-between">
        <h1>Card</h1>
        <Trash size={16} className="hover:cursor-pointer" />
      </div>

      <div className="h-1/3 flex items-center justify-between mt-5">
        {/* SIM */}
        <div className="flex">
          <div className="flex flex-col gap-0.5">
            <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
            <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
            <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
          </div>
          <div className="w-[10px] h-[35px] bg-[#ffc300] rounded"></div>
          <div className="flex flex-col gap-0.5">
            <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
            <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
            <div className="w-[15px] h-[10px] bg-[#ffc300] rounded"></div>
          </div>
        </div>
        <h1 className="text-xl">
          {formatCardExpiryMonth(card.expMonth) + "/" + card.expYear}
        </h1>
      </div>
      <h1 className="text-xl">XXXX XXXX XXXX {card.last4}</h1>
      <div className="flex justify-end">
        <h1 className="font-bold text-2xl font-italic">{card.brand}</h1>
      </div>
    </motion.div>
  );
};

export default Card;
