
import { useState } from "react";
import { AlertTriangle, MapPin, PhoneCall } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SOSButtonProps {
  onActivate: () => void;
  isActivating: boolean;
}

const SOSButton = ({ onActivate, isActivating }: SOSButtonProps) => {
  const [ripple, setRipple] = useState(false);

  const handleSOSClick = () => {
    if (isActivating) return;
    
    setRipple(true);
    setTimeout(() => setRipple(false), 800);
    onActivate();
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={handleSOSClick}
        disabled={isActivating}
        className={cn(
          "relative h-52 w-52 rounded-full bg-sos-pink shadow-lg flex items-center justify-center",
          "transform transition-all duration-300 hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-4 focus:ring-sos-purple",
          isActivating ? "animate-pulse bg-opacity-70" : "hover:bg-opacity-90",
        )}
        aria-label="Emergency SOS Button"
      >
        <div className="flex flex-col items-center justify-center">
          <AlertTriangle size={48} className="text-red-500 mb-2" />
          <span className="text-2xl font-bold text-red-600">SOS</span>
          {isActivating && (
            <span className="absolute -bottom-10 text-sm font-medium text-gray-600 animate-pulse">
              Sending alert...
            </span>
          )}
        </div>
        
        {ripple && (
          <span className="absolute inset-0 rounded-full bg-red-500 opacity-30 animate-ping" />
        )}
      </button>
    </div>
  );
};

export default SOSButton;
