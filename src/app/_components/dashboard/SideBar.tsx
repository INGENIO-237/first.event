'use client';
import { cn } from '@/lib/utils';
import { influencersDashboardLinks, organizerDashboardLinks } from '@/utils/links';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SideBar = () => {
    const [professionnalism, setProfessionnalism] = useState('influencer');
    const router = usePathname();
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setIsOpen(true);
        } else {
            const savedState = localStorage.getItem("sidebarOpen");
            setIsOpen(savedState === "true");
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            localStorage.setItem("sidebarOpen", isOpen.toString());
        }
    }, [isOpen, isMobile]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    let sideLinks: any[] = [];
    professionnalism == 'influencer' ? sideLinks = influencersDashboardLinks : sideLinks = organizerDashboardLinks;
    return (
        <>
            {isMobile && !isOpen && (
                <div className="lg:hidden fixed top-1/2 flex items-center">
                    <span className="size-8 text-first_violet bg-gray-300 border-r-2 border-white flex items-center justify-center cursor-pointer rounded-r-full hover:bg-gray-500 hover:text-black transition-colors duration-300 hover:scale-110">
                        <button
                            onClick={toggleSidebar}
                            className=""
                            aria-label="Toggle Sidebar"
                        >
                            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                        </button>
                    </span>
                </div>
            )}
            <div className='bg-[#F1F1F1] h-svh min-h-svh  w-fit p-4 '>
                {sideLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = router == link.link;
                    return (
                        // Just the icon will be view and when hover the title is view as a tooltip
                        <div key={index} className={cn("flex items-center justify-between rounded-full  ", isActive ? "bg-first_violet" : "")}>
                            <div className="p-2 relative ">
                                <label htmlFor='result' className={cn("absolute left-14 top-1/2 transform shadow-card -translate-y-1/2 bg-white p-1 rounded transition-opacity duration-300", "opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap")}>
                                    {link.title}
                                </label>
                                <Link href={link.link} id='result' className='group' >
                                    <span className={cn(isActive ? "text-white" : "")}>
                                        <Icon />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SideBar