'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown, FaHeart, FaMapMarkerAlt, FaPlus, FaSearch, FaStoreAlt, FaTicketAlt } from 'react-icons/fa';
import { FcPlanner } from 'react-icons/fc';
import { GiOrganigram } from 'react-icons/gi';
import NavBarLink from './NavBarLink';
import logo from '/public/assets/logo.png';
import default_profile from '/public/assets/images/default-profile.png';
import DropdownItem from "./DropdownItem";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import {  MapPin } from "lucide-react";


const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState<string>('Montréal')
  const [status, setStatus] = useState<string>('organizer');
  let ticketNumber = 1;
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
  ]

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
    ]

  return (
    <nav className="hidden lg:block">
      <div className="container bg-white  px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start space-x-2">
            <Link href={'/'}>
              <Image src={logo} alt='Logo' width={150} height={37.5} className='w-52' />
            </Link>
            <div className="md:flex items-center hidden border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
              <div className="flex items-center flex-grow space-x-1 p-2">
                <FaSearch className="text-orange-500 " size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un événement..."
                  className="w-full outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center border-l border-gray-300 p-2">
                <MapPin className="text-orange-500 mr-2" size={20} />
                {location}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {links.map((link, index) => {
              if (link.accessibleBy === status || ((status === 'influencer' || status === 'organizer') && link.accessibleBy === 'user')) {
                return (
                  <NavBarLink key={index}
                    text={link.title}
                    link={link.link}
                    icon={link.icon} />
                )
              }
            })}
            <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-2 focus:outline-none'>
                  <Image src={default_profile} alt='Profile' width={40} height={40} className='w-10 h-10 rounded-full' />
                  johndoe@gmail.com
                  <FaChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 bg-white shadow-md rounded-b-xl">
                  {dropdownLinks.map((link, index) => (
                    <DropdownItem key={index}
                      link={link.link}
                      title={link.title} />
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar