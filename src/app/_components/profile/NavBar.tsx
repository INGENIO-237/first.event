"use client";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavBarLink from "./NavBarLink";
import DropdownItem from "./DropdownItem";
import logo from "/public/assets/logo.png";
import default_profile from "/public/assets/images/default-profile.png";
import { links, dropdownLinks } from "@/utils/links";

const NavBar: React.FC = () => {
  const [status, setStatus] = useState<string>('organizer');
  const [eventQuery, setEventQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{ id: string, description: string }[]>([]);

  const ticketNumber = 1;

  const navLinks = useMemo(() => links, []);
  const dropdownsLinks = useMemo(() => dropdownLinks, []);
  const filteredLinks = useMemo(
    () =>
      navLinks.filter(
        (link) =>
          link.accessibleBy === status ||
          ((status === "influencer" || status === "organizer") &&
            link.accessibleBy === "user")
      ),
    [navLinks, status]
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (window.google) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: query }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          const suggestions = predictions.map((prediction) => ({
            id: prediction.place_id,
            description: prediction.description
          }));

          setSearchResults(suggestions);
        } else {
          setSearchResults([]);
        }
      });
    }
  }, []);

  const handlePlaceClick = useCallback((placeId: string) => {
    if (window.google) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          setSearchQuery(place.name || '');
          setSearchResults([]);

        }
      });
    }
  }, []);

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
          <Link href={"/"}>
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={37.5}
              className="w-48"
            />
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
                value={eventQuery}
                onChange={(e) => { setEventQuery(e.target.value) }}
              />
            </div>
            <div className="flex items-center border-l border-gray-200 px-4">
              <MapPin className="text-orange-500 mr-2" />
              <input
                type="search"
                placeholder='Rechercher'
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700"
              />
            </div>
          </div>
          
          {/* Navigation et profil utilisateur */}
          <div className="flex items-center">
            {filteredLinks.map((link, index) => (
              <NavBarLink
                key={index}
                index={index}
                text={link.title}
                link={link.link}
                icon={link.icon}
              />
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                <div className="rounded-full overflow-hidden w-10 h-10 border border-gray-200">
                  <Image
                    src={default_profile}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 bg-white shadow-md rounded-md w-48">
                {dropdownsLinks.map((link, index) => (
                  <DropdownItem
                    key={index}
                    link={link.link}
                    title={link.title}
                  />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Résultats de recherche */}
      {searchQuery && searchResults.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-full max-w-md bg-white shadow-lg rounded-md overflow-hidden z-10">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handlePlaceClick(result.id)}
            >
              {result.description}
            </div>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default NavBar;
