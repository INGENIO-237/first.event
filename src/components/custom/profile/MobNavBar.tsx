"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import default_profile from "/public/assets/images/default-profile.png";
import logo from "/public/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import DropdownItem from "./DropdownItem";
import NavBarLink from "./NavBarLink";
import { cn } from "@/lib/utils";
import { dropdownLinks, links } from "@/utils/links";
import { Menu, Minimize2 } from "lucide-react";

const MobNavBar: React.FC = () => {
  const [status] = useState("user");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { y: "-100%" },
    open: { y: 0 },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <nav className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-b border-current from-[#FEFDFF]/90 via-[#FEFDFF]/60 to-[#FEFDFF]/30 z-10">
        <div className="flex items-center justify-between p-4">
          <Link href={"/"}>
            <Image
              priority
              src={logo}
              alt="Logo"
              width={150}
              height={37.5}
              className="w-40 md:w-52"
            />
          </Link>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image
                    src={default_profile}
                    priority
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 bg-white shadow-lg rounded-xl mt-2">
                {dropdownLinks.map((link, index) => (
                  <DropdownItem
                    key={index}
                    link={link.link}
                    title={link.title}
                  />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl text-white focus:outline-none  bg-[#505050]/50  rounded-full p-2"
            >
              {isOpen ? <Minimize2 /> : <Menu />}
            </motion.button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "lg:hidden fixed left-0 right-0 z-40 overflow-hidden shadow-lg bg-white",
              "top-[72px] md:top-[80px] h-[calc(100vh-72px)] md:h-[calc(100vh-80px)]"
            )}
          >
            <ul className="px-8 py-6 space-y-4">
              {links.map((link, index) => {
                if (
                  link.accessibleBy === status ||
                  ((status === "influencer" || status === "organizer") &&
                    link.accessibleBy === "user")
                ) {
                  return (
                    <NavBarLink
                      key={index}
                      index={index}
                      text={link.title}
                      link={link.link}
                      icon={link.icon}
                      size="2xl"
                    />
                  );
                }
                return null;
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobNavBar;
