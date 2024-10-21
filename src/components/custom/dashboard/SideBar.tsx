"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  influencersDashboardLinks,
  organizerDashboardLinks,
} from "@/utils/links";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [professionnalism, setProfessionnalism] = useState("influencer");
  const router = usePathname();
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
  professionnalism == "influencer"
    ? (sideLinks = influencersDashboardLinks)
    : (sideLinks = organizerDashboardLinks);
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
      <motion.div
        // className='bg-[#F1F1F1] h-svh min-h-svh  w-fit p-4 '
        className={cn(
          "fixed inset-y-0 left-0 z-10 w-fit p-4 bg-[#D9D9D9] overflow-hidden transition-all duration-100",
          "lg:relative  lg:translate-x-0"
        )}
        initial={false}
        animate={isOpen || !isMobile ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {isMobile && (
          <button onClick={toggleSidebar} className="lg:hidden">
            <ChevronLeft size={24} />
          </button>
        )}
        {sideLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = router == link.link;
          return (
            // Just the icon will be view and when hover the title is view as a tooltip
            <div
              key={index}
              className={cn(
                "flex items-center justify-between rounded-full  ",
                isActive ? "bg-first_violet" : ""
              )}
            >
              <div className="p-2 relative ">
                <label
                  htmlFor="result"
                  className={cn(
                    "absolute left-14 top-1/2 transform shadow-card -translate-y-1/2 bg-white p-1 rounded transition-opacity duration-300",
                    "opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap"
                  )}
                >
                  {link.title}
                </label>
                <Link href={link.link} id="result" className="group">
                  <span className={cn(isActive ? "text-white" : "")}>
                    <Icon />
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </motion.div>
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z- lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SideBar;
