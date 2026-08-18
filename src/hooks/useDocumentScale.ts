import { useState, useEffect } from 'react';

export function useDocumentScale(docWidth = 800, docHeight = 1131, padding = 40) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const availableWidth = window.innerWidth - padding * 2;
      const availableHeight = window.innerHeight - 100; // Account for navigation bar and padding

      const scaleX = availableWidth / docWidth;
      const scaleY = availableHeight / docHeight;
      
      // Use the smaller scale to ensure it fits completely, but cap at max scale of 1.2
      const newScale = Math.min(scaleX, scaleY, 1.2);
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    return () => window.removeEventListener('resize', calculateScale);
  }, [docWidth, docHeight, padding]);

  return scale;
}
