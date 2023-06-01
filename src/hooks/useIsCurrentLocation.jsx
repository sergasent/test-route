import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useIsCurrentLocation = (url) => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === url) {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [location]);

  return isOpen;
};

export default useIsCurrentLocation;
