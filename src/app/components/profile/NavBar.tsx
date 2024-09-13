'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavBarLink from './NavBarLink';
import logo from '/public/assets/logo.png';
import default_profile from '/public/assets/images/default-profile.png';
import DropdownItem from "./DropdownItem";
import {  MapPin } from "lucide-react";
import { dropdownLinks, links } from "@/utils/links";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState<string>('Montréal')
  const [status, setStatus] = useState<string>('organizer');

  return (
    <nav className="hidden lg:block">
      <div className="container bg-white  px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start space-x-2">
            <Link href={'/'}>
              <Image src={logo} alt='Logo' width={150} height={37.5} className='w-52' />
            </Link>
            <div className="md:flex w-max items-center hidden border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
              <div className="flex items-center flex-grow space-x-1 p-2">
                <FaSearch className="text-orange-500 " size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un événement..."
                  className="w-full outline-none text-gray-700"
                />
              </div>
              <div className="flex items-center border-l border-gray-300 p-2">
                <MapPin className="text-orange-500 mr-2" />
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