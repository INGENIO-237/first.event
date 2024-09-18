"use client";
import React, { useState, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import Image from "next/image";
import MobNavBar from "./components/profile/MobNavBar";
import NavBar from "./components/profile/NavBar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { interests } from "@/utils/interests";
import { MapPin, Search } from "lucide-react";

interface LatLng {
  lat: number;
  lng: number;
}

interface MarkerProps {
  lat: number;
  lng: number;
  icon: string;
  alt: string;
}

const Marker: React.FC<MarkerProps> = ({ icon, alt }) => (
  <div className="absolute transform -translate-x-1/2 -translate-y-1/2">
    <Image src={icon} width={24} height={24} alt={alt} />
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 56.1304,
    lng: -106.3468,
  });
  const [zoom, setZoom] = useState<number>(3);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!API_KEY) {
    return <div>Erreur : clé API non configurée.</div>;
  }

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setIsLoading(false);
    console.log("Map loaded successfully");
  };
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const userPos: LatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setMapCenter(userPos);
          setZoom(14);
        },
        (error: GeolocationPositionError) => {
          console.error("Erreur de géolocalisation: ", error);
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas supportée par ce navigateur."
      );
    }
  }, []);
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 21));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 1));
  };

  return (
    <>
      <NavBar />
      <MobNavBar />
      <div className="flex flex-col relative">
        <div className="flex-grow flex min-h-[70vh] relative">
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 text-black p-4 rounded-md shadow-md z-10">
              Chargement de la carte...
            </div>
          )}
          <div className="w-full">
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEY, libraries: ["places"] }}
              center={mapCenter}
              zoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={handleApiLoaded}
              options={{
                gestureHandling: "greedy",
                disableDefaultUI: true,
              }}
            >
              {userLocation && (
                <Marker
                  lat={userLocation.lat}
                  lng={userLocation.lng}
                  icon="/assets/icons/user-location.svg"
                  alt="Votre position"
                />
              )}
              <Marker
                lat={mapCenter.lat}
                lng={mapCenter.lng}
                icon="/assets/icons/location.svg"
                alt="Centre de la carte"
              />
            </GoogleMapReact>
          </div>
          <button
            onClick={getUserLocation}
            className="absolute lg:bottom-32 lg:right-12 right-4 bottom-4 bg-gradient-to-r from-[#E35D07] to-[#F4AA72] text-white p-2 rounded-full shadow-lg z-10"
          >
            <Image
              src="/assets/icons/my_location.svg"
              width={24}
              height={24}
              alt="Localiser"
            />
          </button>
          <div className="absolute lg:bottom-32 lg:left-12 left-4 bottom-4 flex gap-x-2">
            <button
              disabled={zoom === 21}
              onClick={handleZoomIn}
              className={cn(
                zoom === 21
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-[#505050]/50",
                "flex justify-center items-center size-10 text-white rounded-full shadow-lg z-10 text-3xl font-medium transition duration-300"
              )}
            >
              +
            </button>
            <button
              disabled={zoom === 1}
              onClick={handleZoomOut}
              className={cn(
                zoom === 1
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-[#505050]/50",
                "flex justify-center items-center size-10 text-white rounded-full shadow-lg z-10 text-3xl font-medium transition duration-300"
              )}
            >
              -
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:absolute static -bottom-[28%] w-full z-20">
          <div className="lg:w-[95%] w-full bg-[#FCFCFC] rounded-md shadow-xl min-h-[200px] px-5 flex flex-col gap-y-4 py-4">
            <div className="flex flex-row justify-between overflow-x-auto overflow-y-hidden gap-x-4 scroll-smooth no-scrollbar">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col h-[79px] min-w-[120px] items-center gap-x-2 border border-gray-300 rounded-md p-2 hover:bg-[#E35D07] hover:text-white transition duration-300 cursor-pointer"
                  >
                    <Icon className="size-8" />
                    <span className="text-nowrap ">
                      {interest.name.substring(0, 10) +
                        (interest.name.length > 10 ? "..." : "")}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex bg-gray-50 border border-[#9F9D9D] rounded-full shadow-sm w-full">
              <div className="flex items-center flex-grow space-x-2 px-4 py-2 max-w-[50%] ">
                <Search className="text-orange-500" size={20} />
                <input
                  type="search"
                  placeholder="Rechercher un événement..."
                  className="w-full outline-none bg-transparent text-gray-700"
                  aria-label="Rechercher"
                />
              </div>
              <div className="flex items-center border-l border-[#9F9D9D] px-4 max-w-[50%]">
                <MapPin className="text-orange-500 mr-2" />
                <input
                  type="search"
                  placeholder="Rechercher"
                  className="w-full outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>
            <div className='text-[#9F9D9D] '>Parcourir les évènements dans : <span className="text-[#006FFC] text-bold">Montreal</span></div>
            <div>filtre</div>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 w-full h-screen">test</div>
    </>
  );
}
