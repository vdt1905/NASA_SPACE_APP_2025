import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <img 
        src="/gifs/global_temp_bar.gif" 
        alt="Wildfire Map Visualization"
        className="w-full h-auto max-h-[400px] object-contain rounded-lg mb-4"
      />
      <p className="text-gray-300 text-sm font-medium text-center">
        Real-time wildfire activity 
      </p>
    </div>
  );
};

export default Map;