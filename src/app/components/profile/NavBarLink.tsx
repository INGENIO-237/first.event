'use client';

import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from 'framer-motion'

interface NavBarLinkProps {
  icon: IconType,
  text: string,
  link: string
}

const NavBarLink = ({ icon, text, link }: NavBarLinkProps) => {
  const Icon = icon
  return (
    <motion.li className="h-10 lg:h-full w-full lg:hover:text-[#5F5E5E] lg:text-[#5F5E5E] transition active:text-first_violet underline-offset-4 duration-500 hover:underline flex items-center"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={link} className="flex items-center gap-2 lg:flex-col lg:gap-0" >
        <Icon className="w-1/2" />
        {text}
      </Link>
    </motion.li>
  )
}

export default NavBarLink