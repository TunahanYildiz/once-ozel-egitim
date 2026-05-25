"use client";

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Reset scroll restoration behaviour to manual so browser doesn't force previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on load
    window.scrollTo(0, 0);
    
    // Fallback timer for delayed layout rendering
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
