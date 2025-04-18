
import { Info, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white shadow flex items-center justify-center"
        aria-label="App Information"
      >
        <Info size={18} className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-medium">About Women Security SOS</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="p-4 space-y-4 text-sm">
              <p>
                Women Security SOS is designed to provide quick access to emergency assistance when you need it most.
              </p>
              
              <div>
                <h3 className="font-medium mb-1">How to use:</h3>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start">
                    <span className="bg-sos-pink rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <p>Add your emergency contacts through the "Manage Contacts" button</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-sos-pink rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <p>Press the SOS button in an emergency to alert your contacts with your current location</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-sos-pink rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <p>Use the Emergency Call button to quickly call local emergency services</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Features:</h3>
                <ul className="space-y-1 pl-4">
                  <li>• One-tap SOS alert system</li>
                  <li>• GPS location tracking and sharing</li>
                  <li>• Emergency contact management</li>
                  <li>• Quick access emergency calling</li>
                </ul>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                This is a demonstration version. In a full implementation, this app would integrate with actual emergency services APIs and provide real-time location tracking.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppInfo;
