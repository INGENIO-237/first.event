"use client";
import React, { useState, useCallback, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Image from "next/image";
import MobNavBar from "./_components/profile/MobNavBar";
import NavBar from "./_components/profile/NavBar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { interests } from "@/utils/interests";
import { MapPin, Search } from "lucide-react";
import MyLocation from "@/components/ui/svg/MyLocation";
import topTendances, {
  HandleLike,
  topTendanceInterface,
} from "@/utils/topTendances";
import ordnung from "@/utils/ordnung";
import { TendanceCard } from "./_components/TendanceCard";
import { EventSection } from "./_components/EventSection";
import Heading from "./_components/HeadingCarousel";
import Link from "next/link";

interface LatLng {
  lat: number;
  lng: number;
}

interface MarkerProps extends LatLng {
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [likedEvents, setLikedEvents] = useState<Set<number>>(new Set());
  const [city, setCity] = useState<string>("");

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (navigator.geolocation) {
      getUserLocation();
    }
  }, []);

  const getUserLocation = useCallback(() => {
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
  }, []);

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setIsLoading(false);
    console.log(maps);
    // if (!map) handleApiError();
  };

  const handleApiError = () => {
    setError("Erreur lors du chargement de la carte. Vérifiez la clé API.");
  };

  const handleZoomChange = (delta: number) => {
    setZoom((prevZoom) => Math.max(1, Math.min(prevZoom + delta, 21)));
  };

  const handleLike: HandleLike = useCallback((id: number) => {
    console.log(id);
    setLikedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      console.log(newSet);
      return newSet;
    });
  }, []);

  const filteredTopTendances = topTendances.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      event.ort.toLowerCase().includes(locationSearch.toLowerCase()) &&
      (selectedCategory === "Tous" || event.category === selectedCategory)
  );

  if (!API_KEY) {
    return <div>Erreur : clé API non configurée.</div>;
  }

  return (
    <>
      <NavBar />
      <MobNavBar />
      <div className="flex flex-col relative">
        <div className="flex-grow flex min-h-[70vh] relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500"></div>
                <p className="text-lg font-semibold text-white">
                  Chargement en cours, veuillez patienter...
                </p>
              </div>
            </div>
          )}
          {error ? (
            <div className="flex flex-col items-center justify-center w-full text-center text-red-600 bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-xl font-bold">
                Erreur de chargement de la carte
              </p>
              <p>{error}</p>
            </div>
          ) : (
            <>
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
                      {...userLocation}
                      icon="/assets/icons/user-location.svg"
                      alt="Votre position"
                    />
                  )}
                  <Marker
                    {...mapCenter}
                    icon="/assets/icons/location.svg"
                    alt="Centre de la carte"
                  />
                </GoogleMapReact>
              </div>
              <Button
                onClick={getUserLocation}
                className="absolute lg:bottom-32 lg:right-12 right-4 bottom-4 bg-gradient-to-r from-[#E35D07] to-[#F4AA72] text-white p-2 rounded-full shadow-lg z-10 hover:opacity-90 transition-opacity"
              >
                <MyLocation width={24} height={24} />
              </Button>
              <div className="absolute lg:bottom-32 lg:left-12 left-4 bottom-4 flex gap-x-2">
                {["+", "-"].map((label, index) => (
                  <button
                    key={label}
                    onClick={() => handleZoomChange(index === 0 ? 1 : -1)}
                    disabled={index === 0 ? zoom === 21 : zoom === 1}
                    className={cn(
                      "flex justify-center items-center size-10 text-white rounded-full shadow-lg z-10 text-3xl font-medium transition duration-300",
                      index === 0
                        ? zoom === 21
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#505050]/50 hover:bg-[#505050]/70"
                        : zoom === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#505050]/50 hover:bg-[#505050]/70"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center lg:absolute static -bottom-[28%] w-full z-20">
          <div className="lg:w-[95%] w-full bg-[#FCFCFC] rounded-md shadow-xl min-h-[200px] px-5 flex flex-col gap-y-4 py-4">
            <div className="flex flex-row justify-between overflow-x-auto overflow-y-hidden gap-x-4 scroll-smooth no-scrollbar">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedCategory(interest.name)}
                    className={cn(
                      "flex flex-col h-[79px] min-w-[120px] items-center gap-x-2 border rounded-md p-2 transition duration-300 cursor-pointer",
                      selectedCategory === interest.name
                        ? "bg-[#E35D07] text-white"
                        : "border-gray-300 hover:bg-[#E35D07] hover:text-white"
                    )}
                  >
                    <Icon className="size-8" />
                    <span className="text-nowrap ">
                      {interest.name.length > 10
                        ? `${interest.name.substring(0, 10)}...`
                        : interest.name}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center border-l border-[#9F9D9D] px-4 max-w-[50%]">
                <MapPin className="text-orange-500 mr-2" />
                <input
                  type="search"
                  placeholder="Rechercher un lieu"
                  className="w-full outline-none bg-transparent text-gray-700"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="text-[#9F9D9D] ">
              Parcourir les évènements dans :{" "}
              <span className="text-[#006FFC] text-bold">Montreal</span>
            </div>
            <div className="flex gap-x-4 overflow-x-auto no-scrollbar">
              {["Tous", ...ordnung].map((category, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "text-nowrap cursor-pointer",
                    selectedCategory === category
                      ? "text-first_orange"
                      : "text-first_gray hover:text-first_orange"
                  )}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EventSection
        className="lg:mt-48 mt-16 px-4 py-3"
        topTendances={filteredTopTendances}
        handleLike={handleLike}
        likedEvents={likedEvents}
        headingTitle="Top de tendance à Montréal"
        moreLink="/"
      />
      <EventSection
        className="mt-8 px-4 py-3"
        topTendances={filteredTopTendances}
        handleLike={handleLike}
        likedEvents={likedEvents}
        headingTitle="Événements  à la une"
        moreLink="/"
      />
      <OtherEvents
        city={city}
        likedEvents={likedEvents}
        handleLike={handleLike}
        datas={filteredTopTendances}
        headingTitle="Les autres événements à "
        className="px-4"
      />
    </>
  );
}

type OtherEventsProps = {
  datas: topTendanceInterface[];
  handleLike: HandleLike;
  headingTitle: string;
  city: string;
  likedEvents: Set<number>;
};

const OtherEvents: React.FC<
  React.HTMLAttributes<HTMLDivElement> & OtherEventsProps
> = ({ datas, likedEvents, handleLike, headingTitle, city, ...props }) => {
  return (
    <div className="w-full" {...props}>
      <Heading title={headingTitle + city} />
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
    
        {datas.map((data, index) => (
          <TendanceCard
            key={index}
            topTendance={data}
            handleLike={handleLike}
            likedEvents={likedEvents}
            isGrid
          />
        ))}
      </div>
      <div className="flex my-4 justify-center w-full">
        <Link
          href={"/"}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-first_orange/90 h-10 bg-first_orange text-white p-2 rounded-full shadow-lg duration-3000"
        >
          Voir tous les événements
        </Link>
      </div>
    </div>
  );
};
