"use client";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  useMap,
} from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MobNavBar from "./_components/profile/MobNavBar";
import NavBar from "./_components/profile/NavBar";

const DynamicMap = dynamic(
  () => import("@vis.gl/react-google-maps").then((mod) => mod.Map),
  { ssr: false }
) as typeof GoogleMap;

interface LatLng {
  lat: number;
  lng: number;
}

interface SearchBoxProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onPlaceSelected }) => {
  const map = useMap();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!map || !window.google || !inputRef.current) return;

    const searchBox = new window.google.maps.places.SearchBox(inputRef.current);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
      inputRef.current
    );

    const placesChangedListener = searchBox.addListener(
      "places_changed",
      () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;
        const place = places[0];

        if (!place.geometry || !place.geometry.location) return;

        onPlaceSelected(place);
      }
    );

    return () => {
      window.google.maps.event.removeListener(placesChangedListener);
      if (
        map.controls[window.google.maps.ControlPosition.TOP_LEFT].getLength() >
        0
      ) {
        map.controls[window.google.maps.ControlPosition.TOP_LEFT].pop();
      }
    };
  }, [map, onPlaceSelected]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Rechercher un lieu"
      className="p-2 m-2 w-64 border rounded shadow-sm"
    />
  );
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 56.1304,
    lng: -106.3468,
  });
  const [zoom, setZoom] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    { id: string; description: string }[]
  >([]);
  const map = useMap();
  const onMapLoad = useCallback(() => {
    console.log("Map loaded successfully");
    setIsLoading(false);
  }, []);

  const handlePlaceSelected = useCallback(
    (place: google.maps.places.PlaceResult) => {
      if (place.geometry?.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setZoom(14);
        setSearchQuery(place.name || "");
      }
    },
    []
  );

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

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (window.google) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: query }, (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          const suggestions = predictions.map((prediction) => ({
            id: prediction.place_id,
            description: prediction.description,
          }));

          setSearchResults(suggestions);
        } else {
          setSearchResults([]);
        }
      });
    }
  }, []);

  const handlePlaceClick = useCallback(
    (placeId: string) => {
      if (!map) return; // Vérifier si la carte est chargée

      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails({ placeId }, (place, status) => {
        if (!place) {
          return;
        }
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place.geometry?.location
        ) {
          setMapCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          setZoom(14);
        }
      });
    },
    [map]
  );

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!API_KEY) {
    return <div>Erreur : clé API non configurée.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar onSearch={handleSearch} searchQuery={searchQuery} />
      <MobNavBar />
      <div className="relative">
        {/* Search Results */}
        <div className="absolute top-12 left-2 z-10 bg-white shadow-lg max-h-64 overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div
                key={result.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handlePlaceClick(result.id)}
              >
                {result.description}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">Aucun résultat trouvé</div>
          )}
        </div>
      </div>
      <div className="flex-grow flex relative">
        <APIProvider onLoad={onMapLoad} apiKey={API_KEY} libraries={["places"]}>
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 text-black p-4 rounded-md shadow-md z-10">
              Chargement de la carte...
            </div>
          )}
          <DynamicMap
            className="w-full"
            center={mapCenter}
            zoom={zoom}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            /*  onBoundsChanged={(map) => (mapRef.current = map)} */
          >
            <SearchBox onPlaceSelected={handlePlaceSelected} />
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <Image
                  src="/assets/icons/user-location.svg"
                  width={24}
                  height={24}
                  alt="Votre position"
                />
              </AdvancedMarker>
            )}
          </DynamicMap>
          <button
            onClick={getUserLocation}
            className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
          >
            <Image
              src="/assets/icons/location.svg"
              width={24}
              height={24}
              alt="Localiser"
            />
          </button>
        </APIProvider>
      </div>
    </div>
  );
}
