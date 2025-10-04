import React, { useRef } from "react";

const Map = ({ gifSrc, caption }) => {
  const imgRef = useRef(null);

  // Restart GIF when hovered
  const handleHover = () => {
    const imgElement = imgRef.current;
    if (imgElement) {
      // Force reload of the same GIF (this restarts the animation)
      const currentSrc = imgElement.src;
      imgElement.src = "";
      imgElement.src = currentSrc;
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4"
      onMouseEnter={handleHover}
    >
      {/* Preload GIF */}
      <link rel="preload" as="image" href={gifSrc} />

      <img
        ref={imgRef}
        src={gifSrc}
        alt="Timeline Visualization"
        className="w-full h-auto max-h-[400px] object-contain rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
      />

      <p className="text-gray-300 text-sm font-medium text-center">
        {caption}
      </p>
    </div>
  );
};

export default Map;
