import React, { useEffect, useState } from 'react';

const MemoryMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // In a real app, you would load Leaflet here
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="map" className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Memory Map</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-96 bg-gray-100 flex items-center justify-center">
          {mapLoaded ? (
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-600">Memory locations will appear here</p>
              <p className="text-sm text-gray-500 mt-1">Chicago, New York, Boston...</p>
            </div>
          ) : (
            <div className="animate-pulse text-gray-500">Loading map...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MemoryMap;