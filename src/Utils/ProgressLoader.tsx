import React, { useState, useEffect } from 'react';

interface ProgressLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

const ProgressLoader: React.FC<ProgressLoaderProps> = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setProgress(0);
      
      // Start with immediate visible progress
      setProgress(10);
      
      // Simulate realistic loading progress with better visibility
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 85) {
            return oldProgress; // Stay at 85% until loading completes
          }
          // More controlled progress increments
          const increment = oldProgress < 20 ? Math.random() * 15 + 10 : // Fast start (10-25%)
                           oldProgress < 50 ? Math.random() * 10 + 5 :  // Medium (5-15%)
                           Math.random() * 5 + 2; // Slow finish (2-7%)
          return Math.min(oldProgress + increment, 85);
        });
      }, 150); // Slower interval for better visibility

      return () => clearInterval(timer);
    } else if (progress > 0) {
      // Complete the progress bar when loading finishes
      setProgress(100);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
        onComplete?.();
      }, 300); // Longer completion time
      
      return () => clearTimeout(hideTimer);
    }
  }, [isLoading, progress, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-200 shadow-sm">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-200 ease-out relative"
        style={{ 
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)' : 'none',
          minWidth: progress > 0 ? '3px' : '0px' // Ensure minimum visibility
        }}
      >
        {/* Add a subtle pulse effect */}
        {progress > 0 && progress < 100 && (
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default ProgressLoader;
