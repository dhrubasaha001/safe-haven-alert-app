
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationDisplayProps {
  location: string | null;
  isLoading: boolean;
}

const LocationDisplay = ({ location, isLoading }: LocationDisplayProps) => {
  return (
    <div className="w-full bg-white shadow-sm rounded-lg p-4 border border-sos-blue bg-opacity-90">
      <div className="flex items-center gap-2 mb-1">
        <MapPin size={18} className="text-blue-500" />
        <h3 className="text-sm font-medium text-gray-600">Current Location</h3>
      </div>
      <div
        className={cn(
          "min-h-[2.5rem] text-sm font-normal text-gray-700 pl-6",
          isLoading && "animate-pulse"
        )}
      >
        {isLoading ? (
          <div className="h-4 bg-gray-200 rounded w-3/4 my-1"></div>
        ) : location ? (
          location
        ) : (
          <span className="text-red-400">Unable to access location</span>
        )}
      </div>
    </div>
  );
};

export default LocationDisplay;
