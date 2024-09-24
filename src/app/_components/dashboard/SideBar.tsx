'use client';
import { cn } from '@/lib/utils';
import { influencersDashboardLinks, organizerDashboardLinks } from '@/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SideBar = () => {
    const [professionnalism, setProfessionnalism] = useState('influencer');
    const router = usePathname();

    let sideLinks: any[] = [];
    professionnalism == 'influencer' ? sideLinks = influencersDashboardLinks : sideLinks = organizerDashboardLinks;
    return (
        <div className='bg-[#F1F1F1] h-svh min-h-svh  w-fit p-4 '>
            {sideLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = router == link.link;
                return (
                    // Just the icon will be view and when hover the title is view as a tooltip
                    <Link href={link.link} key={index}>
                        <div className={cn("flex items-center justify-between rounded-full  ", isActive ? "bg-first_violet" : "")}>
                            <div className="p-2 relative group">
                                <span className={cn("absolute left-14 top-1/2 transform shadow-card -translate-y-1/2 bg-white p-1 rounded transition-opacity duration-300","opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap")}>
                                    {link.title}
                                </span>
                                <span className={cn(isActive ? "text-white" : "")}>
                                    <Icon />
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default SideBar