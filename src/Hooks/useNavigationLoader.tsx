import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../Context/LoadingContext';

export const useNavigationLoader = () => {
  const location = useLocation();
  const { startLoading, stopLoading } = useLoading();
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    // Only start loading if the pathname actually changed
    if (previousPathname.current !== location.pathname) {
      startLoading();
      
      // Ensure minimum display time for better UX (even on fast localhost)
      const minDisplayTime = 800; // Minimum 800ms to see the progress bar
      const maxDisplayTime = 1500; // Maximum 1.5s for heavier pages
      
      const getLoadingTime = (pathname: string) => {
        // Different routes can have different loading times
        if (pathname.includes('reports') || pathname.includes('documents')) {
          return maxDisplayTime; // Heavier pages
        }
        if (pathname.includes('employees') || pathname.includes('payroll')) {
          return 1200; // Medium pages
        }
        return minDisplayTime; // Light pages but still visible
      };

      const loadingTime = getLoadingTime(location.pathname);
      
      const timer = setTimeout(() => {
        stopLoading();
      }, loadingTime);

      // Update the previous pathname
      previousPathname.current = location.pathname;

      return () => {
        clearTimeout(timer);
      };
    }
  }, [location.pathname, startLoading, stopLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLoading();
    };
  }, [stopLoading]);

  return null;
};