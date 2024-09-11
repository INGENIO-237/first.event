'use client';

import Link from "next/link";
import { IconType } from "react-icons";

interface NavBarLinkProps {
  icon: IconType,
  text: string,
  link: string
}

const NavBarLink = ({ icon, text, link }: NavBarLinkProps) => {
  const Icon = icon
  return (
    <li className="">
      <Link href={link} className="flex md:flex-col items-center  " >
      <Icon className="w-1/2"/>
        {text}
      </Link>
    </li>
  )
}

export default NavBarLink