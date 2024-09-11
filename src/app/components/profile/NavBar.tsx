import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/assets/logo.png';
import { FaMapMarkerAlt, FaSearchLocation } from 'react-icons/fa';
import { FileSearch } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="w-full bg-white md:bg-transparent ">
      <div className='md:flex '>
        <div className='md:flex md:justify-center md:items-center '>
          <div>
            <Link href={'/'}>
              <Image src={logo} alt='Logo' width={150} height={37.5} className='w-52 md:w-60' />
            </Link>
          </div>
          <div >
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full w-md">
              <div className="flex items-center px-3">
                <FileSearch className="text-orange-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un événement..."
                // value={query}
                // onChange={handleSearchChange}
                className="flex-grow py-2 px-4 focus:outline-none text-sm"
              />
              <div className="flex items-center border-l border-gray-300 px-3 cursor-pointer">
                <FaMapMarkerAlt className="text-orange-400" />
                <span className="ml-2 text-sm">OK</span>
              </div>
            </div>
          </div>
        </div>
        <div>

          NavBar
        </div>
      </div>
    </nav>
  )
}

export default NavBar