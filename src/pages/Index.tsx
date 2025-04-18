
import { useState, useEffect } from "react";
import { Users, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SOSButton from "@/components/SOSButton";
import LocationDisplay from "@/components/LocationDisplay";
import ContactsPanel from "@/components/ContactsPanel";
import SuccessAnimation from "@/components/SuccessAnimation";
import AppInfo from "@/components/AppInfo";
import { Contact } from "@/components/ContactsPanel";

const mockedLocation = "123 Safety Street, Secure City, SC 10001";

const Index = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isActivatingSOS, setIsActivatingSOS] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isContactsPanelOpen, setIsContactsPanelOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem("emergencyContacts");
    return saved ? JSON.parse(saved) : [];
  });

  // Save contacts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  // Mock getting user location on component mount
  useEffect(() => {
    const getLocation = async () => {
      setIsLoadingLocation(true);
      try {
        // In a real app, we'd use the Geolocation API here
        // and then use a reverse geocoding service to get the address
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLocation(mockedLocation);
      } catch (error) {
        console.error("Error getting location:", error);
        toast.error("Could not access your location");
        setLocation(null);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getLocation();
  }, []);

  const handleSOSActivate = async () => {
    if (isActivatingSOS) return;
    if (contacts.length === 0) {
      toast.error("Please add emergency contacts first");
      setIsContactsPanelOpen(true);
      return;
    }

    setIsActivatingSOS(true);
    toast("SOS alarm activated!");

    try {
      // Simulate sending location to contacts
      await new Promise((resolve) => setTimeout(resolve, 2500));
      
      // Show success animation
      setShowSuccess(true);
      
      // Simulate auto emergency call
      console.log("Calling emergency services...");
      console.log("Sending location to contacts:", contacts);
      console.log("Current location:", location);
    } catch (error) {
      console.error("Error activating SOS:", error);
      toast.error("Failed to send SOS. Please try again.");
    } finally {
      setIsActivatingSOS(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sos-pink/30 to-white p-4">
      <header className="mb-8 pt-4 relative">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Women Security SOS
        </h1>
        <AppInfo />
      </header>

      <main className="max-w-md mx-auto flex flex-col items-center">
        <section className="w-full mb-8">
          <LocationDisplay location={location} isLoading={isLoadingLocation} />
        </section>

        <section className="my-10 flex flex-col items-center">
          <SOSButton 
            onActivate={handleSOSActivate} 
            isActivating={isActivatingSOS} 
          />
          
          <div className="mt-4 text-sm text-gray-500 text-center max-w-xs">
            Press the SOS button to alert your emergency contacts and nearby authorities
          </div>
        </section>

        <section className="mt-auto w-full flex justify-between">
          <Button
            onClick={() => setIsContactsPanelOpen(true)}
            className="bg-sos-purple text-black hover:bg-sos-purple/90 flex-1 mr-2"
          >
            <Users size={18} className="mr-2" />
            Manage Contacts
          </Button>
          
          <Button
            onClick={() => toast.info("Emergency call feature will be activated in the production version")}
            className="bg-sos-blue text-black hover:bg-sos-blue/90 flex-1 ml-2"
          >
            <PhoneCall size={18} className="mr-2" />
            Emergency Call
          </Button>
        </section>
      </main>

      <ContactsPanel
        contacts={contacts}
        onContactsUpdate={setContacts}
        isOpen={isContactsPanelOpen}
        onClose={() => setIsContactsPanelOpen(false)}
      />

      <SuccessAnimation
        isVisible={showSuccess}
        onAnimationComplete={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default Index;
