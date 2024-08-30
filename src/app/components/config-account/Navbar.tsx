'use client';
import logo from '/public/assets/logo.png';
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="bg-transparent w-full pt-5 md:pt-0 z-20 h-full flex-nowrap">
            <div className="w-full flex items-center justify-center md:justify-normal md:p-8 ">
                <Image src={logo} alt="FirstEvent Logo" width={150} height={37.5} className=" mb-6 w-60" />
            </div>
        </nav>
    );
}

export default Navbar