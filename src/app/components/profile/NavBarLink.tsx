'use client';

import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from 'framer-motion'
import { LucideIcon } from "lucide-react";

interface NavBarLinkProps {
  icon: IconType | LucideIcon,
  text: string,
  link: string
}

const NavBarLink = ({ icon, text, link }: NavBarLinkProps) => {
  const Icon = icon;
  return (
    <motion.li 
      className="cursor-pointer text-gray-600 hover:text-first_violet transition duration-300 flex items-center space-x-2"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={link} className="flex items-center gap-2">
        <Icon size={20} />
        <span className="hidden xl:block">{text}</span>
      </Link>
    </motion.li>
  );
}

export default NavBarLink;
