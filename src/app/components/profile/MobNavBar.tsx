'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import default_profile from '/public/assets/images/default-profile.png';
import logo from '/public/assets/logo.png';
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import DropdownItem from "./DropdownItem";
import { FaBars, FaPlus, FaStoreAlt, FaTicketAlt } from 'react-icons/fa';
import { FcPlanner } from 'react-icons/fc';
import { GiOrganigram } from 'react-icons/gi';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import NavBarLink from "./NavBarLink";
import { cn } from "@/lib/utils";
import { FaX } from "react-icons/fa6";

let ticketNumber = 1;

const dropdownLinks = [
    // {
    //   title: 'Parcourez les événements',
    //   link: '#',
    // },
    {
        title: `Tickets(${ticketNumber})`,
        link: '#',
    },
    {
        title: 'Favoris',
        link: '#',
    },
    {
        title: 'Centre d\'intérêts',
        link: '#',
    },
    {
        title: 'Paramètres du compte',
        link: '#',
    },
    {
        title: 'Historique',
        link: '#',
    },
    {
        title: 'Se déconnecter',
        link: '#',
    },
];
const links = [
    {
        title: 'Boutique',
        icon: FaStoreAlt,
        link: '#',
        accessibleBy: 'user'
    },
    {
        title: 'Organisateur',
        icon: FcPlanner,
        link: '#',
        accessibleBy: 'organizer'
    },
    {
        title: 'Communicateur',
        icon: GiOrganigram,
        link: '#',
        accessibleBy: 'influencer'
    },
    {
        title: 'Créer',
        icon: FaPlus,
        link: '#',
        accessibleBy: 'organizer'
    },
    {
        title: 'Favoris',
        icon: IoMdHeartEmpty,
        link: '#',
        accessibleBy: 'user'
    },
    {
        title: 'Tickets',
        icon: FaTicketAlt,
        link: '#',
        accessibleBy: 'influencer'
    },
    {
        title: 'Panier',
        icon: HiOutlineShoppingCart,
        link: '#',
        accessibleBy: 'user'
    },
];



const MobNavBar = () => {
    const [status, setStatus] = useState('user');
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
          "fixed top-16 right-0 z-40 border shadow-lg w-1/2 h-full bg-white  transform transition-transform duration-300 ease-in-out", isOpen ? "translate-x-0" : "translate-x-full")}>
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