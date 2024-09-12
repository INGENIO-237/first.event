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
import { FaHeart, FaMapMarkerAlt, FaSearch, FaStoreAlt, FaTicketAlt } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';
import { FcPlanner } from 'react-icons/fc';
import { GiOrganigram } from 'react-icons/gi';
import NavBarLink from './NavBarLink';
import logo from '/public/assets/logo.png';


const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  
  return (

    <nav className='max-w-screen bg-white md:bg-transparent'>
      <div className="flex items-center justify-between ">
        {/* Primary menu and logo */}
        <div className="flex grow md:w- justify-start items-center">
          {/* logo */}
          <div>
            <Link href={'/'}>
              <Image src={logo} alt='Logo' width={150} height={37.5} className='w-52' />
            </Link>
          </div>
          <div className=" hidden md:flex items-center border border-first_gray rounded-full overflow-hidden ">
            <div className="flex items-center px-2">
              <FaSearch className="text-orange-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un événement..."
              className="grow py-2 px-3 focus:outline-none  text-sm"
            />
            <div className="flex items-center border-l border-gray-300 space-x-2 px-2 cursor-pointer">
              <FaMapMarkerAlt className="text-orange-400" />
              <span className="ml- text-sm">OK</span>
            </div>

          </div>
        </div>
        {/* primary */}
        <div className="hidden md:w-1/2 md:flex grow justify-center space-x-4 items-center ">
          <ul className='flex flex-row justify-center space-x-4'>
            <NavBarLink text='Boutique'
              link='/store'
              icon={FaStoreAlt}
            />
            <NavBarLink text='Organisateur'
              link='/organizer'
              icon={FcPlanner}
            />
            <NavBarLink text='Communicateur'
              link='#'
              icon={GiOrganigram}
            />
            <NavBarLink text='Créer'
              link='/add'
              icon={FaStoreAlt}
            />
            <NavBarLink text='Likes'
              link='/likes'
              icon={FaHeart}
            />
            <NavBarLink text='Tickets'
              link='/tickets'
              icon={FaTicketAlt}
            />
            <NavBarLink text='Créer'
              link='/add'
              icon={FaStoreAlt}
            />
          </ul>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className=''>johndoe@gmail.com</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Parcourez les événements</DropdownMenuItem>
                <DropdownMenuItem>Tickets(0)</DropdownMenuItem>
                <DropdownMenuItem>Like</DropdownMenuItem>
                <DropdownMenuItem>Suivie</DropdownMenuItem>
                <DropdownMenuItem>Centres d&apos;intérêts</DropdownMenuItem>
                <DropdownMenuItem>Paramètres du compte</DropdownMenuItem>
                <DropdownMenuItem>Historique</DropdownMenuItem>
                <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
        {/* secondary */}

        {/* Mobile navigation toggle */}
        <div className="md:hidden flex items-center px-3">
          <button onClick={() => setToggleMenu(!toggleMenu)}>
            <FaBars className="h-6" />
          </button>
        </div>
      </div>

      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${!toggleMenu ? "h-0" : "h-full"
          }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
            <a href="#" className="border-l-4 border-gray-600">
              Features
            </a>
            <a href="#">Pricing</a>
            <a href="#">Download</a>
            <a href="#">Classic</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar