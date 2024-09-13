'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import default_profile from '/public/assets/images/default-profile.png';
import logo from '/public/assets/logo.png';
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import DropdownItem from "./DropdownItem";
import { FaBars } from 'react-icons/fa';
import { FaX } from "react-icons/fa6";
import NavBarLink from "./NavBarLink";
import { cn } from "@/lib/utils";
import { dropdownLinks, links } from "@/utils/links";



const MobNavBar = () => {
    const [status, setStatus] = useState('user');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    if (isOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    return (
        <>
            <nav className='lg:hidden'>
                <div className="flex items-center justify-between p-3">
                    <div>
                        <Link href={'/'}>
                            <Image src={logo} alt='Logo' width={150} height={37.5} className='w-52' />
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-2 focus:outline-none'>
                                <Image src={default_profile} alt='Profile' width={40} height={40} className='w-10 h-10 rounded-full' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="p-2 bg-white shadow-md rounded-b-xl">
                                {dropdownLinks.map((link, index) => (
                                    <DropdownItem key={index}
                                        link={link.link}
                                        title={link.title} />
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <button onClick={() => setIsOpen(!isOpen)} className="transition duration-1000">
                            {isOpen ? <FaX className="transition duration-1000" /> : <FaBars className="transition duration-1000" />}
                        </button>
                    </div>
                </div>
            </nav>
            <div className={cn(
                "fixed  left-0 z-10 border overflow-hidden shadow-lg h- w-full bg-white  transform transition-transform  duration-300 ease-in", isOpen ? "fade-in top-16" : "-translate-y-[100%] -top-5")}>
                    <ul className="px-8">
                        {links.map((link, index) => {
                            if (link.accessibleBy === status || ((status === 'influencer' || status === 'organizer') && link.accessibleBy === 'user')) {
                                return (
                                    <NavBarLink key={index}
                                        text={link.title}
                                        link={link.link}
                                        icon={link.icon} />
                                )
                            }
                            return null; // Add a fallback return value
                        })}
                    </ul>
            </div>
        </>
    )
}

export default MobNavBar;