import React, { useRef } from "react";

const Map = ({ gifs, gifSrc, caption }) => {
  // ✅ Fallback: if only one GIF is passed, wrap it in an array
  const gifList = gifs || (gifSrc ? [{ src: gifSrc, caption }] : []);

  const handleHover = (ref) => {
    const img = ref.current;
    if (img) {
      const src = img.src;
      img.src = "";
      img.src = src;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 gap-6">
      {gifList.map((gif, index) => {
        const imgRef = useRef(null);
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
            onMouseEnter={() => handleHover(imgRef)}
          >
            <link rel="preload" as="image" href={gif.src} />
            <img
              ref={imgRef}
              src={gif.src}
              alt={gif.caption}
              className="w-full h-auto max-h-[400px] object-contain rounded-lg mb-3 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-gray-300 text-sm font-medium text-center">
              {gif.caption}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Map;
