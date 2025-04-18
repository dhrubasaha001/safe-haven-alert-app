
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessAnimationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

const SuccessAnimation = ({
  isVisible,
  onAnimationComplete,
}: SuccessAnimationProps) => {
  if (!isVisible) return null;

  // Auto-hide after animation completes
  setTimeout(() => {
    onAnimationComplete();
  }, 3000);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={cn(
          "bg-white rounded-2xl p-8 flex flex-col items-center justify-center max-w-xs mx-auto",
          "animate-in fade-in duration-500"
        )}
      >
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 mb-4">
          <CheckCircle
            size={48}
            className="text-green-500 animate-[scale-in_0.5s_ease-out]"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">SOS Sent</h3>
        <p className="text-gray-600 text-center text-sm">
          Your emergency contacts have been notified with your location details
        </p>
      </div>
    </div>
  );
};

export default SuccessAnimation;
