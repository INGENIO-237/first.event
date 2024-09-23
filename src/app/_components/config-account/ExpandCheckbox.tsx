'use client';

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface ExpandCheckBoxProps {
    id: string,
    label: string,
    onClick: () => void,
    selectedElts: string[],
}

const ExpandCheckBox = ({ label, onClick, selectedElts, id }: ExpandCheckBoxProps) => {
    const isSelected = selectedElts.includes(label);
    return (
        <AnimatePresence>
            <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn("flex hover:border-first_orange  hover:scale[1.05] py-2 px-4 transition duration-150 items-center w-full border text-first_gray ", isSelected && 'bg-first_orange text-white')}
                onClick={() => onClick()}>
                <div className="relative space-x-2 ps-5">
                    <input
                        id={id}
                        type="checkbox"
                        className=" sr-only"
                        checked={isSelected}
                        onClick={() => onClick()} />
                    <label
                        htmlFor={id}
                        className={cn(" cursor-pointer rounded-full text-sm font-medium transition duration-150",)}
                    >
                        {label}
                    </label>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ExpandCheckBox;