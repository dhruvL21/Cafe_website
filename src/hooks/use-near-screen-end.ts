'use client';

import { useState, useEffect } from 'react';

export function useNearScreenEnd(offset = 200) {
  const [isNearEnd, setIsNearEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight - offset) {
        setIsNearEnd(true);
      } else {
        setIsNearEnd(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check in case the page is already near the end on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]);

  return isNearEnd;
}
