'use client';
import Link from 'next/link';
import logo from '/public/assets/logo.png';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="w-full bg-white md:bg-transparent md:pt-0 z-20 fixed">
            <div className="flex justify-center md:justify-normal md:p-5">
        <Link href={'/'}> 
                <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className="w-60" />
        </Link>
            </div>
        </nav>
    );
}

export default Navbar;
