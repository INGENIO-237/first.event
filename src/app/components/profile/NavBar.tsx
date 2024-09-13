'use client'
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown, Store, Calendar, Users, PlusCircle, Heart, Ticket, ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import NavBarLink from './NavBarLink';
import DropdownItem from "./DropdownItem";
import logo from '/public/assets/logo.png';
import default_profile from '/public/assets/images/default-profile.png';
import { links, dropdownLinks } from '@/utils/links';

const NavBar = () => {
  const [location, setLocation] = useState<string>('Montréal');
  const [status, setStatus] = useState<string>('organizer');
  const ticketNumber = 1;
  
  const navLinks = useMemo(() => links, []);

  const dropdownsLinks = useMemo(() => dropdownLinks, []);

  const filteredLinks = useMemo(() => 
    navLinks.filter(link => 
      link.accessibleBy === status || 
      ((status === 'influencer' || status === 'organizer') && link.accessibleBy === 'user')
    ),
  [navLinks, status]);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:block shadow-sm"
    >
      <div className="w-screen bg-white px-4 py-3">
        <div className="flex items-center justify-between space-x-4">
          {/* Logo */}
          <Link href={'/'}>
            <Image src={logo} alt='Logo' width={150} height={37.5} className='w-48' />
          </Link>
          
          {/* Barre de recherche avec localisation */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full shadow-sm overflow-hidden w-full max-w-md">
            <div className="flex items-center flex-grow space-x-2 px-4 py-2">
              <Search className="text-orange-500" size={20} />
              <input
                type="search"
                placeholder="Rechercher un événement..."
                className="w-full outline-none bg-transparent text-gray-700"
                aria-label="Rechercher"
              />
            </div>
            <div className="flex items-center border-l border-gray-200 px-4">
              <MapPin className="text-orange-500 mr-2" />
              {location}
            </div>
          </div>

          {/* Navigation et profil utilisateur */}
          <div className="flex items-center space-x-6">
            {filteredLinks.map((link, index) => (
              <NavBarLink key={index}
                text={link.title}
                link={link.link}
                icon={link.icon} />
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center gap-2 focus:outline-none'>
                <div className="rounded-full overflow-hidden w-10 h-10 border border-gray-200">
                  <Image 
                    src={default_profile} 
                    alt='Profile' 
                    width={40} 
                    height={40} 
                    className='w-full h-full object-cover'
                  />
                </div>
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 bg-white shadow-md rounded-md w-48">
                {dropdownsLinks.map((link, index) => (
                  <DropdownItem key={index}
                    link={link.link}
                    title={link.title} />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default NavBar;
