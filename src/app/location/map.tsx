"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

const CustomMarker = () => (
  <div className="relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/30 animate-marker-pulse" />
    <div className="relative w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground shadow-md" />
  </div>
);

export default function LocationMap() {
  const position = { lat: 34.052235, lng: -118.243683 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center text-center p-4">
        <p className="text-muted-foreground">
          Google Maps API key is missing.
          <br />
          Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        zoom={14}
        center={position}
        mapId={"a2f3e372de26610d"}
        disableDefaultUI={true}
        gestureHandling={"greedy"}
        className="w-full h-full"
      >
        <AdvancedMarker position={position}>
          <CustomMarker />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
