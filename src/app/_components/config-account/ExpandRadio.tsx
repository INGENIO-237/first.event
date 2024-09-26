'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'


interface ExpandCheckBoxProps {
    id: string,
    label: string,
    checked: boolean,
    onClick: () => void,
}

const ExpandRadio = ({ id, label, checked, onClick }: ExpandCheckBoxProps) => {

    return (
        <AnimatePresence>
            <motion.div
                // whileTap={{ scale: 0.9 }}
                className={cn("flex py-2 px-4 transition hover:border-first_orange hover:scale-[1.05] active:scale-[0.9]  duration-150 items-center w-full border text-first_gray ", checked && 'bg-first_orange text-white')}
                onClick={() => onClick()}>
                <div className="relative space-x-2 ps-5" >
                    <input
                        id={id}
                        type="radio"
                        className="sr-only"
                        checked={checked}
                        onClick={() => onClick()}
                        />
                    <label
                        htmlFor={id}
                        className={cn(" cursor-pointer rounded-full text-sm font-medium transition-colors duration-300",)}
                        onClick={() => onClick()}
                    >
                        {label}
                    </label>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ExpandRadio