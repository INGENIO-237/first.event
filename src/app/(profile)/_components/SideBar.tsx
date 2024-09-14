'use client'
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { AlignJustify, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { UrlObject } from "url";

const LinkItem = ({ href, title, isActive, onClick }: { href: string | UrlObject, title: string, isActive?: boolean, onClick?: () => void }) => {
  return (
    <motion.li variants={itemVariants}>
      <Link
        className={cn(isActive && 'bg-white', "flex items-center gap-x-3.5 py-3  pl-6 text-sm text-gray-700 hover:bg-gray-100")}
        href={href}
        onClick={onClick}
      >
        {title}
      </Link>
    </motion.li>
  )
}
const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
const SideBar = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      const savedState = localStorage.getItem('sidebarOpen');
      setIsOpen(savedState === 'true');
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      localStorage.setItem('sidebarOpen', isOpen.toString());
    }
  }, [isOpen, isMobile]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {isMobile && (
        !isOpen && (
          <div className='lg:hidden sticky top-0 flex items-center h-[50vh]'>
            <span className='size-8 text-first_violet bg-gray-300 border-r-2 border-white flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-500 hover:text-black transition-colors duration-300 hover:scale-110'>
              <button
                onClick={toggleSidebar}
                className=""
                aria-label="Toggle Sidebar"
              >
                {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
              </button>
            </span>
          </div>
        )
      )}

      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 bg-[#D9D9D9] overflow-hidden transition-all duration-100",
          "lg:relative lg:w-1/5 lg:translate-x-0"
        )}
        initial={false}
        animate={isOpen || !isMobile ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex items-center justify-between w-full px-6 border-b">
          <h2 className="text-[#5F5E5E] text-center py-2 font-bold text-xl">Compte</h2>
          {isMobile && (
            <button onClick={toggleSidebar} className="lg:hidden">
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        <nav className="py-6 w-full min-h-screen flex flex-col flex-wrap">
          <motion.ul
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3
                }
              }
            }} style={{ pointerEvents: isOpen ? "auto" : "none" }} className="space-y-1.5">
            <LinkItem href={'/profile'} isActive={path === '/profile'} title={'Coordonnées de contact'} onClick={() => isMobile && setIsOpen(false)} />
            <LinkItem href={'/credentials'} isActive={path === '/credentials'} title={'Option de connexion'} onClick={() => isMobile && setIsOpen(false)} />
            <LinkItem href={'/payment-method'} isActive={path === '/payment-method'} title={'Moyen de paiement'} onClick={() => isMobile && setIsOpen(false)} />
            <LinkItem href={''} title={'Compte associés'} onClick={() => isMobile && setIsOpen(false)} />
            <LinkItem href={''} title={'Données personnelles'} onClick={() => isMobile && setIsOpen(false)} />
            <LinkItem href={''} title={'Fermer le compte'} onClick={() => isMobile && setIsOpen(false)} />
          </motion.ul>
        </nav>
      </motion.div>

      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}

export default SideBar;