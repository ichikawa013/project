import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Format from "@/components/Format";
import defaultBackground from "../assets/homepage.png";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const NearbyPlacesLocator = () => {
  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.error("Error fetching user location. Using default."),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const fetchNearbyPlaces = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a valid search term.");
      return;
    }

    if (!window.google || !window.google.maps) {
      alert("Google Maps is not loaded yet. Please try again later.");
      return;
    }

    setIsLoading(true);

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: userLocation,
      radius: 5000,
      keyword: searchQuery,
    };

    service.nearbySearch(request, (results, status) => {
      setIsLoading(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      } else {
        console.error("Error fetching places:", status);
        setPlaces([]);
        alert("No places found for the given search.");
      }
    });
  };

  return (
    <Format>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 md:p-8"
        style={{
          backgroundImage: `url(${defaultBackground})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <Card className="max-w-5xl mt-12 mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold tracking-tight text-center text-gray-800">
              Nearby Places Locator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center mb-6"
            >
              <Input
                type="text"
                placeholder="Search for places, e.g., hospitals, pharmacy, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:w-2/3 w-full mb-4 md:mb-0 md:mr-4"
              />
              <Button
                onClick={fetchNearbyPlaces}
                className="w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </motion.div>
            <div className="flex flex-col lg:flex-row gap-6">
              <Card className="flex-grow">
                <CardContent className="p-0">
                  <LoadScript
                    googleMapsApiKey="AIzaSyBXmqpPEwocdW14tXXOZSRxoHAP0koyb7A"
                    libraries={libraries}
                    version="beta"
                    onLoad={() => setIsGoogleMapsLoaded(true)}
                  >
                    {isGoogleMapsLoaded ? (
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={userLocation}
                        zoom={14}
                      >
                        {/* User Location Marker */}
                        <Marker position={userLocation} />

                        {/* Hospital/Place Markers */}
                        {places.map((place) => (
                          <Marker
                            key={place.place_id}
                            position={place.geometry.location}
                            onClick={() => setSelectedPlace(place)}
                          />
                        ))}

                        {/* Info Window for Selected Place */}
                        {selectedPlace && (
                          <InfoWindow
                            position={selectedPlace.geometry.location}
                            onCloseClick={() => setSelectedPlace(null)}
                          >
                            <div>
                              <h2 className="text-lg font-bold">
                                {selectedPlace.name}
                              </h2>
                              <p>{selectedPlace.vicinity}</p>
                              {selectedPlace.rating && (
                                <p className="flex items-center">
                                  Rating: {selectedPlace.rating}
                                </p>
                              )}
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.geometry.location.lat()},${selectedPlace.geometry.location.lng()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 underline"
                              >
                                Get Directions
                              </a>
                            </div>
                          </InfoWindow>
                        )}
                      </GoogleMap>
                    ) : (
                      <div className="flex items-center justify-center h-[400px]">
                        <Skeleton className="w-full h-full" />
                      </div>
                    )}
                  </LoadScript>
                </CardContent>
              </Card>
              <Card className="w-full lg:w-1/3">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Search Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] lg:h-[340px]">
                    <AnimatePresence>
                      {places.length > 0 ? (
                        places.map((place, index) => (
                          <motion.div
                            key={place.place_id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setSelectedPlace(place)}
                          >
                            <h3 className="text-lg font-semibold">{place.name}</h3>
                            <p className="text-sm text-gray-600">
                              {place.vicinity}
                            </p>
                          </motion.div>
                        ))
                      ) : isLoading ? (
                        <Skeleton className="h-[100px]" />
                      ) : (
                        <p className="text-center text-gray-500">
                          No results found
                        </p>
                      )}
                    </AnimatePresence>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </Format>
  );
};

export default NearbyPlacesLocator;
