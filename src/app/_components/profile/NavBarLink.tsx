'use client';

import Link from "next/link";
import { IconType } from "react-icons";
import { motion } from 'framer-motion'
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavBarLinkProps {
  icon: IconType | LucideIcon,
  text: string,
  link: string,
  index: number,
  size?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const NavBarLink = ({ icon, text, link, index, size }: NavBarLinkProps) => {
  const Icon = icon;
  const linkVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      case '2xl':
        return 'text-2xl';
      default:
        return 'text-md';
    }
  };

  return (
    <motion.li
      className={`cursor-pointer text-gray-600 hover:text-first_violet hover:bg-first_violet/10 p-4 rounded transition duration-300 flex items-center space-x-2 ${getSize()}`}
      variants={linkVariants}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={link} className="flex items-center gap-2">
        <Icon className={getSize()} />
        <span className="hidden xl:block max-lg:block">{text}</span>
      </Link>
    </motion.li>
  );
}

export default NavBarLink;